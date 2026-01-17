+++
title = "Rotations"
weight = 6
description = "Define rotation matrices, the exponential map and it's jacobian, and how to differentiate rotations."
+++

## Prerequisite: cross-product matrices

For the cross-product $ b = x \times a $ this can be written as $ b = x^\wedge a $

where $x^\wedge$ is the matrix:
$$
x^\wedge = \left[\begin{matrix}
0 & -x_3 & x_2 \\\\
x_3 & 0 & -x_1 \\\\
-x_2 & x_1 & 0
\end{matrix}\right]
$$

This matrix is always **skew-symmetric** ($A^T = -A$), such that for any skew-symmetric matrix $A$ the corresponding cross-product vector is written as:
$$ n = A^\vee $$

These two operators are called:
- **hat** ${(.)}^\wedge: \mathbb{R}^3 \to \mathbb{R}^{3\times 3} $
- **vee** ${(.)}^\vee: \mathbb{R}^{3\times 3} \to \mathbb{R}^3 $

Following the structure of the matrix, it has the following properties:
$$ x^\wedge x = 0 $$
$$ \left(x^\wedge\right)^T = -x^\wedge $$
$$ \left(x^\wedge\right)^2 = xx^T - |x|^2 I $$
$$ \left(x^\wedge\right)^3 = -|x|^2 x^\wedge $$
$$ a^\wedge b^\wedge = ba^T - a^Tb I $$
$$ a^\wedge b^\wedge - b^\wedge a^\wedge = (a \times b)^\wedge = (a^\wedge b)^\wedge $$

## Rodrigues formula and exponential map

For a rotation of angle $ \theta $ about an axis $ n $, this can be described by the **rotation vector** $ \phi = \theta n $.

The corresponding rotation matrix is given by **Rodrigues' formula**:
$$R = I + \frac{\sin\theta}{\theta} \phi^\wedge + \frac{1 - \cos\theta}{\theta^2}(\phi^\wedge)^2 $$
Or in terms of the normalized vector $ n $:
$$R = I + \sin\theta \left(n^\wedge\right) + (1 - \cos\theta)\left(n^\wedge\right)^2 $$

TODO: Diagram of explanation

&nbsp;

This equation is in-fact equal to the **exponential map** of the matrix $\phi^\wedge$:
$$
\begin{align*}
\exp(\phi^\wedge) &= I + \phi^\wedge + \frac{1}{2!}\left(\phi^\wedge\right)^2 + \ldots \\\\
                  &= I \\\\
                  &\quad + \left(n^\wedge\right) \left[\theta - \frac{1}{3!}\theta^3 + \ldots\right]\\\\
                  &\quad+ (n^\wedge)^2 \left[\frac{1}{2!}\theta^2 - \frac{1}{4!}\theta^4 + \ldots\right] \\\\
                  &= I + \left(n^\wedge\right)\sin\theta + \left(n^\wedge\right)^2 (1 - \cos\theta)
\end{align*}
$$
using the [series expansions](https://people.math.sc.edu/girardi/m142/handouts/10staylorpolyseries.pdf) of exp, sin, cos and the result $\left(n^\wedge\right)^3 = -\left(n^\wedge\right)$.
<br>

There is also a corresponding **logarithm map**:
$$
\begin{align*}
\theta &= \cos^{-1}\left(\frac{1}{2}(\textrm{trace}(R) -1)\right) \\\\
\log(R) &=\frac{\theta}{2\sin\theta}\left(R - R^T\right)^\wedge
\end{align*}
$$

Although both exp and log are defined for the matrix $ \phi^\wedge $ it's generally more useful to define them for the rotation vector $ \phi $ itself.  
Therefore, it depends on the context, but the following notation can also be used:
- $R = \exp(\phi) $ instead of $ R = \exp(\phi^\wedge) $
- $\phi = \log(R) $ instead of $ \phi = \left(\log(R)\right)^\vee $

We will also need to define the **jacobian** of this function, but first this requires defining how derivatives are defined for rotations.

## Lie groups and SO(n) / so(n)

An n-dimensional rotation $ R $ belongs to the **special orthogonal group** SO(n).  
This is an example of a **lie group** (pronounced "lee"), with the corresponding **lie algebra** so(n).
- The rotation matrix is an element of the lie group: $ R \in SO(n) $
- The matrix $\phi^\wedge$ is an element of the lie algebra: $ R \in so(n) $
- exp: so(n) -> SO(n) maps from the lie algebra to the lie group
- log: SO(n) -> so(n) maps from the lie group to the lie algebra

I go into more detail [here](lie-groups) and define it more formally, but I think it's more useful to look at the concrete example of rotations first, without worrying about lie groups at all.  

## Differentiating rotations

Firstly, for a rotation vector $\delta \phi$ $ the first-order approximation of $ R $ is:
$$R = I + (\delta\phi)^\wedge$$

## Comparision with 2D rotations

All the above ideas where applied to 3D rotations SO(3).

They also apply to SO(2), but are a bit simpler.  
Instead of having a rotation vector $ \phi $, just have the scalar rotation $\theta$.

&nbsp;

TODO...
