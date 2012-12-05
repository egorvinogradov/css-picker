/**
 * @example
 *      All CSS rules of document: getAllCssRules()
 *      List of all CSS rules of elements from <NodeList>: getElementCssRules(<NodeList>, getAllCssRules())
 *      CSS code from list of CSS rules: convertCssRulesToCode( getElementCssRules(<NodeList>, getAllCssRules()) )
 */

/* Example. */
/* Returns CSS of all child elements of <selector> */
/*
function _test(selector){
    return convertCssRulesToCode(
        getElementCssRules(
            document.querySelectorAll(selector)[0].getElementsByTagName('*'),
            getAllCssRules()
        ), {
            indent: 4,
            linesUnder: 2
        }
    );
};
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

function repeatString(str, count){
    return new Array((count || 0) + 1).join(str);
}

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

function convertCssRulesToCode(cssRules, settings){
    return toArray(cssRules).map(function(cssRule){
        return cssRule.cssText
            .replace('{', '{\n') // TODO: don't forget CSS "content" property that may contain "{", "}" and ";"
            .replace('}', '\n}\n')
            .replace(';', ';\n' + repeatString(' ', settings.indent));
    }).join(repeatString('\n', settings.linesUnder));
};
