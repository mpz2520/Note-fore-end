### jQuery.fn.init.prototype = jQuery.fn;
```
jQuery = function( selector, context ) {
	return new jQuery.fn.init( selector, context, rootjQuery );
},
jQuery.fn = jQuery.prototype = { //fn即对应prototype
    constructor: jQuery,
    init: function( selector, context, rootjQuery ) {
        ...
        return this;
    }
    ...
}
jQuery.fn.init.prototype = jQuery.fn;
```
"jQuery.fn.init.prototype = jQuery.fn"这句很重要，它将init的原型指向jQuery的原型，所以JQ对象才可以访问‘css'、'show'、'hide'这些写在jQuery.fn上的方法。