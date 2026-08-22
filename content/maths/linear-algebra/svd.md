+++
title = "Matrix rank, eigenvalues and SVD"
weight = 2
[extra]
status = "wip"
+++

# Singular value decomposition

For $y = Ax$, $x \in \\R^n$, $y \in \\R^m$ the matrix $A \in \\R^{m\times n}$ can be factorised into the form:
$$
A = U\Sigma V^T
$$
with: $U \in \\R^{m\times m}$, $\Sigma \in \\R^{m\times n}$, $V \in \\R^{n\times n}$

where:
- The columns of $V$ are a set of normalised vectors $v_i$, called the **right singular vectors**
- The columns of $U$ are a set of normalised vectors $u_i$ called the **left singular vectors**
- The diagonal elements of $\Sigma$ are called the **singular values** $\sigma_i$, and the off-diagonal elements are zero.

This factorisation is called the **singular value decomposition** (SVD).

To interpret the SVD, consider writing $x$ and $y$ as linear combinations of the singular vectors:
$$
x_i = \sum_i v_i\alpha_i \quad x = V\alpha \quad \alpha = V^Tx \\\\
y_i = \sum_i u_i\beta_i \quad y = U\beta \quad \beta = U^Tx
$$

Then the components $\alpha_i$ and $\beta_i$ are related by the singular values:
$$
\beta_i = \sigma_i \alpha_i \quad \beta = \Sigma \alpha
$$

The main idea is that:
- $A$ is a mapping between $x$ and $y$ in their original vector spaces
- Each can be remapped to a different coordinate system, defined by the columns of $U$ and $V$
- Under this change in coordinate system, the linear mapping is represented by a purely diagonal matrix $\Sigma$

This helps better understand the properties of the linear mapping $A$, as explored in the next section.

## Matrix rank

The **rank** of a matrix, $rank(A)$ is the number of non-zero singular values.

TODO:
- Left row space and column space
- Right row space and column space
- Idea of remapping y back to x, how many components are retained
- Special case of square matrices, get the eigenvalues and eigenvectors
- Special case of invertible matrices, maximum rank square matrices
- Matrix determinant as the product of singular values, and the  
