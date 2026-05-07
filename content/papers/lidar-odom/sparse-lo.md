+++
title = "Sparse lidar odometry"
+++

The following papers can be classified as "sparse/indirect lidar odometry".

Key characteristics:
- Rather than using the full point cloud, they filter the input raw point cloud into "feature points"
- They use filter-based approaches to iteratively align against a map and update it (possibly with scan-to-scan alignment at a higher update rate).

Although these methods are "feature-based", they never store explicit plane/edge parameterisations.  
Rather, the "feature points" are a carefully filtered subset of the points that are defined as follows:
- For each point in the input point cloud a "smoothness" parameter is measured.
- For high smoothness, define this point as a planar point
- For low smoothness, define this point as an edge point
- Only keep these plane/edge points, with the idea that these points can give more reliable alignment

Then, when aligning against a reference point cloud, the concept of a point being an plane or edge point helps improve the matching:
- For a plane point, align against a plane defined by the 3 nearest points in the reference point cloud
- For an edge point, align against an edge defined by the 2 nearest points in the reference point cloud

The papers make various adjustments to the exact odometry algorithm, although the most notable distinction is those that add tight IMU coupling.

## LOAM

DOI broken: Citations = 4197 on google scholar
{{ paper(
doi="10.15607/RSS.2014.X.007",
pdf="loam.pdf"
)}}
{{ pdf(title="springer article", file="loam-springer.pdf")}}

{{ details_begin() }}
Improved implementation: <https://github.com/HKUST-Aerial-Robotics/A-LOAM>
{{ details_end() }}

Introduces the idea of indirect lidar odometry (or at least, is one of the earliest papers to do so).

## LeGO-LOAM

Initial work:
{{ paper(
doi="10.1109/IROS.2018.8594299",
pdf="lego-loam.pdf"
)}}

Builds upon LOAM, but uses the same core idea.

## LIO-SAM

{{ paper(
doi="10.1109/IROS45743.2020.9341176"
pdf="lio-sam.pdf"
)}}

Same authors as LeGO-LOAM, but adds tightly-coupled IMU filtering.

## LOAM-Livox

{{ paper(
doi="10.1109/ICRA40945.2020.9197440"
)}}

Adaptation of LOAM to better support small-fov lidars.

## FAST-LIO

{{ paper(
doi="10.1109/LRA.2021.3064227",
pdf="fast-lio.pdf"
)}}

Shares an author with LOAM-Livox, improves the efficiency of the update step and also adds tightly-coupled IMU filtering.
