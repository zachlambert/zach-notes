+++
title = "Trees"
weight = 4
[extra]
status = "wip"
+++

# Types of tree

A tree is a directed acyclic graph.

Types of tree:

- Binary: tree is a tree where each node only has two children.

- Binary search tree (BST): each node has an element, such that all elements in the left sub-tree are "less than" this element, all in the right sub-tree are "greater than", according to some suitable ordering.A "search tree" is a tree where each node represents an element

- Balancing BST: each sub-tree is roughly the same length, allowing for efficient queries.

# Self-balancing search trees

For a standard binary search tree:

- Average case insertion/removal/access is `O(logn)`
- Worst-case insertion/removal/access is `O(n)`

The average case only occurs for elements if it is a **balanced tree**: The number of elements within each subtree at each node is roughly the same.

Otherwise, you can end up with certain leaf nodes that have much greater depth than others, up to the worst case where nodes are all arranged linearly, and you just get a standard list.

A self-balancing search tree attempts to re-balance in order to maintain a better tree structure.

A red-black tree is one implementation of a self-balancing search tree.

## Implementation details

TODO

# Binary search tree operations

Operations:

- Search: Find an element
- Insert: Insert an element in order
- Delete: Remove an element (by value)

Each operation takes `O(logn)` in best/average case, `O(n)` in worst-case.
Worst-case only occurs for unbalanced tree, so if using self-balancing tree, will always have `O(logn)`

This is because the "search" part of the operation is proportional to the height of the tree, which is average case 'logn', worst case `n`. Once it is found, insertion and deletion are `O(1)`.

If inserting or deleting by iterator, `O(1)` since don't need to do the search.

# General tree operations

## Search

Search for an item in a tree.

Different approaches:

- Depth-first: exhausitvely checks one sub-tree before the next
- Breadth-first: Checks each child at the given level, then goes one level deeper in each after checking each
