+++
title = "IMU Filtering"
weight = 1000
[extra]
status = "wip"
+++

## IMU integration for EKFs

### State

For a world frame $w$ and body/imu frame $b$:
- Position $p = {}^ww_b$
- Orientation $R = {}^wR_b$
- Linear velocity $v = {}^wv_b^w$ (defined in the _world frame_ $w$)
- Angular velocity $\omega = {}^w\omega_b^b$ (defined in the _body frame_ $b$)
- Linear acceleration $a = {}^wa_b^w$ (defined in the _world frame_ $w$)
- Gravity vector in world frame $g$

Note: The world frame isn't necessarily gravity-aligned. If this can be assumed then $g$ is fixed at $[0, 0, -9.81]$.

We will also have measurement biases $b^g$ and $b^a$ for the gyroscope and accelerometer which must also be jointly estimated.

The full state vector is:
$$
x = \left[p, R, v, g, b^g, b^a\right]^T
$$

### Motion model

Continuous-time motion model:
$$
\begin{align*}
(R^T\dot{R})^\vee &= \omega \\\\
\dot{v} &= a \\\\
\dot{p} &= v
\end{align*}
$$

Full discrete-time model:
$$
\begin{align*}
R(t + \Delta t) &= R(t) \cdot \Exp\left(\int_t^{t + \Delta t}\omega(t) dt\right) \\\\
v(t + \Delta t) &= v(t) + \int_{t}^{t + \Delta t}a(t)dt  \\\\
p(t + \Delta t) &= p(t) + \int_{t}^{t + \Delta t}v(t)dt + \int\int_{t}^{t + \Delta t}\frac{1}{2}a(t)dt
\end{align*}
$$

{{ details_begin() }}
NOTE: The exponention for the orientation is a _time ordered_ expansion:
$$
\begin{align*}
\Exp\left(\int_t^{t + \Delta t}\omega(t) dt\right)
&= \lim_{N \to \infty}\prod_i^{N} (I + \omega(t + i\cdot dt)^\wedge dt) \\\\
&= (I + \omega(t)^\wedge dt)(I + \omega(t + dt)^\wedge dt)\cdots(\omega(t + \Delta t)^\wedge dt)
\end{align*}
$$
for $dt = \frac{\Delta t}{N}$

This can also be expressed as the $\Exp(\Omega)$ for the _magnus expansion_ $\Omega$ (although this is typically defined for left-multiplication).
{{ details_end() }}

If taking $\omega$ and $a$ constant over the interval and dropping the explicit time dependency, we can write the discrete time model as:
$$
\begin{align*}
R^\prime &= R \cdot \Exp(\omega \Delta t) \\\\
v^\prime &= v + a\Delta t \\\\
p^\prime &= p + v\Delta t + \frac{1}{2}a\Delta t^2
\end{align*}
$$
where $p^\prime = p(t + \Delta t)$, etc.

### Motion model using IMU measurements

Gyroscope measurement:
$$
y^g = \omega + b^g + \eta^g
$$

Gyroscope measurement:
$$
y^a = R^T(a - g) + b^a + \eta^a
$$

The noise terms $\eta^g(t)$ and $\eta^a(t)$ are white-noise random variables with spectral noise $Q^g$ and $Q_a$.

Combine these with the continuous-time motion model:
$$
\begin{align*}
(R^T\dot{R})^\vee &= y_b - b^a - \eta^a \\\\
\dot{v} &= R(y^a - b^a - \eta^a) + g \\\\
\dot{p} &= v
\end{align*}
$$

To convert to a discrete-time form, we can make the same assumption of fixed values _except for the noise terms_. For the noise terms, we can redefine:
$$
\begin{align*}
n^{gd}(t) &= \frac{1}{\Delta t}\int_t^{t + \Delta t} \eta^g(t) dt \\\\
          &\sim \mathcal{N}(0, Q^{gd})
n^{ad}(t) &= \frac{1}{\Delta t}\int_t^{t + \Delta t} \eta^a(t) dt
          &\sim \mathcal{N}(0, Q^{ad})
\end{align*}
$$
For $Q^{gd} = \frac{1}{\Delta t}Q^g$
and $Q^{ad} = \frac{1}{\Delta t}Q^a$.

{{ details_begin() }}

The reason that the covariance is _divided_ by $\Delta t$ is that we are using the averaged noise over the interval, which is then multiplied by $\Delta t$.

$$
\begin{align*}
a &\sim \mathcal{N}(0, Q) \\\\
b &= \int_{0}^{\Delta t} a dt \\\\
c &= \Delta t \cdot a \\\\
d &= \frac{1}{\Delta t} \int_{0}(\Delta t) a \\\\
\mathcal{Cov}(a) &= Q \\\\
\mathcal{Cov}(b) &= Q \cdot \Delta t \\\\
\mathcal{Cov}(c) &= Q \cdot \Delta t^2 \\\\
\mathcal{Cov}(d) &= (\frac{1}{\Delta t})^2 \cdot Q \cdot \Delta t = Q \cdot \frac{1}{\Delta t}
\end{align*}
$$
You could also define the discrete noise terms to be the total integral over the interval, such that the covariance would be $Q \Delta t$.

{{ details_end() }}

This gives the discrete-time model:
$$
\begin{align*}
R^\prime &= R \cdot \Exp((\omega - b^g - \eta^{gd}) \Delta t) \\\\
v^\prime &= v + g\Delta t + R(a - b^a - \eta^{ad})\Delta t \\\\
p^\prime &= p + v\Delta t + \frac{1}{2}g\Delta t^2 + \frac{1}{2}R\left(a - b^a - \eta^{ad}\right)\Delta t^2 \\\\
g^\prime &= g \\\\
\eta^{g\prime} &= \eta^g \\\\
\eta^{a\prime} &= \eta^a
\end{align*}
$$

### State propagation

Simply drop the noise terms:
$$
\begin{align*}
R^\prime &= R \cdot \Exp(\left(\omega - b^g\right) \Delta t) \\\\
v^\prime &= v + g\Delta t + R(a - b^a)\Delta t \\\\
p^\prime &= p + v\Delta t + \frac{1}{2}g\Delta t^2 + \frac{1}{2}R\left(a - b^a\right)\Delta t^2 \\\\
g^\prime &= g \\\\
\eta^{g\prime} &= \eta^g \\\\
\eta^{a\prime} &= \eta^a
\end{align*}
$$

### Jacobians and covariance update

For rotations, use the right-hand-side definition of the derivative and define $J^R(u)$ as the right-hand-side jacobian of the exponential map.

**Rotation**

$$
\begin{align*}
\frac{dR^\prime}{dR} &= \Exp((\omega - b^g) \Delta t)^T \\\\
\frac{dR^\prime}{b^g} &= -J^R((\omega - b^g) \Delta t) \Delta t \\\\
\frac{dR^\prime}{\eta^{gd}} &= -J^R((\omega - b^g) \Delta t) \Delta t
\end{align*}
$$

**Linear velocity**

$$
\begin{align*}
\frac{dv^\prime}{dv} &= I \\\\
\frac{dv^\prime}{dg} &= I\cdot\Delta t \\\\
\frac{dv^\prime}{dR} &= -R(a - b^a)^\wedge\Delta t \\\\
\frac{dv^\prime}{b^a} &= -R\Delta t \\\\
\frac{dv^\prime}{\eta^{ad}} &= -R\Delta t
\end{align*}
$$

**Position**

$$
\begin{align*}
\frac{dp^\prime}{dp} &= I \\\\
\frac{dp^\prime}{dv} &= I\cdot\Delta t \\\\
\frac{dp^\prime}{dg} &= I\cdot\frac{1}{2}\Delta t^2 \\\\
\frac{dp^\prime}{dR} &= -\frac{1}{2}R(a - b^a)^\wedge\Delta t^2 \\\\
\frac{dp^\prime}{b^a} &= -\frac{1}{2}R\Delta t^2 \\\\
\frac{dp^\prime}{\eta^{ad}} &= -\frac{1}{2}R\Delta t^2
\end{align*}
$$
