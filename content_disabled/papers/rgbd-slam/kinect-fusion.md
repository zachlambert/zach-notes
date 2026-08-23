+++
title = "KinectFusion"
[extra]
status = "draft"
+++

{{ paper(doi="10.1109/ISMAR.2011.6092378", pdf="kinect-fusion.pdf") }}

Represents the map by a dense (ie: not octree) TSDF on the GPU.

General method is:
- Build the depth image + normal map for the sensor input
- Align against the existing map to define the pose of the current frame 
- Update the map with the new pose + depth map

Works well for indoor scenes, but won't scale well due to the dense map representation.

It also doesn't do any loop closure, so is likely restricted to short sequences that won't experience significant drift.
