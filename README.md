# 手机宣传页小项目
- 主要运用JavaScript + CSS3
- 在处理scrollTop的兼容问题上花了一点时间，记录一下处理兼容的几种方法。



> 方法一


```
// 获取scrolltop

	function getScrollTop() {
		var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
		return scrollTop;
	}

// 设置scrolltop

	function setScrollTop(scroll_top) {
		document.documentElement.scrollTop = scroll_top;
		window.pageYOffset = scroll_top;
		document.body.scrollTop = scroll_top;
	}
```

> 方法二


```
var scrollPos; 
if (typeof window.pageYOffset != 'undefined') 
{ 
   scrollPos = window.pageYOffset; 
} 
else if (typeof document.compatMode != 'undefined' &&    document.compatMode != 'BackCompat') 
{ 
   scrollPos = document.documentElement.scrollTop; 
} 
else if (typeof document.body != 'undefined') 
{ 
   scrollPos = document.body.scrollTop; 
} 
```

> 方法三 运用jQuery解决

```
$(selector).scrollTop(offset)
```



