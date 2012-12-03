/**
 * @example
 *     List of all CSS-rules of element: getElementCss( getElementCssRules(<element>, getAllCssRules()) )
 *     One computed CSS rule that contains all CSS properties of element: computeStyle(getElementCssRules(<element>, getAllCssRules()))
 */
 

function convertRuleListToArray(ruleList){
    return Array.prototype.map.call(ruleList, function(rule){
        return rule;
    });
};

function getAllCssRules(){
    var styleSheets = document.styleSheets;
    var allCssRules = [];
    Array.prototype.forEach.call(styleSheets, function(styleSheet){
        if ( styleSheet.rules && styleSheet.rules.length ) {
        	allCssRules = allCssRules.concat( convertRuleListToArray(styleSheet.rules) );
        }
    });
    return allCssRules;
};

function isCssAppliedToElement(element, cssRule){
	try {
		var cssElements = document.querySelectorAll(cssRule.selectorText);
	}
	catch (e) {

		// TODO: fix :hover, :focus, ::-webkit-placeholder etc.

		console.error('Error in "isCssAppliedToElement":', element, cssRule.selectorText, cssRule);
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

function getElementCssRules(element, allCssRules){
	return allCssRules.filter(function(cssRule){
		return isCssAppliedToElement(element, cssRule);
	});
};

function getElementCss(cssRules){
	return cssRules.map(function(cssRule){
		return cssRule.cssText
			.replace(/\{/gm, '{\n    ') // TODO: fix: content: " bla bla { bla"
			.replace(/\;/gm, ';\n    '); // TODO: fix: content: " bla; bla bla"
	}).join('\n\n');
};

function computeStyle(cssRules){
	var computedStyle = {};
	var cssStr = cssRules.map(function(cssRule){
		return cssRule.cssText
			.replace(/^[^\{]*\{(.*)/i, '$1')
			.replace(/([^\}]*)\}\s*$/i, '$1');
	});
	cssStr.join(';').split(/\s*;\s*/i).forEach(function(cssProp){
		var name = cssProp.replace(/^([^\:]*)\:.*/i, '$1');
		var value = cssProp.replace(/.*\:\s*([^\:]*)/i, '$1');
		if ( name && value ) {
			computedStyle[name] = value;
		}
	});
	return computedStyle;
};
