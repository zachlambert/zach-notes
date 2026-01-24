+++
title = "3D Lidar SLAM survey"
+++

{{ paper(
doi="10.1111/phor.12497"
pdf="3d-lidar-slam-survey.pdf"
) }}

Summarises various approaches to lidar slam:
- Defines frontend vs backend
- Explores lidar-only slam, with feature-based, direct methods, or semantically enhacned appraches.
- Then looks at combining lidar with imu and/or vision.

The main question I was looking for was how to construct pose-graphs and do loop closure with direct lidar odometry methods. I didn't see this explored clearly.

One key point given is that robust loop closure with lidar only is essentially unsolved. In my mind, it makes no sense to rely on lidar for this due to there always being the possibility of geometrically similar areas (ie: corridors). Therefore the two approaches I would like to see explored more are:
- Using visual for loop closure detection. Possibly see if there are more modern deep-learned approaches to place recognition.
- Using hypothesis tracking for loop closure and relocalisation, which track hypotheses for a certain trajectory length to ensure they remain consistent over the trajectory, not just a single location.

Secondly, it also mentions deep-learned approaches to odometry, but seems like there is no clear benefit over geometric approaches, and they don't generalise well. Therefore, I think deep learning only makes sense for:
- Feature extraction for loop-closure and/or relocalisation (on top of geometric-based methods for validating this)
- Segmenting certain classes of dynamic obstacle which may degrade tracking performance.

For semantic lidar approaches, it's not clear to me the benefit of this outside of highly specific use cases, such as self-driving cars.
