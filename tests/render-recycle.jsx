import assert         from 'assert';
import getHTMLString  from './utils/getHTMLString.js';
import makeRecyclable from './utils/makeRecyclable.js';
import spyOn          from './utils/spyOn.js';
import xvdom          from '../src/index.js';

describe('rerender recycled - node, renderInstance', ()=>{
  const render = className=>makeRecyclable(<div className={className} />);
  let node0, node1;

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(document, 'createElement');
    spyOn(document, 'createTextNode');

    node0 = xvdom.render(render('_0'));
    node1 = xvdom.render(render('_1'));
    assert.equal(getHTMLString(node0),
      '<div class="_0"></div>'
    );
    assert.equal(getHTMLString(node1),
      '<div class="_1"></div>'
    );
    xvdom.unmount(node0);
    xvdom.unmount(node1);
    spyOn.resetSpyCounts();
  });

  afterEach(()=>{
    spyOn.uninstall();
  });

  it('ressurects and rerenders unmounted render instances', ()=>{
    const newNode0 = xvdom.render(render('_01'));
    assert.equal(newNode0, node1);
    assert.equal(getHTMLString(newNode0),
      '<div class="_01"></div>'
    );

    const newNode1 = xvdom.render(render('_11'));
    assert.equal(newNode1, node0);
    assert.equal(getHTMLString(newNode1),
      '<div class="_11"></div>'
    );
  });

  describe('Arrays', ()=>{
    const renderArray = children=>
      <div>
        {children.map(child=>
          makeRecyclable(<div key={child.key} className={child.className}></div>)
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

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'}
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'},
          {key:1, className:'_1'},
          {key:2, className:'_2'}
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'}
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        renderArray([
          {key:0, className:'_0'},
          {key:1, className:'_1'},
          {key:2, className:'_2'}
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(document.createTextNode.count, 0);
      spyOn.resetSpyCounts();
    });
  });
});
