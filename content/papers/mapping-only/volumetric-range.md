+++
title = "Volumetric method for building models from range images"
+++

**A volumetric method for building complex models from range images**

## Previous work

Prior methods have proceeded in two directions:

- Reconstruction from unorganised points
- Reconstruction that explots the underlying structure of the acquired data

Can further be separated dependin on if they reconstruct parametric surfaces or an implicit function.

Assumption about unorganised points algorithm = do not make assumption about connectivity of points. In many cases, you have no information about connectivity so this is the only possible method.

Example methods:

- Delaunay triangulation of a set of points in 3D space
- Other parametric descriptions of the geometry built from 3D points
- Generate signed distance function (implicit description) then extract surfaces.

Unorganised point methods discard useful information such as surface normals and reliability estimates. As a result, are well behaved in smooth regions of surfaces, but not robust with high curvature.

Parametric approaches with structured data:

- Mostly work in the "polygonal domain"

## Volumetric integration

The geometry representation is given by a signed distance function $D(x)$ and weighting $W(x)$ over 3D space $x \in X = \mathbb{R}^3$.

Both functions are represented by a voxel grid, where values of the function are associated with the voxel centre points.

Each image $i$ has a SDF $d_i(x)$ and $w_i(x)$ which are combined together to form the $D(x)$ and $W(x)$ by a simple weighted average.

The SDF for a given RGB-D image is defined as follows:

- Tesselate each range image by constructing triangles from nearest neighbours
- Where there are discontinuities in the depth map, it avoid tesselation
- For each voxel centre visible within the image, find the projection on the RGB-D image and which triangle it lies in.
- The returned signed distance is linearly interpolated over the triangle vertices.

The paper doesn't mention how the RGB-D images are tracked frame-to-frame and focuses purely on the mapping part. However, it does mention that an estimate of the tracking error is useful to inform what the weighting for a particular image should be.

Once the full SDF is defined over all images, it is converted to a mesh by finding the crossing points.

## Hole filling

Instead of operating on the reconstructed mesh, it operates on the volume.

Goes into detail in paper...
