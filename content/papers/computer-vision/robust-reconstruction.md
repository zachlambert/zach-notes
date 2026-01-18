+++
title = "Robust reconstruction"
+++

# Summary

**Robust reconstruction of indoor scenes**

Provides a method of reconstructing scences from a series of RGB-D images.

Starts with **fragment reconstruction**:

- Partition video into small segments of images (eg: k frames).
- Use RGB-D odometry to estimate the trajectory over this short period
- Fuse the range images to obtain a surface mesh for each segment

Visual odom method = ["C. Kerl, J. Sturm Robust odometry estimation for RGB-D cameras"](../kerl-odom-rgbd):

- Optimises over the photometric error between RGB-D images to find the transform
- Uses constant velocity model to define a motion prior

Surface mesh recostruction = ["B. Curless a volumetric method for building complex models from range images"](../volumetric-range)

- Each image defines a signed distance field over the image coordinates. Specifically, it is tesselated to allow interpolation between pixels.
- Multiple images combined into a single voxel grid by a weighted average. For a given image, looks at the voxel centres within the image and interpolates the SDF value within the tesselated mesh at the corresponding point.

Each **fragment** is therefore made up of a dense map built over a small window of images, each aligned frame-to-frame.

These are analogous to submaps used in other robotic mapping systems.

Rather than the mesh or volume, only care about the set of vertices contained within each fragment.

Following this performs **geometric registration**:

- Each fragment is put into a pose graph, with odometry constraints within adjacent fragments
- For any non-adjacent fragments that overlap, perform a registration process. If these are aligned, add a corresponding loop closure constraint.

Has some extra steps to handle erroneous loop closure constraints.
