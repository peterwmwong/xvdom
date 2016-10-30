# Monomorphic call sites

## Research

Using chrome/v8's tracing and filtering for Megamorphic IC transitions...

```sh
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --js-flags="--trace_deopt --trace_ic" "http://localhost:3003/dist/#github/atom/atom" | grep "http://localhost:3003/dist/" | grep "\->N) map" | grep "/dist/" > v8.log
```

... multiple Megamorphic ICs were discovered (see [Research Data: Ticker/xvdom Megamorphic ICs]).

In the following section we'll, break down the main sources of Megamorphic ICs, impact and solutions.


## Instance object structure

```js
function internalRenderNoRecycle(instance) {
  var node = instance.$s.c(instance);
                      ^^
  instance.$n = node;
           ^^
}
```

### Impact

HOT PATH(render, rerender): whenever an instance is rendered or rerendered.

### Solution: Change Instance object structure


Currently:

```js
{
  $s: Spec

  value1: _,
  value2: _,
  value3: _,
  ...
}
```

Proposed:

```js
{
  $s: Spec
  values: {
    value1: _,
    value2: _,
    value3: _,
    ...
  }
}
```

## Mapping node <-> instance

```js
function internalRenderNoRecycle(instance) {
  node.xvdom = instance;
       ^^^^^
}
```

### Impact

HOT PATH(render)


## Stateful Components

```js
function StatefulComponent(render, props, instance, actions){
  this.state         = actions.onInit(this);
                               ^^^^^^
}


StatefulComponent.prototype.bindSend = function(action){
  return this._boundActions[action] || (
                          /*^^^^^^*/
    this._boundActions[action] = this.send.bind(this, action)
                       ^^^^^^
  )
}

StatefulComponent.prototype.send = function(actionName, context){
  var actionFn = this.actions[actionName];
                              ^^^^^^^^^^
}
```

### Impact

Hot Path(render, rerender):
  - `onInit()` - render
  - `bindSend()` / `send()` - render and rerender

## `createDynamic`

```js
function createDynamic(isOnlyChild, parentNode, value) {
  return CREATE_BY_TYPE[dynamicType(value)](parentNode, value, isOnlyChild);
                        ^^^^^^^^^^^^^^^^^^
}
```

### Impact

Hot Path(render): Every child dynamic (ex. `<div>{stuff}</div>`) calls into this.


## Recycling

```js
Pool.prototype.pop = function (key) {
  var head = this.map[key];
                      ^^^
```


## Research Data: Ticker / xvdom Megamorphic ICs

```
# function StatefulComponent(render, props, instance, actions){
#   this.state         = actions.onInit(this);
#                                ^^^^^^
http://localhost:3003/dist/App.min.js:191 [LoadIC       in ~StatefulComponent+397           at (P->N) map=0x2e35b3010961 0xf6ba105d839 <String[6]: onInit>]

# StatefulComponent.prototype.bindSend()
#   this._boundActions[action]
#                     ^^^^^^^^
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (1->N) map=0x2e35b3011da9 0xf6ba10666f1 <String[12]: onHashChange>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (1->N) map=0x2e35b3011da9 0xf6ba10666f1 <String[12]: onHashChange>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (N->N) map=0x2e35b3011e59 0xf6ba1066719 <String[12]: onUserChange>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (N->N) map=0x2e35b3011e59 0xf6ba1066719 <String[12]: onUserChange>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (N->N) map=0x2e35b3011f61 0xf6ba1066591 <String[14]: disableOverlay>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (N->N) map=0x2e35b3011f61 0xf6ba1066591 <String[14]: disableOverlay>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (N->N) map=0x2e35b3012c19 0xf6ba105fdb1 <String[5]: login>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.b indSend+80  at (N->N) map=0x2e35b3012c19 0xf6ba105fdb1 <String[5]: login>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba10618b1 <String[10]: loadMarkup>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba10618b1 <String[10]: loadMarkup>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba1062939 <String[9]: renderAll>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba1062939 <String[9]: renderAll>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba1062b19 <String[11]: onLoadModel>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba1062b19 <String[11]: onLoadModel>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba1063529 <String[8]: onScroll>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3010a69 0xf6ba1063529 <String[8]: onScroll>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3012c71 0xf6ba105fdb1 <String[5]: login>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3012c71 0xf6ba105fdb1 <String[5]: login>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3012c71 0xf6ba1066591 <String[14]: disableOverlay>]
http://localhost:3003/dist/App.min.js:206 [KeyedLoadIC  in ~StatefulComponent.bindSend+80   at (N->N) map=0x2e35b3012c71 0xf6ba1066591 <String[14]: disableOverlay>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.b indSend+279 at (1->N) map=0x2e35b3011da9 0xf6ba10666f1 <String[12]: onHashChange>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.b indSend+279 at (N->N) map=0x2e35b3011e59 0xf6ba1066719 <String[12]: onUserChange>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.b indSend+279 at (N->N) map=0x2e35b3011f61 0xf6ba1066591 <String[14]: disableOverlay>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.b indSend+279 at (N->N) map=0x2e35b3012c19 0xf6ba105fdb1 <String[5]: login>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.bindSend+279  at (N->N) map=0x2e35b3010a69 0xf6ba10618b1 <String[10]: loadMarkup>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.bindSend+279  at (N->N) map=0x2e35b3010a69 0xf6ba1062939 <String[9]: renderAll>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.bindSend+279  at (N->N) map=0x2e35b3010a69 0xf6ba1062b19 <String[11]: onLoadModel>]
http://localhost:3003/dist/App.min.js:206 [KeyedStoreIC in ~StatefulComponent.bindSend+279  at (N->N) map=0x2e35b3010a69 0xf6ba1063529 <String[8]: onScroll>]

# StatefulComponent.prototype.send
#   var actionFn = this.actions[actionName];
#                              ^^^^^^^^^^^^
http://localhost:3003/dist/App.min.js:211 [KeyedLoadIC  in ~StatefulComponent.send+94       at (1->N) map=0x2e35b30109b9 0xf6ba105d8f9 <String[7]: onProps>]
http://localhost:3003/dist/App.min.js:211 [KeyedLoadIC  in ~StatefulComponent.send+94       at (1->N) map=0x2e35b30109b9 0xf6ba105d8f9 <String[7]: onProps>]
http://localhost:3003/dist/App.min.js:211 [KeyedLoadIC  in ~StatefulComponent.send+94       at (N->N) map=0x2e35b3011989 0xf6ba1066719 <String[12]: onUserChange>]
http://localhost:3003/dist/App.min.js:211 [KeyedLoadIC  in ~StatefulComponent.send+94       at (N->N) map=0x2e35b3011989 0xf6ba1066719 <String[12]: onUserChange>]

# function internalRenderNoRecycle(instance) {
#   var node = instance.$s.c(instance);
#                       ^^
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~ internalRenderNoRecycle+56     at (N->N) map=0x2e35b3018999 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~ internalRenderNoRecycle+56     at (N->N) map=0x2e35b3018d09 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~ internalRenderNoRecycle+56     at (N->N) map=0x2e35b30195a1 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~ internalRenderNoRecycle+56     at (P->N) map=0x2e35b3018369 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~internalRenderNoRecycle+56      at (N->N) map=0x2e35b301ca39 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~internalRenderNoRecycle+56      at (N->N) map=0x2e35b3024651 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~internalRenderNoRecycle+56      at (N->N) map=0x2e35b3024a19 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~internalRenderNoRecycle+56      at (N->N) map=0x2e35b3024ac9 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~internalRenderNoRecycle+56      at (N->N) map=0x2e35b3024bd1 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~internalRenderNoRecycle+56      at (N->N) map=0x2e35b30254c1 0xf6ba105d1a9 <String[2]: $s>]
http://localhost:3003/dist/App.min.js:248 [LoadIC       in ~internalRenderNoRecycle+56      at (N->N) map=0x2e35b3027511 0xf6ba105d1a9 <String[2]: $s>]

# function internalRenderNoRecycle(instance) {
#   instance.$n = node;
#            ^^
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~ internalRenderNoRecycle+170    at (N->N) map=0x2e35b301b071 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~ internalRenderNoRecycle+170    at (P->N) map=0x2e35b301af69 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b30119e1 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b301c6c9 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b301ca91 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b301ca91 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b301cae9 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b301ccf9 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b3024f41 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b3025151 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b30261d1 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b3026fe9 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b3027099 0xf6ba105d279 <String[2]: $n>]
http://localhost:3003/dist/App.min.js:249 [StoreIC      in ~internalRenderNoRecycle+170     at (N->N) map=0x2e35b30275c1 0xf6ba105d279 <String[2]: $n>]


# function internalRenderNoRecycle(instance) {
#   node.xvdom = instance;
#        ^^^^^
http://localhost:3003/dist/App.min.js:250 [StoreIC      in ~ internalRenderNoRecycle+203    at (N->N) map=0x2e35b3017fa1 0xf6ba105da01 <String[5]: xvdom>]
http://localhost:3003/dist/App.min.js:250 [StoreIC      in ~ internalRenderNoRecycle+203    at (P->N) map=0x2e35b301af11 0xf6ba105da01 <String[5]: xvdom>]
http://localhost:3003/dist/App.min.js:250 [StoreIC      in ~internalRenderNoRecycle+203     at (N->N) map=0x2e35b30174a1 0xf6ba105da01 <String[5]: xvdom>]
http://localhost:3003/dist/App.min.js:250 [StoreIC      in ~internalRenderNoRecycle+203     at (N->N) map=0x2e35b301a049 0xf6ba105da01 <String[5]: xvdom>]
http://localhost:3003/dist/App.min.js:250 [StoreIC      in ~internalRenderNoRecycle+203     at (N->N) map=0x2e35b301cda9 0xf6ba105da01 <String[5]: xvdom>]
http://localhost:3003/dist/App.min.js:250 [StoreIC      in ~internalRenderNoRecycle+203     at (N->N) map=0x2e35b3025f69 0xf6ba105da01 <String[5]: xvdom>]

# function createDynamic(isOnlyChild, parentNode, value) {
#   return CREATE_BY_TYPE[dynamicType(value)](parentNode, value, isOnlyChild);
#                         ^^^^^^^^^^^^^^^^^^
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (1->N) map=0x2e35b300f049 0xf6ba105d061 <String[5]: array>]
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (1->N) map=0x2e35b300f049 0xf6ba105d061 <String[5]: array>]
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (N->N) map=0x2e35b300f049 0x24a524704271 <String[6]: object>]
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (N->N) map=0x2e35b300f049 0x24a524704271 <String[6]: object>]
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (N->N) map=0x2e35b300f049 0xf6ba104e8a1 <String[4]: text>]
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (N->N) map=0x2e35b300f049 0xf6ba104e8a1 <String[4]: text>]
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (N->N) map=0x2e35b300f049 0xf6ba105d081 <String[5]: empty>]
http://localhost:3003/dist/App.min.js:282 [KeyedLoadIC  in ~createDynamic+92                at (N->N) map=0x2e35b300f049 0xf6ba105d081 <String[5]: empty>]
http://localhost:3003/dist/App.min.js:293 [KeyedLoadIC  in ~updateDynamic+92                at (1->N) map=0x2e35b300f151 0x24a524704271 <String[6]: object>]
http://localhost:3003/dist/App.min.js:293 [KeyedLoadIC  in ~updateDynamic+92                at (1->N) map=0x2e35b300f151 0x24a524704271 <String[6]: object>]

# Pool.prototype.pop = function (key) {
#   var head = this.map[key];
#                       ^^^
http://localhost:3003/dist/App.min.js:60 [KeyedLoadIC  in ~Pool.pop+84                     at (0->N) map=0x2e35b3010a69 0xf6ba10cd299 <String[10]: 4785848122>]
```
