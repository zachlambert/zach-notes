+++
title = "PTAM"
+++

{{ paper(doi="10.1109/ISMAR.2007.4538852", pdf="ptam.pdf") }}

## Rough notes

### Introduction

Many tracking applications require a prior map to start against.

Another approach is called **extensible mapping** which starts with a small prior map that provides metric scale, but then builds off of this map to allow tracking in new/adjacent areas.

However, more recent (Note: this paper was released in 2007) systems are capable of operating without this initialisation technique.

This paper aims to track without any prior map at all.

The specific application for this paper is to build a map, and then allow inserting virtual objects into it for AR workspaces.

### Method overview in the context of SLAM

Method can be summarised as:
- Tracking and mapping are separated and run in two parallel threads
- Mapping is based on keyframes, which are processed using batch techniques (bundle adjustment)
- Map is densely initialised from a stereo pair (5-point algorithm)
- New points are initialised with an epipolar search
- Large numbers (thousands) of points are mapped
