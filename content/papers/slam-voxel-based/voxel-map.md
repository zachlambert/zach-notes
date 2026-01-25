+++
title = "Voxel-Map"
[extra]
status = "draft"
+++

{{ paper(
doi="10.1109/LRA.2022.3187250",
pdf="voxel-map.pdf"
) }}

Repo: https://github.com/hku-mars/VoxelMap

## Rough notes

### Introduction

Lidar odometry requires a map that it builds and aligns against.

Typically this uses a point-cloud based map:
- Stores raw point clouds
- Finds nearest points and fits a plane, then uses point-to-plane alignment
- Advantage: simple and efficient
- Drawback: cannot model uncertainty properly

To model uncertainty need to:
- Store the salient features (ie: planes), rather than re-computing for each alignment
- Use a probabilistic method to update these features

The planes are stored in a voxel map, with one plane per voxel. The voxel size can be adaptive, to vary based off the point density.

## Related works

The plane features used are similar to surfels used by [suma](../suma).

Comments on a few other surfel-based approaches and outlines key differences for this approach.

## Methodology

### Probabilistic plane representation

Model uncertainty in the pose and range measurement, map to the projected point position to find the jacobian between the state error and measurement error.

{{ aside_begin(label="Example formulation")}}

(Using my own notation, slightly different to theirs)

Point position $p_i$, for pose $T=[p, R]$, measured distance $d_i$ and direction relative to sensor $n_i$ is:
$$
p_i = p + Rn_id_i
$$

Therefore, modelling uncertainties as $\delta p$, $\delta R$, $\delta d_i$, the uncertainty in $p_i$ is:
$$
\delta p_i = \delta p - (Rn_i)^\wedge d_i \delta R + Rn_i\delta d_i
$$

{{ aside_end() }}

For a set of points $\\{p_i\\}_{i=1}^N$ we find the centroid $q$ and covariance matrix $A$ as:
MeanPoints covariance matrix is defined as:
$$
\begin{align*}
q &= \frac{1}{N}\sum\_{i=1}^Np_i \\\\
A &= \frac{1}{N}\sum\_{i=1}^N(p_i - \tilde{p})(p_i - \tilde{p})^T^
\end{align*}
$$

The plane normal $n$ is the eigenvector of the matrix $A$ with the minimum eigenvalue.  
The final description of the plane is the pair $(q, n)$: the plane centroid and normal.

Then can map the uncertainty in the point positions $p_i$ to the uncertainty in the centroid and normal.  
Can see paper for this result.

### Coarse-to-fine and efficient voxel map construction

In typical usage, start with a sparse set of measurements (particularly at far distances as points spread out), then as we accumulate more measurements, the map gets more dense due to better point coverage.

For prior surfel-based approaches, the surfel features are small, so the map is too sparse to be useful for larger areas.

The method used here is:
- Divide the world into fixed-size coarse voxels and index into a hash map. (eg: 1x1x1 metres) This allows the map to grow easily.
- Within each voxel, the data is represented by a hierarchical octree, only as low resolution as required:
  - To start, tries fitting a plane to all points in the voxel
  - If the minimum eigenvalue is below a threshold, there is a well defined plane, and the plane $(q, n)$ is calculated for the voxel.
  - Otherwise, it subdivides into voxels, and continues until it fits a plane for a particular voxel. (up to some maximum depth)
- When new data is received:
  - If it's a new voxel, re-construct from scratch
  - If it's an existing voxel, update the plane and covariance with the new data
    - This requires retaining all the points
    - Once the value converges to a sufficient degree (from experiments, 50 points), discard all the old points
    - Then only retain the latest 10 points and use this to calculcate the normal
    - Still retain the originally calculated normal and covariance from the 50 points. If this normal and the latest normal diverge significantly, reset the voxel.

### Point-to-plane match

For a given point $p_i$, sample the coarse voxel via the hash function, then find all nearby voxels (within a given radius?).

For each voxel plane, you can evaluate the distance $d_i$ to that voxel, as well as find the jacobians from each components of the uncertainty (sensor pose, voxel centroid and normal) to the uncertainty in the distance measurement, and therefore the covariance.

This covariance can then be used in maximum a posteriori (MAP) estimation.

Note: Also only retain positions for which the a priori likelihood is within a given threshold. ie: It is sufficiently likely to belong to a particular voxel, given the current voxel covariance.

### State estimation

Use an iterated extended kalman filter, with either a constant-velocity model, or if an IMU is available, a IMU motion model (with proper pre-integration).

This motion prior + the point-to-plane observation model defines the MAP estimation, which gives the posterior distribution.

## Experiments

Parameters used in testing:
- Coarse voxel size: 3m
- Maximum voxel depth = 3, such that minimum voxel size = 0.375m

Overall impression:
- The adaptive voxel saze and probabilistic update methods show clear improvements, as shown by degraded performance when either feature is disabled.  
- The use of octrees per coarse voxel, instead of indexed hash maps or adaptive kdtrees gives better performance.

## Remaining thoughts

The approach seems very theoretically sound and accurate, so seems like the "correct" way to do proper lidar odometry.

However, I can still envision cases where it would fail that aren't represented in the paper:
- For areas with more geometric complexity, the MAP optimisation is still going to be ill-formed like any lidar odometry method.
- Still needs to handle dynamic obstacles, these are going to derail the algorithm completely if they get mapped
    - Actually, the part about resetting voxels if there is deviation might fix this
    - Might work similar to octomap/similar where if a dynamic obstacle moves, the voxel is simply erased.
    - Would need to test how this performs
- This is a pure odometry approach and will experience drift - see [FAST-LIVO2](../fast-livo2) for how the method is incorporated into a full SLAM algorithm.
- Does it support any type of lidar? (eg: limited fov)
