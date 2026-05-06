+++
title = "GLIM / hdl_graph_slam"
+++

## Offline SLAM and online localisation

Provided two packages:
- Offline SLAM to build a map: <https://github.com/koide3/hdl_graph_slam>
- Online localisation, which tracks against the map: <https://github.com/koide3/hdl_localization>

## Interactive SLAM

<https://github.com/koide3/interactive_slam>

{{ paper(
doi="10.1109/LRA.2020.3028828",
pdf="glim-interactive.pdf"
)}}

## GLIM and GLIL

Later, followed this up with a new mapping package:
<https://github.com/koide3/glim>

Also replaced the localisation package with GLIL: <https://koide3.github.io/glil_pubdoc/index.html>

This uses a fixed-lag smoother with lidar odometry and alignment against the map, to provide more robust alignment compared to just using an EKF against the prior map.

Unfortunately, it is closed source though.

Relevant papers linked against on the GLIL website:

{{ paper(
doi="10.1109/ICRA46639.2022.9812385",
pdf="glil-1.pdf"
)}}

{{ paper(
doi="10.1109/ICRA57147.2024.10611195",
pdf="glil-2.pdf"
)}}
