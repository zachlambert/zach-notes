+++
title = "Introduction"
weight = 1
[extra]
status = "draft"
+++

## Terminology

### Discrete state spaces

For a discrete state space $x \in X$, a **path** is a sequence of states $\{q(i)\}_{i=0}^n$

Since it is discrete:

- It implicitly encodes the sequence of control inputs $\{u(i)\}$ which correspond to edges between the vertices of the graph
- Is there is no notion of a trajectory, since there is no time dependency in the model

Later on, will see discrete parameterisations of continuous trajectories that do contain control inputs at time, but these are still distinct from the state space itself being discrete.

### Continuous state space

For continuous state spaces, we make a distinction between configuration spaces and state spaces.

A **path** through a _configuration space_ $q \in \mathcal{C}$ is:

- Defined by the function $q(s)$ for $s \in [0, 1]$
- The variable $s$ represents a normalised position along the path
- $q(0) = q_0$ is the start configuration
- $q(1) = q_1$ is the end configuration

A **trajectory** through a configuration space is:

- Defined by the function $q(t)$ for $t \in [0, T]$
- Can find the derivatives $\dot{q}(t)$, $\ddot{q}(t)$, up to whatever is required
- For non-holonomic systems, this would be $v(t)$, $\dot{v}(t)$, etc., instead

The **state trajectory** $x(t)$ depends on what the state is defined as:

- For a kinematic system, the state is equal to the configuration, so $x(t) = q(t)$.
- For a dynamic system, the state is the combination of the configuration and velocity $x(t) = (q(t), v(t))$

The **control trajectory** is the function $u(t)$.<br>
For a given initial state $x(0)$ and control trajectory $u(t)$, you can evaluate the resulting state trajectory $x(t)$ via the state equation.

For a configuration space, the trajectory can be decoupled with:

- Path $q_s(s)$
- **Time scaling**: $s(t)$
- Trajectory $q_t(t) = q_s(s(t))$

This **cannot** be done for a state trajectory, since the time scaling is coupled with the path taken through state space.

### Types of planning

**Planning**: Any type of planning through a discrete/continuous/mixed state space.

**Feasible planning**: Find a feasible path through the configuration space between two configurations

**Optimal planning**: Find an optimal path through the configuration space between two configurations that minimises a cost function (or maximises an objective).

**Discrete planning**: Find a path through a discrete state space, which (for a finite state space) is a graph.

**Graph search**: The problem of finding a path through a graph. This is exactly the technique used for discrete planning, but refers to the general technique and is also used in certain continuous planning algorithms.

**Path planning** and **Motion planning**:

- Both seek to find a path $q(s)$ through a _continuous_ configuratoin space between a start and goal configuration
- For _path planning_ it does this without consideration for the derivative of the path. This means it cannot deal with differential constraints.
- For _motion planning_ it generates a path $q(s)$ via choosing the derivative $\frac{dq}{ds}$.
- Motion planning can satisfy differential constraints, but still doesn't need to consider the time scaling.

For a concrete example of the different between path/motion planning:

- Consider the RRT algorithm that randomly samples points in the configuration space, then finds an optimal path through these points
- For path planning, the sampling would be done by sampling from the configuration space $q \in \mathcal{C}$ around a given node.
- For motion planning, the sampling would be done by sampling from a set of achievable motions. i.e., would sample a displacement vector which defines a geosedic path through the configuration space to the next point.

**Caveat**: The terminology for this is inconsistent. It's also a bit annoying to use both terms path/motion planning. For this reason, I'll just stick with the term motion planning for any algorithm that finds for paths through a configuration space.

**Trajectory planning**:

- Finds a trajectory $x(t)$ through a state space $X$
- This is only required for dynamic models. For kinematic models, you can always use path/motion planning.
- This is similar to motion planning in that there are differential constraints that need to be satisfied, but in this case this includes constraints on $x(t)$ required for it to be a valid trajectory $(q(t), v(t))$.
- i.e. The integral of the velocity trajectory $v(t)$ matches the configuration trajectory $q(t)$
- Will also any kinematic constraints that apply

**Time scaling**:

- Time scaling refers to finding the function $s(t)$ that converts a path $q_s(s)$ to a trajectory $q_t(s(t))$
- This needs to satisfy velocity/acceleration constraints while ideally minimising the time taken to reach the goal
- The problem of finding the optimal time scaling is called **time-optimal path parameterisation**

## Approaches to path/motion planning

**Discretise the state space**:

- For a holonomic system, can discretise the configuration space and plan through this.
- For non-holonomic systems, must take into account the controls/motions. Therefore need to discretise the control space too, typically to a set of "motion primitives".

**Sampling-based methods**:

- **Roadmap methods**: Construct a roadmap over the configuration space and performs a graph search through this.
- **Search tree methods**: Use a search tree to expand through a configuration space. Distinct from roadmap methods in that it expands the tree, whereas a roadmap method defines the points before-hand, then converts to a graph.

For non-holonomic discrete methods (eg: hybrid A\*), these are similar to search trees. The difference is that rather than randomly sampling controls/motions, it exhaustively searches for optimal control from a discrete set of controls. The two would be equivalent if the search tree method deterministically samples from this same discrete set of controls.

**Optimisation methods**:

- Parameterise the path by a piece-wise polynomial parameterisation (or similar)
- Perform an optimisation over an cost function, such as the length of the path + error terms for collisions.
- Pros: Can represent more complex constraints and objectives
- Cons: Is almost always a non-convex optimisation so suffers from getting stuck in local minima
- Can often inialise the state with a sampling-based method, then further optimise
- Another method is **graph of convex sets** which jointly optimises over the path through the roadmap and the position of the roadmap points themselves - this is a more modern technique which seems to inherit the advantages of both sampling-based and optimisation approaches

**Note**: Have read that even though sampling-based methods can take into account motion constraints, they typically don't perform as well as samping-based methods that sample the configuration space directly. (e.g., PRM is better than RRT and its variants).

**Post-processing**:

- With sampling-based planners specifically, the path can be quite "jerky" (i.e., zig-zags around)
- Example techniques: short-cutting, b-spline smoothing

Other terms:

- **Single-query planner**: Optimised for single queries only
- **Multi-query planner**: There is some amount of processing that is shared between multiple queries with the same start configuration, or even just the same environment for arbitrary (start, goal) configuration pairs.

### Adapting this for trajectory planning

Firstly, may decouple into motion planning and finding an optimal time scaling. For this there are specialised algorithms, as well as relatively simple approximate solutions.

Otherwise may adapt the same sampling-based methods and optimisation based methods, which need to explicitly handle the differential constraints defined by the state equation.

Like mentioned above, although sampling-based methods can work in principle, it appears they aren't particularly reliable. Optimisation methods (or sampling + optimisation methods) appear much better.

## Standard techniques for different classes of problem

Mobile robots:

- Plan through $\textrm{SE}(2)$ which is low-dimensional
- For holonomic vehicles without dynamic constraints, A\* is perfectly fine and optimal
- For non-holonomic vehicles, use hybrid grid methods which allow incorporating motion constraints
- In both cases, there may still be a subsequent optimisation method if dynamic constraints need to be taken into account

Manipulators and legged robots:

- Too high dimensional for grid-based methods to be computationally feasible
- Probabilistic roadmaps (PRM) used to be the standard (for manipulators at least)
- Now, it appears to be PRM + optimisation
- Also have pure-optimisation approaches

Manipulators may also still use separate path planning with time-optimal scaling. This is the standard method used for industrial manipulators.
