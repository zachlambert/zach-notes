+++
title = "Real-time reconstruction"
+++

{{ paper(
doi="10.1109/CVPR.2006.236",
pdf="real-time-reconstruction.pdf"
)}}

# Rough notes

## Introduction

Existing reconstruction approaches can be split into:
- Visual odometry: Doesn't perform global optimisation, only track the current pose against a feature map, so will drift over time
- Filter-based SLAM: Only works for small number of parameters due to complexity growing with $\mathcal{O}(n^3)$ with number of features.
- Sparse SfM: Perform the global bundle adjustment with sparse Levenberg-Marquardt, which is $\mathcal{O(n)}$ with number of poses $n$ by exploiting the sparseness of the problem. However even with this trick, still becomes computationally expensive with large sequences. 

Another drawback of bundle adjustment is that it requires a good initial estimate to converge to the local minima.

This paper takes the offline bundle adjustment approach and adjusts it to make it incremental and able to run in real-time.

## Description of the incremental algorithm

Interest points detection and matching:
- For each keypoint in image 1, find a set of candidate matches in image 2
- Find the match with the best zero-normalised cross correlation 
- Use the set of keypoint matches with the best scores to define the feature matches between frames

Sequence initialisation:
- First image = keyframe 1
- Second image = as far as possible from image 1, but with at least M matches
- Third image = as far as possible from image 2, but with at least M matches, and M' matches with image1
- Use image1 pose as the global coordinate system origin
- Use 5-point algorithm and RANSAC to initialise the first 3 poses and feature points
- Use LM optimisation to further refine the initialisation

Real-time robust pose estimation:
- Have a new image $I_i$
- Have camera poses $C_{i-2}, C_{i-1}$ and wish to estimate the new camera pose $C_i$
- Find matched points which are observed in $I_{i-1}$ and $I_{i-2}$ such that their positions are known
- Use Grunert's pose estimation to find the pose $C_i$ that minimises the reprojection error of the feature points in image $I_i$
- Further refine with LM optimisation over the 3D pose only (6 parameters)
- Can find the covariance of the pose estimate via the inverse of the hessian (?? - see later for details)

Key frames selection and 3D points reconstruction:
- Always estimate the pose of a new image, along with it's covariance
- Add a keyframe only when the number of matches fall below a threshold $M$ or the covariance is too large

Local bundle adjustment:
- Optimise over the last $n$ camera poses only $\\{ c_{i-n+1}, \ldots, C_i\\}$
- Optimise over all features appearing in these frames
- Calculate the re-projection error over $N$ images = all images where the features are observed. Have $N > n$, so there are some images where we are calculating the re-projection error, but keeping their poses fixed.
- At the start of the sequence, can optimise over all images/cameras. When the number of images exceeds some threshold $N_f$, set $n = N_f$.

### Comparision with global bundle adjustment

Define camera poses $c_i$ and feature points $f_i$, such that the optimisation $J^T\Sigma^{-1}J\delta x = J^T\Sigma^{-1}e$ has the structure:
$$
\Mat{U & W \\\\ W^T & V}\Mat{\delta c \\\\ \delta f} = \Mat{e_1 \\\\ e_2}
$$

The hessian matrix $\Mat{u & W \\\\ W^T & V}$ gives the information matrix for the state, such that we recover the full covariance with the inverse.

Since the matrix $V$ is diagonal, it can be inverted in linear time. By exploiting this fact and doing some re-arranging, can solve the problem more efficiently:

Step 1: Solve for $\delta c$, only requiring inverting $V$
$$
(U - WV^{-1}W^T) \delta c = e_1 - WV^{-1}e_2
$$

Step 2: Calculate the corresponding $\delta f$
$$
\delta f = V^{-1}(e_2 - w^T)\delta c
$$

Define $n$ = number of camera poses, $m$ = number of features, $N$ = number of re-projection terms (size of error function).

Complexity of different stages are:
- Evaluating $J^TJ$: $\mathcal{O}(mN)$
- Evaluating $WV_{-1}W^T$: $\mathcal{O}(mn^2)$
- Solving for $\delta c$: $O(n^3)$

Overall complexity: $O(mN + mn^2 + n^3)$:
- Linear in the number of features (cubic for naive non-sparse implementation)
- Linear in the number of re-projection error terms
- Cubic in the number of camera poses

Compared to the global bundle adjustment, the biggest time save is by reducing the number of camera poses which are optimised over. The number of features used can be kept at the maximum (all that are observed in the selected cameras).

### Summary

Initialise the first 3 keyframes with a triplet of images with significant matches between them, but far enough to triangulate the features accurately.

For each new image, triangulate against the previous 2 keyframes and estimate the uncertainty. Create a new keyframe if the number of matches falls below a threshold or the uncertainty exceeds a threshold.

Additionally, whenever a new keyframe is added, refine the estimate of the last $n$ camera poses and all feature positions observed in these images. By reducing the size $n$ of this local window, the optimisation run-time is massively reduced.
