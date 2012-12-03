(function (document, console) {

    'use strict';

    function convertCssRuleListToArray(cssRules) {
        return Array.prototype.map.call(cssRules, function (rule) {
            return rule;
        });
    }

    function isElementConformWithSelector(element, selector) {

        var cssElements = document.querySelectorAll(selector),
            i,
            l;

        try {
            var cssElements = document.querySelectorAll(selector),
                i,
                l;

        } catch (e) {
            console.error('Can\'t get element by selector:', selector, element); // fix pseudo elements
            return false;
        }
        for (i = 0, l = cssElements.length; i < l; i++) {
            var cssElement = cssElements[i];
            if ( cssElement === element ) {
                return true;
            }
        }
        return false;
    }

    function getAllCssRules() {
        var styleSheets = document.styleSheets,
            allCssRules = [];
        Array.prototype.forEach.call(styleSheets, function (styleSheet) {
            if (styleSheet.rules && styleSheet.rules.length) {
                allCssRules = allCssRules.concat(convertCssRuleListToArray(styleSheet.rules));
            }
        });
        return allCssRules;
    }

    function getElementCssRules(elements, cssRules) {
        var allElementsCssRules = [];
        Array.prototype.forEach.call(elements, function (element) {
            var elementCssRules = cssRules.map(function (cssRule) {
                return isElementConformWithSelector(element, cssRule.selectorText);
            });
            allElementsCssRules = allElementsCssRules.concat(elementCssRules);
        });
        return allElementsCssRules;
    }

    function convertCssRulesToCode(cssRules) {
        return cssRules.map(function (cssRule) {
            if 
            return cssRule.cssText
                .replace('{', '{\n  ')
                .replace(';', ';\n  ');
        });
    }


    function _test(selector) {

        var elements = document.querySelectorAll(selector)[0].getElementsByTagName('*');
        console.log('>>> elements', elements.length);

        var allCssRules = getAllCssRules();
        console.log('>>> all css rules', allCssRules);

        var cssRules = getElementCssRules(elements, allCssRules);
        console.log('>>> css rules', cssRules);

        var cssCode = convertCssRulesToCode(cssRules);
        console.log('>>> css code', cssCode);

        /*
        return convertCssRulesToCode(
            getElementCssRules(
                document.querySelectorAll(selector)[0].getElementsByTagName('*'),
                getAllCssRules()
            )
        );
        */
    }

}(document, console));
