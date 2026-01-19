+++
title = "SLAM: Voxel-based"
weight = 5
[extra]
status = "wip"
+++

SLAM methods that use voxel-based map representations.

Requires lidar or depth images.

Two approaches:
- Store the global map in a voxel map:
    - Align new frames against the map
    - Update the map with the new frame and pose estimate
- Define a "local map" which is defined as a voxel map:
    - Local map is built from all frames in a given window 
    - Can still create loop closure constraints between keyframes for global pose optimisation

Other SLAM approaches may also use local maps, but a key point here is that the local map is using an explicit representation. Other approches may retain a local map via:
- A set of frames + point clouds, which is an implicit representation
- A set of frames + visual features, which also allows for local bundle adjustment over the local window
