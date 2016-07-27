import assert        from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import xvdom         from '../src/index.js';

describe('rerender(bytecode, dynamics)', ()=>{
  const renderHTML = (instance)=> getHTMLString(xvdom.xrerender(instance));

  const itRenders = (
    desc, instance, renderArgs, expectedRenderHTML, rerenderArgs,
    expectedRerenderHTML
  )=>{

    it(`renders ${desc}`, ()=>{
      assert.strictEqual(
        renderHTML(instance(renderArgs)),
        expectedRenderHTML
      );
    });

    it(`rerenders ${desc}`, ()=>{
      assert.strictEqual(
        renderHTML(instance(rerenderArgs)),
        expectedRerenderHTML
      );
    });
  };

  itRenders('elements',
    ()=>(
      <div>
        <span></span>
      </div>
    ),
    [],
    '<div>'+
      '<span></span>'+
    '</div>',
    [],
    '<div>'+
      '<span></span>'+
    '</div>'
  );

});
