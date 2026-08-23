+++
title = "Mono-SLAM"
+++

{{ paper(
doi="10.1109/TPAMI.2007.1049",
pdf="mono-slam.pdf"
)}}

Outlines an ekf-based visual SLAM approach where the state consists of the current pose and landmark locations.

Good for historical understanding, but the filter-based approach is fundamentally limited due to the increasing $\mathcal{O}(n^3)$ complexity with state size.

Graph-based approaches are more suitable since they exploit the sparsity of the problem.
