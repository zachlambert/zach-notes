+++
title = "Complete SLAM systems"
+++

Any lidar odometry algorithm can be converted into a SLAM algorithm via a "separate backend" that manages keyframes, odometry constraints and loop closure constraints.

However, to improve accuracy, it can be advantageous to have an SLAM algorithm that also manages the odometry, which allows for the following system components:
- The lidar odometry can make use of historic keyframes when revisiting areas, which greatly improves tracking accuracy
- Can re-use the alignment results from lidar odometry for multi-way alignment
- It avoids multiple modules doing point-cloud pre-processing, deskewing etc.

## GLIM

{{ paper(
doi="10.1109/ICRA46639.2022.9812385",
pdf="glim.pdf"
)}}

Key results:
- Performs lidar odometry over a sliding window, with alignment constraints added between the current scan and all keyframes in the sliding window 
- Marginalised poses remain fixed from the point of view of odometry, but are separate sent to the global mapping module
- The global mapping is hierarchical, consisting of a "local mapping" process that optimises over submaps (as pose graphs), and it optimises over the submap poses.
- In both cases, it also retains the imu pre-integration factors and adds alignment constraints between all overlapping point clouds to improve global map consistency.

Other comments:
- Uses surface normals to help eliminate incorrect correspondances with thin walls
- Can optionally use tightly-coupled camera visual constraints as part of the odometry.

Unlike other SLAM methods, there isn't an explicit loop closure mechanism. Instead it automatically creates constraints between submaps that overlap. The drawback is that this requires good initial alignment in order to have correct correspondances between the submaps and give a correct alignment constraint. 

Does it support multi-session usage?
- Doesn't mention this, but could in principle align a new session pose graph with an existing pose graph
- Doesn't make use of the prior map in the lidar odometry 
- Can't update the map for map maintenance

{{ aside_begin(label="Original project") }}

Original repo for offline SLAM: <https://github.com/koide3/hdl_graph_slam>

Online localisation: <https://github.com/koide3/hdl_localization>

Interactive SLAM (user can correct for errors, etc): <https://github.com/koide3/interactive_slam>

{{ paper(
doi="10.1109/LRA.2020.3028828",
pdf="glim-interactive.pdf"
)}}

{{ aside_end()}}

### Localisation system - GLIL

{{ paper(
doi="10.1109/ICRA57147.2024.10611195",
pdf="glil.pdf"
)}}

Provides a localisation package GLIL: <https://koide3.github.io/glil_pubdoc/index.html>

This uses a fixed-lag smoother with lidar odometry and alignment against the map, to provide more robust alignment compared to just using an EKF against the prior map.

Unfortunately, it is closed source though.

## VoxelSLAM

(Submitted on 11 Oct 2024)
{{ paper(
doi="10.48550/arXiv.2410.08935",
pdf="voxel-slam.pdf"
)}}

Builds upon VoxelMap to make it a full localisation system with desciptors loop closure.

Also makes use of historical points, by loading into the local map, which is aligned against during odometry.

## LTA-OM

{{ paper(
doi="10.1002/rob.22337",
pdf="lta-om.pdf"
)}}

Combines FAST-LIO2, STD-LCD descriptor and loop closure for a full SLAM system.

Leverages historical map points to globally constrain the localisation and mapping. 

Supports multi-session operation.
