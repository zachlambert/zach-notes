+++
title = "Gaussian distributions"
weight = 10
description="Introduce the Gaussian distribution, why it's useful, and give some key results."
[extra]
status = "wip"
+++

## The multivariate gaussian

A random variable $X$ following a gaussian distribution with mean $\mu$ and covariance $\Sigma$ has the distribution:
$$
X \sim \mathcal{N}(x; \mu, \Sigma) =
\frac{1}{\sqrt{(2\pi)^d|\Sigma|}}\exp\WrapS{
    -\frac{1}{2} (x - \mu)^T\Sigma^{-1}(x - \mu)
}
$$
for:
- $x \in \\R^d$
- $\mu \in \\R^d$
- $\Sigma \in S_d^+ = \left\\{A \in \\R^{d\times d} | A = A^T, A > 0\right\\}$<br>
ie: Symmetric positive semi-definite matrices of size $d\times d$

The distribution is typically defined by the mean, covariance pair $(\mu, \Sigma)$.

You can also define it via the **information form** $(\eta, \Omega)$:
- $\Omega = \Sigma^{-1}$ is called the **information matrix**
- $\eta = \Sigma^{-1}\mu$ is called the **information vector**

**NOTE**: The term $\bm{x;}$ in $\mathcal{N}(\bm{x;}\\; \mu, \Sigma)$ simply states that the variable $x$ is being used to denote the state value. It's optional, but I like to include it when it makes things clearer.

## Manipulating gaussians

### Linear transformations

A linear transformation of gaussian variables remains gaussian:
$$
\begin{align*}
X &\sim \mathcal{N}(\mu_x, \Sigma_x) \\\\
Y &= AX + b \\\\
&\sim \mathcal{N}(\mu_y, \Sigma_y)
\end{align*}
$$
where:
- $\mu_y = A\mu_x + b$
- $\Sigma_y = A\Sigma_x A^T$

### Normalised product of gaussians

The product of a set of gaussian distributions also remains gaussian.  
Note: This is the product of the distributions themselves, we are not multiplying the random variables themselves.
$$
\mathcal{N}(x; \mu, \Sigma) \propto \prod_i \mathcal{N}(x; \mu_i, \Sigma_i)
$$
{{ details_begin() }}
Since we know the distribution remains gaussian, we don't care about the normalisation constant and write $\propto$ instead.
{{ details_end() }}

The resultant distribution $(\mu, \Sigma)$ is defined as:
- $\Sigma^{-1} = \sum_i \WrapP{\Sigma_i^{-1}} $
- $\Sigma^{-1}\mu = \sum_i \WrapP{\Sigma_i^{-1}\mu_i}$

Or, in the information form:
- $\Omega = \sum_i \Omega_i$
- $\eta = \sum_i \eta_i$


{{ aside_begin(label="Derivation") }}

$$
\begin{align*}
\mathcal{N}(x; \mu, \Sigma)
&\propto
\prod_i \mathcal{N}(x; \mu_i, \Sigma_i)
\\\\
\exp\WrapP{-\frac{1}{2}\WrapS{(x - \mu)^T\Sigma^{-1}(x - \mu)}}
&\propto
\prod_i \exp\WrapP{-\frac{1}{2}\WrapS{(x - \mu_i)^T\Sigma_i^{-1}(x-\mu_i)}}
\\\\
(x - \mu)^T\Sigma^{-1}(x - \mu)
&=
\WrapS{\sum_i(x - \mu_i)^T\Sigma_i^{-1}(x-\mu_i)} + \textrm{constant}
\\\\
x^T\Sigma^{-1}x -2x^T\Sigma^{-1}\mu
&=
\WrapS{\sum_i x^T\Sigma_i^{-1}x - 2x^T\Sigma_i^{-1}\mu } + \textrm{constant}
\\\\
x^T\WrapP{\Sigma^{-1}}x -2x^T\WrapP{\Sigma^{-1}\mu} &= x^T\WrapP{\sum_i\Sigma_i^{-1}}x - 2x^T\WrapP{\sum_i\Sigma_i^{-1}\mu_i} + \textrm{constant}
\end{align*}
$$

The terms in $(\cdot)$ must match which gives the two equations:
- $\Sigma^{-1} = \sum_i \WrapP{\Sigma_i^{-1}}$
- $\Sigma^{-1}\mu = \sum_i \WrapP{\Sigma_i^{-1}\mu_i}$

The value of the constant doesn't matter, we were already starting with defining the LHS and RHS as proportional. If you know it has a gaussian distribution, once you solve for the mean and covariance, you know what the normalisation factor must be.

You can probably work through the maths to also explicitly calculate the resultant normalisation factor and show that it is equal to the expected value, but this isn't necessary.

{{ aside_end() }}

## Joint distributions

Start with a gaussian distribution on $X = [X_1, X_2]^T$:
$$
X = \Mat{X_1 \\\\ X_2}
\sim
\mathcal{N}\WrapP{
    \Mat{\mu_1 \\\\ \mu_2},
    \Mat{\Sigma_1 & \Sigma_{1,2} \\\\ \Sigma_{1,2}^T & \Sigma_2}
}
$$

This gives: $p(x_1, x_2) = \mathcal{N}\WrapP{
    \Mat{x_1 \\\\ x_2};
    \Mat{\mu_1 \\\\ \mu_2},
    \Mat{\Sigma_1 & \Sigma_{1,2} \\\\ \Sigma_{1,2}^T & \Sigma_2}
}
$

### Finding the marginal distributions $p(x_1)$, $p(x_2)$

The marginal distribution $p(x_1)$ is defined per usual as:
$$
p(x_1) = \int_{x_2} p(x_1, x_2) dx_2
$$
This actually just extracts the relevant components in the original distribution:
- $p(x_1) = \mathcal{N}(\mu_1, \Sigma_1)$
- $p(x_2) = \mathcal{N}(\mu_2, \Sigma_2)$


### Finding the marginal distributions with the information form

$$
\eta = \Mat{\eta_1 \\\\ \eta_2}
\quad
\Omega = \Mat{\Omega_1 & \Omega_{1,2} \\\\ \Omega_{1,2}^T & \Omega_2}
$$
Let's denote the marginalised distributions as:
$$
(\eta_1^\prime, \Omega_1^\prime) \quad (\eta_2^\prime, \Omega_2^\prime)
$$
where $(\cdot)^\prime$ is used to avoid confusion with the original distribution, since $\Omega_1 \neq \Omega_1^\prime$.
The expressions for these are:
- $\eta_1^\prime = \eta_1 - \Omega_{1,2}\Omega_2^{-1}\eta_2$
- $\Omega_1^\prime = \Omega_1 - \Omega_{1,2}\Omega_2^{-1}\Omega_{1,2}^T$

(and vice-versa for $\eta_2^\prime$, $\Omega_2^\prime$)

### Finding the conditional distribution $p(x_2 | x_1)$

The conditional probability $p(x_2 | x_1)$ must satisfy $p(x_1, x_2) = p(x_1) p(x_2 | x_1)$ and comes out as:
$$
p(x_2 | x_1) = \mathcal{N}(x_2; \mu_{2|1}, \Sigma_{2|1})
$$
where:
- $\Sigma_{2|1} = \Sigma_2 - \Sigma_{1, 2}^T\Sigma^{-1}\Sigma_{1,2}$
- $\mu_{2|1} = \mu_2 + \Sigma_{1,2}^T\Sigma_1^{-1}(x_1 - \mu_1)$

{{ aside_begin(label="Derivation") }}
### Step 1: Re-factorise the joint distribution

Define:
$$
\Omega = \Mat{\Omega_1 & \Omega_{1,2} \\\\ \Omega_{1,2}^T & \Omega_2} = \Sigma^{-1}
$$
Note: $\Omega_1 \neq \Sigma^{-1}$, it's being used to define a component of $\Omega$, not the inverse of $\Sigma_1$ (likewise for other terms).

Now let's expand the terms inside $\exp\left(\ldots\right)$.  
We want to get this into the following form:
$$
x_2^T\Omega_{2|1}x_2 - 2x_2^T\Omega_{2|1}\mu_{2|1} + \textrm{const}
$$

We are essentially exploiting the fact that since we know $p(x_2 | x_1)$ must be a valid gaussian distribution, if we factorise $p(x_1, x_2) = p(x_2 | x_1) p(x_1)$, and isolate $x_2$ terms like above, this gives the required form $p(x_2 | x_1) = \mathcal{N}(x_2;\mu_{2|1}, \Sigma_{2|1})$, for $\Sigma_{2|1} = \Omega_{2|1}^{-1}$.

Expanding out:
$$
\begin{align*}
p(x_1, x_2) &\to
\WrapP{\Mat{x_1\\\\x_2} - \Mat{\mu_1\\\\ \mu_2}}^T
\Mat{\Omega_1 & \Omega_{1,2} \\\\ \Omega_{1,2}^T & \Omega_2}
\WrapP{\Mat{x_1\\\\x_2} - \Mat{\mu_1\\\\ \mu_2}}
\\\\
&=
(x_2 - \mu_2)^T\Omega_2(x_2 - \mu_2) + 2x_2^T\Omega_{1, 2}^T(x_1 - \mu_1) + const
\\\\
&=
x_2^T\Omega_2x_2 - 2x_2^T\WrapP{\Omega_2\mu_2 - \Omega_{1, 2}^T(x_1 - \mu_1)} + const
\end{align*}
$$
Comparing to the above form:
$$
\begin{align*}
\Omega_{2|1} &= \Omega_2 \\\\
\Omega_{2|1}\mu_{2|1} &= \Omega_2\mu_2 - \Omega_{1,2}^T(x_1 - \mu_1) \\\\
\mu_{2|1} &= \mu_2 - \Omega_2^{-1}\Omega_{1,2}^T(x_1 - \mu_1)
\end{align*}
$$
Where we are assuming $\Omega_2$ is invertible.

### Step 2: Find expressions for $\Omega_1, \Omega_{1, 2}, \Omega_2$ in terms of $\Sigma_1, \Sigma_{1, 2}, \Sigma_2$

The above expression is expresed in the components of $\Omega$, not $\Sigma$. The conversion is not trivial, since we are using components of the inverse of $\Sigma$.

To help, use the **Schur complement**, a result from linear algebra:
$$
\Mat{A & B \\\\ C & D}^{-1} = \Mat{
A^{-1} + A^{-1}BS^{-1}CA^{-1} & -A^{-1}BS^{-1} \\\\
-S^{-1}CA^{-1} & S^{-1}
}
$$
where $S = D - CA^{-1}B$

Note, that only $A$ needs to be invertible.

Use this to express $\Omega = \Sigma^{-1}$:
$$
\Mat{\Omega_1 & \Omega_{1,2} \\\\ \Omega_{1,2}^T & \Omega_2}
= \Mat{\Sigma_1 & \Sigma_{1,2} \\\\ \Sigma_{1,2}^T & \Sigma_2}^{-1}
= \Mat{
\Sigma_1^{-1} + \Sigma_1^{-1}\Sigma_{1,2}S^{-1}\Sigma_{1,2}^T\Sigma_1^{-1} &
-\Sigma_1^{-1}\Sigma_{1,2}S^{-1} \\\\
-S^{-1}\Sigma_{1,2}\Sigma_1^{-1} &
S^{-1}
}
$$

Using bottom right result:
$$
\begin{align*}
\Omega_2 &= S^{-1} \\\\
\Omega_2^{-1} &= S = \Sigma_2 - \Sigma_{1, 2}^T\Sigma_1^{-1}\Sigma_{1,2}
\end{align*}
$$
Using bottom left result:
$$
\begin{align*}
\Omega_{1,2}^T &= -S^{-1}\Sigma_{1,2}^T\Sigma_1^{-1} \\\\
\Omega_2^{-1}\Omega_{1,2}^T &= S(-S^{-1}\Sigma_{1,2}^T\Sigma_1^{-1}) \\\\
&= -\Sigma_{1,2}^T\Sigma_1^{-1}
\end{align*}
$$

### Step 3: Find final expressions for $\mu_{2|1}$ and $\Sigma_{2|1}$

$$
\begin{align*}
\Sigma_{2|1} &= \Omega_{2|1}^{-1} \\\\
&= \Omega_2^{-1} \\\\
&= \Sigma_2 - \Sigma_{1, 2}^T\Sigma_1^{-1}\Sigma_{1,2}
\end{align*}
$$


$$
\begin{align*}
\mu_{2|1} &= \mu_2 - \Omega_2^{-1}\Omega_{1,2}^T(x_1 - \mu_1) \\\\
&= \mu_2 + \Sigma_{1,2}^T\Sigma_1^{-1}(x_1 - \mu_1)
\end{align*}
$$

{{ aside_end() }}
