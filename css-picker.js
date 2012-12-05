/**
 * @example
 *      All CSS rules of document: getAllCssRules()
 *      List of all CSS rules of elements from <NodeList>: getElementCssRules(<NodeList>, getAllCssRules())
 *      CSS code from list of CSS rules: convertCssRulesToCode( getElementCssRules(<NodeList>, getAllCssRules()) )
 */
 
 function toArray(list){
    if ( list instanceof Array ) {
        return list;
    }
    else {
        return Array.prototype.map.call(list, function(item){
            return item;
        });
    }
};

function isElementConformWithSelector(element, selector){
    try {
        var cssElements = document.querySelectorAll(selector);
    }
    catch (e) {
        console.error('Can\'t get element by selector:', selector, element); // TODO: fix pseudo-classes and pseudo-elements
        return false;
    }
    for ( var i = 0, l = cssElements.length; i < l; i++ ) {
        var cssElement = cssElements[i];
        if ( cssElement === element ) {
            return true;
        }
    }
    return false;
};

function getAllCssRules(){
    return toArray(document.styleSheets)
        .filter(function(styleSheet){
            return styleSheet.rules && styleSheet.rules.length;
        })
        .map(function(styleSheet){
            return toArray(styleSheet.rules);
        })
        .reduce(function(allCssRules, cssRules){
            return allCssRules.concat(cssRules);
        });
};

function getElementCssRules(elements, cssRules){
    return toArray(elements)
        .map(function(element){
            return cssRules.filter(function(cssRule){
                return isElementConformWithSelector(element, cssRule.selectorText);
            });
        })
        .reduce(function(allCssRules, cssRules){
            return allCssRules.concat(cssRules);
        });
};

function convertCssRulesToCode(cssRules){
    return toArray(cssRules).map(function(cssRule){
        return cssRule.cssText
            .replace('{', '{\n  ')
            .replace('}', '\n}\n')
            .replace(';', ';\n  '); // TODO: don't forget CSS "content" property that may contain "{", "}" and ";"
    }).join('\n');
};

/*
// get CSS of all child elements of <selector>
function _test(selector){
    return convertCssRulesToCode(
        getElementCssRules(
            document.querySelectorAll(selector)[0].getElementsByTagName('*'),
            getAllCssRules()
        )
    );
};
*/
