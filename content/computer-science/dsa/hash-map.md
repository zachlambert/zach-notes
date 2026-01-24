+++
title = "Hash map"
weight = 2
[extra]
status = "wip"
+++

Stores unordered key/value pairs.

Main concept is hashing where:

- A **hash function** maps a key K -> hash code, designed such that each unique key gives a unique hash code.
  - Wants to minimise **hash collisions** where two keys have the same hash code
- Stores a set of N **buckets** (or slots), such that a key/value pair is stored in the bucket with index `i = hash(K) % N`
- Each bucket contains a list of items, this can be done with fixed memory allocation (ie: each bucket has its size reserved up-front) or it can grow dynamically (such that each bucket maintains a separate d-array or linked list)
- There are several schemes for how collisions are handled when a bucket becomes free. Either this can grow, or the element can be stored in the next bucket.
- Maintains a variable called the **load factor** = number of entries / number of buckets. Once this reaches a threshold, the hash map is resized with a larger numberof buckets.
- Similar to a dynamic array, will periodically need to re-size and move everything as it grows, but this amortized cost is `O(1)`.

When querying:

- Find the bucket index (`O(1)`)
- Iterate through the bucket index until the element is found
  - If there are sufficient number of buckets relative to the number of items (load factor remains low), then this is practically `O(1)`, but worst-case `O(n)`.

Note: In general a **hash table** is a data structured that stores hashed data, and a **hash map** is when this used to implemented an unsorted map, which stores key/value pairs.

Operations:

- Insertion: amortized `O(1)`
- Removal: `O(1)`
- Search: `O(1)`

Technically, the worst case for these operations is `O(n)` if all elements map to the same bucket, but for any hash function used in practice, this is probabilistically impossible.
