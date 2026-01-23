+++
title = "Problem formulation"
weight = 1
[extra]
status = "wip"
+++

Define:
- Robot pose $x \in \\SE(3)$
- Map $m \in \mathcal{M}$
- Measurements $y \in \mathcal{Y}$

The measurements are defined via the measurement model:
$$
Y \sim p(y | x, m)
$$
ie: The measurements depend on both the robot pose and the map.

You need to jointly estimate both the map and robot pose, hence why it is called the **simultaneous localisation and mapping** problem.

This simplifies to localisation **or** mapping only if:
1. Localisation: The map is known and fixed
2. Mapping: The pose is estimated independently of the map, such that the map can be built from the measurements directly for the known pose

There may also be multiple map representations required:
- The "SLAM map": The map jointly estimated with the pose by SLAM.
- The "navigation map": The map used by the path planning and control to determine free/traversable space.

{{ details_begin() }}

The navigation map may be constructed independently of the SLAM map, and treat the pose estimate coming from SLAM as a known value.

Technically this isn't mathematically sound, since if the SLAM map then receives updates, the navigation map won't incorporate these changes.

However in practice, this makes the system easier to design by decoupling the two algorithms, and the navigation mapping process simply needs to be robust to errors in mapping due to pose drift/errors. 

{{ details_end() }}
