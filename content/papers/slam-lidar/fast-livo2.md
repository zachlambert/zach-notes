+++
title = "FAST-LIVO2"
+++

{{ paper(
doi="10.1109/TRO.2024.3502198"
pdf="fast-livo2.pdf"
)}}

# Summary

Essentially the same idea as [Ref 14](../adaptive-voxel-mapping-2022) but also adds visual odometry as a separate update step after the lidar alignment.

The voxel map is extended to also store images patches, which allows semi-direct visual odometry by optimising the photometric error over these image patches. This is based off prior work from [Ref 12](../../computer-vision/svo-forster).

It still remains a pure odometry algorithm, so is likely unsuitable for large-scale SLAM, so must be extended in some way. For example, use this algorithm to build fragments of the map, which are joined together in a pose graph. But need to see if there are any papers exploring this idea, since I imagine there are lots of complications. 
