+++
title = "Rotations"
weight = 10
description = "Define rotation matrices, the exponential map and it's jacobian, and how to differentiate rotations."
[extra]
status = "wip"
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

For "normal" variables that can be added together, we define the derivative of a function as follows:
$$
\frac{df}{dx} = \lim_{\delta x \to 0} \frac{f(x + \delta x) - f(x)}{\delta x}
$$

However for rotations, you cannot add them together.  
For this reason, the derivative is defined in terms of the **rotation vector** instead.

Let's say we have a rotation $R$ that depends on a variable $x$, denoted $R = f(x)$.  
If we define $x' = x + \delta x$ which applies a perturbation $\delta x$ to the initial value, we can write the resultant rotation $R'$ in two ways:

$$
\begin{align*}
\textrm{Left multiply: }R' &= \delta R \cdot R = e^{\delta\phi^\wedge} \cdot R \approx (I + \phi^\wedge) R \\\\
\textrm{Right multiply: }R' &= R \cdot \delta R = R \cdot e^{\delta\phi^\wedge} \approx R(I + \phi^\wedge)
\end{align*}
$$

For either choice, the derivative is defined as:
$$
\lim_{\delta x \to 0}\frac{\delta \phi}{\delta x}
$$

Both choices are equally valid, the important point is that you must be **consistent** with this choice. eg: If you evaluate a derivative then numerically integrate an orientation, this must be applied in the same way.

To compare, a normal derivative is calculated as:
- Define $y = f(x)$
- Perturb $x' = x + \delta x$, get $y' = y + \delta y$
- Evaluate the limit of $\frac{\delta y}{\delta x}$

A rotation derivative is calculated as:
- Define $R = f(x)$
- Perturb $x' = x + \delta x$, get $R = \delta R \cdot R$ OR $R \cdot \delta R$
- Define $\delta\phi = \left(\log(\delta R)\right)^\vee$
- Evaluate the limit of $\frac{\delta\phi}{\delta x}$

This result applies in general to any [differentiable manifold](manifolds). The idea is that for any "smooth" object, you can define some mapping that "perturbs" the point by a small vector displacement.

In the case of rotations, we have a choice of applying this perturbation on the left-hand side or right-hand side via the exponential map.

Then the derivative (or **jacobian** $J$) is always defined in terms of how a perturbation in the "input variable" $\delta x$ maps to this manifold perturbation via $\delta y = J \delta x$.

## How to evaluate derivatives in practice

I find the easiest way is to evaluate the limits directly.

Take $\sin(x)$ as an example. The derivative can be evaluated with the following method:
$$
\begin{align*}
y &= \sin(x) \\\\
y + \delta y &= \sin(x + \delta x) \\\\
&= \sin(x) + \cos(x)\delta x \\\\
\delta y &= \cos(x) \delta x \\\\
\frac{\delta y}{\delta x} &= \cos(x) \\\\
\frac{dy}{dx} &= \cos(x)
\end{align*}
$$

The key idea is that since you are taking the limit at the end anyway, only first-order terms need to be retained. In line 3, I have taken the series expansion of $\sin(x + \delta x)$ but not kept the $O(\delta x^2)$ term or higher.

For a rotation, consider rotating a fixed point $y = Rp$.  
With the same approach (using the right-hand derivative):  
$$
\begin{align*}
y &= Rp \\\\
y + \delta y &= R(I + \delta \phi^\wedge) p \\\\
\delta y &= R(I + \delta \phi^\wedge) p - y \\\\
&= R(I + \delta \phi^\wedge) p - Rp \\\\
&= R \delta\phi^\wedge p \\\\
&= -Rp^\wedge \delta\phi \\\\
\frac{dy}{d\phi} &= -Rp^\wedge
\end{align*}
$$

**TODO: Need to first introduce multivariate derivatives (jacobians), only gave scalar example above.**

I have used the result $a^\wedge b = -b^\wedge a$ to convert the matrix $\delta\phi^\wedge$ into the vector form, such that the jacobian matrix can be defined.

This derivative defines the mapping from the perturbation $\delta \phi$ to the change in the rotated point position $\delta y$.  
To make this more concrete, define the angular velocity as $\omega = \frac{d\phi}{dt}$.  
This is using the right-hand multiplication, so defines the "local angular velocity".

Using the chain rule, the velocity of the point $y$ is given by:
$$
\begin{align*}
\frac{dy}{dt} &= \frac{dy}{d\phi} \frac{d\phi}{dt} \\\\
&= -Rp^\wedge \omega \\\\
&= R(\omega \times p)
\end{align*}
$$

The point $p$ is defined in a reference frame rotating at angular velocity $\omega$ and it's velocity in the global frame is equal to $R(\omega \times p)$, or the velocity $\omega \times p$ in the local frame.

## Integrating rotations

## Comparision with 2D rotations

All the above ideas where applied to 3D rotations SO(3).

They also apply to SO(2), but are a bit simpler.  
Instead of having a rotation vector $ \phi $, just have the scalar rotation $\theta$.

&nbsp;

TODO...
