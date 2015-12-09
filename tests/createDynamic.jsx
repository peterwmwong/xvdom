import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import * as xvdom    from '../src/index.js';

describe('createDynamic - value, instance, rerenderIndex, rerenderContextIndex', ()=>{
  let instance, parentNode, resultNode;

  beforeEach(()=>{
    parentNode = document.createElement('div');
  });

  [null, undefined, true, false].forEach(value=>{
    describe(`${value} - empty text node`, ()=>{
      beforeEach(()=>{
        instance = <div>{value}</div>;
        resultNode = xvdom.createDynamic(instance.v0, instance, 'r0', 'c0');
        parentNode.appendChild(resultNode);
      });

      it('renders text node with string', ()=>{
        assert.ok(resultNode instanceof Text);
        assert.equal(getHTMLString(parentNode),
          '<div></div>'
        );
      });

      it('sets rerender function and context', ()=>{
        assert.equal(instance.r0, xvdom.rerenderDynamic);
        assert.equal(instance.c0, parentNode.firstChild);
      });
    });
  });

  describe('String - text node', ()=>{
    beforeEach(()=>{
      const string = 'test string';
      instance = {v0:string};
      resultNode = xvdom.createDynamic(instance.v0, instance, 'r0', 'c0');
      parentNode.appendChild(resultNode);
    });

    it('renders text node with string', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>test string</div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(instance.r0, xvdom.rerenderText);
      assert.equal(instance.c0, parentNode.firstChild);
    });
  });

  describe('Number - text node', ()=>{
    beforeEach(()=>{
      const num = 0;
      instance = {v0:num};
      resultNode = xvdom.createDynamic(instance.v0, instance, 'r0', 'c0');
      parentNode.appendChild(resultNode);
    });

    it('renders text node with string', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>0</div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(instance.r0, xvdom.rerenderText);
      assert.equal(instance.c0, parentNode.firstChild);
    });
  });

  describe('Object - render instance', ()=>{
    beforeEach(()=>{
      const childInstance = <span></span>;
      instance = {v0:childInstance};
      resultNode = xvdom.createDynamic(instance.v0, instance, 'r0', 'c0');
      parentNode.appendChild(resultNode);
    });

    it('renders render instance', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div><span></span></div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(instance.r0, xvdom.rerenderInstance);
      assert.equal(instance.c0, parentNode.firstChild);
    });
  });

  describe('Array', ()=>{
    beforeEach(()=>{
      const array = [
        <span key={1}>one</span>,
        <span key={2}>two</span>
      ];
      instance = {v0:array};
      resultNode = xvdom.createDynamic(instance.v0, instance, 'r0', 'c0');
      parentNode.appendChild(resultNode);
    });

    it('renders array of items', ()=>{
      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<span>one</span>'+
          '<span>two</span>'+
        '</div>'
      );
    });

    it('sets rerender function and context', ()=>{
      assert.equal(instance.r0, xvdom.rerenderArray);
      assert.equal(instance.c0, parentNode.lastChild);
    });
  });
});
