+++
title = "Factor graphs"
weight = 25
[extra]
status = "stub"
+++

# iSAM2 (gtsam)

{{<paper.ref label="isam"/>}}

Defines the key idea behind the popular gtsam factor-graph library.  
Implements an efficient incremental factor-graph optimisation scheme:
- For a linearised pose-graph, maintains a QR decomposition of the error jacobian, which corresponds to converting the factor-graph into a bayes tree. 
- If the QR decomposition is known, can efficiently solve the least-squares problem via back-propagation.
- When new factors / variables are added, updates the existing QR decomposition rather than re-linearising from scratch.
- Even if there are adjustments in the solution, only re-linearises for variables where the error-state becomes significant.
- Also performs periodic "variable re-ordering", which uses some heuristic to re-order the variables in order to make the R matrix more sparse and more efficient to solve with.

# Papers

{{<paper.def
label="isam"
page={page}
doi="10.1109/TRO.2008.2006706"
pdf="isam.pdf"
/>}}
