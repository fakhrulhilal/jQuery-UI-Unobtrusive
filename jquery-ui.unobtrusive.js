/**
 * jQuery UI Unobtrusive
 * Author: Fakhrulhilal Maktum (fakhrulhilal@gmail.com)
 * ----------------------------------------------------
 * Provide support for declarative syntax for jQuery UI
 * Usage: <div data-role="jqueryui-[widgetName]" 
 *             data-[widgetName]-[optionName1]=""
 *             data-[widgetName]-[optionName2]=""
 *             data-[widgetName]-[optionNameX]=""></div>
 * widgetName: widget name from jQuery UI
 *             Currently support: dialog
 * optionName: option name, see http://api.jqueryui.com
 * type convertion for option value:
 * 1. Boolean: true, false, 1, 0
 * 2. Object: use JSON string
 * 3. Number: 123456789
 * 4. String: all value default to string
 *
 * Required:
 * 1. jQuery
 * 2. jQuery UI
 * 3. jQuery Utility (in this repository)
 */
jQuery(function ($) {
	/**
     * jQuery UI unobtrusive for: dialog
     * Usage: 
	 * <div data-role="jqueryui-dialog" data-dialog-[optionName]="" />
     */
	$('[data-role="jqueryui-dialog"]').each(function (index, item) {
		var attributes = item.attributes,
            optionMapping = {
            	autoopen: { real: 'autoOpen', type: 'boolean' },
            	appendto: { real: 'appendTo', type: 'string' },
            	buttons: { real: 'autoOpen', type: 'object' },
            	closeonescape: { real: 'closeOnEscape', type: 'boolean' },
            	closetext: { real: 'closeText', type: 'string' },
            	dialogclass: { real: 'dialogClass', type: 'string' },
            	draggable: { real: 'draggable', type: 'boolean' },
            	height: { real: 'height', type: 'number' },
            	hide: { real: 'hide', type: 'string' },
            	maxheight: { real: 'maxHeight', type: 'number' },
            	maxwidth: { real: 'maxWidth', type: 'number' },
            	minheight: { real: 'minHeight', type: 'number' },
            	minwidth: { real: 'minWidth', type: 'number' },
            	modal: { real: 'modal', type: 'boolean' },
            	position: { real: 'position', type: 'string' },
            	resizable: { real: 'resizable', type: 'boolean' },
            	show: { real: 'show', type: 'string' },
            	title: { real: 'title', type: 'string' },
            	width: { real: 'width', type: 'number' }
            },
            options = {
            	resizable: false,
            	modal: false,
            	autoOpen: true,
            	closeOnEscape: true
            },
            checkAttribute = /^(data-dialog-)(\w+)/g,
            match, isMatch, field;
		window.attr = attributes;
		for (var i = 0, ii = attributes.length; i < ii; i++) {
			match = checkAttribute.exec(attributes[i].nodeName);
			isMatch = checkAttribute.test(attributes[i].nodeName);
			if ($.isArray(match) && match.length > 2) {
				field = match[2];
				value = typeof optionMapping[field] != 'undefined' ? $.convert(attributes[i].nodeValue, optionMapping[field].type) : attributes[i].nodeValue;
				field = typeof optionMapping[field] != 'undefined' ? optionMapping[field].real : field;
				options[field] = value;
			}
		}
		//khusus title, ambil dari attribute 'title' jika ada
		if ($(item).attr('title'))
			options['title'] = $(item).attr('title');
		$(item).show();
		$(item).dialog(options);
	});
})