+++
title = "Core concepts"
weight = 1
[extra]
status = "wip"
+++

## Random variables

Random variables are typically denoted by upper-case letters $X$, $Y$, whereas specific samples/values are denoted by lower-case letters $x$, $y$.

To define what a random variable is, we start with defining a state space $\Omega$ (or sample space) of all the possible values of our random variable:
$$
x \in \Omega
$$

Informally, a probability distribution is defined as the mapping $P(\Omega)$ which maps a **subset** $E \in \Omega$ to a real-valued number in $\mathbb{R}$.

A **random variable** is just the combination of state space and probability distribution, where the random variable $X$ represents the value in $\Omega$ which is drawn according to the probability distribution $P(\Omega)$.

For a discrete state space, we can define a probability **mass** function (PMF) $p(x)$, such that:
$$
P(E) = \sum_{x \in E} p(x)
$$
where we define the probability function: $p: \Omega \to \mathbb{R}$

For a continuous state space, we define a probability **density** function (PDF) $p(x)$ such that:
$$
P(E) = \int_{x \in E} p(x) dx
$$

The PDF is defined as:
$$
p(x) = \lim_{\delta x \to 0} \frac{P(x < X < x + \delta x)}{\delta x}
$$

## Expectation, mean, variance, moments

The **expectation** $\mathbb{E}(f(X))$ of the function $f(X)$ is the value:
$$
\mathbb{E}(f(X)) = \int_x f(x) p(x) dx
$$

The **mean** is defined as $\mu = \mathbb{E}(X)$:
$$
\mathbb{E}(X) = \int_x x p(x) dx
$$

The **variance** is defined as $\sigma^2 = \mathbb{V}(X)$:
$$
\mathbb{V}(X) = \mathbb{E}((X - \mathbb{E}(X))^2) = \int_x (x - \mu)^2 p(x) dx
$$

The **n-th raw moment** is defined as:
$$
\mathbb{E}(X^n) = \int_x x^n p(x) dx
$$
such that the 1st moment is the mean.

The **n-th central moment** is defined as:
$$
\mathbb{E}((X - \mathbb{E}(X))^n) = \int_x (x - \mu)^n p(x) dx
$$
such that the 2nd central moment is the variance.

{{ details_begin() }}
Other specific terms for moments are:
- Skewness = third central moment
- Kurtosis = fourth central moment

These terms are relevant for statistics, but not really relevant in robotics.
{{ details_end() }}

## Vector state spaces

The same idea applies for $x \in \mathbb{R}^n$, where $p(x)$ is defined such that:
$$
P(E) = \int_{x_1} \ldots \int_{x_n} p(x) (dx_1 \cdots dx_n)
$$

TODO: Define more precisely


## Defining distributions for differentiable manifolds

Often we deal with non-euclidean state spaces (eg: rotations), or in general a _differentiable manifold_.

For a manifold $M$ A probability distribution can be defined in the tangent space $\Delta x \in T_xM$ (informally, just $\mathbb{R}^n$) for a given point $x^\star \in M$, such that:
$$
\begin{align*}
\Delta X&\sim p_{x^\star}(\Delta x) \\\\
X &= x^\star \boxplus \Delta X
\end{align*}
$$

In other words, to sample a random variable $x$:
- Draw the local displacement vector $\Delta x$ from a distribution on $\mathbb{R}^n$ defined for this particular point $x^\star$.
- Use the box-plus operation to move along the manifold by this displacement to get the new sample $x$.
