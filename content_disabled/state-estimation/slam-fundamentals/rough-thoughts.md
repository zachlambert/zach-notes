+++
title = "Rough thoughts"
weight = 101
+++

Good list of projects here: <https://github.com/introlab/rtabmap/wiki/List-of-Open-Source-SLAM-projects>

## Initial concepts

In SLAM, the system state consists of the robot pose $x_t$ and the map $m$.

Filtering based approaches recursively provide an approximation of $p(x_t, m | y_{1:t})$ whereas _smoothing_ approaches provide an approximation of $p(x_{1:t}, m | y_{1:t})$

It has been shown that smoothing-based approaches outperform filtering-based approaches for the same computation cost due to better exploiting the sparsity of the problem.

Typically approaches that maintain an explicit representation of the map are limited to _local mapping_ only, or just "odometry".

These approches always consist of a few steps:
- Initialisation of the map structure and first few frames (in the case of visual slam)
- Tracking: Estimate the pose of a new sensor frame relative to the map
- Mapping: Update the map

Approaches can be characterised direct, semi-direct or indirect based on how the **tracking** is done:
- Direct: Uses the raw sensor data
- Semi-direct: Uses a subset of the raw sensor data
- Indirect: Extracts features

Approaches can be characterised as sparse or dense based on how the **mapping** is done:
- Dense: Fully models the structure
- Sparse: Sparse representation of the structure

## Odometry and local mapping

### Feature-based visual odometry

SfM optimises over a camera trajectory and feature positions. Accurate but limited to short trajectories due to computational complexity.

SfM is a specific example of a factor graph, which defines probabilistic constraints between state. May extend this factor graph over a window of state to include:
- IMU pre-integration, which requires adding velocity and IMU biases to each camera state, as well as a single variable for the gravity direction in the inial camera frame.
- Modify the feature constraints to support stereo cameras, where for near features the depth can be reliably resolved, which constrains the scene scale.

All SfM-like approaches require suitable good prediction of the next camera pose and either use a constant velocity model (or decaying velocity model), or make use of the IMU preintegration factor.

SfM is generally thought of as an offline approach, and this is still a large use case for it: doing offline optimisation of camera data to provide a high detail reconstruction. 

However in the context of SLAM, the same algorithm can be used for short trajectory sequences.

### Semi-direct visual odometry

An alternative approach that instead of using features, stores image patches (for "meaningful" image patches with high intensity gradients).

Then instead of doing feature matching and alignment, instead:
- Determines whether a image patch in the map should be observed in a given frame via re-projection
- Optimises over the sum squared error of the image patch instead of the error of the re-projected feature position.

### Lidar odometry

Lidar maps can be defined in a few ways:
- Point cloud maps: The raw point cloud observed
- Feature based: Extract plane (and sometimes edge) features
- Surfel-based: Calculate surfels/planes and store in voxel structure

Tracking can be done in two ways:
- Direct: Aligning the raw point cloud
- Indirect: Extracting features from the raw point cloud and aligning these. Only works if the map is also feature-based.

### Lidar "bundle adjustment"

Can also maintain a sliding window of poses + lidar frames and jointly optimise.

Specifically: have a surfel/plane - based representation of the map, where these surfels can be jointly refined alongside a trajectory of poses.

## Making use of local mapping

All the above approaches can be defined as a "local mapping" odometry approach (or frame-to-map). There are also frame-to-frame approaches (eg: frame-to-frame point cloud alignment, or frame-to-frame optical flow for stereo images), however these are always far less accurate.

Local mapping approaches excel at **local consistency** but:
- Are restricted to operating over a sliding window, otherwise the computational cost continues to increase massively.
- Will always experience some drift

Offline SfM can handle drift, and maintain global consistency, by retaining the entire state history and:
- Checking for feature matches between the latest camera frame and each feature in the feature map
- Jointly optimising over the entire pose trajectory and feature positions to resolve the drift.

However, with the traditional SfM approach, this isn't possible.

## Covisibility and pose graphs

Feature positions are only optimised over the local window.

However keyframe poses are optimised over a pose graph with loop closure constraints, which helps maintain global pose consistency, but ignores maintaining global feature consistency.

Generally so long as features/maps are accurate within the local map, this is fine.

## Treating odometry as a standalone component

Independent of particular sensor setup, etc, can odometry be treated as an external component?

An odometry component should provide:
- The current local map estimate
- The current pose estimate relative to the map origin
- A service for moving to a new local map

When moving to a new local map, the SLAM system would define a keyframe for the new local map origin, and save the current map to the previous keyframe which it was defined for.

## Tracking against a pre-existing map

Typically, SLAM systems don't support this.


