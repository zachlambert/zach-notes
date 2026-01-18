+++
title = "Robust odometry estimation for RGB-D cameras"
+++

# Summary

**Robust Odometry Estimation for RGB-D Cameras, Christian Kerl, Jurgen Sturm, Daniel Cremers**

Optimises the photometric error between adjacent RGB-D images, over the frame-to-frame transform.

This is done as expected: use twist coordinates for transform, use known camera intrinsic matrices, know the depth for a given pixel, etc.

Performs maximum a posteriori (MAP) estimation by optimising over the log-likelihood of the transform and a prior on the transform.

Instead of computing the jacobian by differentation, linearises the error function to implicitly get the jacobiange.

Does this per-pixel. Instead of weighting each pixel equivalently in the optimisation, uses a weight that is a function of the pixel residual (error).

For the motion prior, uses a constant velocity model with some process noise.
