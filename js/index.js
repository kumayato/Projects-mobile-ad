/**
 * Created by Administrator on 2017/4/18 0018.
 */
// 获取元素
var getElem = function( selector ){
    return document.querySelector(selector);
}
var getAllElem = function( selector ){
    return document.querySelectorAll(selector);
}
// 获取元素的样式
var getCls = function ( element ) {
    return element.getAttribute('class');
}
// 设置元素的样式
var setCls = function( element ,cls){
    return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function( element , cls ){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) === -1){
        setCls(element,baseCls+' '+cls); // 注意空格
    }
    return ;
}
// 为元素删减样式
var delCls = function( element , cls){
    var baseCls  = getCls(element);
    if( baseCls.indexOf(cls) > -1){
        setCls( element,baseCls.split(cls).join(' ').replace(/\s+/g,' ') );
    }
    return ;
}

// 数据
var screenAnimateElement = {
    ".screen-1" : [
        ".screen-1__title",
        ".screen-1__img-product",
        ".screen-1__img-shadow"
    ],

    ".screen-2" : [
        ".screen-2__title",
        ".screen-2__description",
        ".screen-2__img",
        ".screen-2__img-desc-1",
        ".screen-2__img-desc-2",
        ".screen-2__img-desc-3"
    ],

    ".screen-3" : [
        ".screen-3__title",
        ".screen-3__description",
        ".screen-3__features",
        ".screen-3__features-item",
        ".screen-3__img"
    ],

    ".screen-4" : [
        ".screen-4__title",
        ".screen-4__description",
        ".screen-4__products-item1",
        ".screen-4__products-item2",
        ".screen-4__products-item3",
        ".screen-4__products-item4"
    ],

    ".screen-5" : [
        ".screen-5__title",
        ".screen-5__description",
        ".screen-5__img"
    ]
};

// 第一步，初始化
function setAnimateInit(obj) {
    var screenElements = screenAnimateElement[obj];
    for (var i=0; i<screenElements.length; i++) {
        var elements = document.querySelector(screenElements[i]);
        // 得到了每一个子元素的class
        var baseClass = elements.getAttribute('class');
        elements.setAttribute('class',baseClass + " " + screenElements[i].substr(1) + "_animate_init");
    }
};
for (var k in screenAnimateElement) {
    if (k == '.screen-1') {
        continue;
    };
    setAnimateInit(k);
}
// 第二步，设置初始动画
function setAnimateDone(obj) {
    var screenElements = screenAnimateElement[obj];
    for (var i=0; i<screenElements.length; i++) {
        var elements = document.querySelector(screenElements[i]);
        // 得到了每一个子元素的class
        var baseClass = elements.getAttribute('class');
        elements.setAttribute('class',baseClass.replace("_animate_init","_animate_done"));
    };
};
// 0.1秒后第一屏自动进行动画
setTimeout(function () {
    setAnimateDone('.screen-1');
},100);

// 第三步，设置导航区块样式的改变
var navItems = getAllElem('.header__nav-item');
var outLineItems = getAllElem('.outline__item')

/*
var switchNavItemsActive = function( idx){
    for(var i=0;i<navItems.length-1;i++){
        delCls(navItems[i],'header__nav-item_status_active');
    }
    addCls(navItems[idx],'header__nav-item_status_active');

    for(var i=0;i<outLineItems.length;i++){
        delCls(outLineItems[i],'outline__item_status_active');
    }
    addCls(outLineItems[idx],'outline__item_status_active');
}
*/

var switchNavItemsActive = function(idx){
    for(var i=0;i<navItems.length-1;i++){
        delCls(navItems[i],'header__nav-item_status_active');
        delCls(outLineItems[i],'outline__item_status_active');
    }

    addCls(navItems[idx],'header__nav-item_status_active');
    addCls(outLineItems[idx],'outline__item_status_active');

};

// 导航栏的高度
var header = getElem('.header');
var navHight = header.offsetHeight;
// 得到侧边导航
var outline = getElem('.outline');
// 得到logo
var logo = getElem('.header__logo');

// 获取ScrollTop兼容
function getScrollTop() {

    return document.documentElement.scrollTop || window.pageYOffset || document.body;
}

window.onscroll = function () {

    var top = getScrollTop();

    // 第四步，固定导航栏并且样式改变
    // 侧边栏划出。
    if (top > navHight) {

        addCls(header,'header_status_fixed');
        addCls(logo,'header__logo_status_fixed')
        delCls(outline,'outline_animate_init');

    }else {

        delCls(header,'header_status_fixed');
        delCls(logo,'header__logo_status_fixed');
        addCls(outline,'outline_animate_init');

    }
    for(var i=0; i< navItems.length-1; i++) {
        if (top > navHight) {
            addCls(navItems[i],'header__nav_status_fixed');
        }else {
            delCls(navItems[i],'header__nav_status_fixed')
        }
    }

    // 第五步，滚动到哪个区域，该区域进行动画并且导航栏相应的样式改变
    if (top < 800-100) {
        switchNavItemsActive(0);
        navTip.style.left = 70*0 + 20 + 'px';
    }
    if( top >= ( 800*1-100 ) ){
        setAnimateDone('.screen-2');
        switchNavItemsActive(1);
        navTip.style.left = 70*1 + 20 + 'px';
    };
    if( top >= ( 800*2-100 ) ){
        setAnimateDone('.screen-3');
        switchNavItemsActive(2);
        navTip.style.left = 70*2 + 20 + 'px';
    };
    if( top >= ( 800*3-100) ){
        setAnimateDone('.screen-4');
        switchNavItemsActive(3);
        navTip.style.left = 70*3 + 20 + 'px';
    };
    if( top >= ( 800*4-100 ) ){
        setAnimateDone('.screen-5');
        switchNavItemsActive(4);
        navTip.style.left = 70*4 + 20 + 'px';
    };

};

// 第六步，点击导航，滑动到对应的区块且导航区块样式发生改变

// 设置ScrollTop兼容
function setScrollTop(scroll_top) {
    document.documentElement.scrollTop = scroll_top;
    window.pageYOffset = scroll_top;
    document.body.scrollTop = scroll_top;
}

for(var i=0; i<navItems.length-1; i++) {
    // 得到索引
    navItems[i].index = i;
    outLineItems[i].index = i;

    navItems[i].onclick = function () {

        switchNavItemsActive(this.index);

        var scrollVal = 800*(this.index) - 100;
        setScrollTop(scrollVal)
    };

    outLineItems[i].onclick = function () {

        switchNavItemsActive(this.index);

        var scrollVal = 800*(this.index) - 100;
        setScrollTop(scrollVal)
    };
};



// 第七步 滑动门特
var navTip = getElem('.header__nav-tip');
function navTipChange() {
    var currentIndex = 0;

    for (var i=0; i<navItems.length-1; i++) {
        navItems[i].index = i;

        navItems[i].onmouseover = function () {
            navTip.style.left = 70*this.index + 20 + 'px';
        };

        navItems[i].onmouseout = function () {
            for (var j=0; j<navItems.length-1; j++)
                if( getCls(this).indexOf('header__nav-item_status_active') > -1  ){
                    currentIndex = this.index;
                    break
                }
            navTip.style.left = 70*currentIndex + 20 + 'px';
        };
    }
}
navTipChange();

























