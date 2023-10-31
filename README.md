# allowType
![npm](https://img.shields.io/npm/v/allowtype) ![npm bundle size (version)](https://img.shields.io/bundlephobia/min/allowtype/1.2.1) ![GitHub release (by tag)](https://img.shields.io/github/downloads/khairnar2960/allowtype/stable/total) ![jsDelivr hits (npm)](https://img.shields.io/jsdelivr/npm/hy/allowtype) ![npm](https://img.shields.io/npm/dy/allowtype) ![GitHub issues](https://img.shields.io/github/issues-raw/khairnar2960/allowtype) ![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/khairnar2960/allowtype)

A quick function to allow type into input
```javascript
allowType(selector, option, length, toCase)
```

- selector `(Event|Selector|Node)`
- option
  * alpha - `(alphabets only no space)`
  * alphaspace `(alphabets with space)`
  * alphanum `(alphanumeric without space)`
  * slug `(alphanumeric slug)`
  * number `(numbers only)`
  * mobile `(10 digit indian mobile number)`
  * decimal `(decimal number with decimals digit length)`
  * pincode `(indian pin code)`
  * pan `(indian pan card number)`

- length `(define return length)`
- toCase
  * upper `(Uppercase)`
  * lower `(Lowercase)`
  * title `(Titlecase)`
  * word  `(Wordcase)`

## Deployment

To use allowType include `allowtype.js` just above closing body tag into html

```html
  <script src="allowtype.js"></script>
```
OR use jsDeliver CDN

```html
  <script src="https://cdn.jsdelivr.net/npm/allowtype@1.2.1/allowtype.min.js"></script>
```
OR use unpkg CDN

```html
  <script src="https://unpkg.com/allowtype@1.2.1/allowtype.js"></script>
```

## Usage
### Inline Uses:
#### Allow alpha with length 10 characters
```html
<input type="text" oninput="allowType(event, 'alpha', 10)">
```
#### Allow alphanumeric only
```html
<input type="text" oninput="allowType(event, 'alphanum', 10)">
```
#### Allow slug with dash (-)
```html
<input type="text" oninput="allowType(event, 'slug')">
```
#### Allow numbers only
```html
<input type="text" oninput="allowType(event, 'number')">
```
#### Allow decimals with two decimal places
```html
<input type="text" oninput="allowType(event, 'decimal', 2)">
```
#### Allow alpha with no length limit and convert to uppercase
```html
<input type="text" oninput="allowType(event, 'alpha', false, 'upper')">
```

### Using EventListener
```html
<input type="text" id="number-input">
<script>
  document.querySelector('#number-input')
  .addEventListener('input', function(e) {
    allowType(this, 'number');
  })
</script>
```

### Using React

```shell
npm i allowtype
```

```jsx
import allowtype from './allowtype.js';

function NumberOnlyInput() {
  function handleOnInput(event) {
    allowtype(event, 'number');
  }

  return (<>
    <input type="text" onInput={handleOnInput} />
  </>);
}

export default NumberOnlyInput;
```

## Author

- [Harshal Khairnar](https://harshalkhairnar.com)
