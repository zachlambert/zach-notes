+++
title = "Tensors"
weight = 2
description = "Overview of tensors and how to use them."
[extra]
status = "wip"
+++

## Defining a vector space

An $n$-dimensional vector space $V$ is defined by a set of $n$ basis vectors $\\{ e_i \\}_i^n$

These vectors are "abstract objects" we can add together and multiply by scalars, such that we can define any other vector as a **linear combination of basis vectors**:

$$
\begin{align*}
x &= x_1e_1 + x_2e_2 + \ldots + x_ne_n \\\\
&= \sum_i^n x_i e_i
\end{align*}
$$

Or, using **enstein notation** where the sums are implicit:
$$
x = x_i e_i
$$

The vector space $V$ is then defined as the set of all possible sums:
$$
V = \left\\{ x_i e_i | x_1 \in \mathbb{R}, \ldots, x_n \in \mathbb{R} \right\\}
$$
{{ vpad() }}

The terms $\\{ x_i \in \mathbb{R} \\}_{i=1}^n$ are called the *vector components* and can be represented concretely by an **array** of numbers:
$$
\left[\begin{matrix}x_1 \\\\ x_2 \\\\ \vdots \\\\ x_n \end{matrix}\right]
$$

Usually we represent vectors as this array and take the basis vectors $e_i$ as implicit, however technically this array has no meaning on it's own. To make it explicit we can denote the basis vector with a subscript:

$$
x = \left[\begin{matrix}x_1 \\\\ x_2 \\\\ \vdots \\\\ x_n \end{matrix}\right]\_{e_i}
$$

{{ aside_begin(label="Some more details on Einstein notation") }}

Whenever we have a term with repeated indices, this implicity defines a sum over the indices.

If there are multiple duplicate indices, then it is summed over all indices:
$$
x = a_{i,j}b_ic_j = \sum_i \sum_j a_{i, j} b_i c_j
$$

If there are indices that only appear once, then these are called **free indices** and aren't summed over:
$$
x_i = a_{i,j}b_j = \sum_j a_{i,j}b_j
$$

We will also define the **kronecker delta function**:
$$
\delta^i_j = \begin{cases}
1 & i = j \\\\
0 & i \neq j
\end{cases}
$$

When present in a sum, it provides useful cancellations:
$$
\delta^i_ja_i = a_j \\\\
\delta^i_jx_iy_j = x_iy_i
$$
{{ aside_end() }}

## Covectors and the dual space

Like a vector space, we can define a **covector space** $U^\star$ by a set of basis covectors $\epsilon^i$ and define any covector as a linear combination of them.

A **covector** $u \in U^\star$ is an object that maps a vector into a scalar. Informally, can think of this as combining a covector and vector together:
$$
u \cdot v = \alpha \quad u \in U^\star, v \in V \alpha \in \mathbb{R}
$$

If we write these out using their basis vectors we get:
$$
u_j\epsilon^j \cdot v^ie_i = (u_jv^i) \epsilon_j \cdot e_i
$$
where we must define the value of $\epsilon_j \cdot e_i$ for each pair of covector/vecotr.

We can define a **dual space** $V^\star$ which is the specific covector space that pairs with a vector space $V$ such that the basis covectors/vectors satisfy:
$$
\epsilon^j \cdot e_i = \delta^j_i
$$

The basis vectors are called the **dual basis vectors** and we can think of them as extracting the vector component for the corresponding vector basis vector:
$$
e_j \cdot \left(x_ie_i\right) = x_j
$$

## Defining conventions going forward

Firstly, every object must be written in einstein notation with subscript/superscripts. For example, instead of just writing a vector $x$, this must be written as $x^ie_i$.

Secondly, we choose to use superscript/subscript notation depending on the type of object:
- Superscript: Basis vectors and covector components.
- Subscript: Basis covectors and vector components.

Therefore, we write:
- Vector = $x^ie_i$
- Covector = $y_i\epsilon^i$

{{ details_begin() }}
This choice is based on whether the objects are **covariant**: transform in the same was as the basis vectors under a change of coordinate system, or **contravariant**: transform under the inverse transform. See the details later in this page.
{{ details_end() }}

In many cases, where the basis vectors/covectors are implicit we can simply write vectors and covectors as $x^i$ and $y_i$ instead. Due to the subscript/superscript convention, we can still tell what type of object they are.

## Linear mappings

A linear map $v = f(u)$ maps from a vector $a \in U$ to a new vector $b \in V$ in a different vector space.

## Defining tensors in general

A tensor of **type** $(p, q)$ is a combination of $p$ vectors and $q$ covectors, and has **order** $(p + q)$.

Concrete examples:
- Scalar: (0, 0)
- Vector: (1, 0)
- Covector: (0, 1)
- Linear mapping matrix: (1, 1)
- Jacobian matrix: (1, 1)
- Hessian matrix: (0, 2)

In normal linear algebra, we treat all order-2 tensors as the same object, however linear mappings and hessians (for example) are actually different types of object, used in different ways.

## Extra: Change of basis

In my definition of a vector space, I started with defining basis vectors.  
The assumption here is that these basis vectors are linearly independent **by definition**.

However, the choice of basis vectors is not unique, you may choose any choice of basis vectors so long as they remain linearly independent.

Let's define a new basis, $\tilde{e}_i$ via the following forwards and backwards transformations:
$$
\tilde{e}_j = F^i_j e_i
\quad
e_j = B^i_j \tilde{e}_i
$$

These two equations must be consistent. Substituting the equation for $\tilde{e}_i$ into the backwards transform, we get:
$$
\begin{align*}
e_j &= B^i_j \tilde{e}_i \\\\
&= B^i_j \left(F^k_i e_k\right) \\\\
&= F^k_i B^i_j e_k
\end{align*}
$$

In order for this to be consistent, we must have:
$$
F^k_i B^i_j = \begin{cases}
1 & j == k \\\\
0 & j \neq k
\end{cases}
\quad= \delta^k_j
$$

A vector $x$ can be represented in either coordinate system as:
$$
x = x^ie_i = \tilde{x}^i\tilde{e}_i
$$
Key points to note:
- I have switched to the super-script $x^i$ for vector components. This is an important convention used in tensor algebra, and will explain the reasoning later.
- The vector $x$ is **invariant** to change of basis, but the vector components themselves are **not**.

We can also transform the corresponding dual vectors.  
TODO: Show how covectors are transformed, as to keep the covector-vector product invariant.

The objects which transform with the forward transform are called **covariant**, and if transforming with the backward transform, **contravariant**.

