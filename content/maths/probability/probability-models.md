+++
title = "Probability models"
weight = 3
[extra]
status = "wip"
+++

For a random variable $X$, a probability model is just how we model the probability distribution
$$
X \sim p(x)
$$

The concept is relevant when we have a joint distribution over a set of random variables $X = \\{X_1, \ldots, X_n\\}$.

Specific classes of probability model allow different **factorisations** of the function $p(x)$ that make it simpler to work with, based off the idea of conditional independence.

## State space models

TODO: Specific problem of modelling a discrete state trajectory + observations. Prerequisite to then exploring HMMs later.

## Markov models

TODO: Explain markov models and hidden markov models first as a concrete example.

Then can explore the generic types of model in alter sections.

## Graphical models

TODO: Separate into different headers and expand on each in more detail with diagrams.

Have a set of $n$ variables $\\{ X_i \\}_{i=1}^n$.

**Bayesian network**
- For each variable, have the conditional variable $p(X_i | X_j, X_k, \ldots)$
- This only depends on a subset of the variables, and is conditionally independent of the other variables.
- Defines a _directed_ graph where:
  - Each node is a random variable
  - A directed edge is defined from $X_j \to X_i$ for every variable $X_j$ that variable $X_i$ depends on in $p(X_i | X_j, \ldots)$

**Markov network**
- We don't have any explicit parameterisations $p(X_i | X_j, X_k, \ldots)$
- Instead, define a set of **cliques** $\\{D_j\\}$ which are subgraphs within the graph:  
$D_j = \\{ X_{j_1}, X_{j_2}, \ldots \\}$ for some subset of variables  
**Note**: Variables can belong to multiple cliques!
- For each clique, define a **factor** $\psi_j(D_j)$ that encodes the (unnormalised) probability for a given set of these variables.
- This defines a **gibbs distribution**  with the appropriate normalisation factor $\eta$ called the **partition function**, such that the overall distribution is:
$$
p(X) = \eta \sum_j \psi_j(D_j)
$$

**Factor graph**
- A factor graph is an alternative, more manageable form of a markov network.
- Instead, it defines a graph with two node types:
  - Variable nodes (represented as circles): The random variables
  - Factor nodes (represented as squares): The cliques
- Factor nodes connect to all variables within the clique, which makes the relation between variables/cliques easier to visualise.
- Often we can further simplify this if all factors are one of the following type:
  - **Unary factors**: A factor has one neighbour (one variable in the clique)
  - **Binary factors**: A factor has two neighbours (two variables in the clique)
- If a graph consists of unary/binary factors only, you can:
  - Denote binary factors as edges between the variable nodes directly
  - Only include factor nodes to represent unary factors.

**Conditional random field (CRF)**
- A specific type of markov network that splits the variables into state variables $X$ and observations $Y$ such that each state $X_i$ only depends on it's immediate neighbours, conditioned on the observations $Y$.
- Model the relationships $P(Y|X)$
- TODO: More details

## Temporal models

Temporal models 
