+++
title = "Key Terms"
weight = 1
+++

## Types of "machine learning"

Classical supervised machine learning:
- Linear and logistic regression
- Gradient-boosted trees and random forests
- Support vector machines
- Shallow neural networks

Classical unsupervised machine learning:
- k-means clustering 
- PCA

Deep learning describes the innovation on top of neural networks that made them more powerful:
- Deeper neural networks (hence the name), which allows the network to model and learn much more general/hierarchical relationships.
- The ability to train these networks, via better compute and better optimisation/training approaches.

## Neural network basics

A neural network is a function $y = f(x)$ composed of several layers of transformation.

Each layer defines a vector mapping:
- $a_{i-1}$ = activation from the layer $i-1$
- $z_i = W_ia_{i-1} + b_i$ = The pre-activation for layer $i$, for weights $W_i$ and bias $b_i$.
- $a_i = \sigma_i(z_i)$ = The activation for layer $i$, for activation function $\sigma_i(z)$.

This consists of a "linear" (technically affine) and "non-linear" part.

The input layer sets $a_0 = x$ (ie: Just outputs the input).

The output layer depends on the task. For binary classification, it maps the activation of the final layer into a single scalar and then applies softmax.

All the intermediate layers are called hidden layers.

## Types of neural network

Traditional neural network:
- Input and activation = vector
- Linear mapping = Weight matrix + vector bias
- Non-linear mapping = Activation function per component

Convolutional neural network (CNN):
- Input and activation = image
- Linear mapping = Convolution with a kernel
    - Same kernel across the whole image
    - Naturally models translational invariance
    - Naturally models the concept of a "neighbourhood" where a given output activation only depends on the neraby pixels

Graph neural network (GNN)
- Input and activation = graph, where each node has a scalar value
- 

A CNN is a special case of a GNN, where the graph forms a grid.
