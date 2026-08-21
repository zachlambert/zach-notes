+++
title = "Symmetric and triangular matrices"
weight = 2
[extra]
status = "wip"
+++

## Symmetric and skew-symmetric

Symmetric matrix:

- $A = A^T$
- $A \in \mathbb{S}^n \subset \mathbb{R}^{n\times n}$
- OR $A \in \textrm{Sym}(n)$, more common in differential geometry

Skew-symmetric matrix:

- $A^T = -A$
- $A \in \mathbb{A}^n \subset \mathbb{R}^{n\times n}$ (less common notation)
- OR $A \in \textrm{Skew}(n)$, more common in differential geometry
- OR $A \in \mathfrak{so}(n)$, to explicitly refer to the special orthogonal lie algebra

Any square matrix $A$ can be decomposed as a symmetric and skew-symmetric part:

$$
A = A_\textrm{sym} + A_\textrm{skew}
$$

We always have the result:

$$
x^TAx = x^TA_\textrm{sym}x
$$

{{ aside_begin(label="More results for skew-symmetric matrices")}}

$A_\textrm{skew}x$ is always orthogonal to $x$ such that:

$$
x^TA_\textrm{skew}x = x \cdot (A_\textrm{skew}x) = 0
$$

Explanation:

- $x^TAx$ is scalar, so $(x^TAx)^T = x^TAx$
- For skew-symmetric A, $(x^TAx)^T = -x^TAx$
- Therefore, we must have $x^TAx = -x^TAx$ which requires $x^TAx = 0$
- This must hold for all $x$, so $x^TAx = 0$ must hold for all $x$

{{ aside_end() }}

## Hermetian / self-adjoint matrices

Hermetian is the generalisation of symmetric matrices to complex valued matrices, where $A$ is equal to it's conjugate transpose:
$$
A = A^\star
$$

### Eigendecomposition

All symmetric matrices have an eigenvalue decomposition with:
- Real eigenvalues
- Mutually orthonormal eigenvectors

$A = U\Lambda U^T$

## Positive definite, positive semi-definite, etc...

For a symmetric matrix $A \in \mathbb{R}^{n\times n}$ with eigenvalues $\lambda_i$:

For the expression $x^TAx$:

- **Positive definite (PD)**:
  - $x^TAx > 0 \quad\forall x$
  - Denoted $A \succ 0$
  - Requires $\lambda_i > 0 \quad\forall i$
- **Positive semi-definite (PSD)**:
  - $x^TAx \geq 0 \quad\forall x$
  - Denoted $A \succeq 0$
  - Requires $\lambda_i \geq 0 \quad\forall i$
- **Negative definite (ND)**:
  - $x^TAx > 0 \quad\forall x$
  - Denoted $A \prec 0$
  - Requires $\lambda_i < 0 \quad\forall i$
- **Negative semi-definite (NSD)**:
  - $x^TAx > 0 \quad\forall x$
  - Denoted $A \preceq 0$
  - Requires $\lambda_i \leq 0 \quad\forall i$
- None:
  - $x^TAx$ is both positive and negative for different $x$
  - Has both positive and negative $\lambda_i$

Note, these terms also apply to non-symmetric matrices since $x^TAx = x^TA_\textrm{sym}x$, however you cannot define it via conditiona on the eigenvalues of $A$ since these eigenvalues are complex.

## Symmetric positive definite

The above concepts apply to general symmetric or non-symmetric matrices.

Usually they are applied to symmetric matrices (since the skew-symmetric component has no effect), and this has specific set notation.

- Symmetric: $A \in \mathbb{S}^n$
- Symmetric positive semi-definite: $A \in \mathbb{S}^n_+$
- Symmetric positive definite: $A \in \mathbb{S}^n_{++}$

You also have the acronym SPD for symmetric positive-definite, or SPSD for symmetric positive semi-definite (although less common).

There aren't set notations for general non-symmetric positive definite/semi-definite matrices, other than the PD/PSD acronyms.

## Loewner partial ordering

The notation $A \succ 0$ is actually called **Lowener partial ordering**.

Specifically:

- $A \succeq B \implies (A - B) \in \mathbb{S}^n_+$
- $A \succ B \implies (A - B) \in \mathbb{S}^n_{++}$

## Triangular matrices

Lower-triangular (or left-triangular) matrices only have non-zero elements _below_ the diagonal:
$$
L = \left[\begin{matrix}
L_{11} \\\\
L_{21} & L_{22} \\\\
\cdots \\\\
L_{n1} & L_{n2} & \cdots & L_{nn}
\end{matrix}\right]
$$

Upper-triangular (or right-triangular) matrices only have non-zero elements _above_ the diagonal:
$$
R = \left[\begin{matrix}
R_{11} & R_{12} & \cdots & R_{1n} \\\\
 & & & \cdots \\\\
 & & R_{(n-1)(n-1)} & R_{(n-1)n} \\\\
 & & & R_{nn} \\\\
\end{matrix}\right]
$$

In both cases, the eigenvalues are always exactly the diagonal elements.

## Gram matrices and cholsesky decomposition (LLT and RTR decomposition)

A gram matrix $A$ is defined as any real square matrix that can be formed via:

$$
A = G^TG
$$

Every symmetric positive semi-definite matrix is a gram matrix and vice-versa.

However, there is not a unique decomposition, there is an infinite set of $G$ which produce the same $A$ matrix.

The **Cholsesky decomposition** finds a unique decomposition where $G$ is a lower or upper triangular matrix:

- Lower triangular cholesky decomposition (LLT): $A = LL^T$
- Upper triangular cholesky decomposition (RTR): $A = R^TR$

The matrices L and R are called the lower and upper triangular decompositions respectively.

{{ details_begin() }}

L comes from "lower triangular", R comes "right triangular"

You have a mix of left/right triangular vs lower/upper triangular.

LU uses "lower" and "upper". LLT also uses the same "lower". RTR avoided using U to avoid confusion with LU, so used "right" instead.

{{ details_end() }}

## LDL decomposition (or LDLT for real matrices)

Also known as the Bunch-Kaufman decomposition.

Introduces a diagonal matrix $D$ inside the $LDL^T$ form, can can be related as:

$$
LDL^T = LD^\frac{1}{2}(LD^\frac{1}{2})^T = \tilde{L}\tilde{L}^T
$$

TODO: Explore this more, explain why it's referred to as the "square root free cholsesky decomposition"

## LU decomposition

TODO
