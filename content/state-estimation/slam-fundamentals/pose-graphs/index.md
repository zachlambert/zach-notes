+++
title = "Pose graphs"
weight = 21
[extra]
status = "stub"
+++

# Early idea of pose graphs

{{<paper.ref label="atlas"/>}}

# Tectonic SAM

{{<paper.ref label="tectonic-sam"/>}}

Introduces the idea of "submaps" in the context of large-scale feature-based slam.

This partitions the factor graph into submaps, where the poses/features within each map are defined in the reference frame of the submap. Then you can separate optimisation of the inter-submap poses (and features shared between submaps) from those within each submap, making the optimisation more efficient.

# Papers

{{<paper.def
label="atlas"
page={page}
doi="10.1109/ROBOT.2003.1241872"
pdf="atlas.pdf"
/>}}

{{<paper.def
label="tectonic-sam"
page={page}
doi="10.1109/ROBOT.2007.363564"
pdf="tectonic-sam.pdf"
/>}}
