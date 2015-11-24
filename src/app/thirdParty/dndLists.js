angular.module("dndLists",[]).directive("dndDraggable",["$parse","$timeout","dndDropEffectWorkaround","dndDragTypeWorkaround",function(e,n,r,t){return function(a,o,d){o.attr("draggable","true"),d.dndDisableIf&&a.$watch(d.dndDisableIf,function(e){o.attr("draggable",!e)}),o.on("dragstart",function(i){i=i.originalEvent||i,i.dataTransfer.setData("Text",angular.toJson(a.$eval(d.dndDraggable))),i.dataTransfer.effectAllowed=d.dndEffectAllowed||"move",o.addClass("dndDragging"),n(function(){o.addClass("dndDraggingSource")},0),r.dropEffect="none",t.isDragging=!0,t.dragType=d.dndType?a.$eval(d.dndType):void 0,e(d.dndDragstart)(a,{event:i}),i.stopPropagation()}),o.on("dragend",function(i){i=i.originalEvent||i;var f=r.dropEffect;a.$apply(function(){switch(f){case"move":e(d.dndMoved)(a,{event:i});break;case"copy":e(d.dndCopied)(a,{event:i});break;case"none":e(d.dndCanceled)(a,{event:i})}e(d.dndDragend)(a,{event:i,dropEffect:f})}),o.removeClass("dndDragging"),n(function(){o.removeClass("dndDraggingSource")},0),t.isDragging=!1,i.stopPropagation()}),o.on("click",function(n){d.dndSelected&&(n=n.originalEvent||n,a.$apply(function(){e(d.dndSelected)(a,{event:n})}),n.stopPropagation())}),o.on("selectstart",function(){this.dragDrop&&this.dragDrop()})}}]).directive("dndList",["$parse","$timeout","dndDropEffectWorkaround","dndDragTypeWorkaround",function(e,n,r,t){return function(a,o,d){function i(e,n,r){var t=y?e.offsetX||e.layerX:e.offsetY||e.layerY,a=y?n.offsetWidth:n.offsetHeight,o=y?n.offsetLeft:n.offsetTop;return o=r?o:0,o+a/2>t}function f(){var e;return angular.forEach(o.children(),function(n){var r=angular.element(n);r.hasClass("dndPlaceholder")&&(e=r)}),e||angular.element("<li class='dndPlaceholder'></li>")}function l(){return Array.prototype.indexOf.call(D.children,v)}function g(e){if(!t.isDragging&&!E)return!1;if(!c(e.dataTransfer.types))return!1;if(d.dndAllowedTypes&&t.isDragging){var n=a.$eval(d.dndAllowedTypes);if(angular.isArray(n)&&-1===n.indexOf(t.dragType))return!1}return d.dndDisableIf&&a.$eval(d.dndDisableIf)?!1:!0}function s(){return p.remove(),o.removeClass("dndDragover"),!0}function u(n,r,o,d){return e(n)(a,{event:r,index:o,item:d||void 0,external:!t.isDragging,type:t.isDragging?t.dragType:void 0})}function c(e){if(!e)return!0;for(var n=0;n<e.length;n++)if("Text"===e[n]||"text/plain"===e[n])return!0;return!1}var p=f(),v=p[0],D=o[0];p.remove();var y=d.dndHorizontalList&&a.$eval(d.dndHorizontalList),E=d.dndExternalSources&&a.$eval(d.dndExternalSources);o.on("dragover",function(e){if(e=e.originalEvent||e,!g(e))return!0;if(v.parentNode!=D&&o.append(p),e.target!==D){for(var n=e.target;n.parentNode!==D&&n.parentNode;)n=n.parentNode;n.parentNode===D&&n!==v&&(i(e,n)?D.insertBefore(v,n):D.insertBefore(v,n.nextSibling))}else if(i(e,v,!0))for(;v.previousElementSibling&&(i(e,v.previousElementSibling,!0)||0===v.previousElementSibling.offsetHeight);)D.insertBefore(v,v.previousElementSibling);else for(;v.nextElementSibling&&!i(e,v.nextElementSibling,!0);)D.insertBefore(v,v.nextElementSibling.nextElementSibling);return d.dndDragover&&!u(d.dndDragover,e,l())?s():(o.addClass("dndDragover"),e.preventDefault(),e.stopPropagation(),!1)}),o.on("drop",function(e){if(e=e.originalEvent||e,!g(e))return!0;e.preventDefault();var n,t=e.dataTransfer.getData("Text")||e.dataTransfer.getData("text/plain");try{n=JSON.parse(t)}catch(o){return s()}var i=l();if(d.dndDrop&&(n=u(d.dndDrop,e,i,n),!n))return s();var f=a.$eval(d.dndList);return a.$apply(function(){f.splice(i,0,n)}),u(d.dndInserted,e,i,n),r.dropEffect="none"===e.dataTransfer.dropEffect?"copy"===e.dataTransfer.effectAllowed||"move"===e.dataTransfer.effectAllowed?e.dataTransfer.effectAllowed:e.ctrlKey?"copy":"move":e.dataTransfer.dropEffect,s(),e.stopPropagation(),!1}),o.on("dragleave",function(e){e=e.originalEvent||e,o.removeClass("dndDragover"),n(function(){o.hasClass("dndDragover")||p.remove()},100)})}}]).directive("dndNodrag",function(){return function(e,n){n.attr("draggable","true"),n.on("dragstart",function(e){e=e.originalEvent||e,e.dataTransfer.types&&e.dataTransfer.types.length||e.preventDefault(),e.stopPropagation()}),n.on("dragend",function(e){e=e.originalEvent||e,e.stopPropagation()})}}).factory("dndDragTypeWorkaround",function(){return{}}).factory("dndDropEffectWorkaround",function(){return{}});
