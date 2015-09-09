import {renderInstance}               from './renderInstance.js';
import {rerender}                     from './rerender.js';
import {createDynamic}                from './createDynamic.js';
import {setDynamicProp, rerenderProp} from './setDynamicProp.js';
export {rerender, renderInstance, createDynamic, setDynamicProp, rerenderProp};
window.xvdom = {rerender, createDynamic, renderInstance, setDynamicProp, rerenderProp};
