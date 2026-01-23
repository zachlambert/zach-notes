+++
title = "FAST-LIVO2"
+++

{{ paper(
doi="10.1109/TRO.2024.3502198"
pdf="fast-livo2.pdf"
)}}

# Summary

The tracking component is as follows:
- Uses the same adaptive voxel mapping approach as [Ref 14](../adaptive-voxel-mapping-2022) for the **local map**.
- Synchronises the lidar and visual sensor frames so they are always received together.
- Follows the lidar alignment via a vision-based alignment based off of [Ref 12](../../computer-vision/svo-forster), which minimises is a direct visual odometry method, which aligns against image patches stored in the same voxel grid.
- Uses the standard ESIKF (error-state iterated kalman filter) for the fusion. The lidar and visual odometry are performed as separate update steps (lidar first, then visual)

This tracking approach is done for local maps only, since it is uses a dense/explicit map representation that is unsuitable for the global SLAM problem.

# Rough notes

## Related works


