+++
title = "SLAM"
weight = 20
+++

# Defining the SLAM problem

State estimation in general, is when we have a state $x$ we wish to estimate, but only receive a set of measurements $y$. If we have a probabilistic model $p(y|x)$ then we can make inferences about what $x$ is likely to be.



Define:
- Robot pose $x \in \\SE(3)$
- Map $m \in \mathcal{M}$
- Measurements $y \in \mathcal{Y}$

# Reviews

- Lidar SLAM: {{<paper.ref label="review-3d-lidar-slam"/>}}, {{<paper.ref label="review-lidar-slam-multi-fusion"/>}}
- Long-term SLAM: {{<paper.ref label="review-long-term-slam"/>}}
- Visual SLAM: {{<paper.ref label="review-visual-slam"/>}}

{{ <item.pdf title="Visual SLAM survey: reference 10" file="visual-slam-survey-ref-10.pdf" page={page}/> }}

# Papers

{{<paper.def
label="review-3d-lidar-slam"
page={page}
doi="10.1111/phor.12497"
pdf="review-3d-lidar-slam.pdf"
/>}}

{{<paper.def
label="review-lidar-slam-multi-fusion"
page={page}
doi="10.3390/rs14122835"
pdf="review-lidar-slam-multi-fusion.pdf"
/>}}

{{<paper.def
label="review-long-term-slam"
page={page}
doi="10.1002/rob.22170"
pdf="review-long-term-slam.pdf"
/>}}

{{<paper.def
label="review-visual-slam"
page={page}
doi="10.3390/robotics11010024"
pdf="visual-slam-survey.pdf"
/>}}

# Other papers

{{<paper.def
label="azzam-visual-slam-survey"
page={page}
doi="10.1007/s42452-020-2001-3"
pdf="azzam-visual-slam-survey.pdf"
/>}}
