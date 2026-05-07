+++
title = "Lidar bundle adjustment"
+++

The core idea of "lidar bundle adjustment" is as follows:
- We define lidar "features" to be planes and lines
- Let's say we have an set of poses and point clouds, with an initial set of pose guesses - ie: what we have in lidar odometry
- Using this, we can create a voxel grid and find correspondances between points that lie in each voxel.
- For each voxel, we can estimate the point distribution covariance and find the eigenvalues, as well as find closed-form solutions for these eigenvalues as a function of the corresponding scan poses.
- Taking planes for example, we can refine the scan poses by trying to minimise the plane eigenvalue for each set of plane features. A similar objective can be defined for lines.
- This defines a non-linear objective function that is purely a function of the scan poses.
- Therefore, we can use a non-linear optimisation to improve the scan alignment, or combine into an existing pose graph.

Although it uses the term "bundle adjustment", this is a **new usage of the term** - usually BA refers to the joint optimisation of camera poses and visual features.

The key differences with the visual case is:
- Unlike visual BA, correspondances between points for each scan aren't found using descriptors, they are found purely based on what points are nearby, so are highly dependent on a good initial estimate.
- We don't jointly optimise over the feature parameters, since these are expressed as a function of the lidar poses. 

I think it's more similar to photometric optimisation in direct visual odometry which also optimises over an objective function on the sensor poses only.

## Original BALM paper

{{ paper(
doi="10.1109/LRA.2021.3062815",
pdf="balm.pdf"
)}}

## BALM 2.0

{{ paper(
doi="10.1109/TRO.2023.3311671",
pdf="balm2.pdf"
)}}

## Hierarchical bundle adjustment

{{ paper(
doi="10.1109/LRA.2023.3238902",
pdf="hba.pdf"
)}}
