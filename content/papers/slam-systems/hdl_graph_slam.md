+++
title = "hdl_graph_slam"
+++

Original project: <https://github.com/koide3/hdl_graph_slam>
- Offline SLAM

Interactive version: <https://github.com/koide3/interactive_slam>
- Allows user to fix map

New SLAM package: <https://github.com/koide3/glim>

Localisation package: <https://github.com/koide3/hdl_localization>
- Tracks against a prebuilt point cloud
- Uses EKF with lidar, optionally with IMU

New localisation package: <https://koide3.github.io/glil_pubdoc/index.html>
- Closed source
- Uses a fixed-lag smoother with alignment against map + lidar odometry to handle moving through unmapped areas
