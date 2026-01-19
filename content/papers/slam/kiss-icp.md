+++
title = "KISS ICP"
+++

{{ paper(doi="10.1109/LRA.2023.3236571") }}

{{ pdf(title="View paper", file="kiss-icp.pdf" )}}


# Summary

**KISS-ICP: In Defense of Point-to-Point ICP Simple, Accurate, and Robust Registration If Done the Right Way**

This is a pure odometry approach that uses dense mapping of point cloud data only.

The map is represented purely by as a point cloud, but to make this efficient: stores in a voxel grid with a max of $N_{max}$ points per voxel.

Start with an empty map. Whenever a new point cloud is added:

- Register against the existing map (frame-to-map registration) and use this to find the pose of the new frame within this map
- Add the points in the new point cloud into the map, up to $N_{max}$ points. If the voxel already contains this maximum, the new points aren't added into the map.

Details of registration:

- Performs a nearest-neighbour search in the new point cloud and the map
- Uses a "robust kernel" in the cost function, which maps the projection error between correspondances to some other value that is less affected by outliers.

Another important component is point-cloud deskewing:

- Before registration of a new point cloud, assume that the velocity over this interval is the same as the last
- This allows de-skewing the point cloud, but referring each point back to where it would be at the start of the scan

# Rough notes

Modern approaches to represeting maps include:

- Voxel grids
- Triangle meshes
- Surfel representation
- Implicit representation

The voxel grid used here uses hash-map hashed by the voxel 3D index. Other approaches include:

- Octree: Hierarchically subdivide space
- VDBs: Like an octree, but insead of having $2^k$ children per voxel (ie: half the voxel size), have many more. eg: 32x32x32 children for 3D space. The 5-4-3 variant has 32 (2^5) children of top node, then (2^4) then (2^3) and I assume it always stops at this depth. Unlike octrees only some of the children are actually constructed and a bitmask is used to indicate this.
- KD-Tree: Subdivide by one-axis per child and doesn't have to partition into equal regions.
