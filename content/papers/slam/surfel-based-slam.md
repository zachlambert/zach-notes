+++
title = "Surfel-based SLAM"
+++

{{ paper(doi="10.15607/RSS.2018.XIV.016", pdf="surfel-based-slam.pdf")}}

# Overview

**Efficient Surfel-Based SLAM using 3D Laser Range Data in Urban Environments**

## Mapping and tracking with surfels

a surfel ("surface vertex") is a small element of a surface. If you have a map made of up of surfels, instead of points, then you actually have surface information.

Each surfel represents a small disc in space, described by it's position, normal and raidius.

Similar to KISS-ICP, this paper implements a pure odometry approach by sequentially:

- Registering the new point cloud to the map
- Updating the map

Each surfel also contains a log-odds value for it's confidence. When a new set of surfels are added to the map:

- If there is a matching surfel in the map, update it to the weighted average of the existing surfel and the new surfel
- Otherwise, add a new surfel

Prune surfels where the log-odds value falls below a threshold.

## Loop closures and pose graph optimisation

Dense mapping and tracking works in an "active map", which spans a finite horizon of past frames.

For all frames/surfels before this, these are defined as the inactive map.

The algorithm also looks for loop closure constraints between the new point cloud and inactive map only.

I assume that pose-graph-optimisation with local maps is done by:

- Between two keyframes, this is where the local map is built
- The odometry via local mapping/tracking (ie: frame-to-map) defines the odometry constraint between the pose at the start and end of this segment
- Optimisation only works on these odometry constraints, doesn't include optimisation of the local map
- Loop closure constraints can also be transformed between constraints between keypoints, even if they are added for a frame in between keyframes

The paper doesn't give the details, although it's likely similar to F2M in rtabmap (although this also dones't give the details).
