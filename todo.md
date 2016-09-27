# Port enhancements from bytecode-wip

- Only child specialization
- IC vs Object Allocation
  - compare instance structure
    1. `{spec, v1, v2, v3}`
    2. `{spec, values:{ v1, v2, v3}}`
      - Pros
        - framework has monomorphic callsites when accessing the spec (instance.$s)
          - currently 6 call sites
      - Cons
        - One more object alloc
- Pass spec into xvdom functions.  Update babel-plugin-xvdom to do so.
- Dynamic updating: tracking dynContextNodeId, dynContextNodes
- Textable helpers
- Shared type dynamic checking
