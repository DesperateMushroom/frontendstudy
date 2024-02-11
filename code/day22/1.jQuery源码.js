( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {
			// ..... 
            // 支持commonjs模块规范的执行这里（例如 node.js
	} else {
        // 可以初步理解为是浏览器或者 web-view 环境
        // global === window
        // factory === function (window, noGlobal){ }
		factory( global );
	}
} ) ( typeof window !== "undefined" ? window : this, function( window, noGlobal ){
    // 参数信息
    // window === window
    // noGlobal === undefined


	"use strict";

    var version = "3.7.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
        // jQuery.fn.init 指向的是jQuery的原型，返回new这个，就是返回jQuery
        // 为什么不直接new：因为会造成死循环
        // 为什么不能再外面new：作者不想过度冗余
		return new jQuery.fn.init( selector, context );
	};


    // jQuery是一个类，jQuery.fn是给原型设置一个别名
    jQuery.fn = jQuery.prototype = {
        // =》 公共的属性和方法
        jQuery : version,
        constructor: jQuery,
        length:0,
        //转换为数组的方法
        toArray:function(){
            // this：一般是当前类jQuery的实例
            return slice.call(this);
        },

        // 把jq对象转换为原生js对象
        get: function( num ) {
            if ( num == null ) {
                return slice.call( this );
            }

            return num < 0 ? this[ num + this.length ] : this[ num ];
        },

        eq: function( i ) {
            var len = this.length,
                // 这句话也是为了支持负数索引
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
        },
        // 。。。
    };

    // jQuery 是一个普通对象
    jQuery.ajax = function(url, options){
        //...
    };


    
    var	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;


    var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

    jQuery.noConflict = function( deep ) {
        if ( window.$ === jQuery ) {
            window.$ = _$;
        }

        if ( deep && window.jQuery === jQuery ) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };



    jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[ 0 ] || {},
            i = 1,
            length = arguments.length,
            deep = false;
    
        // Handle a deep copy situation
        if ( typeof target === "boolean" ) {
            deep = target;
    
            // Skip the boolean and the target
            target = arguments[ i ] || {};
            i++;
        }
    
        // Handle case when target is a string or something (possible in deep copy)
        if ( typeof target !== "object" && !isFunction( target ) ) {
            target = {};
        }
    
        // Extend jQuery itself if only one argument is passed
        if ( i === length ) {
            target = this;
            i--;
        }
    
        for ( ; i < length; i++ ) {
    
            // Only deal with non-null/undefined values
            if ( ( options = arguments[ i ] ) != null ) {
    
                // Extend the base object
                for ( name in options ) {
                    copy = options[ name ];
    
                    // Prevent Object.prototype pollution
                    // Prevent never-ending loop
                    if ( name === "__proto__" || target === copy ) {
                        continue;
                    }
    
                    // Recurse if we're merging plain objects or arrays
                    if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
                        ( copyIsArray = Array.isArray( copy ) ) ) ) {
                        src = target[ name ];
    
                        // Ensure proper type for the source value
                        if ( copyIsArray && !Array.isArray( src ) ) {
                            clone = [];
                        } else if ( !copyIsArray && !jQuery.isPlainObject( src ) ) {
                            clone = {};
                        } else {
                            clone = src;
                        }
                        copyIsArray = false;
    
                        // Never move original objects, clone them
                        target[ name ] = jQuery.extend( deep, clone, copy );
    
                    // Don't bring in undefined values
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }
    
        // Return the modified object
        return target;
    };
    


    if(!noGlobal){
        // 把jQuery赋值给window下的jQuery和$
        window.jQuery = window.$ = jQuery;
    }
});

// extend: 向JQ中继续扩展方法
// $.extend({}); // 扩展到JQ对象上: 一般是为了完善类库，提供更多的工具方法
// $.extend(true, {}); 

// $.fn.extend(true,{}); // 扩展到JQ原型上：一般是为了写JQ插件，让JQ的实例来调用

// 如果冲突了，会以JQ的为主
// 但是加了 true 参数，就会深度覆盖，以我的为主

$.extend({
    queryURLParams: function(url){
            //...
    }
});
// 以后别人再用
$.queryURLParams("https://...");



// 转移$的使用权, 可以允许多库共存
// let j = jQuery.noConflict(); // j===jQuery
// jQuery();
// j();




//在外面可以调用了
// $()
// jQuery()

/* 基于jq选择器创建出来的是JQ类的一个实例，就可以调取jQuery.prototype上的方法
        1. 创建出来的JQ实例是一个类数组（JQ对象） 基于makeArray创建出来的
        2. selector 支持三种数据格式
            [string]
                - 选择器 $('.box')
                - 创建元素 $('<div>...</div>')
            
            [元素对象：js原生对象]
                - 把原生JS对象转换为JQ对象（只有这样才能调取JQ中的方法
                - 把JQ对象转换为原生对象，直接基于索引获取即可，
                    例如 $A[0]，
                    真实项目中建议使用JQ自带的get方法实现，因为它更加完善
                    可以支持负数索引：$A.get(0);
                - eq方法也是根据索引获取集合中的某一项（也支持负数索引）
                    只不过返回的结果不是原生JS对象，依然是一个JQ的实例
            
            [函数]
                $(function(){}) 等待页面中的dom结构加载完成再执行函数
                                等价于 $(document).ready(function(){})
*/
$('.box');

// $('.box') === $('.box') false
let $box = $('.box');




/**
 * jQuery 给我们提供的方法放到了两个位置上
 *      1. 原型上  jQuery.prototype = {toArray}
 *          $().toArray()  
 *          只有实例jQuery才能用的方法
 * 
 * 
 *      2. 对象上  jQuery.ajax = ...
 *          $.ajax()
 *          直接调取使用  （类似于静态方法直接用类名.调用）
 */



// 检测当前对象是数组还是类数组
/* function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

 */





/** JQ中只有一个each：用来遍历数组，对象，类数组中的每一项 
 *  $a.each() 最后也会转换为$.each($a) 这种模式
*/
/**
 * each: function(callback){
 *  // this: $navList
 *  return jQuery.each(this,callback)
 * }
 * 
 * 
 * each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
                    // 每循环一次，执行一次函数，把函数中的this设置为循环项，
                    // 传递索引和循环项
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},
 * 
 */
// $navList.each(function(index,item){});
// $.each([数组，对象，类数组]，function(index,item){ 
//  this：循环的这一项
//  return false; 可以控制循环结束 
// })