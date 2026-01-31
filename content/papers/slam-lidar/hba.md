+++
title = "HBA: Hierarchical bundle adjustment"
+++

{{ paper(
doi="10.1109/LRA.2023.3238902",
pdf="hba.pdf"
)}}

Builds upon [BALM](../balm) by splitting the lidar bundle adjustment problem into a hierarchy in order to solve more efficiently. 

Previously, the problem complexity grows with $\mathcal{O}(N^3)$ with the number of keypoint poses. This makes it infeasiable for large maps.

## Approximate method

Bundle adjustment proceeds bottom-up.

At the lowest level, does local bundle adjustment over a small series of poses.

After this, take the first frame as a keyframe and transform all points into the keyframe. This then forms one frame in the higher level BA.

Each local mapping window can be done in parallel, as they don't depend on one-another.

For each BA process, uses adaptive voxel grid to define the plane features to optimise over.

Constructing the voxel grid is slow with too many features. Therefore when merging multiple frames into a keyframe, only points lying on plane features are used.

The bottom-up BA approach accumulates errors between adjacent windows, since it doesn't take into account features observed across windows.

Therefore, there is also a top-down pose graph optimisation process. Each local window BA optimisation gives a binary pose constraint betwee the first and last frames, as well as an overall hessian matrix which defines the edge information matrix.

The PGO uses LM optimisation via GTSAM.

This starts at the top-level edges then proceeds down, doing PGO for each smaller BA window.
