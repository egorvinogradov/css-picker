function getClassNames(parentElSelector){
    var parent = document.querySelectorAll(parentElSelector)[0];
    var els = parent.getElementsByTagName('*');
    var classNames = [];
    Array.prototype.map.call(els, function(el){
        var elClassName = el.className;
        var elClassNames = elClassName && elClassName.split(/\s+/);
        var pushClassName = function(cn){
            cn && classNames.push(cn);
        };
        elClassNames.length > 1
            ? elClassNames.forEach(pushClassName)
            : pushClassName(elClassName);
    });
    return classNames;
};

function getDefaultStyle(){
    var testElId = 'css_test_el';
    var testEl = document.getElementById(testElId);
    if ( !testEl ) {
        testEl = document.createElement('div');
        testEl.id = testElId;
        document.body.appendChild(testEl);
    }
    return getComputedStyle(testEl);
};

function getStyleByClassName(className){
    var el = document.getElementsByClassName(className)[0];
    var defaultStyle = getDefaultStyle();
    var styles = {};
    var elRawStyle = getComputedStyle(el);
    for ( var prop in elRawStyle ) {
        if ( elRawStyle[prop] !== defaultStyle[prop] ) {
            styles[prop] = elRawStyle[prop];
        }
    }
    return styles;
};

function getCSS(parentElSelector){
    var classNames = getClassNames(parentElSelector);
    var counter = 0;
    classNames.forEach(function(className){
        var styles = getStyleByClassName(className);
        console.log(counter, className, styles);
        counter++;
    });
};
