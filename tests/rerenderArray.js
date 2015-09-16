import assert         from 'assert';
import createInstance from './utils/createInstance.js';
import spyOn          from './utils/spyOn.js';
import getHTMLString  from './utils/getHTMLString.js';
import {
  createDynamic,
  rerender,
  rerenderArray,
  renderInstance,
  setDynamicProp
} from '../src/index.js';

describe('rerenderArray - newValue, previousValueAndContext, valueIndex, rerenderIndex, rerenderContextIndex', ()=>{

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(Node.prototype, 'replaceChild');
    spyOn(document, 'createElement');
    spyOn(document, 'createTextNode');
    spyOn.resetSpyCounts();
  });

  afterEach(()=>{
    spyOn.uninstall();
  });

  describe('When `newValue` is a render instance with the same spec', ()=>{
    let listNode, listValueContext, markerNode, specRerenderArgs, specRerenderCallCount;
    const LIST_SPEC = {
      render: (vc)=>{
        const div = document.createElement('div');
        div.appendChild(createDynamic(vc, 0, 1, 2));
        return div;
      }
    };

    const ITEM_SPEC = {
      render: (vc)=>document.createElement('span'),
      rerender: (...args)=>{
        specRerenderArgs.push(args);
        specRerenderCallCount++;
      }
    };
    const INITIAL_ARRAY = [
      {
        key: 'one',
        spec: ITEM_SPEC,
        values: [1]
      },
      {
        key: 'two',
        spec: ITEM_SPEC,
        values: [2]
      }
    ];

    const NEXT_ARRAY = [
      {
        key: 'one',
        spec: ITEM_SPEC,
        values: [11]
      },
      {
        key: 'two',
        spec: ITEM_SPEC,
        values: [12]
      }
    ];

    beforeEach(()=>{
      listValueContext = [
        INITIAL_ARRAY,
        null,
        null
      ];
      listNode = renderInstance(
        createInstance(null, LIST_SPEC, listValueContext)
      );

      markerNode = listNode.lastChild;

      specRerenderArgs = [];
      specRerenderCallCount = 0;

      rerenderArray(NEXT_ARRAY, listValueContext, 0, 1, 2);
    });

    describe('For each item', ()=>{
      it('calls spec `rerender()`', ()=>{
        assert.equal(specRerenderCallCount, 2);
        assert.equal(specRerenderArgs[0][0], NEXT_ARRAY[0].values);
        assert.equal(specRerenderArgs[0][1], INITIAL_ARRAY[0].values);

        assert.equal(specRerenderArgs[1][0], NEXT_ARRAY[1].values);
        assert.equal(specRerenderArgs[1][1], INITIAL_ARRAY[1].values);
      });

      it('previousValuesContext value is updated', ()=>{
        assert.equal(listValueContext[0], NEXT_ARRAY);
      });

      it('previousValuesContext rerender function is `rerenderInstance`', ()=>{
        assert.equal(listValueContext[1], rerenderArray);
      });

      it('previousValuesContext context is the node', ()=>{
        assert.equal(listValueContext[2], markerNode);
      });
    });
  });

  describe('Arrays', ()=>{
    const PARENT_SPEC = {
      render: vc=>{
        const div = document.createElement('div');
        div.appendChild(createDynamic(vc, 0, 1, 2));
        return div;
      },
      rerender: (v, vc)=>{ vc[1](v[0], vc, 0, 1, 2); }
    };

    const CHILD_SPEC = {
      render: vc=>{
        const div = document.createElement('div');
        setDynamicProp(div, 'className', vc, 0, 1, 2);
        return div;
      },
      rerender: (v, vc)=>{ vc[1]('className', v[0], vc, 0, 1, 2); }
    };

    it('Update array items', ()=>{
      const parentNode = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['1']),
            createInstance(2, CHILD_SPEC, ['2']),
            createInstance(3, CHILD_SPEC, ['3'])
          ]
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="1"></div>'+
          '<div class="2"></div>'+
          '<div class="3"></div>'+
        '</div>'
      );

      rerender(parentNode,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['4']),
            createInstance(2, CHILD_SPEC, ['5']),
            createInstance(3, CHILD_SPEC, ['6'])
          ]
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="4"></div>'+
          '<div class="5"></div>'+
          '<div class="6"></div>'+
        '</div>'
      );
    });

    it('Reordering', ()=>{
      const parentNode = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['1']),
            createInstance(2, CHILD_SPEC, ['2']),
            createInstance(3, CHILD_SPEC, ['3'])
          ]
        ])
      );

      spyOn.resetSpyCounts();

      rerender(parentNode,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(3, CHILD_SPEC, ['3']),
            createInstance(2, CHILD_SPEC, ['2']),
            createInstance(1, CHILD_SPEC, ['1'])
          ]
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="3"></div>'+
          '<div class="2"></div>'+
          '<div class="1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      rerender(parentNode,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['1']),
            createInstance(3, CHILD_SPEC, ['3']),
            createInstance(2, CHILD_SPEC, ['2'])
          ]
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="1"></div>'+
          '<div class="3"></div>'+
          '<div class="2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Reordering 2', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['1']),
            createInstance(2, CHILD_SPEC, ['2']),
            createInstance(3, CHILD_SPEC, ['3'])
          ],
          null,
          null
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="1"></div>'+
          '<div class="2"></div>'+
          '<div class="3"></div>'+
        '</div>'
      );
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(2, CHILD_SPEC, ['2']),
            createInstance(1, CHILD_SPEC, ['1']),
            createInstance(3, CHILD_SPEC, ['3'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="2"></div>'+
          '<div class="1"></div>'+
          '<div class="3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Reordering 3', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['0']),
            createInstance(1, CHILD_SPEC, ['1']),
            createInstance(2, CHILD_SPEC, ['2']),
            createInstance(3, CHILD_SPEC, ['3'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="0"></div>'+
          '<div class="1"></div>'+
          '<div class="2"></div>'+
          '<div class="3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 5);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(2, CHILD_SPEC, ['21']),
            createInstance(3, CHILD_SPEC, ['31']),
            createInstance(0, CHILD_SPEC, ['01']),
            createInstance(1, CHILD_SPEC, ['11'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="21"></div>'+
          '<div class="31"></div>'+
          '<div class="01"></div>'+
          '<div class="11"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 4);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Reordering in the middle of statics', ()=>{
      const parentWithStaticsSpec = {
        render: vc=>{
          const div = document.createElement('div');
          div.appendChild(document.createElement('a'));
          div.appendChild(createDynamic(vc, 0, 1));
          div.appendChild(document.createElement('b'));
          return div;
        },
        rerender: (v, vc)=>{ vc[1](v[0], vc, 0, 1, 2); }
      };

      const target = renderInstance(
        createInstance(null, parentWithStaticsSpec, [
          [
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<a></a>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 6);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();
    });

    it('Add to the start', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0'])
          ]
        ])
      );
      const childEl0 = target.querySelector('._0');

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(0, CHILD_SPEC, ['_0'])
          ]
        ])
      );
      const childEl1 = target.querySelector('._1');

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_1"></div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      spyOn.resetSpyCounts();


      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(0, CHILD_SPEC, ['_0'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_2"></div>'+
          '<div class="_1"></div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      assert.equal(childEl1, target.querySelector('._1'));
      spyOn.resetSpyCounts();
    });

    it('Add in the middle', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 5);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),

            createInstance(4, CHILD_SPEC, ['_New1']),
            createInstance(5, CHILD_SPEC, ['_New2']),

            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_New1"></div>'+
          '<div class="_New2"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),

            createInstance(4, CHILD_SPEC, ['_New1']),

            createInstance(6, CHILD_SPEC, ['_New1_1']),
            createInstance(7, CHILD_SPEC, ['_New1_2']),

            createInstance(5, CHILD_SPEC, ['_New2']),

            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_New1"></div>'+
          '<div class="_New1_1"></div>'+
          '<div class="_New1_2"></div>'+
          '<div class="_New2"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Add in the middle and end', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(2, CHILD_SPEC, ['_New_0_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(3, CHILD_SPEC, ['_New_1_0'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_New_0_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_New_1_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Add to the end', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0'])
          ]
        ])
      );
      const childEl0 = target.querySelector('._0');

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1'])
          ]
        ])
      );
      const childEl1 = target.querySelector('._1');

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      spyOn.resetSpyCounts();


      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      assert.equal(childEl1, target.querySelector('._1'));
      spyOn.resetSpyCounts();
    });

    it('Remove from the start', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      spyOn.resetSpyCounts();


      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
    });

    it('Remove from the middle', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3']),
            createInstance(4, CHILD_SPEC, ['_4']),
            createInstance(5, CHILD_SPEC, ['_5'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
          '<div class="_4"></div>'+
          '<div class="_5"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 7);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(4, CHILD_SPEC, ['_4']),
            createInstance(5, CHILD_SPEC, ['_5'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_4"></div>'+
          '<div class="_5"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();


      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(5, CHILD_SPEC, ['_5'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_5"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 2);
    });

    it('Remove from the middle and end', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3']),
            createInstance(4, CHILD_SPEC, ['_4']),
            createInstance(5, CHILD_SPEC, ['_5'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
          '<div class="_4"></div>'+
          '<div class="_5"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 7);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3']),
            createInstance(4, CHILD_SPEC, ['_4'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
          '<div class="_4"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();


      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 2);
    });

    it('Remove from the end', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      spyOn.resetSpyCounts();


      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
    });

    it('Remove from the start and end', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3']),
            createInstance(4, CHILD_SPEC, ['_4']),
            createInstance(5, CHILD_SPEC, ['_5'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
          '<div class="_4"></div>'+
          '<div class="_5"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 7);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3']),
            createInstance(4, CHILD_SPEC, ['_4'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
          '<div class="_4"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 4);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 2);
    });

    it('All removed', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          []
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 3);
      spyOn.resetSpyCounts();

      debugger;
      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Initially empty', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          []
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, CHILD_SPEC, ['_0']),
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 3);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Array of Arrays', ()=>{
      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, PARENT_SPEC, [
              [createInstance(1, CHILD_SPEC, ['_1_1'])]
            ])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<div class="_1_1"></div>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 2);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_1_1']),
                createInstance(2, CHILD_SPEC, ['_1_2'])
              ]
            ])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<div class="_1_1"></div>'+
            '<div class="_1_2"></div>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_1_1']),
                createInstance(2, CHILD_SPEC, ['_1_2'])
              ]
            ]),
            createInstance(2, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_2_1']),
                createInstance(2, CHILD_SPEC, ['_2_2'])
              ]
            ])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<div class="_1_1"></div>'+
            '<div class="_1_2"></div>'+
          '</div>'+
          '<div>'+
            '<div class="_2_1"></div>'+
            '<div class="_2_2"></div>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_0_1']),
                createInstance(2, CHILD_SPEC, ['_0_2']),
                createInstance(3, CHILD_SPEC, ['_0_3'])
              ]
            ]),
            createInstance(1, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_1_1']),
                createInstance(2, CHILD_SPEC, ['_1_2'])
              ]
            ]),
            createInstance(2, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_2_1']),
                createInstance(2, CHILD_SPEC, ['_2_2'])
              ]
            ])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<div class="_0_1"></div>'+
            '<div class="_0_2"></div>'+
            '<div class="_0_3"></div>'+
          '</div>'+
          '<div>'+
            '<div class="_1_1"></div>'+
            '<div class="_1_2"></div>'+
          '</div>'+
          '<div>'+
            '<div class="_2_1"></div>'+
            '<div class="_2_2"></div>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(0, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_0_1']),
                createInstance(2, CHILD_SPEC, ['_0_2']),
                createInstance(3, CHILD_SPEC, ['_0_3'])
              ]
            ]),
            createInstance(2, PARENT_SPEC, [
              [
                createInstance(1, CHILD_SPEC, ['_2_1']),
                createInstance(2, CHILD_SPEC, ['_2_2'])
              ]
            ])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<div class="_0_1"></div>'+
            '<div class="_0_2"></div>'+
            '<div class="_0_3"></div>'+
          '</div>'+
          '<div>'+
            '<div class="_2_1"></div>'+
            '<div class="_2_2"></div>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
    });


    describe('Changing dynamic type: Array to ...', ()=>{
      let target;

      function rerenderAndValidateArray(){
        spyOn.resetSpyCounts();
        rerender(target,
          createInstance(null, PARENT_SPEC, [
            [
              createInstance(0, CHILD_SPEC, ['_0']),
              createInstance(2, CHILD_SPEC, ['_2'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<div class="_0"></div>'+
            '<div class="_2"></div>'+
          '</div>'
        );

        assert.equal(document.createElement.count , 2);
        assert.equal(document.createTextNode.count, 1);
      }

      beforeEach(()=>{
        target = renderInstance(
          createInstance(null, PARENT_SPEC, [
            [
              createInstance(0, CHILD_SPEC, ['_0']),
              createInstance(1, CHILD_SPEC, ['_1']),
              createInstance(2, CHILD_SPEC, ['_2'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<div class="_0"></div>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
          '</div>'
        );
        assert.equal(document.createElement.count, 4);
        assert.equal(document.createTextNode.count, 1);
        spyOn.resetSpyCounts();
      });

      it('Element', ()=>{
        rerender(target,
          createInstance(null, PARENT_SPEC, [
            createInstance(null, CHILD_SPEC, ['_777'])
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<div class="_777"></div>'+
          '</div>'
        );

        assert.equal(document.createElement.count , 1);
        assert.equal(document.createTextNode.count, 0);
        assert.equal(Node.prototype.insertBefore.count, 0);
        assert.equal(Node.prototype.removeChild.count, 3);
        assert.equal(Node.prototype.replaceChild.count, 1);
        assert.equal(target.childNodes.length, 1);

        rerenderAndValidateArray();
      });

      it('Text', ()=>{
        rerender(target,
          createInstance(null, PARENT_SPEC, [
            '_777'
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '_777'+
          '</div>'
        );

        assert.equal(document.createElement.count , 0);
        assert.equal(document.createTextNode.count, 1);
        assert.equal(Node.prototype.insertBefore.count, 0);
        assert.equal(Node.prototype.removeChild.count, 3);
        assert.equal(Node.prototype.replaceChild.count, 1);
        assert.equal(target.childNodes.length, 1);

        rerenderAndValidateArray();
      });
    });

    describe('In the middle of statics', ()=>{
      const parentWithStaticsSpec = {
        render: vc=>{
          const div = document.createElement('div');
          div.appendChild(document.createElement('a'));
          div.appendChild(createDynamic(vc, 0, 1));
          div.appendChild(document.createElement('b'));
          return div;
        },
        rerender: (v, vc)=>{ vc[1](v[0], vc, 0, 1); }
      };
      let target;

      beforeEach(()=>{
        target = renderInstance(
          createInstance(null, parentWithStaticsSpec, [
            [
              createInstance(1, CHILD_SPEC, ['_1']),
              createInstance(2, CHILD_SPEC, ['_2']),
              createInstance(3, CHILD_SPEC, ['_3'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<div class="_3"></div>'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count, 6);
        assert.equal(document.createTextNode.count, 1);
        spyOn.resetSpyCounts();
      });

      it('Reordering', ()=>{
        rerender(target,
          createInstance(null, parentWithStaticsSpec, [
            [
              createInstance(3, CHILD_SPEC, ['_3']),
              createInstance(2, CHILD_SPEC, ['_2']),
              createInstance(1, CHILD_SPEC, ['_1'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_3"></div>'+
            '<div class="_2"></div>'+
            '<div class="_1"></div>'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);
        assert.equal(document.createTextNode.count, 0);
      });

      it('Adding', ()=>{
        rerender(target,
          createInstance(null, parentWithStaticsSpec, [
            [
              createInstance(1, CHILD_SPEC, ['_1']),
              createInstance(2, CHILD_SPEC, ['_2']),
              createInstance(3, CHILD_SPEC, ['_3']),
              createInstance(4, CHILD_SPEC, ['_4'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<div class="_3"></div>'+
            '<div class="_4"></div>'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  1);
        assert.equal(document.createTextNode.count, 0);
        spyOn.resetSpyCounts();

        rerender(target,
          createInstance(null, parentWithStaticsSpec, [
            [
              createInstance(0, CHILD_SPEC, ['_0']),
              createInstance(1, CHILD_SPEC, ['_1']),
              createInstance(2, CHILD_SPEC, ['_2']),
              createInstance(3, CHILD_SPEC, ['_3']),
              createInstance(4, CHILD_SPEC, ['_4'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_0"></div>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<div class="_3"></div>'+
            '<div class="_4"></div>'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  1);
        assert.equal(document.createTextNode.count, 0);
      });

      it('Removing', ()=>{
        rerender(target,
          createInstance(null, parentWithStaticsSpec, [
            [
              createInstance(1, CHILD_SPEC, ['_1']),
              createInstance(2, CHILD_SPEC, ['_2'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);
        assert.equal(document.createTextNode.count, 0);
        spyOn.resetSpyCounts();

        rerender(target,
          createInstance(null, parentWithStaticsSpec, [
            [
              createInstance(2, CHILD_SPEC, ['_2'])
            ]
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_2"></div>'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);
        assert.equal(document.createTextNode.count, 0);

        rerender(target,
          createInstance(null, parentWithStaticsSpec, [
            []
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);
        assert.equal(document.createTextNode.count, 0);
      });
    });

    it('Update array items (item changes spec)', ()=>{
      const childSpec2 = {
        render: vc=>{
          const a = document.createElement('a');
          setDynamicProp(a, 'id', vc, 0, 1);
          return a;
        },
        rerender: (v, vc)=>{ vc[1]('id', v[0], vc, 0, 1); }
      };

      const target = renderInstance(
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, CHILD_SPEC, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, CHILD_SPEC, ['_3'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 4);
      assert.equal(document.createTextNode.count, 1);
      spyOn.resetSpyCounts();

      rerender(target,
        createInstance(null, PARENT_SPEC, [
          [
            createInstance(1, childSpec2, ['_1']),
            createInstance(2, CHILD_SPEC, ['_2']),
            createInstance(3, childSpec2, ['_3'])
          ]
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<a id="_1"></a>'+
          '<div class="_2"></div>'+
          '<a id="_3"></a>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });

    //
    // it('Array item changes templates', ()=>{
    //   const TMPL2 = {el:'span', children:[0]};
    //
    //   patch(target, {
    //     template: TMPL,
    //     values: [
    //       [
    //         {key:0, template:TMPL2, values:['0']},
    //         {key:1, template:TMPL2, values:['1']}
    //       ]
    //     ]
    //   });
    //   assert.equal(getHTMLString(target),
    //     '<div>'+
    //       '<span>0</div>'+
    //       '<span>1</div>'+
    //     '</div>'
    //   );
    //   assert.equal(document.createElement.count, 3);
    //   assert.equal(document.createTextNode.count, 2);
    //   spyOn.resetSpyCounts();
    //
    //   patch(target, {
    //     template: TMPL,
    //     values: [
    //       [
    //         {key:0, template:TMPL, values:[
    //           [
    //             {key:0, template:TMPL2, values:['0']},
    //             {key:1, template:TMPL2, values:['1']}
    //           ]
    //         ]},
    //         {key:1, template:TMPL, values:[
    //           [
    //             {key:0, template:TMPL2, values:['0']},
    //             {key:1, template:TMPL2, values:['1']}
    //           ]
    //         ]}
    //       ]
    //     ]
    //   });
    //   assert.equal(getHTMLString(target),
    //     '<div>'+
    //       '<div>'+
    //         '<span>0</div>'+
    //         '<span>1</div>'+
    //       '</div>'+
    //       '<div>'+
    //         '<span>0</div>'+
    //         '<span>1</div>'+
    //       '</div>'+
    //     '</div>'
    //   );
    //   assert.equal(document.createElement.count, 6);
    //   assert.equal(document.createTextNode.count, 4);
    //   assert.equal(Node.prototype.insertBefore.count, 0);
    //   assert.equal(Node.prototype.appendChild.count, 8);
    //   assert.equal(Node.prototype.removeChild.count, 0);
    //   spyOn.resetSpyCounts();
    //
    //   patch(target, {
    //     template: TMPL,
    //     values: [
    //       [
    //         {key:0, template:TMPL, values:[
    //           [
    //             {key:0, template:TMPL2, values:['2']},
    //             {key:1, template:TMPL2, values:['3']}
    //           ]
    //         ]},
    //         {key:1, template:TMPL, values:[
    //           [
    //             {key:0, template:TMPL2, values:['4']},
    //             {key:1, template:TMPL2, values:['5']}
    //           ]
    //         ]}
    //       ]
    //     ]
    //   });
    //   assert.equal(getHTMLString(target),
    //     '<div>'+
    //       '<div>'+
    //         '<span>2</div>'+
    //         '<span>3</div>'+
    //       '</div>'+
    //       '<div>'+
    //         '<span>4</div>'+
    //         '<span>5</div>'+
    //       '</div>'+
    //     '</div>'
    //   );
    //   assert.equal(document.createElement.count, 0);
    //   assert.equal(document.createTextNode.count, 0);
    //   assert.equal(Node.prototype.insertBefore.count, 0);
    //   assert.equal(Node.prototype.removeChild.count, 0);
    //   spyOn.resetSpyCounts();
    // });
  });
});
