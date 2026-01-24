+++
title = "Sorting"
weight = 3
[extra]
status = "wip"
+++

# Merge sort

Recursively:

- Given a sequence to sort
- Base case = if the sequence has length 1
- Splits the sequence in two and sorts each
- After these are sorted (so now returning back up the call stack), it then merges the two sequences
  - Jointly iterates through each (maintains a "head" iterator for each sub-sequence)
  - Compares the element at each sequence head, then appends the smaller of the two to the new sequence

Time complexity:

- Best: `O(nlogn)`
  - If already sorted, still needs to traverse everything
- Average: `O(nlogn)`
- Worst: `O(nlogn)`
  - If already sorted in the opposite direction, still needs to traverse everything

Space complexity: `O(n)`

- Maintains two lists to work with for the split and merged list

Same complexity as quicksort, but in practice slower.

# Quicksort

Recursively:

- Partitions the sequence into two
- Partitions each sub-sequence
- Base case = sequence has length 1

Partitionining is:

- Return an index to an element in the sequence, the "partition index"
- All items to the left of this element are smaller than the partition element
- All items to the right of this element are larger than the partition element

All of this is done **in-place**.

One possible partition algorithm is:

- Choose the partition element as the final element in the sequence
- Shift all elements smaller than this to the start of the sequence
- Maintain an index for the "tail" of this "less-than sequence"
  - Initialise `tail = 0`
  - This is the "one-past-the-end" index
  - The final element in the "less-than sequence" is at (tail-1)
  - Initially there are no elements in this sequence
- Iterate through the sequence
  - If an element is encountered that is less-than or equal to the partition element
  - Move this into the "less-than sequence" by **swapping** with the element at the current tail and incrementing the tail
- Once reaching the end (where the partition element is) this will also satisfy the "less-than or equal" condition and swap the parition element to the back of the "less-than sequence".
- Return the tail as the index of this final element (ie: don't increment the tail after swapping the final element into it), then return the tail

Time complexity:

- Best: `O(nlogn)`
  - Each partion splits into exactly two pieces
  - Takes `nlog_2(n)` operations
- Average: `O(nlogn)`
  - Still proportional to `O(nlogn)` approximately
- Worst: `O(n^2)`
  - Each partition splits into a sequence of `(n-1)` and `0`, where the partition index is at the end

For the simple partition scheme outlined above, having the sequence already ordered gives the worst case. In practice, there are more suitable choices for the partition element.

Space complexity:

- $O(n)$
- Can be sorted in-place

In practice, the most efficient algorithm, probably because it can be done in-place.

# Bubble sort

Algorithm:

- Iteratively compares each pair and swaps them if they aren't ordered.
- Then repeats but starting from the first element instead.

Time complexity: `O(n^2)` in all cases
