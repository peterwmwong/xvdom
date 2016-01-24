import assert         from 'assert';
import spyOn          from './utils/spyOn.js';
import getHTMLString  from './utils/getHTMLString.js';
import xvdom          from '../src/index.js';

describe('xvdom.rerenderArray - newValue, previousValueAndContext, valueIndex, xvdom.rerenderIndex, xvdom.rerenderContextIndex', ()=>{

  beforeEach(()=>{
    spyOn.uninstall();
    spyOn(Node.prototype, 'insertBefore');
    spyOn(Node.prototype, 'appendChild');
    spyOn(Node.prototype, 'removeChild');
    spyOn(Node.prototype, 'replaceChild');
    spyOn(document, 'createElement');
    spyOn.resetSpyCounts();
  });

  afterEach(()=>{
    spyOn.uninstall();
  });

  describe('Arrays', ()=>{
    const renderChild = (key, className)=>
      <div key={key} className={className} />;

    const render = (children, key)=>
      <div key={key}>{children}</div>;

    it('Update array items', ()=>{
      const parentNode = xvdom.render(
        render([
          renderChild(1, '1'),
          renderChild(2, '2'),
          renderChild(3, '3')
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="1"></div>'+
          '<div class="2"></div>'+
          '<div class="3"></div>'+
        '</div>'
      );

      xvdom.rerender(parentNode,
        render([
          renderChild(4, '4'),
          renderChild(5, '5'),
          renderChild(6, '6')
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

    it('Update array items (item changes spec)', ()=>{
      const renderChild2 = (key, id)=>
        <a key={key} id={id} />;

      const target = xvdom.render(
        render([
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild2(1, '_1'),
          renderChild(2, '_2'),
          renderChild2(3, '_3')
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
      spyOn.resetSpyCounts();
    });

    it('Reordering', ()=>{
      const parentNode = xvdom.render(
        render([
          renderChild(1, '1'),
          renderChild(2, '2'),
          renderChild(3, '3')
        ])
      );

      spyOn.resetSpyCounts();

      xvdom.rerender(parentNode,
        render([
          renderChild(3, '3'),
          renderChild(2, '2'),
          renderChild(1, '1')
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
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.appendChild.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(parentNode,
        render([
          renderChild(1, '1'),
          renderChild(3, '3'),
          renderChild(2, '2')
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
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Reordering 2', ()=>{
      const target = xvdom.render(
        render([
          renderChild(1, '1'),
          renderChild(2, '2'),
          renderChild(3, '3')
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

      xvdom.rerender(target,
        render([
          renderChild(2, '2'),
          renderChild(1, '1'),
          renderChild(3, '3')
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
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Reordering 3', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '0'),
          renderChild(1, '1'),
          renderChild(2, '2'),
          renderChild(3, '3')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(2, '21'),
          renderChild(3, '31'),
          renderChild(0, '01'),
          renderChild(1, '11')
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
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.appendChild.count, 3);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Reordering 4', ()=>{
      const parentNode = xvdom.render(
        render([
          renderChild(1, '1'),
          renderChild(0, '0'),
          renderChild(3, '3'),
          renderChild(2, '2')
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="1"></div>'+
          '<div class="0"></div>'+
          '<div class="3"></div>'+
          '<div class="2"></div>'+
        '</div>'
      );

      xvdom.rerender(parentNode,
        render([
          renderChild(0, '0'),
          renderChild(1, '1'),
          renderChild(2, '2'),
          renderChild(3, '3')
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="0"></div>'+
          '<div class="1"></div>'+
          '<div class="2"></div>'+
          '<div class="3"></div>'+
        '</div>'
      );

      xvdom.rerender(parentNode,
        render([
          renderChild(0, '0'),
          renderChild(1, '1'),
          renderChild(2, '2'),
          renderChild(3, '3'),
          renderChild(4, '4')
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="0"></div>'+
          '<div class="1"></div>'+
          '<div class="2"></div>'+
          '<div class="3"></div>'+
          '<div class="4"></div>'+
        '</div>'
      );
    });

    it('Reordering in the middle of statics', ()=>{
      const renderWithStatics = children=>
        <div>
          <a></a>
          {children}
          <b></b>
        </div>;

      const target = xvdom.render(
        renderWithStatics([
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3')
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<a></a>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
          '<!---->'+
          '<b></b>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 6);
      spyOn.resetSpyCounts();
    });

    it('Add to the start', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0')
        ])
      );
      const childEl0 = target.querySelector('._0');

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(1, '_1'),
          renderChild(0, '_0')
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
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(2, '_2'),
          renderChild(1, '_1'),
          renderChild(0, '_0')
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
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      assert.equal(childEl1, target.querySelector('._1'));
      spyOn.resetSpyCounts();
    });

    it('Add and change the start item', ()=>{
      const target = xvdom.render(
        render(
          [
            renderChild(0, '_0'),
            renderChild(1, '_1')
          ]
        )
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );

      xvdom.rerender(target,
        render(
          [
            renderChild(3, '_3'),
            renderChild(1, '_1')
          ]
        )
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_3"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      spyOn.resetSpyCounts();
    });

    it('Add and change the end item', ()=>{
      const target = xvdom.render(
        render(
          [
            renderChild(0, '_0'),
            renderChild(1, '_1')
          ]
        )
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );

      xvdom.rerender(target,
        render(
          [
            renderChild(0, '_0'),
            renderChild(3, '_3')
          ]
        )
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      spyOn.resetSpyCounts();
    });

    it('Add and change the middle item', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(1, '_2')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(3, '_3'),
          renderChild(1, '_2')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_3"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      spyOn.resetSpyCounts();
    });

    it('Add in the middle', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),

          renderChild(4, '_New1'),
          renderChild(5, '_New2'),

          renderChild(2, '_2'),
          renderChild(3, '_3')
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
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),

          renderChild(4, '_New1'),

          renderChild(6, '_New1_1'),
          renderChild(7, '_New1_2'),

          renderChild(5, '_New2'),

          renderChild(2, '_2'),
          renderChild(3, '_3')
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
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Add in the middle and end', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(2, '_New_0_0'),
          renderChild(1, '_1'),
          renderChild(3, '_New_1_0')
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
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.appendChild.count, 2);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();
    });

    it('Add to the end', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0')
        ])
      );
      const childEl0 = target.querySelector('._0');

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 2);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1')
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
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.appendChild.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      spyOn.resetSpyCounts();


      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2')
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
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.appendChild.count, 1);
      assert.equal(Node.prototype.removeChild.count, 0);
      assert.equal(childEl0, target.querySelector('._0'));
      assert.equal(childEl1, target.querySelector('._1'));
      spyOn.resetSpyCounts();
    });

    it('Remove from the start', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(1, '_1'),
          renderChild(2, '_2')
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      spyOn.resetSpyCounts();


      xvdom.rerender(target,
        render([
          renderChild(2, '_2')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
    });

    it('Remove from the middle', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3'),
          renderChild(4, '_4'),
          renderChild(5, '_5')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(4, '_4'),
          renderChild(5, '_5')
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
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();


      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(5, '_5')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_5"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 2);
    });

    it('Remove from the middle and end', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3'),
          renderChild(4, '_4'),
          renderChild(5, '_5')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(2, '_2'),
          renderChild(3, '_3'),
          renderChild(4, '_4')
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
      assert.equal(Node.prototype.insertBefore.count, 3);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();


      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(3, '_3')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 1);
      assert.equal(Node.prototype.removeChild.count, 2);
    });

    it('Remove from the end', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1')
        ])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
      spyOn.resetSpyCounts();


      xvdom.rerender(target,
        render([
          renderChild(0, '_0')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.removeChild.count, 1);
    });

    it('Remove from the start and end', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3'),
          renderChild(4, '_4'),
          renderChild(5, '_5')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3'),
          renderChild(4, '_4')
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
      assert.equal(Node.prototype.insertBefore.count, 4);
      assert.equal(Node.prototype.removeChild.count, 2);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(2, '_2'),
          renderChild(3, '_3')
        ])
      );
      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_2"></div>'+
          '<div class="_3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 0);
      assert.equal(Node.prototype.insertBefore.count, 2);
      assert.equal(Node.prototype.removeChild.count, 2);
    });

    it('All removed', ()=>{
      const target = xvdom.render(
        render([
          renderChild(0, '_0'),
          renderChild(1, '_1'),
          renderChild(2, '_2')
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([])
      );

      assert.equal(getHTMLString(target),
        '<div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 0);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.appendChild.count, 0);
      assert.equal(Node.prototype.removeChild.count, 0);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render([
          renderChild(1, '_1'),
          renderChild(2, '_2'),
          renderChild(3, '_3')
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
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.appendChild.count, 3);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Initially empty', ()=>{
      const target = xvdom.render(
        render(
          []
        )
      );

      assert.equal(getHTMLString(target),
        '<div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 1);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render(
          [
            renderChild(0, '_0'),
            renderChild(1, '_1'),
            renderChild(2, '_2')
          ]
        )
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div class="_0"></div>'+
          '<div class="_1"></div>'+
          '<div class="_2"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count , 3);
      assert.equal(Node.prototype.insertBefore.count, 0);
      assert.equal(Node.prototype.appendChild.count, 3);
      assert.equal(Node.prototype.removeChild.count, 0);
    });

    it('Array of Arrays', ()=>{
      const target = xvdom.render(
        render(
          [
            render(
              [
                renderChild(1, '_1_1')
              ],
              1
            )
          ]
        )
      );

      assert.equal(getHTMLString(target),
        '<div>'+
          '<div>'+
            '<div class="_1_1"></div>'+
          '</div>'+
        '</div>'
      );
      assert.equal(document.createElement.count, 3);
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render(
          [
            render(
              [
                renderChild(1, '_1_1'),
                renderChild(2, '_1_2')
              ],
              1
            )
          ]
        )
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render(
          [
            render(
              [
                renderChild(1, '_1_1'),
                renderChild(2, '_1_2')
              ],
              1
            ),
            render(
              [
                renderChild(1, '_2_1'),
                renderChild(2, '_2_2')
              ],
              2
            )
          ]
        )
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render(
          [
            render(
              [
                renderChild(1, '_0_1'),
                renderChild(2, '_0_2'),
                renderChild(3, '_0_3')
              ],
              0
            ),
            render(
              [
                renderChild(1, '_1_1'),
                renderChild(2, '_1_2')
              ],
              1
            ),
            render(
              [
                renderChild(1, '_2_1'),
                renderChild(2, '_2_2')
              ],
              2
            )
          ]
        )
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
      spyOn.resetSpyCounts();

      xvdom.rerender(target,
        render(
          [
            render(
              [
                renderChild(1, '_0_1'),
                renderChild(2, '_0_2'),
                renderChild(3, '_0_3')
              ],
              0
            ),
            render(
              [
                renderChild(1, '_2_1'),
                renderChild(2, '_2_2')
              ],
              2
            )
          ]
        )
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
      assert.equal(Node.prototype.removeChild.count, 1);
    });


    describe('Changing dynamic type: Array to ...', ()=>{
      let target;

      function rerenderAndValidateArray(){
        spyOn.resetSpyCounts();
        xvdom.rerender(target,
          render(
            [
              renderChild(0, '_0'),
              renderChild(2, '_2')
            ]
          )
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<div class="_0"></div>'+
            '<div class="_2"></div>'+
          '</div>'
        );

        assert.equal(document.createElement.count , 2);
        assert.equal(Node.prototype.insertBefore.count , 0);
        assert.equal(Node.prototype.appendChild.count , 2);
      }

      beforeEach(()=>{
        target = xvdom.render(
          render(
            [
              renderChild(0, '_0'),
              renderChild(1, '_1'),
              renderChild(2, '_2')
            ]
          )
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<div class="_0"></div>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
          '</div>'
        );
        assert.equal(document.createElement.count, 4);
        spyOn.resetSpyCounts();
      });

      it('Element', ()=>{
        xvdom.rerender(target,
          render(
            renderChild(null, '_777')
          )
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<div class="_777"></div>'+
          '</div>'
        );

        assert.equal(document.createElement.count , 1);
        assert.equal(Node.prototype.insertBefore.count, 0);
        assert.equal(Node.prototype.removeChild.count, 0);
        assert.equal(Node.prototype.appendChild.count, 1);
        assert.equal(Node.prototype.replaceChild.count, 0);
        assert.equal(target.childNodes.length, 1);

        rerenderAndValidateArray();
      });

      it('Text', ()=>{
        xvdom.rerender(target,
          render(
            '_777'
          )
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '_777'+
          '</div>'
        );

        assert.equal(document.createElement.count , 0);
        assert.equal(Node.prototype.insertBefore.count, 0);
        assert.equal(Node.prototype.removeChild.count, 0);
        assert.equal(Node.prototype.replaceChild.count, 0);
        assert.equal(target.childNodes.length, 1);

        rerenderAndValidateArray();
      });

      it('undefined', ()=>{
        xvdom.rerender(target,
          render(
            undefined
          )
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<!---->'+
          '</div>'
        );

        assert.equal(document.createElement.count , 0);
        assert.equal(Node.prototype.insertBefore.count, 0);
        assert.equal(Node.prototype.removeChild.count, 0);
        assert.equal(Node.prototype.replaceChild.count, 0);
        assert.equal(target.childNodes.length, 1);

        rerenderAndValidateArray();
      });
    });

    describe('In the middle of statics', ()=>{
      const renderWithStatics = children=>
        <div>
          <a></a>
          {children}
          <b></b>
        </div>;

      let target;

      beforeEach(()=>{
        target = xvdom.render(
          renderWithStatics([
            renderChild(1, '_1'),
            renderChild(2, '_2'),
            renderChild(3, '_3')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<div class="_3"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count, 6);
        spyOn.resetSpyCounts();
      });

      it('Reordering', ()=>{
        xvdom.rerender(target,
          renderWithStatics([
            renderChild(3, '_3'),
            renderChild(2, '_2'),
            renderChild(1, '_1')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_3"></div>'+
            '<div class="_2"></div>'+
            '<div class="_1"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);
      });

      it('Add and change first item', ()=>{
        xvdom.rerender(target,
          renderWithStatics([
            renderChild(4, '_4'),
            renderChild(2, '_2'),
            renderChild(3, '_3')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_4"></div>'+
            '<div class="_2"></div>'+
            '<div class="_3"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  1);
      });

      it('Add and change last item', ()=>{
        xvdom.rerender(target,
          renderWithStatics([
            renderChild(1, '_1'),
            renderChild(2, '_2'),
            renderChild(4, '_4')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<div class="_4"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  1);
      });

      it('Add and change middle item', ()=>{
        xvdom.rerender(target,
          renderWithStatics([
            renderChild(1, '_1'),
            renderChild(4, '_4'),
            renderChild(3, '_3')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_4"></div>'+
            '<div class="_3"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  1);
      });

      it('Adding', ()=>{
        xvdom.rerender(target,
          renderWithStatics([
            renderChild(1, '_1'),
            renderChild(2, '_2'),
            renderChild(3, '_3'),
            renderChild(4, '_4')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<div class="_3"></div>'+
            '<div class="_4"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  1);
        spyOn.resetSpyCounts();

        xvdom.rerender(target,
          renderWithStatics([
            renderChild(0, '_0'),
            renderChild(1, '_1'),
            renderChild(2, '_2'),
            renderChild(3, '_3'),
            renderChild(4, '_4')
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
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  1);
      });

      it('Removing', ()=>{
        xvdom.rerender(target,
          renderWithStatics([
            renderChild(1, '_1'),
            renderChild(2, '_2')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_1"></div>'+
            '<div class="_2"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);
        spyOn.resetSpyCounts();

        xvdom.rerender(target,
          renderWithStatics([
            renderChild(2, '_2')
          ])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<div class="_2"></div>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);

        xvdom.rerender(target,
          renderWithStatics([])
        );

        assert.equal(getHTMLString(target),
          '<div>'+
            '<a></a>'+
            '<!---->'+
            '<b></b>'+
          '</div>'
        );
        assert.equal(document.createElement.count,  0);
      });
    });

    it('Array item changes templates', ()=>{
      const parentNode = xvdom.render(
        render([
          renderChild(1, '1'),
          renderChild(2, '2'),
          renderChild(3, '3')
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="1"></div>'+
          '<div class="2"></div>'+
          '<div class="3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count,  4);
      spyOn.resetSpyCounts();

      xvdom.rerender(
        parentNode,
        render([
          renderChild(1, '1'),
          <a key={2}>hello world</a>,
          renderChild(3, '3')
        ])
      );

      assert.equal(getHTMLString(parentNode),
        '<div>'+
          '<div class="1"></div>'+
          '<a>hello world</a>'+
          '<div class="3"></div>'+
        '</div>'
      );
      assert.equal(document.createElement.count,  1);
      spyOn.resetSpyCounts();
    });
  });
});
