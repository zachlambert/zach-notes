+++
title = "Factor-graphs"
+++

## Early idea of pose graphs

{{ paper(
doi="10.1109/ROBOT.2003.1241872",
pdf="atlas.pdf"
)}}

## ISAM2 (gtsam)

{{ paper(
doi="10.1109/TRO.2008.2006706",
pdf="isam.pdf"
)}}

Defines the key idea behind the popular gtsam factor-graph library.  
Implements an efficient incremental factor-graph optimisation scheme:
- For a linearised pose-graph, maintains a QR decomposition of the error jacobian, which corresponds to converting the factor-graph into a bayes tree. 
- If the QR decomposition is known, can efficiently solve the least-squares problem via back-propagation.
- When new factors / variables are added, updates the existing QR decomposition rather than re-linearising from scratch.
- Even if there are adjustments in the solution, only re-linearises for variables where the error-state becomes significant.
- Also performs periodic "variable re-ordering", which uses some heuristic to re-order the variables in order to make the R matrix more sparse and more efficient to solve with.

## Tectonic SAM

{{ paper(
doi="10.1109/ROBOT.2007.363564",
pdf="tectonic-sam.pdf"
)}}

Introduces the idea of "submaps" in the context of large-scale feature-based slam.

This partitions the factor graph into submaps, where the poses/features within each map are defined in the reference frame of the submap. Then you can separate optimisation of the inter-submap poses (and features shared between submaps) from those within each submap, making the optimisation more efficient.
