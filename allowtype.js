/**
 * @function	allowType
 * @auther		Harshal Khairnar
 * @url			https://harshalkhairnar.com
 * @version		1.0.0
 * @var			e : event
 * @var			o : option
 * @var			l : length
 * @var			c : Case (upper|lower|title) 
 **/
function allowType(e, o = 'number', l = false, c = false) {
    let val = e.target.value;
    switch (o) {
        case 'alpha':
            if (l) {
                val = val.substr(0, l).replaceAll(/[^a-zA-Z]/gmi, '');
            } else {
                val = val.replaceAll(/[^a-zA-Z]/gmi, '');
            }
            break;
        case 'alphanum':
            if (l) {
                val = val.substr(0, l).replaceAll(/[^0-9a-zA-Z]/gmi, '');
            } else {
                val = val.replaceAll(/[^0-9a-zA-Z]/gmi, '');
            }
            break;
        case 'slug':
            if (l) {
                val = val.substr(0, l).replaceAll(/[^0-9a-zA-Z-]/gmi, '');
            } else {
                val = val.replaceAll(/[^0-9a-zA-Z-]/gmi, '');
            }
            break;
        case 'number':
            if (l) {
                val = val.substr(0, l).replaceAll(/[^0-9]/gmi, '');
            } else {
                val = val.replaceAll(/[^0-9]/gmi, '');
            }
            break;
        case 'mobile':
            val = val.replaceAll(/[^0-9]/gmi, '');
            val = val.substr(0, 10);
            if (!val.charAt(0).match(/[6-9]/)) {
                val = val.substr(1);
            }
            break;
        case 'decimal':
            let i = val.search(/\./gmi);
            if (val.length === 1) {
                val = val.replaceAll(/[^0-9]/gmi, '');
            }
            if (i >= 0) {
                if (l) {
                    val = val.substr(0, i + 1) + val.substr(i).substr(0, l + 1).replaceAll(/\./gmi, '');
                } else {
                    val = val.substr(0, i + 1) + val.substr(i).replaceAll(/\./gmi, '');
                }
            }
            val = val.replaceAll(/[^0-9.]/gmi, '');
            break;
    }
    if (c == 'upper') {
        val = val.toUpperCase();
    } else if (c == 'lower') {
        val = val.toLowerCase();
    } else if (c == 'title') {
        if (!String.prototype.hasOwnProperty('toTitleCase')) {
            Object.defineProperty(String.prototype, 'toTitleCase', {
                value: function() {
                    return this.charAt(0).toUpperCase() + this.slice(1);
                },
                enumerable: false
            });
        }
        val = val.toTitleCase();
    }
    e.target.value = val;
}