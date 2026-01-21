+++
title = "Multivariate calculus"
weight = 1
[extra]
status = "stub"
description = "How to differentiate functions of vectors"
+++

{{ aside_begin(label="Example of finding jacobians") }}

For regular euclidean vectors, lets define the function $y = f(x)$.

Instead of trying to evaluate $\frac{df}{dx}$ I find it easier to do:
$$
\begin{align*}
y &= f(x) \\\\
y + \delta y &= f(x + \delta x) \\\\
&= f(x) + (\ldots)\delta x \\\\
\delta y &= (\ldots)\delta x \\\\
\frac{df}{dx} &= (\ldots)
\end{align*}
$$
Where the $f(x + \delta x) \to f(x) + (\ldots)\delta x$ involves:
- Linearising the function
- Taking first-order approximations, dropping higher order terms (which will disappear later)
- Finding the matrix $A$ that maps $\delta y = A \delta x$, which by definition is the jacobian

For a concrete example, let's use: $y = x^TAx + \sum_i x_i$
$$
\begin{align*}
y + \delta y &= (x + \delta x)^T A (x + \delta x) + \sum_i x_i + \delta x_i \\\\
\delta y &= \delta x^T A x + x^TA\delta x + \Mat{1 & \cdots & 1}\delta x_i + (x^TAx + \sum_i x_i - y) \\\\
&= \WrapP{x^T(A + A^T) + \Mat{1 & \cdots & 1}}\delta x \\\\
\frac{df}{dx} &= x^T(A + A^T) + \Mat{1 & \cdots & 1}
\end{align*}
$$

{{ aside_end() }}
