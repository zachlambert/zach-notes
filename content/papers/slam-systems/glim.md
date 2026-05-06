+++
title = "GLIM / hdl_graph_slam"
+++

## Original work: Offline SLAM and online localisation

Original repo for offline SLAM: <https://github.com/koide3/hdl_graph_slam>

Online localisation: <https://github.com/koide3/hdl_localization>

Interactive SLAM (user can correct for errors, etc): <https://github.com/koide3/interactive_slam>

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

Relevant papers linked against on the GLIM/GLIL website:

### GLIM papers

**Main GLIM paper**
{{ paper(
doi="10.1109/ICRA46639.2022.9812385",
pdf="glim.pdf"
)}}

**Other papers**
{{ paper(
doi="10.1109/LRA.2021.3113043"
)}}

{{ paper(
doi="10.1109/ICRA48506.2021.9560835"
)}}

### GLIL papers

{{ paper(
doi="10.1109/ICRA57147.2024.10611195",
pdf="glil.pdf"
)}}
