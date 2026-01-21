+++
title = "Manifolds and lie groups"
weight = 2
[extra]
status = "draft"
+++

## Manifolds and $\boxplus$, $\boxminus$ operations

A topological space $\mathcal{M}$ is an $n$-dimensional manifold if it **locally resembles euclidean space $\\R^n$** such that we can define the following functions:
- **Box plus**: $x^\prime = x \boxplus u$
- **Box minus**: $u = x^\prime \boxminus x$

Where $u \in \\R^n$ represents the **tangent vector** (ie: displacement) along the manifold from point $x$ to $x^\prime$.  
The boxplus operation applies a displacement to a given point, the boxminus operation calculates the displacement between two points.

These two functions are consistent, such that: $u = (x \boxplus u) \boxminus x$ and $x^\prime = x \boxplus (x^\prime \boxminus x)$.

To be precise, the vector $u$ belongs to the **tangent space** $u \in \mathcal{T}_x \subset \\R^n$, which is subset of $\\R^n$ for which the mapping is valid. However, for practical purposes, the distinction isn't relevant and can just think of the tangent space as $\\R^n$.

{{ aside_begin(label="Other notation used")}}

Can write $\boxplus_\mathcal{M}$ and $\boxminus_\mathcal{M}$ with the manifold space $\mathcal{M}$ subscript to explicitly denote what manifold it applies to. However it's always implicitly defined by the object you are operating on.

{{ vpad() }}

Might also see the functions:
- $u = {}^\mathcal{M}\Phi_x(x^\prime) = x^\prime \boxminus x$
- $x^\prime = {}^\mathcal{M}\Phi_x^{-1}(u) = x \boxplus u$

The forward mapping ${}^\mathcal{M}\Phi_x(x^\prime)$ maps from $\mathcal{M}$ to $\\R^n$.
The inverse mapping ${}^\mathcal{M}\Phi_x^{-1}(u)$ maps back from $\\R^n$ to $\mathcal{M}$.

Personally I think the $\boxplus$, $\boxminus$ notation is more intuitive, so will stick with that.

{{ aside_end() }}

### Calculus on manifolds

Functions that operate on manifolds can have their jacobians be defined in terms of the tangent vectors.

Define $y = f(x): X \to Y$ for arbitrary manifolds $X$ and $Y$.

The jacobian $\frac{df}{dx}$ is defined as:
$$
\frac{df}{dx} = \lim_{\delta x \to 0}\frac{f(x \boxplus \delta x) \boxminus f(x)}{\delta x}
$$

This is essentially the same as the standard jacobian definition, but generalising to using $\boxplus$ and $\boxminus$ instead of the regular additive $+$, $-$:
$$
\frac{df}{dx} = \lim_{\delta x \to 0}\frac{f(x + x) - f(x)}{\delta x}
$$

Will see more concrete examples of how this is defined for lie groups and rotations/transforms.


## Lie groups

A **lie group** $\mathcal{G}$ is a topological space where:
- Elements can be multiplied together: $X_1 \cdot X_2 = X_3 \quad X_i \in \mathcal{G}$
- Elements can be defined via an exponential mapping: $X = \exp(x^\wedge)$  

The object $x^\wedge \in \mathcal{g}$ belongs to another topological space, called the **lie algebra** $\mathcal{g}$.

The object $x^\wedge$ is generally a matrix (with some constraints) such that $\exp(x^\wedge)$ is the matrix exponential:
$$
X = \exp(x^\wedge) = I + x^\wedge + \frac{1}{2!}\WrapP{x^\wedge}^2 + \ldots
$$

and for all lie groups of interest, this has a closed-form solution.

{{ vpad() }}

The matrix $x^\wedge$ always has a vector form $x \in \mathbb{R}^n$ for an $n$-dimensional lie group, which prompts the following definitions:
- $(\cdot)^\wedge$ converts from the vector form to matrix form, such that $x^\wedge \in \mathcal{g}$.
- $(\cdot)^\vee$ converts from the matrix form to the vector form, such that $\WrapP{x^\wedge}^\vee = x \in \mathbb{R}^n$.

We can also define a logarithm map $x^\wedge = \log(X)$, so to summarise:
- $X = \exp(x^\wedge)$ {{hpad()}} maps from the lie algebra -> lie group
- $x^\wedge = \log(X)\\;$ {{hpad()}} maps from the lie group -> lie algebra

You may also define the functions $\Exp$ and $\Log$ that operate on the vector form $x$, using capitalised names to avoid confusion:
- $X = \Exp(x) = \exp(x^\wedge)\\;\\;$ {{hpad()}} maps from the lie algebra vector -> lie group
- $x = \Log(X) = \WrapP{\log(X)}^\vee$ {{hpad()}} maps from the lie group -> lie algebra vector


### Other lie group properties

The multiplication is **non-commutative**: $X_1 \cdot X_2 \\neq X_2 \cdot X_1$.

There exists an identity object $I$ such that:
- $X \cdot I = X$
- $I \cdot X = X$

For every elements $X \in \mathcal{G}$ there exists an inverse $X^{-1}$ such that:
- $X \cdot X^{-1} = I$
- $X^{-1} \cdot X = I$

The inverses also have the expected exp/log:
- $X^{-1} = \exp(-x^\wedge)$
- $x^\wedge = -\log(X^{-1})$


### Tangent space of lie groups

The tangent space is $\\R^n$ and we can use the $\Exp$ and $\Log$ functions to define $\boxplus$ and $\boxminus$:
- $X^\prime = X \boxplus u = X \cdot \Exp(u)$
- $u = X^\prime \boxminus X = \Log(X^{-1} X^\prime)$

{{ details_begin() }}

Specifically, the above is the **right-hand side** definition.  
May also define a **left-hand side** definition:
- $X^\prime = X \boxplus u = \Exp(u) \cdot X$
- $u = X^\prime \boxminus X = \Log(X^\prime \cdot X^{-1})$

In general, I find the right-hand side easier to work with, so that's the convention I use.

{{ details_end() }}

### The adjoint map

If we have a tangent vector $x$ defined about a point $X$ on the right-hand side, this can be remapped to the left-hand side with:
$$
X \cdot \exp(x^\wedge) = \exp(\tilde{x}^\wedge) \cdot X
$$

The expression for $\tilde{x}$ can be calculated as:
$$
\begin{align*}
\exp(\tilde{x}^\wedge) \cdot X &= X \cdot \exp(x^\wedge) \\\\
\exp(\tilde{x}^\wedge) &= X \cdot \exp(x^\wedge) \cdot X^{-1} \\\\
I + (\tilde{x}^\wedge) + \frac{1}{2}(\tilde{x}^\wedge)^2 + \cdots
&= X \WrapS{I + (x^\wedge) + \frac{1}{2}(x^\wedge)^2 + \cdots} X^{-1} \\\\
&= I + (X x^\wedge X^{-1}) + \frac{1}{2}(X x^\wedge X^{-1})^2 + \cdots
\end{align*}
$$
giving: $\tilde{x}^\wedge = X x^\wedge X^{-1}$

This "sandwiching" operation is called the **adjoint map** $\mathcal{Ad}_X: \mathcal{g} \to \mathcal{g}$
$$
\tilde{x}^\wedge = \mathcal{Ad}_X(x^\wedge) = X x^\wedge X^{-1}
$$

The adjoint mapping function operates on the lie algebra, but it also has a corresponding **matrix form** which acts on the lie algebra vector:
$$
\begin{align*}
\tilde{x}^\wedge &= X x^\wedge X^{-1} \\\\
\tilde{x} &= \bm{Ad}_X x \\\\
\end{align*}
$$
This is denoted with bold-face $\bm{Ad}_X$ to distinguish from the function.

### Other properties of the adjoint map

The adjoint of $X_1 \cdot X_2$ is the commutation of the individual adjoint maps:
$$
\begin{align*}
\mathcal{Ad}\_{X_2}(\mathcal{Ad}\_{X_1}(u)) &= X_2X_1 u X_1^{-1}X_2^{-1} \\\\
&= (X_2 X_1) u (X_2 X_1)^{-1} \\\\
&= \mathcal{Ad}_{X_2X_1}
\end{align*}
$$
And for the matrix form:
$$
\bm{Ad}\_{X_2}\bm{Ad}\_{X_1} = \bm{Ad}\_{X_2X_1}
$$
{{ vpad() }}

The inverse of the adjoint map is the adjoint of the inverse:
$$
\begin{align*}
\mathcal{Ad}\_X^{-1}(\mathcal{Ad}\_X(u)) &= u = X^{-1} (XuX^{-1}) X \\\\
    \mathcal{Ad}\_X^{-1}(u^\prime) &= X^{-1} u^\prime X \\\\
&= \mathcal{Ad}\_{X^{-1}}(u^\prime)
\end{align*}
$$

And for the matrix form:
$$
\WrapP{\bm{Ad}\_X}^{-1} = \bm{Ad}\_{X^{-1}}
$$


## Jacobian of the $\boxplus$ operation

### Jacobian of the lie group exponential map

Define:
$$
\Exp(u + \delta u) = X \cdot \Exp(\delta x)
$$

The vector $\delta u$ represents a perturbation of the argument to exponential map, whereas $\delta x$ represents the perturbation to the result, represented as a right-hand multiplication:

We define the **right-jacobian** $J^R(u)$ informally as the mapping:
$$
\delta x = J^R(u) \delta u
$$
OR more precisely:
$$
J^R(u) = \lim_{\delta u \to 0} \frac{\Exp(-u) \cdot \Exp(u + \delta u)}{\delta u}
$$

Similarly, the **left-jacobian** $J^L(u)$ is defined as:
$$
J^R(u) = \lim_{\delta u \to 0} \frac{\Exp(u + \delta u) \cdot \Exp(u)}{\delta u}
$$

Therefore we have:
$$
\begin{align*}
\Exp(u + \delta u) &= \Exp(u) \cdot \Exp(J^R(u) \delta u) \\\\
                   &= \Exp(J^L(u) \delta u) \Exp(u) \\\\
\end{align*}
$$

Using the adjoint mapping result from earlier, we also see that:
$$
J^L(u) = \bm{Ad}_{\Exp(u)} \cdot J^R(u)
$$

### Jacobian of the $\boxplus$ operation

For $^\prime = x \boxplus u$ we can define two jacobians:
$$
J^\boxplus_x = \frac{dx^\prime}{dx} = \lim_{\delta x \to 0} \frac{\WrapS{(x \boxplus \delta x) \boxplus u}\boxminus\WrapS{x \boxplus u}}{\delta x}
$$
$$
J^\boxplus_u = \frac{dx^\prime}{du} = \lim_{\delta u \to 0} \frac{\WrapS{x \boxplus (u + \delta u)}\boxminus\WrapS{x \boxplus u}}{\delta u}
$$

This is a bit confusing in general, but for lie groups specifically we can calculate these as:

$$
\begin{align*}
X^\prime &= X \cdot \Exp(u) \\\\
X^\prime \cdot \Exp(\delta x^\prime) &= X \cdot \Exp(\delta x) \cdot \Exp(u) \\\\
\delta x^\prime &= \bm{Ad}\_{\Exp(u)}^{-1} \Delta x \\\\
J^\boxplus_x &= \bm{Ad}_{\Exp(u)}^{-1}
\end{align*}
$$

$$
\begin{align*}
X^\prime &= X \cdot \Exp(u) \\\\
X^\prime \cdot \Exp(\delta x^\prime) &= X \cdot \Exp(u + \delta u) \\\\
X^\prime \cdot \Exp(\delta x^\prime) &= X \cdot \Exp(u) \cdot \Exp(J^R u) \\\\
\delta x^\prime &= J^R \delta u \\\\
J^\boxplus_u &= J^R
\end{align*}
$$

so we get:
- $J_x^\boxplus = \bm{Ad}_{\Exp(u)}^{-1}$
- $J_u^\boxplus = J^R$

Again, note that this is all defined in terms of the right-hand side perturbation $\delta x$.  
For the left-hand perturbation, get:
- $J_x^{\boxplus,L} = I$
- $J_u^{\boxplus,L} = J_L = \bm{Ad}_{\Exp(u)} J_R$

{{ details_begin() }}

Still not entirely sure if there is a difference between using the left-hand side or right-hand side in practice.  
The fact that $J_x = I$ for the left-hand side _does_ make it seem appealing, but in general the right-hand side is nicer so I'm personally sticking with that.

{{ details_end() }}
