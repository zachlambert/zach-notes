+++
title = "Containers"
weight = 1
[extra]
status = "wip"
+++

# Sequence containers

Contain a sequence of items

## Dynamic array

Contiguous block of memory. As elements are inserted, resizes by factor of 2 such that the resize cost is amortized.

Time complexity:

- Random access: `O(1)`
- Append to end: amortized `O(1)`
- Insertion at any point: `O(n)` - have to move all subsequent elements
- Pop from the back: `O(1)`
- Removal at any point: `O(n)`
- Search: `O(logn)` via binary search if sorted, otherwise `O(n)`

## Doubly linked list

Each element stores a pointer/index to the next.

Time complexity:

- Random access: `O(n)` - have to iterate
- Insertion at any point: `O(1)` - assuming iterator given
- Removal at any point: `O(1)` - assuming iterator given
- Search: always `O(n)` even if sorted

If using a singly-linked list, operations become `O(n)` since it can't access the preceding element and needs to iterate through the list to find it.

## C++ dequeue implementation

Uses a linked list of blocks of some fixed size, not sure the generic term.

Used by C++ for the dequeue container adapter:

- Allows for fast insertion/deletion at the start and end
- A dynamic array only supports fast insertion/deletion at the end
- A doubly-linked list can do this, but since the deque doesn't need to support fast insertoin/deletion at arbitrary points, it is faster.

# Container "adaptors"

The C++ term for data structures that provide a different interface, but use an existing sequence container under-the-hood.

## Stack

LIFO data structure: last in, first out.

Can use a dequeue which is better for resizing (ie: as it grows larger, more efficient to add new blocks than to resize the entire dynamic array), but for small sizes a dynamic array can be faster.

## Queue

FIFO data structure: first in, first out.

uses a dequeue.

## Priority queue

Highest-priority item is accessed first.

In C++, can use any sequence container, default is vector. Whenever an element is inserted, is is inserted in the correct order.

When the highest priority element is popped, this pops the top of the vector.
