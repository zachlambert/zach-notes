+++
title = "Gaussian Distributions"
weight = 31
description="Introduce the Gaussian distribution, why it's useful, and give some key results."
[extra]
status = "wip"
+++

## The multivariate gaussian

A random variable $X$ following a gaussian distribution with mean $\mu$ and covariance $\Sigma$ has the distribution:
$$
X \sim \mathcal{N}(x; \mu, \Sigma) = 
\frac{1}{\sqrt{(2\pi)^d|\Sigma|}}\exp\left(-\frac{1}{2}\left[(x - \mu)^T\Sigma^{-1}(x - \mu)\right]\right)
$$
for:
- $x \in \mathbb{R}^d$
- $\mu \in \mathbb{R}^d$
- $\Sigma \in S_d^+ = \left\\{A \in \mathbb{R}^{d\times d} | A = A^T, A > 0\right\\}$<br>
ie: Symmetric positive semi-definite matrices of size $d\times d$

The distribution is typically defined by the mean, covariance pair $(\mu, \Sigma)$.

You can also define it via the **canonical parameterisation** $(\eta, \Omega)$:
- $\Omega = \Sigma^{-1}$ is called the **information matrix**
- $\eta = \Sigma^{-1}\mu$ is called the **information vector**

## Manipulating gaussians

### Linear transformations

A linear transformation of gaussian variables remains gaussian:
$$
\begin{align*}
X &\sim \mathcal{N}(\mu_x, \Sigma_x) \\\\
Y &= AX + b \\\\
&\sim \mathcal{N}(\mu_y, \Sigma_y) \quad \mu_y = A\mu_x, \Sigma_y = A\Sigma_x A^T
\end{align*}
$$
where:
- $\mu_y = A\mu_x + b$
- $\Sigma_y = A\Sigma_x A^T$

### Multiplying distributions

The product of a set of gaussian distributions also remains gaussian.  
Note: This is the product of the distributions themselves, we are not multiplying the random variables themselves.
$$
\mathcal{N}(x; \mu, \Sigma) \propto \prod_i \mathcal{N}(x; \mu_i, \Sigma_i)
$$
{{ details_begin() }}
Since we know the distribution remains gaussian, we don't care about the normalisation constant and write $\propto$ instead.
{{ details_end() }}

The resultant distribution $(\mu, \Sigma)$ is defined as:
- $\Sigma^{-1} = \sum_i \left(\Sigma_i^{-1}\right) $
- $\Sigma^{-1}\mu = \sum_i \left(\Sigma_i^{-1}\mu_i\right)$

Or, in terms of the canonical parameterisation:
- $\Omega = \sum_i \Omega_i$
- $\eta = \sum_i \eta_i$


{{ aside_begin(label="Derivation") }}

$$
\begin{align*}
\mathcal{N}(x; \mu, \Sigma) &\propto \prod_i \mathcal{N}(x; \mu_i, \Sigma_i) \\\\
\exp\left(-\frac{1}{2}\left[(x - \mu)^T\Sigma^{-1}(x - \mu)\right]\right)
&\propto \prod_i \exp\left(-\frac{1}{2}\left[(x - \mu_i)^T\Sigma_i^{-1}(x-\mu_i)\right]\right) \\\\
(x - \mu)^T\Sigma^{-1}(x - \mu)
&= \left[\sum_i(x - \mu_i)^T\Sigma_i^{-1}(x-\mu_i)\right] + \textrm{constant} \\\\
x^T\Sigma^{-1}x -2x^T\Sigma^{-1}\mu &= \left[\sum_i x^T\Sigma_i^{-1}x - 2x^T\Sigma_i^{-1}\mu \right] + \textrm{constant} \\\\
x^T\left(\Sigma^{-1}\right)x -2x^T\left(\Sigma^{-1}\mu\right) &= x^T\left(\sum_i\Sigma_i^{-1}\right)x - 2x^T\left(\sum_i\Sigma_i^{-1}\mu_i\right) + \textrm{constant}
\end{align*}
$$

The terms in $(\cdot)$ must match which gives the two equations:
- $\Sigma^{-1} = \sum_i \left(\Sigma_i^{-1}\right)$
- $\Sigma^{-1}\mu = \sum_i \left(\Sigma_i^{-1}\mu_i\right)$

The value of the constant doesn't matter, we were already starting with defining the LHS and RHS as proportional. If you know it has a gaussian distribution, once you solve for the mean and covariance, you know what the normalisation factor must be.

You can probably work through the maths to also explicitly calculate the resultant normalisation factor and show that it is equal to the expected value, but this isn't necessary.

{{ aside_end() }}
