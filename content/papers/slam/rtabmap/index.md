+++
title = "Rtabmap"
weight = 100
+++

RTAB-Map as an Open-Source Lidar and Visual SLAM Library for Large-Scale and Long-Term Online Operation

<https://introlab.github.io/rtabmap/>

[PAPER](paper.pdf)

Although RTAB-Map is quite old now (originally created in 2013), it has received many update over the years and remains one of the standard SLAM ROS packages.

Therefore, it's worth understanding how it works as a reference implementation, before looking into more modern approaches.

It implements pose-graph SLAM that supports both visual and lidar SLAM.

# Algorithm

## Odometry

Odometry is treated as an external input to RTAB-Map. This allows using vehicle odometry (proprioceptive odometry) instead of visual/lidar odometry if desired.

If proprioceptive odometry is not available or not accurate enough, must use visual/lidar odometry.

Visual odometry approaches:

- Frame-to-frame (F2F): Aligns a new frame against the last keyframe
- Frame-to-map (F2M): Aligns a new frame against a local map of features created from a past window of keyframes.

Similar for lidar, but referred to as scan-to-scan (S2S) and scan-to-map (S2M). Uses the point clouds instead of visual features.

### Visual odometry details

**Feature detection**:

- Uses "GoodFeaturesToTrack" (GFTT) features, with a fixed number of features detected.
- Supports all OpenCV features but GFTT chosen as default.
- For stereo images, finds the disparity image via [Lucas-Kanade](../../../vision/lucas-kanade-method) approach
- For depth images, uses depth as a mask to avoid features with invalid depth

**Feature matching**:

- F2M:
  - Want to find correspondances between features in the new keyframe and in the local map of features
  - Uses BRIEF features and does a nearest neighbour search in the local feature map
- F2F:
  - Have already found features, now want to find correspondances between features in the new keyframe and the previous
  - Uses the [Luca-Kanade-Tomasi (KLT)](../../../vision/lucas-kanade-method) method of feature matching.

**Motion prediction**:

- Used to define an a-priori estimate of the pose of a new frame and reduce the search space
- Uses a constant velocity model and searches over a given search window around this.

**Motion estimation**:

- The feature matching only found correspondances, now need to align the new frame.
- Both F2M and F2F use [Perspective-n-Point](../../../vision/perspective-n-point) (PnP) with [RANSAC](../../../vision/ransac).
- Requires a certain threshold of inliers to accept the transformation

**Local bundle adjustment**:

- With F2M, performs bundle adjustment over all features and frame poses over the local map. Requires that the local map has kept all the appropriate information, rather than just storing the feature map.
- With F2F, this is essentially just: jointly optimise over the new frame pose and all the feature positions. Unlike the motion prediction step, I assume this now makes use of the depth information in the new keyframe to improve the estimate of the feature positions.

**Pose update**: Have the frame-frame transform and update the overall pose

**Feature map update (F2M only)**:

- For features that weren't matched against the previous frame, these are added to the map
- For the other features, their positions are updated to those found in bundle adjustment
- When the number of features exceeds a threshold, the oldest features not matched with the new frame are removed. If a keyframe in the local map no longer has features in the map, it is removed.

### Lidar odometry details

TODO

## Synchronisation

Gives an overview on how data is synchronised appropriately.

## Outputting a map

For each frame a local occupancy map is produeced. For stereo images, it uses [block matching](../../../vision/stereo-vision) to find the disparity map.

Combines this over all poses in the pose graph to form the full occupancy map. Can output it in 3D as well as projected to 2D.

Local maps are found by:

- For 2D, ray traces along the local 2D map and sets as empty, except for where the hitpoint is observed
- For 3D, projects the depth image into a point cloud, downsamples via a voxel grid, and builds a 3D voxel map.
- In addition to the above, segments the ground plane in the 3D point cloud and doesn't add this to the map

## Loop closure and proximity detection

Uses a bag-of-words approach [outlined here](../labbe-loop-closure).

When a new pose is added to the pose graph, finds a descriptor that characterises the entire image.

This is done by indexing the feaures in an image against a bag-of-words, where the resulting vector has a 1 per bag feature, 0 otherwise (might be a bit different to this - but that's the general idea).

This forms a very large vector for the image.

Requires less features than odometry, so only a subset of the features are used to form the bag-of-words feature.

For visual odometry, can re-use features found using tracking.

Doesn't seem to mention how loop closure features are found for lidar point clouds. From what I've read elsewhere this can be done via one of the following methods:

- Check for overlapping frames and then align the clouds directly
- Use some other descriptor for the entire point cloud. eg: A bag of words feature for point histogram features.

TODO: Check details of lidar point cloud loop closure

In addition to the loop closure described above, also uses proximity detection to check for loop closure candidates.

## Graph optimisation

Provides three graph optimisation approaches you can choose from: TORO, g20 and GTSAM.

Paper gives a brief comparison, but selects GTSAM as the default method used.

All are doing the exact same thing: optimising over the pose graph to find the best guess for the pose trajectory given the odometry and loop closure constraints.
