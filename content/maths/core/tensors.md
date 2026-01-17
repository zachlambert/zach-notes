+++
title = "Tensors"
weight = 2
[extra]
status = "wip"
description = "How to differentiate functions of vectors"
+++

There are two approaches to understanding tensors:
- The proper mathematical approach, which describes them in an abstract, generalised way
- The machine learning approach, which treats them as generalised matrices

For most engineering use cases, we can take the second approach.  
In fact, we already take this approach when working with matrices. Matrices themselves are just a second order tensor, but defined for some coordinate system.

A matrix $A$ is a 2d array of values:
$$
A \in \mathbb{R}^{n \times m} \quad A_{i,j} = \textrm{Element (i, j) in } A
$$

A matrix is a linear transformation of a vector $y = Ax$ defined as:
$$
y_i = \sum_{j = 1}^m A_{ij}x_i
$$
