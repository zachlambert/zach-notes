+++
title = "SLAM"
weight = 20
[extra]
status = "wip"
+++

# Defining the SLAM problem

State estimation in general, is when we have a state $x$ we wish to estimate, but only receive a set of measurements $y$. If we have a probabilistic model $p(y|x)$ then we can make inferences about what $x$ is likely to be.



Define:
- Robot pose $x \in \\SE(3)$
- Map $m \in \mathcal{M}$
- Measurements $y \in \mathcal{Y}$
