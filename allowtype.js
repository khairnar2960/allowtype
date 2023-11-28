'use strict';
// comment
(function(global, factory) {
	typeof exports === "object" && typeof module !== "undefined" ?
		(module.exports = factory) :
		typeof define === "function" && define.amd ?
		define(factory) :
		((global =
				typeof globalThis !== "undefined" ? globalThis : global || self),
			(global.allowType = factory, global.allowType.version = '1.2.3'));
})(this, function(selector, option = 'number', length = null, toCase = false, setState = null) {
	/**
	 * @function	allowType
	 * @author		Harshal Khairnar
	 * @url			https://harshalkhairnar.com
	 * @version		1.2.3
	 * @var			event : (Event|Node)
	 * @var			option : option
	 * @var			length : length to return
	 * @var			toCase : return case (upper|lower|title|word) 
	 **/

	/**
	 * @method      String.prototype.toTitleCase()
	 * additional support for to title case
	 **/
	if (!String.prototype.hasOwnProperty('toTitleCase')) {
		Object.defineProperty(String.prototype, 'toTitleCase', {
			value: function() {
				return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
			},
			enumerable: false
		});
	}

	/**
	 * @method      String.prototype.toWordCase()
	 * additional support for to word case
	 **/
	if (!String.prototype.hasOwnProperty('toWordCase')) {
		Object.defineProperty(String.prototype, 'toWordCase', {
			value: function() {
				return this.split(/\s+/).map(word => word.toLowerCase().toTitleCase()).join(' ');
			},
			enumerable: false
		});
	}

	let target;
	if (!selector) {
		throw new ReferenceError("Invalid selector");
	}
	if (selector instanceof Event || 'undefined' !== typeof selector?.target) {
		target = selector.target;
	} else if ('object' === typeof selector && selector.nodeType) {
		target = selector;
	} else if ('string' === typeof selector) {
		target = document.querySelector(selector);
	}
	if (!target) {
		throw new ReferenceError('Invalid selector');
	}

	let value = target.value;
	const devnagariNums = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
	switch (option) {
		case 'alpha':
			if (length) {
				value = value.substr(0, length).replace(/[^a-zA-Z]/gmi, '');
			} else {
				value = value.replace(/[^a-zA-Z]/gmi, '');
			}
			break;
		case 'alphaspace':
			if (length) {
				value = value.substr(0, length).replace(/[^a-zA-Z\s]/gmi, '');
			} else {
				value = value.replace(/[^a-zA-Z\s]/gmi, '');
			}
			break;
		case 'alphanum':
			if (length) {
				value = value.substr(0, length).replace(/[^0-9a-zA-Z]/gmi, '');
			} else {
				value = value.replace(/[^0-9a-zA-Z]/gmi, '');
			}
			break;
		case 'slug':
			if (length) {
				value = value.substr(0, length).replace(/[^0-9a-zA-Z-]/gmi, '');
			} else {
				value = value.replace(/[^0-9a-zA-Z-]/gmi, '');
			}
			break;
		case 'number':
			devnagariNums.forEach(number => {
				value = value.replaceAll(number, devnagariNums.indexOf(number));
			});
			if (length) {
				value = value.substr(0, length).replace(/[^0-9]/gmi, '');
			} else {
				value = value.replace(/[^0-9]/gmi, '');
			}
			break;
		case 'mobile':
			devnagariNums.forEach(number => {
				value = value.replaceAll(number, devnagariNums.indexOf(number));
			});
			value = value.replace(/[^0-9]/gmi, '');
			value = value.substr(0, 10);
			if (!value.charAt(0).match(/[6-9]/)) {
				value = value.substr(1);
			}
			break;
		case 'decimal':
			devnagariNums.forEach(number => {
				value = value.replaceAll(number, devnagariNums.indexOf(number));
			});
			let i = value.search(/\./gmi);
			if (value.length === 1) {
				value = value.replace(/[^0-9]/gmi, '');
			}
			if (i >= 0) {
				if (length) {
					value = value.substr(0, i + 1) + value.substr(i).substr(0, length + 1).replace(/\./gmi, '');
				} else {
					value = value.substr(0, i + 1) + value.substr(i).replace(/\./gmi, '');
				}
			}
			value = value.replace(/[^0-9.]/gmi, '');
			break;
		case 'pincode':
			// RegEX to find pin code Indian PIN code
			// ^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$
			// 123456 | 123 456
			devnagariNums.forEach(number => {
				value = value.replaceAll(number, devnagariNums.indexOf(number));
			});
			value = value.replace(/[^0-9]/gmi, '');
			value = value.substr(0, 6);
			if (!value.charAt(0).match(/[1-9]/)) {
				value = value.substr(1);
			}
			break;
		case 'pan':
			// RegEX to find PAN Card number
			// ^[A-Z]{5}[0-9]{4}[A-Z]{1}$
			// ABCDE1234Z
			devnagariNums.forEach(number => {
				value = value.replaceAll(number, devnagariNums.indexOf(number));
			});
			value = value.replace(/[^0-9A-Za-z]/gmi, '');
			value = value.substr(0, 10);
			for (let i = 0; i < 10; i++) {
				let regex;
				if ( i < value.length) {
					if (i < 5 || i === 9) {
						regex = new RegExp(/[A-Za-z]/);
					} else if (i >= 5 && i < 9) {
						regex = new RegExp(/[0-9]/);
					}
					if (!value.charAt(i).match(regex)) {
						value = value.substr(0, i);
					}
				} else {
					break;
				}
			}
			break;
		case 'ifsc':
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
			devnagariNums.forEach(number => {
				value = value.replaceAll(number, devnagariNums.indexOf(number));
			});
			value = value.replace(/[^0-9A-Za-z]/gmi, '');
			value = value.substr(0, 11);
			for (let i = 0; i < 11; i++) {
				let regex;
				if ( i < value.length) {
					if (i < 4) {
						regex = new RegExp(/[A-Za-z]/);
					} else if (i === 4) {
						regex = new RegExp(/[0]/);
					} else if (i > 4 && i < 11) {
						regex = new RegExp(/[A-Za-z0-9]/);
					}
					if (!value.charAt(i).match(regex)) {
						value = value.substr(0, i);
					}
				} else {
					break;
				}
			}
			toCase = 'upper';
			break;
	}
	if (toCase) {
		toCase = toCase.toLowerCase(); // case insensitive value like UPPER|Upper|upper
		if (toCase === 'upper') {
			value = value.toUpperCase();
		} else if (toCase === 'lower') {
			value = value.toLowerCase();
		} else if (toCase === 'title') {
			value = value.toTitleCase();
		} else if (toCase === 'word') {
			value = value.toWordCase();
		}
	}
	if (setState) {
		setState(value);
	} else {
		target.value = value;
	}
});