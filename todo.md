## Context Node

- Remove Push Context Node Command
  - Compiler should assume
    - dynamic props on el pushes context node
    - each dynamic child of el pushes context node


## Compiler

### Reconsider update prop bytecode operands

Currently dynamic props are represented in the update bytecode as...

```
[PROP_BYTECODE, ((DYNAMIC_PROP_INDEX << 16) | (STATIC_PROP_NAME_INDEX)) ]
```

Pros:
- Consistency: all update bytecodes have >>one<< operand
- Memory: update bytecode is smaller

Cons:
- Runtime Performance: bitwise operation overhead to decode dynamic index and static index
- Size: 0, 1 => 65536


#### Proposal: Prop update bytecode has 2 operands

Considerations:
- This will make the xrerender and/or all update bytecodes a bit more complicated as the update prop bytecode will be a special case that consumes 2 operands (instead of just 1)
