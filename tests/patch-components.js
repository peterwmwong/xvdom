import assert from 'assert';
import getHTMLString from './utils/getHTMLString.js';
import {patch} from '../src/patch.js';

describe('patch components', ()=>{
  let target;
  const MyComponentTmpl = {
    el:'ul',
    children:[
      {el:'li', children:[0]},
      {el:'li', children:[1]}
    ]
  };
  const MyComponent = props=>{
    MyComponent.callCount++;
    return {
      template:MyComponentTmpl,
      values:[props.one, props.two]
    };
  };

  const InvalidComponent_array     = props=>[];
  const InvalidComponent_string    = props=>'bogus';
  const InvalidComponent_number    = props=>5;
  const InvalidComponent_object    = props=>({});
  const InvalidComponent_undefined = props=>undefined;

  beforeEach(()=>{
    MyComponent.callCount = 0;
    target = document.createElement('div');
  });

  it('Basic', ()=>{
    patch(target, {
      template:{
        el:MyComponent,
        props:{
          one:'one value',
          two:'two value'
        }
      }
    });
    assert.equal(getHTMLString(target),
      '<ul>'+
        '<li>one value</li>'+
        '<li>two value</li>'+
      '</ul>'
    );

    assert.equal(MyComponent.callCount, 1);
  });

  it('throws error if component renders anything but a dynamic or static node', ()=>{
    try{
      patch(target, {template: {el:InvalidComponent_array}     });
      assert.equal(true, false);
    }
    catch(e){}

    try{
      patch(target, {template: {el:InvalidComponent_string}    });
      assert.equal(true, false);
    }
    catch(e){}

    try{
      patch(target, {template: {el:InvalidComponent_number}    });
      assert.equal(true, false);
    }
    catch(e){}

    try{
      patch(target, {template: {el:InvalidComponent_object}    });
      assert.equal(true, false);
    }
    catch(e){}

    try{
      patch(target, {template: {el:InvalidComponent_undefined} });
      assert.equal(true, false);
    }
    catch(e){}
  });

  describe('Dynamics', ()=>{
    it('Dynamic props', ()=>{
      const TMPL = {
        el:MyComponent,
        props:{
          $one:0,
          $two:1
        }
      };
      patch(target, {
        template:TMPL,
        values:['one value', 'two value']
      });

      assert.equal(getHTMLString(target),
        '<ul>'+
          '<li>one value</li>'+
          '<li>two value</li>'+
        '</ul>'
      );
      assert.equal(MyComponent.callCount, 1);
    });
  });

  describe('Rerendering', ()=>{
    it('Skips calling Component when props are the same', ()=>{
      const TMPL =
      {
        el:'header',
        children:[
          {
            el:MyComponent,
            props:{
              $one:0,
              $two:1
            }
          },
          {el:'div', children:[2]}
        ]
      };
      patch(target, {
        template:TMPL,
        values:['one value', 'two value2', 'yolo']
      });

      patch(target, {
        template:TMPL,
        values:['one value', 'two value2', 'yolo']
      });

      assert.equal(getHTMLString(target),
        '<header>'+
          '<ul>'+
            '<li>one value</li>'+
            '<li>two value2</li>'+
          '</ul>'+
          '<div>yolo</div>'+
        '</header>'
      );
      assert.equal(MyComponent.callCount, 1);
    });
  });
});
