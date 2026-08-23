+++
title = "Dense lidar odometry"
+++

Rather than selecting feature points, we can instead align the raw point cloud to the map, albeit typically requiring downsampling.

Then, maintain all points in a global map, which is managed either by an incremental kd-tree (for FAST-LIO2), but more typically a voxel-tree, which is shown to have better performance.

For many papers, this also uses the iterative align-update process. However, some papers instead maintain a sliding window of poses which allows for multi-way registration to improve accuracy and be more robust against temporary registration failures.

## FAST-LIO2

{{ paper(
doi="10.1109/TRO.2022.3141876",
pdf="fast-lio2.pdf"
)}}

Follows from FAST-LIO but replaces it with a "direct" version. Seems to introduce the term "direct lidar odometry".

## Direct lidar odometry

{{ paper(
doi="10.1109/LRA.2022.3142739",
pdf="dlo.pdf"
) }}

Rather than maintaing a single local map, it maintains a series of historic keyframes which define the local map.

Then for each iteration, it rebuilds a KdTree for the local map based off nearby keyframes that overlap the current scan.

From what I can tell, it doesn't actually further optimise these scan poses.

{{ details_begin() }}

I'm not entirely sure what the advantage of using a keyframe-based map is, if you don't further refine the keyframe poses?

My impression is that they claim it improves the perforance, since you can more easily restrict your search to the overlapping keyframes. But couldn't you also just accumulate points in a grid of voxel trees (eg: every 5x5 square), and only search the overlapping trees? 

{{ details_end() }}

## KISS-ICP

{{ paper(
doi="10.1109/LRA.2023.3236571",
pdf="kiss-icp.pdf"
) }}

Maintains a single voxel tree to store the points and iteratively aligns against this and updates it.

Claims it can achieve good performance despite this simple approach (via good algorithm design, such as robust optimisation via an m-estimator).

## VoxelMap

{{ paper(
doi="10.1109/LRA.2022.3187250",
pdf="voxel-map.pdf"
) }}

Uses an "adaptive voxel tree" that stores planes, rather than points. It starts with coarse voxels and only subdivides if a plane cannot be fit in the coarse voxel.

Again, uses an iterative align + update algorithm.

It also estimates the covariance of each normal position/normal as a function of the current pose estimate covariance and point distance, etc. Then it uses this in the alignment optimisation.

{{ details_begin() }}

Probabilistically, this seems incorrect to me.  
You use the state covariance to set the measurement covariance, which is then fed back into the update step?
<br>
If the prior covariance is ignored, then this would be correct I think - but that doesn't seem to be the case?

{{ details_end() }}

## VoxelMap++

{{ paper(
doi="10.1109/LRA.2023.3333736",
pdf="voxel-map++.pdf"
) }}

Makes VoxelMap more efficient by exploiting the fact that the point cluster within each voxel can be updated iteratively without needing to store the actual points.

It also implements plane merging, which merges voxels with co-incident planes, which improves memory usage and alignment efficiency. 

## FAST-LIVO2

{{ paper(
doi="10.1109/TRO.2024.3502198"
pdf="fast-livo2.pdf"
)}}

Extends VoxelMap with image-patch based alignment (as a second update step after the lidar alignment) - semi-direct visual odometry.
