+++
title = "Real-time bundle adjustment"
+++

{{ pdf(
  title="Paper: Real time localization and reconstruction",
  url="../pdfs/real-time-ba.pdf"
)}}

- **Title**: Real time localization and reconstruction
- **Date**: 2006
- **Key result**: Provides a real-time method for performing bundle adjustment (and therefore structure-from-motion).

## Introduction

General approach to structure from motion is:

- Interest points detected in an image
- Matched between successive images
- Use RANSAC to robustly estimate the "nominal" transform between successive images (or small subsets of images)
- Perform bundle adjustment over all feature positions and camera poses

Bundle adjustment typically uses Levenberg-Marquardt (LM) to solve the optimisation. The problem is that it is very slow, especially for long sequences.

Requires inversion of a matrix of size equal to the number of parameters, so linear in the number of frames. Since matrix inversion is $\mathcal{O}(n^3)$, this means cubic time complexity!

Also since it is likely non-convex, it requires that the initial guess is close to the true solution.

To speed up this algorithm, need to reduce the number of parameters.

This paper presents an _incremental_ reconstruction and localisation algorithm.

Prior methods have already explored this for BA: only re-optimise over the parameters which have changed.

Can also use kalman filters (where the state = poses and feature positions), but "known to be less accurate".

## Description of incremental algorithm

Assumes camera parametes are known, undistorts images before use.

Feature detection and matching:

- Uses harris corners as the features
- For each feature in one image, select a set of candidate points in the other image over a region of interest
- Evaluate the zero-normalised cross correlation between each pair of interest points
- The pairs with the highest scores are selected and define the correspondances between the images

Sequence initialisation:

- Choose a triplet of frames, where images 1-2, 2-3 and 1-3 all have a sufficient number of correspondances
- Find the transform between 1-3 using the [5-point-algorithm](../../../vision/5-point-algorithm) and RANSAC.
- Images 1 and 3 define the keypoints/correspondances, whereas the intermediate image 2 is just used to evaluate the number of inliers when the features are reprojected into image 2
- [More details here](ref_15.pdf)
- Main take-away point: it can determine the relative transform with _uknown scale_.

Real-time robust pose estimation:

- Have camera poses $C_1, \ldots, C_{i-1}$ for images $I_1, \ldots, I_{i-1}$
- All features observed in these images have had their positions $p_k$ estimated (within their respective image)
- Want to evaluate pose $C_i$ for image $I_i$
- Find correspondances between $I_i$ and $I_{i-1}$ for previously triangulated features (must have been observed in $I_{i-2}$ and $i_{i-1}$)
- Use the [perspective-n-point](../../../vision/perspective-n-point) algorithm to estimate the pose $C_i$:
  - First use a minimal set of 6 points + RANSAC to get an initial guess
  - Then optimise over $C_i$ with a larger set of points via LM
- Can also find the covariance of $C_i$ and represent as an ellipse

Key frame selection and 3D point resconstruction:

- Not every frame is selected as a key-frame. Introduce a new key-frame when the matches with the previous key frame is below a threshold. Also if the uncertainty of the pose estimate is too high.
- When a frame fails this criteria, add the _preceding_ frame which _does_ satisfy this criteria.
- Tracking the camera poses between key-frames allows the initial guess for the triangulated feature positions (within the keyframe frame), but only the features within the keyframe itself will be optimised over during bundle adjustment

Local bundle adjustment:

- When a new key-frame $C_i$ is added, optimise over the last $N$ frames and the feature positions observed within $C_i$ and these last $N$ frames only.

Comparison with global bundle adjustment:

- This section describes how the local bundle adjustment step is carried out, by comparing with the standard global bundle adjustment
- Exploits the sparsity of the cost function jacobian to enable efficient solving of the state increment

## Summary

Basically just standard BA but performs over a finite sequence of $N$ past frames and never performs the full bundle adjustment.

Drawbacks:

- There is no loop closure (or similar global optimisation) so it will drift
- Shares the same property of global BA that the scale is unknown, although this is the case for any monocular camera system
