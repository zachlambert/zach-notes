+++
title = "ORB-SLAM2"
weight = 100
+++

[ORB-SLAM2: an Open-Souce SLAM System for Monocular, Stereo and RGB-D Cameras]

Builds upon original ORB-SLAM but supports stereo observations in order to estimate metric scale.

Released in 2017

## Introduction

With monocular (visual )SLAM, you cannot observe metric depth. It also requires a robust initialisation process, since the initial depth cannot be triangulated from a single view alone.

Finally, monocular SLAM suffers from scale drift and correcting this via loop closure may still fail in certain cases (eg: if performing pure rotations).

By using a stereo or RGB-D camera, all issues are solved and allows for the most robust visual SLAM solution.

Main results:

- First open-source SLAM system for monocular, stere and RGB-D cameras, that supports loop closure and relocalisation
- For RGB-D, shows that their method is better than methods based off ICP or direct (photometric) methods.
- For stereo, also better than state-of-the-art direct stereo SLAM

## Related work

### Stereo SLAM

Based off a previous paper, re-use the idea of treating near and far points differently. For far points their disparity is too small for efficient depth triangulation, so are instead treated as coming from a monocular camera.

Most methods are keyframe based and perform BA (or similar) over the point-pose constraints. With a stereo camera, each "close" feature observation (in both images) provides two constraints for a single stereo camera pose, and thus allows determining the depth by triangulation.

An alterative method is LSD-SLAM which is semi-dense direct approach. Doesn't rely on features so better suited to poorly textured environments, but it's more computationally expensive and accuracy is severely degraded by unmodelled effects like non-lambertian reflectance. (ie: specularity)

Question: What is "direct stereo SLAM"

### RGB-D SLAM

Earlest RGB-D SLAM algorithm was KinectFusion, which:

- Fused depth data from sensor into volumetric dense model (ie: octree)
- Tracked the camera pose using ICP
- No loop closing, always just estimated the current best guess of the volumetric map
- Limited to small workspaces

Subsequent methods were feature-based:

- Frontend computes frame-to-frame motion by feature tracking and ICP
- Backend performs pose-graph optimisation
- Main variation comes from the frontend, such as optimising over photometric and depth error

Recent work "ElasticFusion" uses a surfel-based map. Uses a different method to pose graphs, but is limited to room-scale due to high computational complexity.

ORB-SLAM2 differs in that:

- It uses depth information to "synthesise a stereo coordinate" for extracted features on the image
- Agnostic to RGB-D or stereo
- Unlike other methods the backend uses bundle adjustment rather than pose-graph optimisation
  - Pose graphs only optimise over the frame poses and not the feature positions
  - Feature positions are used to estimate odometry constraints between frames, but do not allow for maintaining consistency of feature positions when observed in more than two images
  - Bundle adjustment on the other hand maintains the feature positions and jointly optimises over the poses and feature positions using the reprojection error in the images, rather than optimising the geometric error of the frame poses

## Relevant details from other sections

### Monocular, close stereo and far stereo keypoints

A stereo keypoint is defined by 3 coordinates:

- $(u_L, v_L, u_R)$
- Contains both coordinates in left image
- Only contains horizontal coordinate in right image
- This is because assuming rectified images and horizontal displacement, the feature will always be in the same vertical coordinate for the right image

Can use stereo block matching (or similar) to find the disparity ($u_R - u_L$) per feature.

For RGB-D images, finds the ORB feature in the RGB image then calculates a stereo keypoint by:

- $(u_L, v_L)$ = feature position in RGB
- $u_R = u_L - \frac{f_xb}{d}$
- Calculates the right-image $u_R$ coordinate based off the depth->disparity calculation
- The baseline $b$ is measured between the structured light projector and infrared camera. (8cm for kinect)
  - Note: Unlike the realsense, the kinect has a single IR camera, and relies on projecting a known structure from the emitter to find disparity
  - For an active (IR) stereo camera like realsense, the baseline would be between the two IR camera isntead

Therefore, both sensors provide stereo keypoints.

A keypoint is defined as _close_ if the depth is less than 40 times the baseline. Otherwise, classified as far.

Far features are only triangulated when supported by multiple views.

Finally, also defined **monocular keypoints** as keypoints in the left image or RGB-D RGB image for which there was no match found / invalid depth.

### Bundle adjustment with monocular and stereo constraints

The re-projection error is different for monocular vs stereo features.

For stereo features, reprojects to a set of 3D coordinates, where the coordinate $u_R$ is calculated as where the feature would appear on the right image with the cooresponding baseline.

Only applies if the stereo feature was observed in both frames of a given keypoint, and therefore has a corresponding $u_R$ for which the re-projection error is calculated for.

### Loop-closing and BA

Unlike the original ORB-SLAM, there is no need to include scaling in the loop closure.

Threfore, the pose graph optimisation is based on rigid-body transformations instead of similarities.

Full BA is still performed _after_ the pose graph optimisation.

To make this efficient, runs BA alongside tracking, local mapping, adding keypoints, etc. If a new loop is detected, will abort the current BA optimisation and perform the loop closure. Then return to BA optimisation.

After BA completes, merges the BA solution with the graph (excluding new frames and points inserted while BA was running). Subsequent frames/points are updated in response to how their parent frames were updated.
