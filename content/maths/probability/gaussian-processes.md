+++
title = "Gaussian processes"
weight = 13
[extra]
status = "wip"
+++

## Gaussian processes

Define a gaussian process as $\mathcal{GP}(\mu(t), \Sigma(t, t^\prime))$, from which an entire continuous state trajectory $X(t)$ is drawn from.

The mean function $\mu(t)$ gives the mean of a given state $x(t)$ at time $t$.

The covariance function $\Sigma(t, t^\prime)$ gives the covariance between the states $x(t)$ and $x(t^\prime)$ at times $t$ and $t^\prime$.

## Discretising

Define discretisation points: $t = \\{t_1, \ldots, t_n\\}$ with corresponding states $X = \\{X_1, \ldots, X_n\\}$.

Writing $X$ as a vector $[X_1, \ldots, X_n]^T$, it is distributed with the gaussian:
$$
X \in \mathcal{N}(x; \mu_t, \Sigma_t)
= \mathcal{N}\WrapP{
\Mat{x_1 \\\\ x_2 \\\\ \vdots \\\\ x_n},
\Mat{\mu(t_1) \\\\ \mu(t_2) \\\\ \vdots \\\\ \mu(t_n)},
\Mat{
    \Sigma(t_1, t_1) & \Sigma(t_1, t_2) & \cdots & \Sigma(t_1, t_n )\\\\
    \Sigma(t_2, t_1) & \Sigma(t_2, t_2) & \cdots & \Sigma(t_2, t_n )\\\\
    \vdots & \vdots & & \vdots \\\\
    \Sigma(t_n, t_1) & \Sigma(t_n, t_2) & \cdots & \Sigma(t_n, t_n )\\\\
}
}
$$

I find this also makes the continuous-time case more intuitive, since you can think of taking more and more discretisation points, up to the limit of the continuous space.
