+++
title = "FastSLAM"
+++

{{ pdf(title="Paper", file="fast-slam.pdf") }}

Basically an efficient implementation of the rao-blackwellized particle filter that has $O(M\log K)$ time complexity instead of a naive implementation $O(MK)$, where $M$ = num particles, $K$ = num landmarks.

Unlike [the gmapping approach](../gmapping) which maintains a 2D occupancy map with each particle, this implementation is a 2D **landmark-based** SLAM algorithm.
