+++
title = "Rough thoughts 2"
weight = 102
+++

# Requirements

For a navigation system to be useful, we must be able to define a map coordinate system for an arbitrary area and track the pose of the robot within this coordinate system. This then allows for navigation queries to be defined in a consistent manner (ie: giving a pose goal of (x=5, y=10) refers to the same location independent of where the robot started).

This requires a map to be provided/built which the robot can localise against. This can be split into two components:

- Can the robot pose be estimated from scratch without any localisation hint?
- Can the robot pose be tracked within the map accurately, from some initial known location?

We also need to work out how the map is going to be built/updated:

- Can the map be given in advance, or must it be built by the robot?
- If built by the robot, may this be performed offline, or must it be done online?
- If a map has been previously built and provided, should this be capable of being extended in subsequent sessions if new areas are explored?
- If revisiting a previously visited area and there are changes, can it update the map with these changes? (and is it robust against these changes)

Furthermore, if the map is used between multiple robots, and it should be updated with new information, how is this fed back to each robot?

Final point: can this help in path planning?

- An occupancy map (or similar) must be provided for path planning, that is consistent with the SLAM map
- Can the SLAM algorithm aid in constructing this map?

# Localisation with known map

First, assume we have some known, fixed, global map. What are the different types of information we can include in the map?

Additionally, what functionality does this information provide?

- Can it support re-localisation?
- Can it support tracking from an initial re-localisation result?
- If the environment changes, can the map be updated in response to this?

All the following map data assume a single global map - so no pose graph / keyframes.

Features:

- Stores set of features with their 3D position and descriptor/properties
- For visual features, may also store an associated image patch
- Types of feature:
  - Visual features
  - Lidar plane/edge features
  - Lidar geometry features (eg: PFH - point feature histogram)
  - Semantic object classification
- Usage:
  - Can relocalise against visual and semantic features (place recognition + initial pose estimation)
  - Can align against visual and lidar features
  - Can evaluate tracking accuracy via inlier ratio
- Updating:
  - Can add new features
  - Can remove features that appear to be outliers - don't match against observations, where there are sufficient inliers elsewhere

Point cloud:

- Stores subsampled point cloud in an octree/kdtree/similar
- Sparse representation of the surface geometry
- May cache planes fitted to the point cloud, and update if the point cloud updates
- Usage:
  - Can track against with point-to-point or point-to-plance ICP
  - Can align against from a rough relocalisation estimate, but cannot relocalise against alone
  - Can evaluate tracking accuracy via consistency between observed point cloud and global point cloud
- Updating:
  - Can add new points
  - May not be possible to reliably remove points

Geometry cloud:

- Store set of geometry primitives in an octree/kdtree/similar
- Includes: planes, edges, surfels
- Similar usage and update logic to point cloud

Volumetric maps:

- Stores data over 3D space, either by an octree or hashed voxels
- Also stores the occupancy probability (similar to occupancy map), and allows encoding that certain voxels are empty, and don't expect to observe any data inside them
- Types of volumetric map:
  - Occupancy: Store the probability of occupancy for a given voxel
  - Normal-distribution transform (NDT): Store the centroid and data covariance of points observed within a voxel.
  - Plane: Fit a plane to points observed within a voxel (similar to NDT, but only care if the distribution looks like a plane)
  - TSDF: Truncated (projective) signed distance field. Stores the minimum distance to the closest surface, as observed from point cloud data. Only stores over voxels nearby surfaces, hence truncated.
- Usage:
  - Can track against all representations, although for occupancy it will be highly inaccurate due to discretisation
  - Cannot relocalise against, similar to point cloud
- Updating:
  - Possible to update via raycasting, whereby the log-odds value of each value is inceased/decreased depending on whether the current data is consistent with observations

Mesh:

- Explicit surface representation
- Must be built from a TSDF, point cloud, or similar, via a marching cube algorithm
- Usage:
  - Mainly required for visualisation only
  - Can track against (maybe?)
- Updating:
  - Cannot easily update

Artificial landmarks:

- Fiducials or other artificial landmarks that provide relative pose, bearing and/or distance.
- Usage:
  - For fiducials, can relocalise easily against these
  - All landmarks can support tracking
- Updating:
  - Similar to features, can add/remove based on if they are observed

# Local mapping and tracking

Let's first ignore the problem of re-localisation, loop closure, etc. Consider a system that starts from scratch and then just tries to estimate the relative pose from the start pose.

The map which is tracked against is called the local map, and can be defined in a few ways, which I am defining as:

- Explicit: Maintain a single map estimate which is continually updated in response to new data
- Implicit: Maintain the original sensor data at a minimal set of keyframes, and re-calculate the explicit map parameterisation as a function of this keyframe data.
-

In both cases, a local map needs to be calculated which can be tracked against. However, in a keyframe-based approach (implicit) you retain the original sensor data, which allows for the map to be updated in response to loop closure / pose correction.

This applies to any map representation that supports tracking: visual features, lidar features, point cloud, TSDF, etc.

Mapping and tracking proceeds as follows:

- Find an initial map estimate (via the initial sensor frame, or a set of sensor frames if required)
- Whenever a new sensor frame is found:
  - Tracking: Align the sensor pose against the current local map
  - Mapping: Optionally, update the map with the new sensor data
    - In keyframe-based approaches, this corresponds to creating a new keyframe, which will then be used to create the local map on subsequent tracking iterations. Not done for every frame in order to minimise the number of keyframes, only done with there has been significant movement.
    - In explicit-map approaches, the explicit map data structure is updated directly. This may be done at a higher rate than the rate at which keyframes are created.

For explicit approaches, the local map always has a bounded size. Typically the local map is persisted in a radius or box around the robot pose and data outside of this is discarded.

For implicit approaches, the local map is only built from nearby keyframes, but old keyframes are rettained. Therefore, if travelling back along previous keyframes, can track against these and maintain consistency.

Comparison:

- Explicit approaches allow directly updating the map representation. This allows it to be updated more regularly and efficiently, as well as possibly removing data if dynamic objects move for example.
- However, explicit approaches throw away old information so cannot maintain global consistency

A hybrid approach is to use keyframes and an explicit map representation together:

- Use an explicit local map defined around a sliding window
- Use previous keyframes as inputs to this explicit map - similar to how new sensor data is added

## Improvements to local mapping via optimisation

In the description above, the system only ever aligns the latest pose against the local map.

However, it is also possible to:

- Maintain a sliding window of past pose estimates, alongside the local map, defined as a factor graph
- Add constraints between each pose and the observed features/geometry in the local map
- Add IMU pre-integration factors to the poses, as well as include estimation of the gravity vector
- Perform optimisation (bundle adjustment) over the factor graph to jointly optimise over the sliding window of poses

This is very typical for visual odometry, whereby the factor graph is done over the small window of poses + feature positions + optionally IMU pre-integration factors.

For lidar odometry, there are two approaches:

- Add constraints between poses from the lidar alignment, don't jointly optimise over the map
- Use a specific representation of the local map that allows it to be included in the optimisation. This is implemented by VoxelMap (and subsequent work) where each voxel defines a plane estimate via centroid + normal, which are also optimised over.

# Revisiting areas with existing keyframes

Let's say our odometry has zero drift and all our keyframes are in the correct location.

If the system revisits an area with existing keyframes:

- Based on the assumption above, can find the corresponding keyframes by looking for the nearest keyframes
- Can it make use of these keyframes to build the local map?
- Can it update the data in these keyframes if there have been changes since visiting them?

An implicit local mapping approach can always re-use the keyframes, since the map is always built from keyframes.

An explicit approach can also use keyframes, if it uses these keyframes as another input the building the local map.

However, to update the keyframe data with changes, require that:

- The keyframe data is stored in such a way that it can be updated, which I currently think requires a volumetric map
- Can track against the keyframes in the same local mapping approach as aboved
- Update each keyframe submap/data based on the observations
- Ideally, the data within each keyframe is modified so neighbouring keyframes don't overlap

Additionally, if using an explicit map, since the map is built separately, independent of the keyframes, it is not clear to me how you would update the keyframes with the new data. Would need some method of re-defining the keyframe data from the latest local map.

# Pose graph optimisation and loop closure

Three requirements for loop closure:

- Identify candidate loop closures
- Perform pose alignment against the prior keyframe
- Verify the alignment by comparing the sensor data with the prior keyframe

If the pose covariance is sufficiently small (and accurately scaled), this provides a good geometric bound for where to search for loop closures.

If this covariance is too high, it ceases to be useful since it's just as likely to give false positives.

Therefore, for robust identification of loop closure candidates, ideally have a feature-based approach to support this.

Additionally, need some method for verifying the alignment is correct. This may be done for various different types of sensor data / map: visual features, point clouds, etc. However, it is not guaranteed that any verification approach here is robust.

## Is loop closure required?

Generally yes, but if we have a particularly accureate odometry, this can simplify the loop closure by providing a strong hint on where to search for loop closures, which trivialises the problem.

# Relocalisation

The same as above, but cannot rely on the pose covariance to provide a hint.

# Checklist of required features and expected challenges

Local mapping and tracking:

- Can it do local mapping and tracking (odometry)?
- Define "failure" as any scenario where there are irrecoverable errors, which is one of:
  - Complete loss of tracking
  - Significantly incorrect alignment, which corrupts the pose graph / map
  - Having lower drift is desirable, but not absolutely required. It depends on the degree to which loop closure can cope.
- Does it fail for any of the following scenarios?
  - Mixture of small and large scale environment
  - Geometrically simple environments
  - Textureless environments
  - Sparse environments
  - Fast linear motion
  - Fast angular motion
  - Long sequences (without loop closure)
  - Changes in elevation
- Can it detect when tracking fails?

For the above, ignore consideration of loop closure / revisiting areas. Assume that there is no persistent map retained.

Persistent mapping:

- Does it save any form of global map?
- Can it re-use observations from previously explored areas to maintain consistency?
- Does it support loop closure to correct for large drifts?

Loop closure:

- If loop closure is supported, what requirements are there for this to perform well?
- Cannot guarantee this to work in general, so may need to only perform loop closure when revisiting visually and/or geometrically distinct areas.
- May also be able to manually help the algorithm in a few ways:
  - Require that the user doesn't perform large loops, and always returns to visually/geometrically distinct areas
  - Provide the ability for the user to modify the loop closures and visually inspect the correctness

Dynamic changes:
- Is tracking robust to short-term dynamic changes (eg: people moving around in view)
- Can dynamic objects be excluded from the static map?
- Is it robust to long-term dynamic changes (eg: a new wall?)
  - Is relocalisation robust against this?
  - Is loop closure robust against this?
  - If building a local map from prior keyframes with an object removed or added, does this degrade tracking performance?
  - For the above point, if tracking is robust, can the map be updated with the change?

# My current opinion on the best approach

Making SLAM robust for all scenarios is not a realistic goal. Instead, focus on how we can most reliably solve the construction use-case and similar.

My current assumption is that you can split the problem into two:
- Design a SLAM system that works with a static environment only (with some robustness against dynamic objects like people moving around)
- Don't require it to be run online
