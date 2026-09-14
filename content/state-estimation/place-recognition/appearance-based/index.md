+++
title = "Appearance-based"
weight = 1
[extra]
status = "wip"
+++

# Appearance-based loop closure detection

{{<paper.ref label="labbe-memory-management-loop-closure"/>}}

Paper for the RTAB-Map library, but with more testing.

Introduction:
- Visual-based approaches for loop detection outperform scan/lidar-based approaches.
- Typically features are found in images via SIFT/ORB or some other descriptor.
- To make this suitable for place recognition, 

# Hierarchical localisation

<https://arxiv.org/abs/1812.03506>

<https://github.com/ethz-asl/hfnet>

{{<paper.ref label="hloc"/>}}

# Papers

{{<paper.def
label="labbe-memory-management-loop-closure"
page={page}
doi="10.1109/TRO.2013.2242375"
pdf="labbe-loop-closure.pdf"
/>}}

{{<paper.def
label="hloc"
page={page}
doi="10.48550/arXiv.1812.03506"
pdf="hierarchical-localisation.pdf"
/>}}
