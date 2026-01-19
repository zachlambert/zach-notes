+++
title = "ORB-SLAM"
[extra]
status = "wip"
+++

{{ paper(doi="10.1109/TRO.2015.2463671", pdf="orb-slam.pdf") }}

ORB-SLAM (the first version) was produced in 2015 and is pure monocular SLAM system.

## Introduction

Bundle-adjustment (BA) provides good pose estimation and reconstruction _if_:

- There is a strong network of matches
- Good initial guess

For a long time, considered unsuitable for real-time applications (i.e. vSLAM).

vSLAM is distinct form bundle adjustment (or SfM) in that it coninually provides a joint pose/map esitmate online, whereas bundle adjustment is an offline process and only produces the final trajectory/map reconstruction.

Nowadays, know that BA can provide real-time result if it is provided with:

- A set of key scene features (map points) with in a subset of frames (keyframes)
- Minimise the number of keyframes as much as possible
- Well spread set of keyframes observing points with _significant parallex_ (i.e., not all on a single plane/line/etc) and plenty of loop closure constraints. (correspondance between non-adjacent frames)
- Initial estimation of the keyframe poses and point locations, in order for the non-linear optimisation to find the minima

The first real-time applicatoin of BA was:

- [Real time localization and 3D reconstruction - 2006](../real-time-ba)
- [PTAM](../ptam)

Several factors severely limit the application:

- Lack of loop closure
- Inadequaite handling of occlusions
- Low invarance to the viewpoint of the relocalization (?? don't know what this means)

This method builds upon:

- Main ideas of PTAM
- Place recognition work: `D. Galvez-Lopez and J. D. Tard ´ os, “Bags of binary words for fast place recognition in image sequences`
- Scale aware monocular SLAM: `H. Strasdat, J. M. M. Montiel, and A. J. Davison, “Scale drift-aware large scale monocular SLAM`
- Using covisibilityinformation to help for large-scale operation

Main constributions of Orb-SLAM:

- Uses same ORB features for all tasks (tracking, mapping, relocalisatoin, loop closure)
- Real-time operation in large environments, thanks to covisibility graph
- Real-time loop closure based on optimiation of a pose graph called the "essential graph" - built from a spanning tree maintained by the system
- Real-time camera relocalisation with invariance to viewpoint and illumination
- New automatic and robust initialisation procedure
- Survival of the fittest approach to map point and keyframe selection

## Related work

### A: Place recognition

Methods based off image-to-image matching scale better than map-to-image or map methods.

Bag of words approaches (such as FAB-MAP) are guood due to high eficiency.

Another popular method is DBoW2 (binary words) built on FAST descriptor.

This paper uses a similar method to DBoW2 but with ORB features.

### B: Map initialisation

Summarises approaches, presents a new method for doing this robustly.

### C: Monocular SLAM

Keyframe-based methods are better than filtering (EKF) for the same cost. Most representative keyframe-based technique is PTAM.

Original PTAM later had various improvements.

Takes from another paper, the idea of a 7DoF pose graph optimisation, called the essential graph. This allows also for correcting the drifting scale.

## System overview

### Map points and keyframes

A given map feature is stored with:

- 3D position in world coordinate frame
- A viewing direction = average of viewing direction of all frames observed from
- "Representative" ORB descriptor:
  - The feature has a slightly different ORB descriptor as observed in each image
  - Choose one of these to represent the feature (and be used for searching)
  - Selected as the feature which has the minimum hamming distance to the other features
  - Note: Hamming distance because ORB is a 256 bit vector, hamming distance measures difference between two binary sequences
- The min and max distance at which the point can be observed, "based off invariance limits of the ORB features"

Each keyframe stores:

- The camera pose in the world frame
- Camera intrinsics, including focal length and principle point
- All the orb features extracted in the frame, which may or may not be associated with a map point
- Feature positions are undistorted if the camera model has distortion parameters

### Covisibility graph and essential graph

The covisibility graph is defined as:

- Nodes = keyframes
- Edges = between keyframes that shrae observatoins of the same map points (at least 15)
- Edge weight = number of common map ooints

The _essential graph_ has the same nodes as the covisibility graph by **fewer edges** that allows the graph to have a less dense network of edges, hence more efficient.

The essential graph is built incrementally:

- Defines a spanning tree, starting from the initial keyframe
- Each new keyframe connects to the previous keyframe with the most matches
- Any other significant matches are added as loop closure constraints

## Tracking

Extract ORB features.

Find a match between adjacent 2/3 frames.

If last match was successful use a constant velocity model use this to inform the match search. Otherwise use a wider match search.

If tracking is lost, revert to global relocalization via bag-of-words place recognition.

Choose whether or not to add a new frame as a keyframe.

## Loop closing

Select candidates for a new keyframe by looking at similarity between bag-of-words for new keyframe and neighbours in the visibility graph. (which have a minimum number of shared features).

For each candidate, find the **similarity transform** based off the keyframe matches, which is a rigid-body transform with scaling.

## Appendix: comments on similarity transform

When performing loop closure, we treat every node pose as a similarity transform with scale = 1.

A loop closure constraint is a simlarity transform $\textrm{Sim}(3)$ that provides the observed scale drift between two keyframes.

The loop closure optimises over the similarity "delta" $\mathbb{R}^7$ for each keypoint similarity transform.

These scales are defined relative to the world frame, such that after the optimisation:

- All keypoint frames are re-scaled relative to the world frame, such that they have unit scale
- All feature positions are re-scaled accordingly
- Loop closure similarities are re-computed?

This method is a rough approximation to the full BA optiisation, but is more efficient.

Note:

- I don't fully understand the scale aspect, it's not explained particularly well.
- The above is my rough guess at the process.
- If my understanding is accurate, it's essentially also trying to maintain a consistent scaling between frames
- _But_, still doesn't get an absolute scaling
