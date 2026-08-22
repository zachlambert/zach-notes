+++
title = "Core concepts"
weight = 1
[extra]
status = "wip"
+++

# Vector space

An n-dimensional vector space is defined by a set of $n$ **basis vectors** $\\{e_i\\}_{i=1}^n$, which can be added together and multiplied by a scalar $\\R$, such that we can form **linear combinations** of basis vectors:
$$
x = x_1 e_1 + x_2 e_2 + \ldots + x_n e_n
$$

The scalar values $\\{x_i\\}_{i=1}^n$ are called the **vector components**.

The vector space $V$ is the set of all possible linear combinations of basis vectors:
$$
V = \WrapC{ \sum_{i=1}^n x_ie_i \\;|\\; x_i \in \\R \\;\forall i }
$$

{{ details_begin() }}

More generally, the scalars can belong to any field $x \in \\mathbb{F}$, such as the complex numbers $\\mathbb{C}$.

However, for all applications I'm interested in, only the real numbers are used, so will focus on this concete case.

{{ details_end() }}

Generally, we can take the basis vector components as implicit, and simply treat the vector as the array of components, denoted by a vertical array:
$$
x = \Mat{x_1\\\\x_2\\\\\vdots\\\\x_n}
$$

When dealing with vectors and matrices only this is fine, but in the [tensors](../tensors) section, it helps to use a different notation to keep things more explicit.

## Coordinate space

In addition to only looking at scalar components, all content here will focus on **coordinate spaces** $\\R^n$ specifically.

Simply put, this formalises the idea that we are using vectors to represent a set of $n$ real numbers $x_i \in \\R$,  
written as the **n-tuple** $(x_1, \ldots, x_n)$.

Each basis vector $e_i$ is an n-tuple with $1$ at index $i$, $0$ elsewhere, such that a linear combination of basis vectors gives us the expected result:
$$
\begin{align*}
(x_1, x_2, \ldots, x_n) &= x_1 (1, 0, \ldots, 0) \\\\
&+ x_2 (0, 1, \ldots, 0) \\\\
&\\;\\;\vdots \\\\
&+ x_n (0, 0, \ldots, 1)
\end{align*}
$$

There are many other types of vector space, but for the vast majority of cases, we are just using vectors to deal with how we do operations on sets of numbers $(x_1, \ldots, x_n)$.

Therefore, we can avoid this generality and simply think of a vector as the set of numbers $\\{x_i\\}_{i=1}^n$, but keeping in mind that this is a specific example of the more general concept of vector spaces.

## Vector norms and inner product

The **$L_p$ norm** of a vector $x \in \\R^n$ is defined as:
$$
|x|_p = \WrapP{\sum_i |x_i|^p}^\frac{1}{p}
$$

Typically, the only ones we care about are:
- $L_1$ norm: $|x|_1 = \sum_i |x_i|$
- $L_2$ norm: $|x|_2 = \sqrt{\sum_i |x_i|^2}$
- $L_\infty$ norm: $|x|_\infty = \max_i |x_i|$

In the vast majority of cases, the norm of a vector is referring to the $L_2$ norm, so if there is no subscript, $|x|$ refers to the $L_2$ norm by default.

Some notation also uses $||x||$ for vectors, to differentiate from the absolute value of a scalar $|x_i|$, but I think using $|x|$ is fine.

The **inner product** of two vectors $x_1$, $x_2$, also known as the **dot product**, is defined as:
$$
x_1 \cdot x_2 = x_1^Tx_2 = \sqrt{\sum_i x_{1,i} x_{2,i}}
$$
and for an angle $\theta$ between the vectors, is equal to:
$$
x_1 \cdot x_2 = |x_1||x_2| \cos\theta
$$

## Weighted norm

You also have the weighted (L2) norm:
$$
|x|_W = \sqrt{x^TWx}
$$
Or more typically written as the squared weighted norm:
$$
|x|_W^2 = x^TWx
$$

Note: $W$ must be a [symmetric positive semi-definite](../symmetric-matrices) matrix.

# Linear mappings

For two vector spaces $x \in X$ and $y \in Y$, a linear mapping $f: X \to Y$ (ie: $y = f(x)$) is any mapping where the components $y_i$ can be written as a linear combination of the components of $x_i$:
$$
\begin{align*}
y_i &= \sum_i A_{i, j} x_j \\\\
y &= A x
\end{align*}
$$

For $X = \\R^n$ and $Y = \\R^m$, we see that the linear mapping is a grid of numbers $A_{i,j}$ with $m$ rows (the $i$ index) and $n$ columns (the $j$ index), called a **matrix** $A \in \\R^{m \times n}$ denoted as:
$$
A = \Mat{
A_{1, 1} & A_{1, 2} & \cdots & A_{1, n} \\\\
A_{2, 1} & A_{2, 2} & \cdots & A_{1, n} \\\\
\vdots & \vdots & & \vdots \\\\
A_{m, 1} & A_{m, 2} & \cdots & A_{m, n} 
}
$$

Furthermore, if you chain together two linear mappings $y = g(f(x))$, for matrices $A$ and $B$ for $f$ and $g$ respectively, the resultant matrix $C$ ($y = Cx$) is given by the matrix product:
$$
\begin{align*}
C_{i, j} &= \sum_k A_{i, k} B_{k, j} \\\\
C &= B A
\end{align*}
$$

{{ aside_begin(label="Derivation") }}

$z = g(y), y = f(x)$
$$
\begin{align*}
z_i &= \sum_k B_{i, k} y_k \\\\
&= \sum_k B_{i, k} \sum_j A_{k, j} a_j \\\\
&= \sum_j \WrapP{\sum_k B_{i, k}A_{k, j}} a_j \\\\
&= \sum_j C_{i, j} a_j \\\\
C_{i, j} &= \sum_k B_{i, k}A_{k, j}
\end{align*}
$$

{{ aside_end() }}

## Identity matrix

The identity matrix $I$ is defined as:
$$
I_{i, j} = \begin{cases}
1 & i = j \\\\
0 & i \neq j
\end{cases}
$$

such that the mapping $y = Ix$ has no change on the vector: $y_i = x_i$.

## Transpose and symmetry

The **transpose** $A^T$ of a matrix is defined as:
$$
(A^T)\_{j,i} = A_{i,j}
$$
and satisfies $(AB)^T$ = $B^TA^T$

A matrix is **symmetric** if $A = A^T$.

A matrix is **skew-symmetric** if $A = -A^T$.

# Subspaces

For a vector space $x \in \\R^n$, a new $m$-dimensional vector space $V$ ($m \leq n$) can be defined as a linear combination of $m$ vectors $x_j$:

$$
V = \WrapC{ \sum_j \alpha_j x_j \\;|\\; \alpha_j \in \\R }
$$

This is an $m$-dimensional subspace of $\\R^n$.

# Row and column spaces

For a mati
