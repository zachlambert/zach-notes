+++
title = "Direct LIO"
+++

Direct lidar-inertial odometry:
- Aligns the point cloud (including downsampled/filtered) directly against the map. 
- Lidar-inertial (assume tightly coupled unless otherwise stated)

## FAST-LIO

{{ paper(
doi="10.1109/LRA.2021.3064227",
pdf="fast-lio.pdf"
)}}

## FAST-LIO2

{{ paper(
doi="10.1109/TRO.2022.3141876",
pdf="fast-lio2.pdf"
)}}

Repo: <https://github.com/hku-mars/FAST_LIO>

NOTE: Also found this repo which extends it to perform SLAM <https://github.com/gisbi-kim/FAST_LIO_SLAM>
