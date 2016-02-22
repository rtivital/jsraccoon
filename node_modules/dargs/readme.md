# dargs [![Build Status](https://travis-ci.org/sindresorhus/dargs.svg?branch=master)](https://travis-ci.org/sindresorhus/dargs)

> Reverse [`minimist`](https://github.com/substack/minimist). Convert an object of options into an array of command-line arguments.

Useful when spawning command-line tools.


## Install

```
$ npm install --save dargs
```


#### Usage

```js
var dargs = require('dargs');

var options = {
	foo: 'bar',
	hello: true,                    // results in only the key being used
	cake: false,                    // prepends `no-` before the key
	camelCase: 5,                   // camelCase is slugged to `camel-case`
	multiple: ['value', 'value2'],  // converted to multiple arguments
	sad: ':('
};

var excludes = ['sad'];
var includes = ['camelCase', 'multiple', 'sad'];

console.log(dargs(options, excludes));
/*
[
	'--foo=bar',
	'--hello',
	'--no-cake',
	'--camel-case=5',
	'--multiple=value',
	'--multiple=value2'
]
*/

console.log(dargs(options, excludes, includes));
/*
[
	'--camel-case=5',
	'--multiple=value',
	'--multiple=value2'
]
*/


console.log(dargs(options, [], includes));
/*
[
	'--camel-case=5',
	'--multiple=value',
	'--multiple=value2',
	'--sad=:(''
]
*/
```

## API

### dargs(options, excludes, includes)

#### options

Type: `object`

Options to convert to command-line arguments.

#### excludes

Type: `array`

Keys to exclude.  
Takes precedence over `includes`.

#### includes

Type: `array`

Keys to include.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
