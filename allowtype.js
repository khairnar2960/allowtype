'use strict';
(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ?
		(module.exports = factory()) :
		typeof define === "function" && define.amd ?
		define(factory()) :
		((global =
				typeof globalThis !== "undefined" ? globalThis : global || self),
			(global.allowType = factory(), global.allowType.version = '1.2.6'));
})(this, function() {

	/**
	 * Convert to uppercase
	 * @param {string} input string input to convert to uppercase
	 * @returns {string}
	 */
	const toUpperCase = (input) => typeof input === 'string' ? input.toUpperCase() : input;

	/**
	 * Convert to lowercase
	 * @param {string} input string input to convert to lowercase
	 * @returns {string}
	 */
	const toLowerCase = (input) => typeof input === 'string' ? input.toLowerCase() : input;

	/**
	 * Convert to title case
	 * @param {string} input string input to convert to title case
	 * @param {boolean} strict input[0] will be upper and remaining will be in lower case
	 * @returns {string}
	 */
	const toTitleCase = (input, strict = true) => {
	    if (typeof input !== 'string' || input.length < 1) return input;
	    const [firstChar, ...remainingChars] = input;
	    return toUpperCase(firstChar) + (strict ? toLowerCase(remainingChars.join('')) : remainingChars.join(''));
	};

	/**
	 * Convert to word case
	 * @param {string} input string input to convert to word case
	 * @returns {string}
	 */
	const toWordCase = (input) => {
	    if (typeof input !== 'string') return input;
	    return input.split(/\s+/).map(word => toTitleCase(word)).join(' ');
	};

	const devnagariNums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

	const options = {
	    alpha: /[^a-zA-Z]/g,
	    alphaspace: /[^a-zA-Z\s]/g,
	    alphanum: /[^0-9a-zA-Z]/g,
	    alphanumspace: /[^0-9a-zA-Z\s]/g,
	    slug: /[^0-9a-zA-Z-]/g,
	    number: /[^0-9]/g,
	    decimal: /[^0-9.]/g,
	    mobile: /[^0-9]/g,

	    // RegEX to find Indian PIN code
	    // ^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$
	    // 123456 | 123 456
	    pincode: /[^0-9]/g,

	    // RegEX to find PAN Card number
	    // ^[A-Z]{5}[0-9]{4}[A-Z]{1}$
	    // ABCDE1234Z
	    pan: /[^0-9A-Za-z]/g,

	    /**
	     * It should be 11 characters long.
	     * The first four characters should be upper case alphabets.
	     * The fifth character should be 0.
	     * The last six characters are usually numeric,
	     * but can also be alphabetic.
	     * 
	     * RegEX to find IFSC (Indian Financial System) Code
	     * ^[A-Z]{4}0[A-Z0-9]{6}$
	     * ex. SBIN0125620
	     */
	    ifsc: /[^0-9A-Za-z]/g
	};

	const stringCases = {
	    upper: toUpperCase,
	    lower: toLowerCase,
	    title: toTitleCase,
	    word: toWordCase
	};

	/**
	 * Allow to type specific thing in input box
	 * @param {Event|HTMLInputElement} selectorOrEvent Selector
	 * @param {string|{option: string, length: number, toCase: string, setState: function }} optionOrConfig option / config
	 * @param {?number} length Max. length to type
	 * @param {?string} toCase Convert to specific case
	 * @param {?function} setState Update React state or use as callback(value) function
	 * @author [Harshal Khairnar](https://github.com/khairnar2960)
	 * @url [harshalkhairnar.com](https://harshalkhairnar.com)
	 * @version 1.2.6
	 */
	function allowType(selectorOrEvent, optionOrConfig = 'number', length = null, toCase = null, setState = null) {
	    let target, option, config;

	    if (typeof optionOrConfig === 'object' && optionOrConfig !== null) {
	        config = optionOrConfig;
	        option = config.option || 'number';
	        length = config.length || null;
	        toCase = config.toCase || null;
	        setState = config.setState || null;
	    } else {
	        option = optionOrConfig;
	    }

	    if (!selectorOrEvent) throw new ReferenceError("Invalid selector");

	    if (selectorOrEvent instanceof Event || selectorOrEvent?.target) {
	        target = selectorOrEvent.target;
	    } else if (selectorOrEvent.nodeType) {
	        target = selectorOrEvent;
	    } else if (typeof selectorOrEvent === 'string') {
	        target = document.querySelector(selectorOrEvent);
	    }

	    if (!target) throw new ReferenceError('Invalid selector');

	    let value = target.value;

	    devnagariNums.forEach(number => {
	        value = value.replaceAll(number, devnagariNums.indexOf(number));
	    });

	    if (option in options) {
	        value = value.replace(options[option], '').substr(0, length || value.length);

	        if (option === 'mobile') {
	            value = value.substr(0, 10);
	            if (!value.charAt(0).match(/[6-9]/)) {
	                value = value.substr(1);
	            }
	        }

	        if (option === 'pincode') {
	            value = value.substr(0, 6);
	            if (!value.charAt(0).match(/[1-9]/)) {
	                value = value.substr(1);
	            }
	        }

	        if (option === 'pan') {
	            value = value.substr(0, 10).replace(/[^0-9A-Za-z]/g, '');
	            for (let i = 0; i < 10; i++) {
	                if (i < value.length) {
	                    const regex = (i < 5 || i === 9) ? /[A-Za-z]/ : /[0-9]/;
	                    if (!value.charAt(i).match(regex)) value = value.substr(0, i);
	                }
	            }
	            toCase = 'upper';
	        }

	        if (option === 'ifsc') {
	            value = value.substr(0, 11).replace(/[^0-9A-Za-z]/g, '');
	            for (let i = 0; i < 11; i++) {
	                if (i < value.length) {
	                    const regex = (i < 4) ? /[A-Za-z]/ : (i === 4) ? /[0]/ : /[A-Za-z0-9]/;
	                    if (!value.charAt(i).match(regex)) value = value.substr(0, i);
	                }
	            }
	            toCase = 'upper';
	        }
	    }

	    if (toCase) {
	        const caseFunc = stringCases[toCase.toLowerCase()];
	        value = typeof caseFunc === 'function' ? caseFunc(value) : value;
	    }

	    if (typeof setState === 'function') {
	        setState(value);
	    } else {
	        target.value = value;
	    }
	}

	return allowType;
});