+++
title = "Random processes"
weight = 20
[extra]
status = "wip"
+++

## White noise and the Weiner process

For a discrete-time system, a random walk process is given by:
$$
x_{n+1} = x_n + w_n
$$
Where $w_n$ is discrete-time white noise with variance $\sigma^2$:
$$
w_n \sim \mathcal{N}(0, \sigma^2)
$$

What about for continuous-time systems?
$$
\begin{align*}
\dot{x}(t) &= w(t) \\\\
x(t + \Delta t) &= x(t) + \int_0^{\Delta t} w(\tau) d\tau \\\\
&= W_\Delta t
\end{align*}
$$

If $w(t)$ is white noise with power spectral density $\sigma^2$, then the integral of this signal forms a **Weiner process** defined by:
$$
W_t \sim \mathcal{N}(0, \sigma^2 \cdot t)
$$

{{ details_begin() }}

More typically, the Weiner process is defined for unit power spectral density
$$
W_t \sim \mathcal{N}(0, t)
$$
And then for a power spectral density $\sigma^2$, the resulting weiner process is simply scaled by $\sigma$:
$$
\sigma W_t \sim \mathcal{N}(0, \sigma^2 \cdot t)
$$

{{ details_end() }}


This can be converted to a discrete-time system:
$$
\begin{align*}
x_n = x(t)
x_{n+1} = x(t + \Delta t)
w_n = W_{\Delta t} \sim \mathcal{N}(0, \sigma^2 \cdot \Delta t)
\end{align*}
$$

{{ aside_begin(label="Comparing to constant-velocity models") }}


We can define a similar system:
$$
\begin{align*}
\dot{x} &= v(t) \\\\
x(t + \Delta t) &= x(t) + \int_0^{\Delta t}v(t) d\tau
\end{align*}
$$

Let's say we take $v(t) = v_n$ to be constant over the interval $t \to t + \Delta t$, and treat it as discrete-time white noise with variance $\sigma^2$:
$$
\begin{align*}
x_{n+1} &= x_n + \Delta t v_n \\\\
        &= x_n + w_n
\end{align*}
$$

We have a similar additive noise $w_n$ to before, but this time has variance $\sigma^2 \cdot \Delta t^2$ instead of $\sigma^2 \cdot \Delta t$

The key difference is that here we are integrating a constant random variable over the interval, which is different to the integral of a continuous-time random process.

{{ aside_end() }}

## Interpreting power spectral density (PSD)

The power spectral density $\sigma^2$ is the covariance of the state change over a unit time interval:
$$
W_{t=1} \sim \mathcal{N}(0, \sigma^2)
$$

The term $sigma$ on it's own is referred to as the **diffusion coefficient** and is the corresponding standard deviation of the state change over a unit time interval.

## Simulating white noise

Since we know that the integral of white noise is the weiner process, we can discretise the system and sample the state changes $w_n$.

$$
\begin{align*}
w_n &\sim \mathcal{N}(0, \sigma^2 \cdot \Delta t) \\\\
x_{n+1} &= x_n + w_n
\end{align*}
$$

Or, we can sample $w_n$ from a unit normal distribution and scale this appropriately:
$$
\begin{align*}
w_n &\sim \mathcal{N}(0, 1) \\\\
x_{n+1} &= x_n + (\sigma \sqrt{\Delta t}) w_n
\end{align*}
$$
