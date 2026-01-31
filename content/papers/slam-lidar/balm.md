+++
title = "BALM: Bundle adjustment for lidar mapping"
+++

{{ paper(
doi="10.1109/LRA.2021.3062815",
pdf="balm.pdf"
)}}

# Rough notes

## Introduction

Bundle adjustment = problem of jointly solving 3D structure + camera poses.

The 3D structure traditionally just meant the 3D position of visual features.

It is the core algorithm behind SfM and is often used as part of visual SLAM.

Traditionally, BA has referred to visual SfM/SLAM only. However, lidar BA can be defined in a similar way as jointly estimating the global point cloud + the lidar poses.

However, this is actually much more difficult for lidar BA. Due to the sparsity of lidar, exact point matching is infeasible / not correct.

This paper does the following:
- Formulate BA on sparse lidar feature points: edges + planes, then minimises the distance from feature point to edge or plane. 
- Shows that the features can be analytically solved in closed-form solution, leading to a BA optimisation over the scan poses only.
- This then makes the problem feasible to solve.
- Uses an adaptive voxelisation to search for feature correspondance.

**Re-iterate main point**: This is a new definition of BA, usually BA only refers to optimising over visual feature points + poses.

## Related work

New lidar BA definition is most similar to multi-view registration.

eg: Extend ICP to handle multi-scan cases, where the cost function is defined over multiple scans.

These all require exact point matching which rarely existing point clouds:
- Each lidar point corresponds to a specific point on the environment
- These points are sparse, you don't cover the entire geometry
- Therefore for two points clouds, it's essentially guaranteed that most (or all?) points on one cloud don't align to an exact point another, but to some point in-between which wasn't sapmled.

The difficulty of this problem is to define a metric that:
- Evaluates the alignment quality of sparse points (the point clou maps) against a set of scans
- Which also allows for efficient optimisation

Other work performs this bundle adjustment over plane features only.

Further comments on how this new approach differs, etc...

## BA formulation and derivatives

For a given frame, observe a set of points $y_i$, which are mapped into global points $p_i$ via:
$$
p_i = t + Ry_i
$$
For $T = (R, t)$

Plane features are defined via a position $q$ and normal $n$.

Bundle adjustment optimises for $T$, $n$, $q$:
$$
\begin{align*}
T^\star, n^\star, q^\star &= \argmin_{T, n, q} \frac{1}{N}
\sum_{i=1}^N (n^T(p_i - q))^2 \\\\
&= \argmin_T \WrapP{\min_{n,q}\frac{1}{N}\sum_{i=1}^N(n^T(p_i - q))^2}
&= \argmin_T \lambda_\mathrm{min}(A)
\end{align*}
$$

where $\lambda_\mathrm{min}(A)$ is the smallest eigevalue, and has corresponding eigenvector $u_\mathrm{min}$.

This uses the standard method of fitting a plane to a set of points, where $\tilde{p}$ is the mean and the data covariance $A$ is defined as:
$$
A = \frac{1}{N}\sum_{i=1}^N(p_i - \tilde{p})(p_i - \tilde{p})^T
$$

Essentially shows that the problem is reduced to minimising the square sum of eigenvalues $\lambda_\mathrm{min}(p(T))$, where $p(T)$ denotes the points in the world frame for a particular frame, transformed under $T$.

Next sections show how to evaluate the first and second order derivatives of the eigenvalues $\labmda_k$ with respect to the map points.

Then uses these first and second order derivatives with LM optimisation to solve for the map points $p$ that minimise a given eigenvalue.

## Adaptive voxelisation

For the above section, requires finding all points that correspond to a given feature.

This adaptive voxel map is constructed similar to [Voxel-map](../voxel-map), where voxels are only subdivided when a plane cannot be fit within the coarser voxel.

To construct the voxel map, it first requires an initial lidar-odometry approach to initialise the pose trajectory and map.

Some remarks:
- If there are two many points in a given voxel from a sca, these can be averaged.
- Skips a voxel if there is no clearly smallest eigenvalue (and hence isn't a plane)

## LOAM with local BA

Odometry is as follows:
- Build the initial map from the first scan
- For each new scan, first align against the map, which involves:
  - Finding which voxel a point lies in, then match against the plane. Skip if there is no existing voxel it lies inside
  - Minimise the plane distance over the scan to find the scan-to-map alignment
  - Then update the map with the new scan, creating new voxels as required, and subdividing existing voxels if they no longer fit to a plane
  - Against, similar method to [Voxel-map](../voxel-map)

After a certain number of frames, map refinement is triggered, which does the following:
- Performs a local BA on a sliding window of lidar poses.
- Does the non-linear optimisation via LM in order to refine the plane features + the lidar poses.
- This optimisation is done over the poses only, and once these are solved for, can be used to update the plane features.
- As frames move out of the sliding window, they can be marginalised into a set of merged points (?? not sure of details of this)
