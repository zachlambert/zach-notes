+++
title = "ORB-SLAM3"
[extra]
status = "wip"
+++

{{ paper(doi="10.1145/3640115.3640180", pdf="orb-slam-3.pdf") }}

[ORB-SLAM3: An Accurate Open-Source Library for Visual, Visual-Inertial and Multi-Map SLAM](paper.pdf)

Builds on [ORB-SLAM2](../orb-slam-2), but with additions:

- Incorporates inertial measurements
- Improved place recognition system that is more efficient
- ORB-SLAM atlas: allows multi-map SLAM with disconnected maps that later join
- Abstract camera representation: cost function agnostic to camera model - provides implementations for pinhole and fish-eye.

## Visual-inertial SLAM

Each keypoint now also includes:

- Velocity $v$ (in world frame)
- Gyroscope and accelerometer biases $b^g$ and $b^a$, assumed to change with brownian motion

**Pre-integration** is the process of integrating the angular velocity and linear accleration between two frames to estimate the change in position, rotation, linear velocity. (and covariance)

Therefore, defines a _inertial residual_ which is the error between the position, rotation, linear velocity between two frames based off the inertial pre-integration.

In other words: integrate the IMU frames between keypoints to provide another odometry constraint + constraint on the change in linear velocity

Require a special process for properly initialising the IMU state (body velocity, gravity direction and biases).

This IMU residual is used in local bundle adjustment (to estimtae motion between keypoints) and in the global bundle adjustment (after loop closure).
