
# allowType

A quick function to allow type into input

- selector (Event|Selector|Node)
- options
  * alpha - (alphabets only no space)
  * alphaspace (alphabets with space)
  * alphanum (alphanumeric without space)
  * slug (alphanumeric slug)
  * number (numbers only)
  * mobile (10 digit indian mobile number)
  * decimal (decimal number with decimals digit length)
  * pincode (indian pin code)

- length
- toCase
  * upper - Uppercase
  * lower - Lowercase
  * title - Titlecase
  * word  - Wordcase

## Deployment

To use allowType include `allowtype.js` just above closing body tag into html

```html
  <script src="allowtype.js"></script>
```
OR use CDN

```html
  <script src="https://cdn.jsdelivr.net/npm/allowtype@1.2.0/allowtype.min.js"></script>
```

## Usage
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
## Author

- [@khairnar2960](https://www.github.com/khairnar2960)
