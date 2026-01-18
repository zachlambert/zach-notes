+++
title = "Improved techniques for grid mapping with rao-blackwellized particle filters"
+++

[paper](paper.pdf)

See the [GMapping](https://openslam-org.github.io/gmapping.html) page which gives this paper as the basis for the implementation.

Only applies to a 2D world with a 2D lidar scanner.

Typically this would be used to construct a 2D occupancy map and then assuming this remains fixed, use AMCL for relocalisation once the map is built.

# Algorithm

Estimate the joint posterior $p(x*{1:t}, m | z*{1:t}, u\_{1:t-1}) for:

- Pose trajectory $x_{1:t}$
- Map $m$
- Measurements $z_{1:t}$
- Inputs $u_{1:t-1}$

Factorises as:

$$
p(x_{1:t}, m | z_{1:t}, u_{1:t-1}) = p(m | x_{1:t}, z_{1:t}) \cdot p(x_{1:t} | z_{1:t}, u_{1:t-1})
$$

This splits the problem into:

- Estimate $p(x_{1:t} | z_{1:t}, u_{1:t-1})$ which finds the pose trajectory separate to the map estimate.
- Estimate $p(x_{1:t} | x_{1:t}, z_{1:t})$ which is just building an occupancy map from known poses and measurements, which is simple.

This factorisation is called **rao-blackwellization**

For the pose trajectory estimate, this uses a particle filter where each particle contains a sampled trajectory and an associated map.

## Rough overview of pose estimation

See paper for details.

In general, a particle filter consists of:

- Sample the next state via a proposal distribution
- Evaluate the actual (unnormalised) probability of this state as a combination of:
  - The probability based off the motion model, independent of measurements
  - The likelihood of the measurements given this state
- Set the particle weight based off the probability and resample according to these weights
- The weighted state average over all particles represents the state estimate.

For this case:

- The map associated with each particle is used for the measurement model in the next timestep
- Following this, the map is then updated with the new measurements

The key component to get this algorithm to work is to have a sensible proposal distribution.

- This needs to generate a good density of particles with significant weight.
- Let's say you have a poor proposal distribution, eg: it only generates a couple of particles that are likely and the rest with near-zero weight.
- Then when resampling, you only get a few particles to continue with.

## Choosing a proposal distribution

An obvious choice for proposal distribution is to use odometry with gaussian noise around this.

However, it turns out this is highly suboptimal, especially when the sensor information is much more precise than the motion estimate via odometry.

Instead, make use of the new measurement to choose a better proposal distribution:

- Use scan matching to find the best alignment of the new scan against the current particle map.
- Define a gaussian distribution near this
- Specifically, to choose a suitable gaussian:
  - Choose a region around the scan-matched pose
  - Randomly sample points within this region
  - Evaluate the likelihood for each of these samples
  - Fit a gaussian to this set of data points, by evaluating the mean and covariance
  - Note: The mean may be slightly offset from the scan matched pose

In cases where there are multiple candiates for scan alignment, fit a gaussian around each.

## Adaptive resampling

Only resample particles when necessary, otherwise you can get rid of useful particles.

A metric for how well the particles estimate the posterior distribution is given by the dispersion of the particle weights. ie: If they are all similar, it is a good distribution, but if you have a large spread, then it's poor.

This metric can be evaluated simply. If it falls below a given threshold, then resampling occurs. Otherwise all particles are retained from one timestep to the next.
