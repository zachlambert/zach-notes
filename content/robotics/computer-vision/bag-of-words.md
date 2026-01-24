+++
title = "Bag of words"
weight = 20
+++

## Image features

For a given image we can extract a set of **features** which consist of:
- A **keypoint**: A "salient" position in the image
- A **descriptor**: A vector that characterises the appearance of a small image patch around the keypoint.

The idea is that similar-looking areas of the image should have similar descriptors, and these descriptors are invariant to rotation/translation, skew (ie: viewing at shallower angle) and illumination.

Features are also chosen by looking for distinct parts of the image that are sufficiently meaningful (eg: corners, rather than patches of constant uniform color).

## Place recognition and bag-of-words (BoW)

Features characterise specific points in the image only. Let's say you want to use this to see if a new image contains the same object as any image from a database of images:
- Pre-compute the features for each image in the databse
- Compute the features for the new image
- For each image in the database, for each feature in the new image, find the nearest neighbour feature in the database image and assign a match if the descriptors are similar enough.
- For the database image with the largest number of matched features, treat this is a matched image (so long as above some threshold).

As you can imagine, this is very inefficient with a large database of images.

In the context of robotics, this problem is called **place recognition**. (or visual place recognition)

A more efficient approach is to use keypoint clustering:
- Define a set of $K$ cluster keypoints, called **codewords**
- For each feature, find which codeword it is nearest to
- For each image, find a **histogram** of codewords - a $K$-dimensional vector, where index $i$ is the number of features in the image assigned to codeword $i$.
- This defines a $K$-dimensional keypoint that summarises the image

Following this, the histogram descriptor can be used to search for similar images. This is essentially the same as finding which image has the greatest number of similar features, but instead of checking each feature pair individually, you instead use a clustering approach to approximate the similarity checks.

This approach is called the **bag-of-words** and the set of codewords is called the **vocabulary**. The idea was first introduced in language modelling for summarising documents of text.

The crux of this problem is how you construct the vocabulary in order to properly represent the features (ie: each feature has a codeword it is sufficiently similar to).

To generate the vocabulary:
- Start with a large dataset of images which capture your scenario of interest
- Calculate the set of features over all images
- Perform k-menas clustering over all the descriptors found in all iages, and create a codeword for all cluster centres.

**k-means clustering** = partitioning the input set into $k$ clusters which minimises the sum of squares of the error between each input vector and the nearest cluster centre.

## Extensions

Extensions on top of basic bag-of-words just explore different ways to make it more efficient.

These include:
- Distributed bag of words (DBoW)
- Hashing-based bag of words (HashBoW)

Both of these have corresponding C++ libraries, can check these for further details if necessary.

## Deep learning methods

Place recognition is a task where deep-learning approaches are likely to perform well, assuming the training data matches the use case.

TODO: Summarise state-of-the-art approaches here, advantages over traditional methods.
