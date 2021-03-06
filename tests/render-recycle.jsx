import assert         from 'assert';
import getHTMLString  from './utils/getHTMLString.js';
import spyOn          from './utils/spyOn.js';
import xvdom          from '../src/index.js';

describe('render recycled - node, renderInstance', ()=>{
  const render = (key, className)=>
    <div key={key} className={className} recycle />;
  let parentNode, node0, node1;

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(document, 'createElement');

    parentNode = document.createElement('div');
    node0 = xvdom.render(render(0, '_0'));
    node1 = xvdom.render(render(1, '_1'));
    assert.strictEqual(getHTMLString(node0),
      '<div class="_0"></div>'
    );
    assert.strictEqual(getHTMLString(node1),
      '<div class="_1"></div>'
    );

    parentNode.appendChild(node0);
    parentNode.appendChild(node1);
    xvdom.unmount(node0);
    xvdom.unmount(node1);
    spyOn.resetSpyCounts();
  });

  afterEach(()=>spyOn.uninstall());

  it('ressurects and rerenders unmounted render instances', ()=>{
    const newNode0 = xvdom.render(render(1, '_01'));
    assert.strictEqual(newNode0, node1);
    assert.strictEqual(getHTMLString(newNode0),
      '<div class="_01"></div>'
    );

    const newNode1 = xvdom.render(render(0, '_11'));
    assert.strictEqual(newNode1, node0);
    assert.strictEqual(getHTMLString(newNode1),
      '<div class="_11"></div>'
    );

    const newNode2 = xvdom.render(render(1, '_21'));
    assert.notStrictEqual(newNode2, node0);
    assert.notStrictEqual(newNode2, node1);
  });

  describe('Arrays', ()=>{
    const renderArray = children=>
      <div>
        {children.map(child=>
          <div key={child.key} className={child.className} recycle></div>
        )}
      </div>;

    it('Remove from the end', ()=>{
      const target = xvdom.render(
        renderArray([
          {key:0, className:'_0'},
          {key:1, className:'_1'},
          {key:2, className:'_2'}
        ])
      );

      assert.strictEqual(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.strictEqual(document.createElement.count, 4);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'}
        ])
      );

      assert.strictEqual(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.strictEqual(document.createElement.count , 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'},
          {key:1, className:'_1'},
          {key:2, className:'_2'}
        ])
      );

      assert.strictEqual(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.strictEqual(document.createElement.count, 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'}
        ])
      );

      assert.strictEqual(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.strictEqual(document.createElement.count , 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'},
          {key:1, className:'_1'},
          {key:2, className:'_2'}
        ])
      );

      assert.strictEqual(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.strictEqual(document.createElement.count, 0);
      spyOn.resetSpyCounts();
    });
  });
});
