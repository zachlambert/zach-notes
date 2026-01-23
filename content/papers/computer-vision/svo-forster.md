+++
title = "SVO: Fast Semi-Direct Monocular Visual Odometry"
+++

{{ paper(
doi="10.1109/ICRA.2014.6906584",
pdf="svo-forster.pdf"
)}}

## Rough notes

### Introduction

Structure from motion = The algorithm for jointly solving for the motion (ie: trajectory) and structure (ie: features, or some other representation). It is distinct from SLAM in that it explicitly models the structure, typically via a set of feature positions, which are also optimised over, although there is some overlap.

There are two approaches to SfM (structure-from-motion):
- **Feature-based methods**:
  - Extract a sparse set of salient features from the input images.
  - Match features between frames
  - Find initial pose estimates via epipolar geometry (typically over a small window of adjacent frames)
  - To a full optimisation over the poses and features that minimise the reprojection error (ie: the feature point in space maps to where it was observed on each image). Typically with a subset of features/images to make computationally practical.
- **Direct methods**:
  - Directly use the intensity values of the image.
  - The image gradient is used in the frame-to-frame optimisation to find the pose between images.
  - Have been shown to out-perform feature-based methods in terms of robustness in scenes with little texture, camera defocus or motion blur.
  - However, more computationally expensive.

### Related work

Most monocular VO algorithms are based on [PTAM](../slam-visual/ptam)
