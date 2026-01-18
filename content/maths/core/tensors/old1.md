+++
title = "Tensors"
weight = 2
description = "Overview of tensors and how to use them."
[extra]
status = "wip"
+++

In simple terms, a matrix is a linear mapping from one vector to another.  
However, there are a few subtleties we often gloss over when working with matrices usually.

This is fine generally, but breaks down when going to a _higher order tensor_, which requires first laying out some more foundational concepts. In particular, we can't really generalise the matrix product, and instead define a new **tensor product** definition, which the matrix product is just one example of.

The primary use case for higher-order tensors is multivariate calculus.  
Essentially once you start dealing with functions of vectors and their derivatives, it requires the definition of something higher level than a matrix.

## Prerequisite: Einstein notation

Einstein notation is a way to implicitly represent sums.

For example, instead of writing:
$$
x = \sum_i a_i b_i
$$
we can write:
$$
x = a_i b_i
$$
where because the index $i$ appears twice, it implies ta sum.  
Note: the summation ranges are also implicit.

If there are multiple duplicate indices, then it is summed over all indices:
$$
x = a_{i,j}b_ic_j = \sum_i \sum_j a_{i, j} b_i c_j
$$

If there are indices that only appear once, then these are called **free indices** and aren't summed over:
$$
x_i = a_{i,j}b_j = \sum_i a_{i,j}b_j
$$

There are some extra conventions used for tensor operations specifically, and will show those later.  
(Where $x^i$ and $x_i$ have specific meanings)

## Prerequisite: Kronecker delta

Define the kronecker delta function $\delta_{i,j}$:
$$
\delta_{i,j} = \begin{cases}
1 & i = j \\\\
0 & i \neq j
\end{cases}
$$

When present in a sum, it provides useful cancellations:
$$
\delta_{i,j}a_i = a_j \\\\
\delta_{i,j}x_iy_j = x_iy_i
$$

## Prerequisite: Kronecker product

TODO: Should this be defined here?

## Vector spaces

A vector $x$ is an element of a vector space $V$, which satisfies a number of axioms:
- You can **scale** a vector to make a new vector: $ax = y$
    - And this is composable: $ab(x) = a(bx)$
- You can **add** vectors to make a new vector: $x + y = z$
    - And this is associative: $a + (b + c) = (a + b) + c$
    - And there exists an additive inverse: $x + (-x) = 0$
- The zero vector $0$ is defined such that $x + 0 = x$
- You can multiple by the scalar $1$ without changing the vector $1 \cdot x = x$

Basically these are *abstract objects* that you can add together and multiply by scalars in the expected way.

A vector space of dimension $n$ is defined by $n$ **basis vectors** such that any element in the vector space can be written as a linear combination of the basis vectors:
$$
x = \sum_i^n x_i \cdot e_i
$$
for basis vectors: $e_1, \ldots, e_n$.  
In order to be valid, each basis vector must be linearly indepdendent of the other basis vectors.

Using Einstein notation, can write as $x = x_i e_i$

### Vector components

Formally, vectors must always be written as $x = x_i e_i$ for a set of basis vectors.

The **array** $[x_1, \ldots, x_n]$ is called the **vector components**.

When denoting a vector as an array (as we typically do) the choice of basis vectors is **implicit**.

### Change of basis

Let's say we have $x = x_ie_i$ and want to write this vector with a different set of basis vectors, $x = x^\prime_ie^\prime_i$, which still refers to the same vector $x$.

Each new basis vector can be written using a "forward mapping" $F$:
$$
e^\prime_i = F_{i, j} e_j
$$

This gives:
$$
\begin{align*}
x &= x^\prime_ie^\prime_i \\\\
  &= x^\prime_i \left(F_{i, j}e_j\right) \\\\
  &= \left(F_{i,j}x^\prime_i\right)e_j \\\\
  &= x_j e_j
\end{align*}
$$
where: $x_j = F_{i, j}x^\prime_i$


## Dual vector spaces

A dual vector space $V^\star$ is a set of mappings $\epsilon : V \to \mathbb{R}$ that may a vector in $V$ to a scalar $\mathbb{R}$, written as:
$$
\phi x = a \quad x \in V, \phi \in V^\star, a \in \mathbb{R}
$$

Each element of the dual vector space is called a **dual vector** or **covector**.  
Like the vector space, we can define a basis for the dual space:
$$
\left\\{ \epsilon_i \right\\}_{i=1}^n
$$

There is a special choice of basis vectors called the **dual basis** that satisfies:
$$
\epsilon_j e_i = \delta_{i, j} = \begin{cases}
1 & i=j \\\\
0 & i\neq j
\end{cases}
$$

such that the dual vector $\epsilon_i$ will extract the component $x_i$ along the corresponding vector $e_i$:
$$
x = x_i e_i \\\\
\epsilon_j x = x_j
$$
