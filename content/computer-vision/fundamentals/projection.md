+++
title = "Projection"
weight = 1
status = "WIP"
+++

# Transformations of euclidean geometry

For a point $x \in \\R^n$ in euclidean space, we can define several types of transform $y = f(x)$:

- **Linear**: $y = Ax$
- **Affine**: $y = b + Ax$
- **Homography**: $y = (b + Ax) / (c^Tx)$

A homography transform is also called a **projective transform**.

Furthermore, linear transformations can be subdivided into:
- **Uniform scaling**: $A = sI$
- **Scaling**: $A = \mathrm{diag}(s_1, \ldots, s_n)I$
- **Rotation**: $A = R$ for $R \in \mathrm{SO}(n)$
- **Skew**: Combination of scaling + rotation (any general linear transform)

Affine transforms can also be constrained as:
- **Euclidean**: $y = b + Rx$ = Rotation + offset
- **Similarity**: $y = b + sRx$ = Uniform scaling + euclidean

# Representing with homogeneous coordinates

All the above transforms can be represented using homogeneous coordinates.

Define a homogeneous vector $\tilde{x}$ as:
$$
\tilde{x} = \\Mat{sx \\\\ s}
$$
such that for a given homogeneous vector $\tilde{x} = \\Mat{v & s}^T$, the euclidean vector $x$ is extracted as $x = v / s$.

A linear transform $\tilde{y} = P\tilde{x}$ can represent any homography transform:

Linear:
$$
P = \\Mat{A & 0 \\\\ 0^T & 1}
$$

Affine:
$$
P = \\Mat{A & b \\\\ 0^T & 1}
$$

Homography:
$$
P = \\Mat{A & b \\\\ c^T & 1}
$$

# Projective transformation

A point $x_w$ in world space is transformed to camera space $x_c$ via:
$$
\tilde{x}_c = T_{cw} \tilde{x}_w
$$

For a 3D point in camera space, this can be projected into **camera coordinates** $w = [u, v]$ via:
$$
\begin{align*}
\tilde{w} &=
\\Mat{ k_u & & u_0 \\\\ & k_v & v_0 \\\\ & & 1}
\\Mat{ f & & & 0 \\\\ & f & & 0 \\\\ & & 1 & 0}
\tilde{x}_c \\\\
&=
\\Mat{ \alpha_u & & u_0 & 0 \\\\ & \alpha_v & v_0 & 0 \\\\ & & 1 & 0}
\tilde{x}_c \\\\
&= K\tilde{x}_c
\end{align*}
$$

Where:
- $f$ is the focal length, representing a plane at distance $f$ the image is projected onto
- $k_u$ is the scaling from focal plane X coordinate to the $u$ pixel coordinate
- $k_v$ is the scaling from focal plane Y coordinate to the $v$ pixel coordinate
- $u_0$ and $v_0$ are the origin of camera coordinates for the zero-point on the focal plane
- $alpha_u$ and $\alpha_v$ are the product of the scalings $k_u$ and $k_v$

It is impossible to separate out $f$ from $k_u$ / $k_v$, so only $\alpha_u$ and $\alpha_v$ are relevant.

The expressions for $u$ and $v$ are:
$$
\begin{align*}
u &= u_0 + \alpha_u \frac{x_c}{z_c} \\\\
v &= v_0 + \alpha_v \frac{y_c}{z_c}
\end{align*}
$$

The matrix $K$ represents the transform from camera-space point $x_c$ to the camera coordinates $w$ and is defined by the **intrinsic parameters** (or just intrinsics) of the camera: $\alpha_u$, $\alpha_v$, $u_0$, $v_0$.

The **extrinsic parameters** refer to the pose of the camera in space $R_{wc}$, which then informs how a point in world space $x_w$ is transformed to the camera coordinate with:
$$
\tilde{w} = KT_{wc}^{-1}\tilde{x}_w$
$$

Note: Usually the extrinsics refer to one of two things:
- The pose between the left and right cameras in a stereo camera
- The pose of the camera relative to the origin of a robot / sensor set, if combining the camera with other sensor data from sensors at different points on the assembly.

# Non-linear distortion

For real cameras, there are distortion affects that cannot be represented by a homography transform.
