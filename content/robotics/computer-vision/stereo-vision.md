+++
title = "Stereo vision"
weight = 2
+++

# Epipolar geometry

Terms:
- Point in world frame: $x_w$
- Point in camera frames: $x_l$ and $x_r$ for left and right cameras
- Euclidean transform from world coordinates into camera coordinates: $T_{lw}=T_{wl}^{-1}$ and $T_{rw}=T_{wr}^{-1}$

TODO

# 5 point problem

Nister's algorithm for solving the 5pt problem:
[../../papers/computer-vision/nister-5pt]

# Rectification

# Stereo matching and depth

The depth $z$ of a given pixel in the left camera can be defined as:
$$
z = \frac{bf}{d}
$$
where:
- $f$ is the focal length
- $b$ is the baseline distance between the camera frame origins
- $d$ is the **disparity** = the offset in camera coordinates of the feature in the right image relative to the left image 

The depth and disparity images are typically defined in the left image.

If the left and right images are rectified, the epipolar lines are horizontal which makes feature matching much simpler.

This can be done using a block-matching algorithm:
- For a given pixel in the left image, define a small patch of size $N$ around the pixel.
- Slide a patch of size $N$ across the epipolar line in the right image and find the pixel where the patch in the right image best matches the right image.

The "best match" is defined as the pixel where the SSD (sum of squared differences) or NCC (normalised cross-correlcation) is minimised.

This then allows defining the disparity based on comparing image patches, rather than relying on feature descriptors, and is only possible due to simple horizontal-only epipolar lines.

## Accuracy

The disparity is only accurate if there is a clear minima. If there are texture-less surfaces then there are going to be a range of patches with similar SSD.

Additionally, at further distances, the disparity is smaller and a small error in the disparity gives a larger error in distance. Therefore, stereo vision naturally has a maximum distance at which it is accurate, which increases with a larger stereo baseline.
