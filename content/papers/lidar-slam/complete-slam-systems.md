+++
title = "Complete SLAM systems"
+++

## VoxelSLAM

{{ paper(
doi="10.48550/arXiv.2410.08935",
pdf="voxel-slam.pdf"
)}}


## GLIM

{{ paper(
doi="10.1109/ICRA46639.2022.9812385",
pdf="glim.pdf"
)}}

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

## Long-term localisation and mapping for large-scale environments

{{ paper(
doi="10.1371/journal.pone.0328169",
pdf="inspection-article.pdf"
)}}

## LTA-OM

{{ paper(
doi="10.1002/rob.22337",
pdf="lta-om.pdf"
)}}
