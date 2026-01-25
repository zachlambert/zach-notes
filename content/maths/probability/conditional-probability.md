+++
title = "Conditional probability and inference"
weight = 2
[extra]
status = "wip"
+++

## Conditional probability

For two random variables $X$ and $Y$, the **joint distribution** is defined as:
$$
(X, Y) \sim p(x, y)
$$

The individual distributions $p_X(x)$ and $p_Y(y)$ are called the **marginal distributions** and can be found by the **marginalisation** process:
$$
p_X(x) = \int_y p(x, y) dy \\\\
p_Y(y) = \int_x p(x, y) dx
$$

We define the **conditional probability p(y|x)** as:
$$
p(y|x) = \frac{p(x, y)}{p(x)}
$$
and also have the result:
$$
p(x, y) = p(y | x)p(x)
$$

The conditional probabilities $p(x|y)$ and $p(y|x)$ can be related via:
$$
p(y|x) = \frac{p(x,y)}{p(x)} = \frac{p(x|y)p(y)}{p(x)}
$$
and this is the well-known **Bayes' theorem**

## Independent variables

Variables $X$ and $Y$ are **independent** if:
$$
p(x,y) = p(x)p(y)
$$
and therefore:
- $p(x|y) = p(x)$
- $p(y|x) = p(y)$

Variables $X$ and $Y$ are **conditionally independent** on variable $Z$ if:
$$
p(x,y|z) = p(x|z)p(y|z)
$$
and therefore:
- $p(x|y,z) = p(x|z)$
- $p(y|x,z) = p(y|z)$

Conditional independence is a key result for [graphical probability models](../probability-models), since it allows you to drop terms from the conditional probability functions.

## Entropy and mutual information

The (differential) entropy $h(X)$ is the function:
$$
h(X) = \int_x p(x)\ln\frac{1}{p(x)} dx
$$

{{ details_begin() }}

The choice of base for $\log$ changes the units, and varies based on the context. eg: Typically base-2 for cryptography.  

However, often we are just using this concept to illustrate certain ideas/relations, so the units don't matter. Can just use the natural log since that's easier to work with.

{{ details_end() }}

The entropy captures the **uncertainty** in a random variable $X$:
- As $p(x) \to \delta(x)$, $h(X) \to -\infty$
- As $p(x) \to $ uniform over $x \in X$, $h(x) \to \infty$

It is a relative term, you can only measure the relative entropy between distributions.
{{ details_begin() }}
For the discrete entropy $H(X)$ on the other hand, this always satisfies $H(X) \geq 0$.  
You get $H(X) = 0$ for $p(x) = \delta(x)$, the discrete delta function.
{{ details_end() }}

For a concrete example, the entropy of a gaussian distribution is:
$$
h(X) = \frac{1}{2}\ln(2\pi\sigma^2)
$$
so as the gaussian becomes more concentrated and $\sigma$ approaches zero, the entropy tends to $-\infty$.

TODO: Conditional entropy and mutual information, use this to illustrate the idea of conditional probability describing how the observation of one variable can give information about another.

# Bayesian inference

Bayesian inference is the concept of using conditional probability to make inferences.

Have a variable $X$ we wish to estimate and an observation $Y$.

The **prior distribution** $p(x)$ represents the knowledge of $X$ prior to observing $Y$. 

The **likelihood** $p(y|x)$ is the likelihood of observing $y$ for a given $x$.

The **posterior distribution** $p(x|y)$ represents the knowledge of $x$ after observing $y$ as is defined as:
$$
p(x|y) \propto p(y|x)p(x)
$$
- Equal to the product of the prior distribution and likelihood distribution
- Don't care about the normalisation factor usually

Often we deal with log-probabilities (eg: the **log-likelihood** $lnp(y|x)$) giving:
$$
lnp(x|y) = lnp(x) + lnp(y|x) + c
$$

The use case of this is to find an **estimate** for the value of $x$.

The **maximum a-priori estimate** (prior estimate) is:
$$
\begin{align*}
x^\star &= \argmax_x p(x) \\\\
&= \argmax_x \ln p(x)
\end{align*}
$$

The **maximum likelihood estimate** (ML estimate) is:
$$
\begin{align*}
x^\star &= \argmax_x p(y|x) \\\\
&= \argmax_x \ln p(y|x)
\end{align*}
$$

The **maximum a posteriori estimate** (MAP estimate) is:
$$
\begin{align*}
x^\star &= \argmax_x p(x|y) \\\\
&= \argmax_x p(y|x)p(x) \\\\
&= \argmax_x \ln p(y|x) + \ln p(x)
\end{align*}
$$

{{ details_begin() }}

In both cases the maximisation can be done over the log-probabilities instead since $\ln(\cdot)$ is a monotonic function and doesn't change the maximisation result.

{{ details_end() }}

Estimation should always use the MAP estimate. If there is no prior information, then this collapses to the ML estimate since $p(x)$ is constant and doesn't affect the maximisation.
