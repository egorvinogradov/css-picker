Example:

* List of all CSS-rules of element:
<pre>
getElementCss( getElementCssRules(element, getAllCssRules()) )
</pre>
* One computed CSS rule that contains all CSS properties of element:
<pre>
computeStyle(getElementCssRules(element, getAllCssRules()))
</pre>
 