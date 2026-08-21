+++
title = "Linear system of equations"
weight = 10
[extra]
status = "wip"
+++

We have $n$ scalar variables $x_i \in \mathbb{R}$ and $m$ equations that are linear in $x_i$. Defining the residual $r$ (which we wish to set to zero), this can be written in vector form as:

$$
r = Gx - d
$$

The problem is that these set of equations don't always have a unique solution, we have 3 cases:

- **Constrained**: There is a single $x$ for which $Gx - d = 0$
- **Underconstrained**: There is an _infinite set_ of $x$ for which $Gx - d = 0$
- **Overconstrained**: There is _no_ $x$ for which $Gx - d = 0$

## Solving the set of linear equations

This refers to finding a single solution and only applies when $G$ is square ($m = n$) and full-rank.

For square matrices, I am going to use the notation:

$$
Ax = b
$$

In this case you can use dedicated solvers that solve for $Ax = b$ with the assumption that a unique solution exists.

## Solving the least squares problem

For any overconstrained system, we attempt to minimize the residual, with an optional SPD weighting $\Omega = R^TR$:

$$
\begin{align*}
x^\star &= \argmin_{x} ||Gx - d||\_\Omega \\\\
\end{align*}
$$

Here, I am using terms from state estimation, where:

- The $m$ equations represent linearisations of a set of $m$ non-linear measurement equations
- $G$ is the measurement jacobian
- $d$ is the residual vector
- $x$ is the state vector
- $\Omega$ is the information matrix
- $\Omega = R^TR$ is the upper-triangular cholesky decomposition, where $R$ is the upper-triangular cholesky factor.

Since $\textrm{Dim}(x) < \textrm{Dim}(d)$ typically, this is overconstrained.

Typically, we have a set of $k$ independent measurements, which form "stacked" jacobians and residuals:
$$
G = \left[\begin{matrix}
G_1 \\\\
G_2 \\\\
\vdots \\\\
G_k
\end{matrix}\right]
\quad
d = \left[\begin{matrix}
d_1 \\\\
d_2 \\\\
\vdots \\\\
d_k
\end{matrix}\right]
\quad
\Omega = \left[\begin{matrix}
\Omega_1 & 0 & \cdots & 0 \\\\
0 & \Omega_2 & \cdots & 0 \\\\
\vdots & \vdots & & \vdots \\\\
0 & 0 & \cdots & \Omega_k \\\\
\end{matrix}\right]
$$

Therefore, the objective is:
$$
\begin{align*}
x^\star &= \argmin_{x} \sum_i ||G_ix - d_i||\_{\Omega_i} \\\\
\end{align*}
$$

### Solving with the "normal matrix"

{{ vpad() }}

$$
\begin{align*}
x^\star &= \argmin_x ||Gx - d||\_\Omega \\\\
&= \argmin_{x} \left( x^TG^T\Omega Gx - 2d^T\Omega Gx \right)
\end{align*}
$$

For any quadratic function $x^TAx - 2x^Tb + c$ the minima is at $Ax = b$, so we get:
$$
\begin{align*}
G^T\Omega Gx &= G^T\Omega d \\\\
Ax = b
\end{align*}
$$

The matrix $A = G^T\Omega G \in \mathbb{R}^{n\times n}$ is called the "normal matrix".

Additionally, if using a set of independent "stacked" measurements:
- $A = \sum_i G_i^T\Omega_i G_i$
- $b = \sum_i G_i^T\Omega_i d_i$

Can solve the linear equations $Ax = b$.

### Solving with the "whitened" jacobian and residual

The weighted least squares can be converted into a standard non-weighted least squares via "whitening".

$$
\begin{align*}
x^\star &= \argmin_{x} ||Gx - d||\_W \\\\
&= \argmin_{x} ||R(Gx - d)|| \\\\
&= \argmin_{x} ||\tilde{G}x - \tilde{d}|| \\\\
\end{align*}
$$

for $\tilde{G} = RG \quad \tilde{d} = Rd$

This is only really useful for stacked measurements where:
- $\Omega_i = R_i^TR_i$
- $\tilde{G}_i = R_iG_i$
- $\tilde{d}_i = R_id_i$

With this approach, you can use standard linear solvers that try to minimize $\tilde{G}x - \tilde{d}$ directly and can be more accurate / numerically stable compared to using the normal matrix.

## Minimum norm least squares

# Problem definition

## Standard least squares (LS)

The least squares problem is:

$$
x^\star = \argmin_{x} |Ax - b|
$$

Where:

- State $x \in \mathbb{R}^n$
- Observations $b \in \mathbb{R}^m$
-

## Weighted least squares (WLS)

The weighted least-squares proble is:

$$
\begin{align*}
x^\star &= \argmin_{x} |Ax - b|_W \\\\
&= \argmin_{x} (Ax - b)^TW(Ax - b) \\\\
&= \argmin_{x} (Ax - b)^TW(Ax - b) \\\\
\end{align*}
$$
