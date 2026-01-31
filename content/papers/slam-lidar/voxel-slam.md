+++
title = "Voxel-SLAM"
+++

{{ paper(
doi="10.48550/arXiv.2410.08935",
pdf="voxel-slam.pdf"
)}}

Repo: <https://github.com/hku-mars/Voxel-SLAM>

# Rough notes

## Introduction

Doing full lidar slam over just lidar odometry makes use of 4 different types of data association:
- **Short-term data association**: Associate current scan to a local map to estimate odometry. New scans may or may not update the local map until a new keypoint.
- **Mid-term data association**: Bundle adjustment over a small window of prior poses and local map.
- **Long-term data association**: ie: Loop closure + PGO (pose graph optimisation). Can be further improved with global BA.
- **Multi-map data associatio**: Associating multiple map sessions, using similar methods to long-term data association. 

This paper implements Voxel-SLAM, which has the following modules:
- Initialisation
- Odometry + local mapping
- Loop closure + global mapping

Uses the same adaptive voxel map structure for all tasks.

## Related works

### Lidar scan registration

Local map can be a point map or a plane map ([suma](../suma), [voxelmap](../voxel-map)).

VoxelMap approach seems the best, as it uses a probabilistic representation that can be further refined, but saves on computational cost by avoiding needing to fit planes for each new scan.

This joint optimisation of the map planes + pose is what the paper is talking about when referring to bundle adjustment.

### Lidar-based place recognition

One approach = ScanContext = projects 3D lidar scan onto 2D grid, uses histogram of these cells as a descriptor.

Voxel-SLAM uses the BTC descriptor: binary triangle combined descriptor, recently introduced by "Yuan et al."

## System overview

System state at frame $i$ is:
$$
x_i = \WrapS{R_i & p_i & v_i & b_i^g & b_i^a}
$$
consisting of:
- Rotation $R_i$ of the IMU
- Position $p_i$ of the IMU
- World-frame velocity $v_i$ of the IMU
- Biases of gyroscope and accelerometer, $b_i^g$ and $b_i^a$

The world frame is defined as the first IMU frame that has it's z-axis aligned with the gravity vector, following an initialisation process.

### Workflow

Initialisation process uses a special BA process over a set of initial frames to jointly estimate the frame poses, initial local map, and the gravity vector.

The odometry component is responsible for providing the continual state estimate, and uses a tightly coupled lidar-inertial odometry algorithm.

Local mapping takes the odometry estimate between frames, and performs joint optimisation of the local map + pose history over a sliding window. Marginalises out old frames as they are removed from the sliding window.

Marginalised frames are used to create keyframes (??) which are used to search for loop closure.

### Data pyramid

Top-level = raw lidar scans, used in odometry and local mapping.

10 lidar scans are merged into one keyframe.

10 keyframes further are merged into a submap to be used in "global mapping".

These two merging processes are achieved via bundle adjustment, which concurrently optimises the poses of all lidar scans (or keyframes) with respect to the first scan (or keyframe) in the respective merging window.

When merging keyframes into submaps, two consecutive merging windows share five overlapped keyframes, which increaes the portion of covisible areas between two consecutive submaps.

### Adaptive voxel map

The voxel map maintains plane features of different voxel sizes, mainting both the plane estimate and it's covariance.

A **local adaptive voxel map** (within the distance $L_m$) is shared by the modules for initialisation, odometry and local mapping, in order to estimate the state in realtime.

This involves:
- Initialisation uses an initial set of lidar scans to define the initial local map
- Odometry aligns the current scan with the local map to estimate the new pose
- Local mapping slides the local map and refines the state of the current (and recent scans) through lidar-inertial bundle adjustment.

Two other maps are used:
- By the BTC loop closure module for descriptor extraction in a keyframe
- By the global mapping module (HBA)
