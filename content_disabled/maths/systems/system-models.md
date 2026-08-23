+++
title = "System Models"
weight = 1
[extra]
status = "wip"
+++

## State space models

A state space model is fully defined by a **state vector** $x \in X$ and a **control vector** $u \in U$ and is described by a first-order differential equation:

$$
\dot{x} = f(x, u, t)
$$

The above is an example of an **explicit form** of a differential equation. Often you can't express it in this form and must use an **implicit form**:

$$
g(x, \dot{x}, u, t) = 0
$$

where there is no closed-form solution for $\dot{x} = \ldots$ in terms of $x$, $u$, $t$.

In general, $f$ (and $g$) can be any non-linear function. However, there are certain classes of model which have a simpler structure that make analysis easier.

**Linear time-invariant (LTI) system**:

- $\dot{x} = Ax + Bu$
- Linear function of $x$ and $u$
- No dependence on time
- The matrices $A$ and $B$ are fixed

**Control-affine system**:

- $\dot{x} = a(x, t) + B(x, t)u$
- Affine mapping from $u$ to $\dot{x}$ (ie: linear term `Bu` + constant `a` )
- This mapping depends on $x$ and $t$ in general

For robotics in particular, pretty much every system of interest is control-affine.

### Differential constraints

A differential constraint has the form:

$$
h(x, \dot{x}, t) = 0
$$

If $x$ is a vector, this means there are certain components of $\dot{x}$ that $u$ cannot influence.

In _general_ differential constraints can be classed as:

- **Non-holonomic**: Reduces the degree of control you have over the _trajectory_ taken by $x(t)$, but doesn't reduce the dimension of the reachable state space.
- **Holonomic**: Reduces the dimension of the reachable state space.

Therefore a holonomic constraint can be expressed as an _equality_ constraint on the state vector of the form:

$$
\begin{align*}
g(x) &= 0 \\\\
\frac{d}{dt}\left(g(x)\right) &= \dot{x}^T \nabla g (x) \\\\
&= h_\textrm{holonomic}(x, \dot{x}) \\\\
&= 0
\end{align*}
$$

where the resulting differential constraint $h_\textrm{holonomic}(x, \dot{x})$ indicates that the state velocity cannot have any component along $\nabla g$, otherwise this would cause $g(x)$ to change to a non-zero value.

**NOTE**: Different uses of the term holonomic

- The term holonomic is typically reserved to describing differential constraints on _configuration systems_ specifically, not a general state vector.
- However, I have also seen it in the context of dynamic systems, where a conservative system (ie: defined by an energy potential) are holonomic, whereas a system with friction is non-holonomic.
- Will explore both cases below

## Configuration spaces

When dealing with a mechanical system, the **configuration** is the set of position-like variables that describe the state. Examples are:

- The position and orientation $(p, R)$ of a rigid body
- The set of joint positions $(\theta_1, \ldots, \theta_n)$ on an articulated body
- The displacement function $y(x)$ of a flexible beam

The **configuration space** $\mathcal{C}$ is the set of possible configurations and can be any _topological space_. Although if we want to define a differential equation over a configuration space, it must specifically be a _differentiable manifold_.

Notation:

- Configuration: $q \in \mathcal{C}$ represents a given configuration
- Velocity: $v \in T_q(\mathcal{C})$ is the velocity of a point in the configuration space, which is restricted to the tangent space of the manifold (at point $q$)

The tangent space for an n-dimensional manifold is essentially always equal to $\mathbb{R}^n$ except for certain points $q$ where there are singularities. However, can ignore this and just treat it as $\mathbb{R}^n$ for simplicity.

### Euclidean configuration spaces

For an n-dimensional euclidean configuration space, we have:

- $\mathcal{C} = \mathbb{R}^n$
- $T_q(\mathcal{C}) = \mathbb{R}^n$

In other words, both the configuration vector $q$ and velocity $v$ are given by n-dimensional vectors and we have $\dot{q} = v$.

### Non-euclidean configuration spaces

With a non-euclidean configuration space, this must be represented via an **implicit parameterisation** $q \in \mathbb{R}^m$ for $m > n$.

In order for this to be a valid parameterisation, there are a set of $k = (m - n)$ constraints $g_i(q) = 0$ that must be satisfied.

By comparing with above, you can see that this is a _holonomic constraint_ on the configuration space.

There are 3 scenarios in which a holonomic constraint arises:

1. We have a configuration with a "nicely-defined" non-euclidean space like orientations $\textrm{SO}(3)$
2. We have a known constraint $g(q) = 0$, such as for parallel linkages
3. We have a differential constraint $h(q)\dot{q}$ which _just so happens_ to correspond to a configuration constraint $g(q) = 0$ but it is not possible to find this equation.

For case (1) we can use closed-form equations for travelling in geosedic paths through the manifold, see [section on differential geometry](../../maths/geometry/differential).

For case (2) we must numerically integrate via the differential equation, but can always _normalise_ the configuratoin with $g(q) = 0$ afterwards (which is needed to handle drift due to the limited precision of numerical integration).

For case (3) this is treated the same as a non-holonomic differential constraint, it is impossible to treat it as holonomic.

### Non-holonomic differential constraints

There may be additional constraints on $u$, such that $u \in U \subset T_q(\mathcal{C})$. If this is an _equality_ constraint, then we have $\textrm{Dim}(U) < \textrm{Dim}(T_q(\mathcal{C}))$.

This occurs when you have $v = B(q)u$ for $\textrm{rank}(B(q)) < dim(v) $.

This limits the velocity we can take through the configuration space, but does not limit the dimension of the configuration space itself.

A simple example is a differential drive robot:

- Configuration $q = (x, y, \theta) \in \mathbb{R}^3$
- Velocity $v = \dot{q} \in \mathbb{R}^3$
- Input $u = (v, \omega) \in \mathbb{R}^2$
- Kinematics: $\dot{q} = v =
\left[\begin{matrix}
\cos(\theta) & 0 \\\\
\sin(\theta) & 0 \\\\
0 & 1
\end{matrix}\right]
\left[\begin{matrix}v \\\\\omega\end{matrix}\right]
= B(q)u
$

### Degrees-of-freedom

The term **degrees-of-freedom** refers to the dimension of the tangent space, which may be less than the dimension of the configuration space.

## Dynamic systems and phase spaces

### Kinematic vs dynamic models

The terms **kinematics** and **dynamics** apply to mechanical systems.

In a **kinematic model** we treat the velocity $v$ as an input and look at how the configuration changes with velocity via $\dot{q} = f(q, v)$.

In a **dynamic model** we look at how the velocity itself is driven by forces/inertia. The input here is a force-like variable.

Specifically, a dynamic model is defined by the second order differential equation:

$$
\begin{align*}
\dot{v} &= f(q, v, u, t) \\\\
&\textrm{or for euclidean space:} \\\\
\ddot{q} &= f(q, \dot{q}, u, t)
\end{align*}
$$

Like for a first-order differential equation state space model, we have certain classes of model:

- Linear time-invariant (LTI): $\dot{v} = A_1q + A_2v + Bu$
- Control-affine: $\dot{v} = a(q, v, t) + B(q, v, t)u$

### Phase spaces

For a configuration space $\mathcal{C}$ a **phase space** is the state space $X$ defined by the configuration along with higher order derivatives.

A second-order phase space:

$$
\begin{align*}
X &= \mathcal{C} \times \mathbb{R}^n \times \mathbb{R}^n \\\\
x &= (q, v, \dot{v})
\end{align*}
$$

A n-order phase space is:

$$
\begin{align*}
X &= \mathcal{C} \times \mathbb{R}^n \times \mathbb{R}^n \times \cdots \times \mathbb{R}^n\\\\
x &= (q, v, \dot{v}, \ldots, \frac{dv}{dt^{n-1}}) \\\\
&\textrm{or for euclidean space:} \\\\
x &= (q, \dot{q}, \ddot{q}, \ldots, \frac{dq}{dt^n})
\end{align*}
$$

For a mechanical system, the differential equation for the state vector is:

$$
\begin{align*}
x &= [q, v]^T \\\\
\dot{x} &= \left[\begin{matrix}
N(q)v \\\\
f(q, v, u, t)
\end{matrix}\right] \\\\
&= \left[\begin{matrix}
N(x_1)x_2 \\\\
f(x_1, x_2, u, t)
\end{matrix}\right]
\end{align*}
$$

where $\dot{q} = N(q)v$ defines the kinematics of the configuration space.<br>
For euclidean space, $N(q) = I$.

### Phase portraits

For a second-order system with $q = \mathbb{R}$ and setting $u = 0$, you can draw a **phase portrait** which represents the trajectories taken by $(q(t), \dot{q}(t))$.

For a mass-spring system we get:

$$
\begin{align*}
\ddot{q} &= -\frac{k}{m}q \\\\
E &= \frac{1}{2}kq^2 + \frac{1}{2}m\dot{q}^2
\dot{E} &= kq\dot{q} + m\dot{q}\ddot{q} \\\\
&= kq\dot{q} + m\dot{q}\left(-\frac{k}{m}q\right) \\\\
&= kq\dot{q} - kq\dot{q} \\\\
&= 0
\end{align*}
$$

The trajectories of $(q, \dot{q})$ form an ellipse, with a radius defined by the initial energy, since the energy $E$ does not change over time.

### Holonomic and non-holonomic dynamic systems

The mass-spring system can be defined by the constraint $E(q, \dot{q}) - E_0 = 0$ (constant potential energy). A system that can be described this way is _conservative_, a.k.a., holonomic.

This also directly relates to the dynamic with $\nabla E = 0$ giving the equation of motion. This has the same form as the holonomic differential constraint seen earlier. However, it only really applies in the absence of control inputs.

When we add any _non-conservative_ force, the system becomes non-holonomic:

Can add a control input $u = f$ for the force applied to the mass. Can visualise this effect on the phase portrait via "energy shaping", where $\dot{E}$ is now equal to the rate of work down $f \cdot \dot{q}$:

$$
\begin{align*}
\ddot{q} &= -\frac{k}{m}q + \frac{f}{m} \\\\
\dot{E} &= kq\dot{q} + m\dot{q}\left(-\frac{k}{m}q + \frac{f}{m}\right) \\\\
&= f\cdot\dot{q}
\end{align*}
$$

Whenever $f$ acts _with_ the velocity, it acts to increase the energy of the system and increase the radius of the trajectory on the phase space. Conversely if it acts against the velocity, it decreases the radius of the trajectory.

This can be thought of as a **non-holonomic** system because:

- There is only 1 controllable degree of freedom
- However, you can in principle still reach any state $(q, \dot{q})$ by adjusting the energy to the correct value and then waiting for it to loop around to the required state
- You cannot stabilise it an any point $(q, \dot{q})$ though, only those for which $\dot{q} = 0$.

This also occurs if you introduce damping into the system:

$$
\begin{align*}
\ddot{q} &= -\frac{k}{m}q -\frac{\lambda}{m}\dot{q} \frac{f}{m} \\\\
\dot{E} &= kq\dot{q} + m\dot{q}\left(-\frac{k}{m}q -\frac{\lambda}{m}\dot{q} + \frac{f}{m}\right) \\\\
&= f\cdot\dot{q} - \lambda \dot{q}^2
\end{align*}
$$

Even if $f=0$, the damping $\lambda$ will always act to dissipate the energy and gives a spiral trajectory in the phase portrait.

Again, this can be thought of as making the system _non-holonomic_ since $E$ is no constant, so you can no longer define a constraint of the form $E(t) - E(0) = 0$.

### Comparing holonomic kinematic vs dynamic systems

TODO: Still don't understand this properly

Essentially, with a kinematic system, holonomy was defined in regards to controllability of the velocity. For the mass-spring system example, we only get a holonomic system for conservative forces, so cannot have a control input $u = f$.

Maybe it's to do with controllability of stable trajectories through the phase space?

### Differential constraints in phase space

For $x = (q, v)$ we _always_ have a differential equation of the form $\dot{q} = A(q)v$ defined by the kinematics, which cannot be affected by $u$ and therefore defines a differential constraint on $\dot{x}$.

Comparing with kinematic systems: it's like a non-holonomic system where the degree of control is less than the dimension of the configuration space.

Therefore any theory that applies to planning/control with non-holonomic kinematic systems also applies to planning/control with dynamic systems, if expressed as a first-order differential equation via a phase space.

The only caveat is if you have a holonomic dynamic system and no input, it kind-of becomes like a holonomic kinematic system, but only without exernal input and you can't conrol the trajectory it takes through the phase space - so I don't think this comparison is that useful.

## Controllability and underactuation

### Controllability

The term **controllability** applies to linear systems only, and refers to when a conrol input $u$ is able to affect any component of the state $x$.

TODO: Give the method for determining this.

If a linear system is controllable, you can reach any stable point.

### Underactuation

The term **underactuation** applies to dynamic systems specifically, for any system, not just linear systems.

To help define actuability:

- We have the acceleration defined by $\dot{v} = f(q, v, u, t)$
- We have a control space $u \in U$, which may be a subset of the tangent space
- We can look at the space of achievable $\dot{v}$ with the range of $f$ under $U$, for fixed $q, \dot{q}, t$, denoted $f(q, v, U, t)$.
- If the system is holonomic, then this maps to the set of achievable state accelerations $\ddot{q}$.
- Otherwise, there is an additional restriction on the space of achievable $\ddot{x}$.

A system is **fully-actuated** at a given state $(q, v, t)$ if there exists a $u \in U$ that gives any desired state acceleration $\ddot{q}$.

Specifically, this requires some context. For example, we are always going to have upper limits on control inputs, so upper limits on acceleration. However, this is still fully-actuated if these acceleration limits are large enough to not need to be considered in the control problem, and any $\ddot{q}$ of interest is achievable.

A system is underactuated at a given state $(q, v, t)$ if there are regions of $\ddot{q}$ that cannot be achieved.

A system itself is defined as fully-actuated or actuated if:

- Underacuated: The system is always underactuated
- Fully-actuated: In _general_, the system is actuated at a given point

A fully-actuated system may have specific configurations for which is underactuated (eg: workspace boundary for a manipulator), but if it is otherwise fully-actuated, then the system is referred to as fully-actuated.

A system may be underactuated for the following reasons:

- Non-holonomic kinematic constraint: We can fully control $\dot{v}$ but this cannot fully control $\dot{q}$. Therefore, we cannot fully control $\ddot{q}$ since this shares the same constraints.
- System has _drift_ and actuator limits: The range of $f$ under $U$ is restricted.
- The mapping from $u$ to $\dot{v}$ is not full-rank.

To expand on the last point, we can linearise the dynamics with:

$$
\begin{align*}
\dot{v} &= f(q, v, u, t) \\\\
\dot{v}^\star + \delta \dot{v} &= f(q, v, u^\star, t) + \frac{df}{du} (u - u^\star)
\end{align*}
$$

If the matrix $\frac{df}{du}$ has rank less than the dimension of $\dot{v}$ then only a subset of $\dot{v}$ is achievable. This can occur if $u$ itself has a lower dimension, or the mapping is degenerate (and there is some component of $u$ which has no effect).

To expand on the term **drift** is a propery of dynamic systems where:

- $f(q, v, 0, t) \neq 0$ - i.e., the velocity remains non-zero without any applied force
- This has the consequence that the point $\dot{v} = 0$ may not be achievable due to control limits

### Relating these

A system can be underactuated, but still be controllable.

Controllability relates to whether a given state is reachable, underactuation just means you cannot fully constrain the path taken to get there.

The consequence of underactuation means you need to take into account the dynamical model in your control and for arbitrary models, the required trajectories may become _very complex_, possibly impossible to determine, even if theoretically a system can be driven to a point.

### Reachability

The term **reachability** is the non-linear version of controllability and describes whether or not a given state can be reached.

TODO: More details
