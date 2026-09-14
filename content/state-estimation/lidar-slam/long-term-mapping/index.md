+++
title = "Long-term mapping"
weight = 3
[extra]
status = "wip"
+++

# Multiple relative pose graphs for robust cooperative mapping

{{<paper.ref label="robust-cooperative-mapping"/>}}

This is a commonly cited paper for multi-session SLAM and introduces the idea of combining pose graphs between sessions via:
- Define an anchor node for each session, with define a low-confidence prior pose to constrain the initial optimisation.
- Create constraints between pose-graphs for "encounters" - matches between frames in multiple sessions, which then joins the pose graphs.

# Multi-session map construction

{{<paper.ref label="multi-session-map-construction"/>}}

System overview:
- Implements a single-session lidar pose-graph SLAM algorithm using ICP and proximity-based loop closure detection.
- Uses LocNet descriptors to find loop closures between sessions
- Jointly optimises over the reference session and new session
- Combine the two pose graphs:
    - Update each reference submap using all new session submaps that overlap it, but adding newly observed points and raycasting to clear points.
    - Merge submaps in the new session into the reference map where they don't overlap with existing submaps.

# LT-Mapper (LT-SLAM)

{{<paper.ref label="lt-mapper"/>}}

Similar approach to the above paper, but uses the method from Meta-rooms {{<paper.ref label="meta-rooms"/>}}

# BIM-SLAM and SLAM2REF

BIM-SLAM: <https://github.com/mac137/ConSLAM>

{{<paper.ref label="bim-slam"/>}}

ConSLAM (dataset): <https://github.com/mac137/ConSLAM>

{{<paper.ref label="conslam"/>}}

SLAM2REF: <https://github.com/MigVega/SLAM2REF>

{{<paper.ref label="slam2ref"/>}}

# Long-term localisation and mapping for large-scale environments

{{<paper.ref label="long-term-inspection-mapping"/>}}

# Papers

{{<paper.def
label="robust-cooperative-mapping"
page={page}
doi="10.1109/ROBOT.2010.5509154"
pdf="robust-cooperative-mapping.pdf"
/>}}

{{<paper.def
label="multi-session-map-construction"
page={page}
doi="10.1109/RCAR.2018.8621770"
pdf="multi-session-map-construction.pdf"
/>}}

{{<paper.def
label="lt-mapper"
page={page}
doi="10.1109/ICRA46639.2022.9811916"
pdf="lt-mapper.pdf"
/>}}

{{<paper.def
label="bim-slam"
page={page}
doi="10.22260/ISARC2023/0070"
pdf="bim-slam.pdf"
/>}}

{{<paper.def
label="conslam"
page={page}
doi="10.1061/JCCEE5.CPENG-5212"
/>}}

{{<paper.def
label="slam2ref"
page={page}
doi="10.1007/s41693-024-00126-w"
pdf="slam2ref.pdf"
/>}}

{{<paper.def
label="long-term-inspection-mapping"
page={page}
doi="10.1371/journal.pone.0328169"
pdf="inspection-article.pdf"
/>}}
