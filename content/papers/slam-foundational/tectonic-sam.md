+++
title = "Tectonic SAM"
+++

{{ paper(
doi="10.1109/ROBOT.2007.363564",
pdf="tectonic-sam.pdf"
)}}

Introduces the idea of "submaps" in the context of large-scale feature-based slam.

This partitions the factor graph into submaps, where the poses/features within each map are defined in the reference frame of the submap. Then you can separate optimisation of the inter-submap poses (and features shared between submaps) from those within each submap, making the optimisation more efficient.
