css-picker
=======================

Picks CSS of specified elements.

Example:

* All CSS rules of document:

<pre>
getAllCssRules()
</pre>

* List of all CSS rules of elements from NodeList:

<pre>
getElementCssRules(NodeList, getAllCssRules())
</pre>

* CSS code from list of CSS rules:

<pre>
convertCssRulesToCode( getElementCssRules(NodeList, getAllCssRules()), 4 )
</pre>
