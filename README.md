[![Build Status](https://img.shields.io/travis/selfrefactor/rambda.svg)](https://travis-ci.org/selfrefactor/rambda)
[![codecov](https://codecov.io/gh/selfrefactor/rambda/branch/master/graph/badge.svg)](https://codecov.io/gh/selfrefactor/rambda)
[![dependencies Status](https://david-dm.org/selfrefactor/rambda/status.svg)](https://david-dm.org/selfrefactor/rambda)

# Rambda

Faster alternative to `Ramda` in just 12kB - [Documentation](https://selfrefactor.github.io/rambda/#/)

## Argumentation

I admire `Ramda`, as it is great library in what it does. My main problem was its size. Even custom builds didn't deliver satisfactory results. Also I already had `Ramda` habits and I didn't want to switch to `Lodash`.

Then I realized that my best solution was to publish a library that recreates the functionality of some `Ramda` methods with less code.

Rambda partially shadows Ramda's API, so you need to check in Rambda's documentation, if the methods you need are available.

Generally speaking, if you have never used methods such as `R.transduce`, **Rambda** API should be enough for your needs.

## Example use

```
const R = require('rambda')
const result = R.compose(
  R.filter( R.equals( 2 ) ),
  R.map( R.add( 1 ) )
)({ a: 1, b: 2, c: 3 })
console.log(result) // => '{a: 2}'
```

## Install

- Use **yarn add rambda** for `Webpack` and `Node.js` usage

- For browser usage include in your HTML

```
https://cdnjs.cloudflare.com/ajax/libs/rambda/0.9.0/webVersion.js
```

## Differences between Rambda and Ramda

- Rambda's **type** detect async functions and unresolved `Promises`. The returned values are `'Async'` and `'Promise'`.

- Rambda's **equals** doesn't protect against circular structures as **Ramda.equals** does.

- Rambda's **path**, **pick** and **omit** accepts both string and array as condition argument('x.y.z' == ['x','y','z']).

- Rambda's **partialCurry**, **typedDefaultTo**, **typedPathOr**, **includes**, **padStart** and **padEnd** are not part of Ramda API.

- Rambda's **reverse** modifies the array, instead of returning reversed copy of it.

> If you need more **Ramda** methods in **Rambda**, you may either submit a `PR` or check the extended version of **Rambda** - [Rambdax](https://github.com/selfrefactor/rambdax)

## API

#### add

> add(a: Number, b: Number): Number

```javascript
R.add(2, 3) // =>  5
```

#### addIndex

> addIndex(fn: Function): Function

```javascript
const mapWithIndex = R.addIndex(R.map)
mapWithIndex(
  (val, index) => `${val} - ${index}`,
  ["A", "B", "C"]
) // => ["A - 0", "B - 1", "C - 2"]
```

#### adjust

> adjust(replaceFn: Function, i:Number, arr:Array): Array

It replaces `i` index in `arr` with the result of `replaceFn(arr[i])`.

```javascript
R.adjust(a => a + 1, 0, [0, 100]) // => [1, 100]
```

#### all

> all(fn: Function, arr: Array): Boolean

It returns `true` if all members of array `arr` returns `true`, when applied as argument to function `fn`.

```
const arr = [ 0, 1, 2, 3, 4 ]
const fn = x => x > -1
R.all(fn, arr) // => true
```

#### allPass

> allPass(rules: Array<Function>, input: any): Boolean

It returns `true` if all functions of `rules` return `true`, when `input` is their argument.

```
const input = {
  a : 1,
  b : 2,
}
const rules = [
  x => x.a === 1,
  x => x.b === 2,
]
R.allPass(conditionArr, obj) // => true
```

#### always

> always(x: any): Function

It returns function that always returns `x`.
```
const fn = R.always(7)

fn()// => 7
fn()// => 7
```

#### any

> any(condition: Function, arr: Array): Boolean

It returns true if at least one member of `arr` returns true,
when passed to the `condition` function.

```javascript
R.any(a => a * a > 8)([1, 2, 3]) // => true
R.any(a => a * a > 10)([1, 2, 3]) // => false
```

#### append

> append(valueToAppend: any, arr: Array): Array

```javascript
R.append('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

#### both

> both(x: Function, y: Function, input: any): Boolean

It returns `true` if both function `x` and function `y` return `true`, when `input` is their argument.

```
const fn = R.both(
  a => a > 10,
  a => a < 20
)
fn(15) //=> true
fn(30) //=> false
```

#### compose

> compose(fn1: Function, ... , fnN: Function): any

It performs right-to-left function composition.
```
const result = R.compose(
  R.map(x => x * 2)
  R.filter(x => x > 2),
)([1, 2, 3, 4])
console.log(result) // => [6, 8]
```

#### complement

> complement(fn: Function): Function

It returns `complemented` function that accept `input` as argument.

The return value of `complemented` is the negative boolean value of `fn(input)`.

```
R.complement(R.always(0)) // => true
R.complement(R.always(true)) // => false
```

#### concat

> concat(x: Array|String, y: Array|String): Array|String

It returns new string or array, which is result merging `x` and `y`.

```
R.concat([1, 2])([3, 4]) // => [1, 2, 3, 4]
R.concat('foo', 'bar') // => 'foobar'
```

#### contains

> contains(valueToFind: any, arr: Array): Boolean

It returns true if `valueToFind` is part of `arr`.

```javascript
R.contains(2, [1, 2]) // => true
R.contains(3, [1, 2]) // => false
```

#### curry

> curry(fn: Function): Function

It returns curried version of `fn`.

```javascript
const addFourNumbers = (a, b, c, d) => a + b + c + d
const curriedAddFourNumbers = R.curry(addFourNumbers)
const f = curriedAddFourNumbers(1, 2)
const g = f(3)
g(4) // => 10
```

#### defaultTo

> defaultTo(defaultValue: T, inputArgument: any): T

It returns `defaultValue`, if `inputArgument` is `undefined`, `null` or `NaN`.

It returns `inputArgument` in any other case.

```javascript
R.defaultTo('foo', undefined) // => 'foo'
R.defaultTo('foo', 'bar') // => 'bar'
R.defaultTo('foo', 1) // => 1
```

#### divide

```javascript
R.divide(71, 100) // => 0.71
```

#### drop

> drop(howManyToDrop: Number, arrOrStr: Array|String): Array|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the left.

```javascript
R.drop(1, ['foo', 'bar', 'baz']) // => ['bar', 'baz']
R.drop(1, 'foo')  // => 'oo'
```

#### dropLast

> dropLast(howManyToDrop: Number, arrOrStr: Array|String): Array|String

It returns `arrOrStr` with `howManyToDrop` items dropped from the right.

```javascript
R.dropLast(1, ['foo', 'bar', 'baz']) // => ['foo', 'bar']
R.dropLast(1, 'foo')  // => 'fo'
```

#### endsWith

> endsWith(x: any, arrOrStr: Array|String): Boolean

```
R.endsWith(
  'bar',
  "foo-bar"
) // => true

R.endsWith(
  'baz',
  "foo-bar"
) // => false
```

#### either

```
const fn = R.either(
  a => a > 10,
  a => a % 2 === 0
)
fn(15) //=> true
fn(6) //=> true
fn(7) //=> false
```

#### equals

> equals(a: any, b: any): Boolean

It returns equality match between `a` and `b`.

It doesn't handle cyclical data structures.

```javascript
R.equals(1, 1) // => true
R.equals({}, {}) // => false
R.equals([1, 2, 3], [1, 2, 3]) // => true
```

#### F

`R.F() // => false`

#### filter

> filter(filterFn: Function, arr: Array): Array

Filters `arr` throw boolean returning `filterFn`

```javascript
const filterFn = a => a % 2 === 0

R.filter(filterFn, [1, 2, 3, 4]) // => [2, 4]
```

#### find

> find(findFn: Function, arr: Array<T>): T|undefined

It returns `undefined` or the first element of `arr` satisfying `findFn`.

```javascript
const findFn = a => R.type(a.foo) === "Number"
const arr = [{foo: "bar"}, {foo: 1}]
R.find(findFn, arr) // => {foo: 1}
```

#### findIndex

> findIndex(findFn: Function, arr: Array): Number

It returns `-1` or the index of the first element of `arr` satisfying `findFn`.

```javascript
const findFn = a => R.type(a.foo) === "Number"
const arr = [{foo: "bar"}, {foo: 1}]
R.find(findFn, arr) // => 1
```

#### flatten

> flatten(arr: Array): Array

```javascript
R.flatten([ 1, [ 2, [ 3 ] ] ])
// => [ 1, 2, 3 ]
```

#### flip

> flip(fn: Function): Function

It returns function which calls `fn` with exchanged first and second argument.

```javascript
const subtractFlip = R.flip(R.subtract)
R.subtractFlip(1,7)
// => 6
```

Note that it works only for functions that expects two arguments. If third argument is passed, then `undefined` is returned.

#### has

> has(prop: String, obj: Object): Boolean

- It returns `true` if `obj` has property `prop`.

```javascript
R.has("a", {a: 1}) // => true
R.has("b", {a: 1}) // => false
```

#### head

> head(arrOrStr: Array|String): any

It returns the first element of `arrOrStr`.

```javascript
R.head([1, 2, 3]) // => 1
R.head('foo') // => 'f'
```

#### identity

> identity(x: T): T

It just passes back the supplied arguments.
```
R.identity(7) // => 7
```

#### ifElse

> ifElse(condition: Function, ifFn: Function, elseFn: Function): Function

It returns function, which expect `input` as argument and returns `finalResult`.

When the function is called, a value `answer` is generated as a result of `condition(input)`.

If `answer` is `true`, then `finalResult` is equal to `ifFn(input)`.
If `answer` is `false`, then `finalResult` is equal to `elseFn(input)`.

```
const fn = R.ifElse(
 x => x > 10,
 x => x*2,
 x => x*10
)
fn(8) // => 80
fn(11) // => 22
```

#### indexOf

> indexOf(valueToFind: any, arr: Array): Number

It returns `-1` or the index of the first element of `arr` equal of `valueToFind`.

```javascript
R.indexOf(1, [1, 2]) // => 0
```

#### init

> init(arrOrStr: Array|String): Array|String

- It returns all but the last element of `arrOrStr`.

```javascript
R.init([1, 2, 3])  // => [1, 2]
R.init('foo')  // => 'fo'
```

#### join

> join(separator: String, arr: Array): String

```javascript
R.join('-', [1, 2, 3])  // => '1-2-3'
```

#### last

> last(arrOrStr: Array|String): any

- It returns the last element of `arrOrStr`.

```javascript
R.last(['foo', 'bar', 'baz']) // => 'baz'
R.last('foo') // => 'o'
```

#### lastIndexOf

> lastIndexOf(x: any, arr: Array): Number

```
R.lastIndexOf(1, [1, 2, 3, 1, 2]) // => 3
R.lastIndexOf(10, [1, 2, 3, 1, 2]) // => -1
```

#### length

> length(arrOrStr: Array|String): Number

```javascript
R.length([1, 2, 3]) // => 3
```

#### map

> map(mapFn: Function, arr: Array): Array

It returns the result of looping through `arr` with `mapFn`.

```javascript
const mapFn = x => x * 2;
R.map(mapFn, [1, 2, 3]) // => [2, 4, 6]
```

#### match

> match(regExpression: Regex, str: String): Array

```javascript
R.match(/([a-z]a)/g, 'bananas') // => ['ba', 'na', 'na']
```

#### merge

> merge(a: Object, b: Object)

It returns result of `Object.assign({}, a, b)`.

```javascript
R.merge({ 'foo': 0, 'bar': 1 }, { 'foo': 7 })
// => { 'foo': 7, 'bar': 1 }
```

#### modulo

> modulo(a: Number, b: Number): Number

It returns the remainder of operation `a/b`.

```javascript
R.module(14,3) // => 2
```

#### multiply

> multiply(a: Number, b: Number): Number

It returns the result of operation `a*b`.

```javascript
R.module(14,3) // => 2
```

#### not

> not(x: any): Boolean

It returns inverted boolean version of input `x`.

```
R.not(true); //=> false
R.not(false); //=> true
R.not(0); //=> true
R.not(1); //=> false
```

#### omit

> omit(propsToOmit: Array<String>, obj: Object): Object

It returns a partial copy of an `obj` with omitting `propsToOmit`

```javascript
R.omit(['a', 'd'], {a: 1, b: 2, c: 3}) // => {b: 2, c: 3}
```

#### path

> path(pathToSearch: Array<String>|String, obj: Object): any

If `pathToSearch` is `'a.b'` then it will return `1` if `obj` is `{a:{b:1}}`.

It will return `undefined`, if such path is not found.

```javascript
R.path('a.b', {a: {b: 1}}) // => 1
R.path(['a', 'b'], {a: {b: 2}}) // => 2
R.path(['a', 'c'], {a: {b: 2}}) // => undefined
```

#### pathOr

> pathOr(defaultValue: any, pathToSearch: Array<String>|String, obj: Object): any

`pathFound` is the result of calling `R.path(pathToSearch, obj)`.

If `pathFound` is `undefined`, `null` or `NaN`, then `defaultValue` will be returned.

`pathFound` is returned in any other case.

```javascript
R.pathOr(1, 'a.b', {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'b'], {a: {b: 2}}) // => 2
R.pathOr(1, ['a', 'c'], {a: {b: 2}}) // => 1
```

#### partialCurry

> partialCurry(fn: Function|Async, a: Object, b: Object): Function|Promise

When called with function `fn` and first set of input `a`, it will return a function.

This function will wait to be called with second set of input `b` and it will invoke `fn` with the merged object of `a` over `b`.

`fn` can be asynchronous function. In that case a `Promise` holding the result of `fn` is returned.

See the example below:

```javascript
const fn = ({a, b, c}) => {
  return (a * b) + c
}
const curried = R.partialCurry(fn, {a: 2})
curried({b: 3, c: 10}) // => 16
```

- Note that `partialCurry` is method specific for **Rambda** and the method is not part of **Ramda**'s API

- You can read my argumentation for creating *partialCurry* [here](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)

#### pick

> pick(propsToPick: Array<String>, obj: Object): Object

It returns a partial copy of an `obj` containing only `propsToPick` properties.

```
R.pick(['a', 'c'], {a: 1, b: 2}) // => {a: 1}
```

#### pipe

> pipe(fn1: Function, ... , fnN: Function): any

It performs left-to-right function composition.
```
const result = R.pipe(
  R.filter(val => val > 2),
  R.map(a => a * 2)
)([1, 2, 3, 4])
console.log(result) // => [6, 8]
```

#### pluck

> pluck(property: String, arr: Array): Array

It returns list of the values of `property` taken from the objects in array of objects `arr`.

```
R.pluck('a')([{a: 1}, {a: 2}, {b: 3}]) // => [1, 2]
```

#### prepend

> prepend(x: any, arr: Array): Array

It adds `x` to the start of the array `arr`.

```javascript
R.prepend('foo', ['bar', 'baz']) // => ['foo', 'bar', 'baz']
```

#### prop

> prop(propToFind: String, obj: Object): any

It returns `undefined` or the value of property `propToFind` in `obj`

```javascript
R.prop('x', {x: 100}) // => 100
R.prop('x', {a: 1}) // => undefined
```

#### propEq

> propEq(propToFind: String, valueToMatch: any, obj: Object): Boolean

It returns true if `obj` has property `propToFind` and its value is equal to `valueToMatch`

```javascript
const propToFind = "foo"
const valueToMatch = 0
R.propEq(propToFind, valueToMatch)({foo: 0}) // => true
R.propEq(propToFind, valueToMatch)({foo: 1}) // => false
```

#### range

> range(start: Number, end: Number): Array<Number>

It returns a array of numbers from `start`(inclusive) to `end`(exclusive).

```javascript
R.range(0, 2)   // => [0, 1]
```

#### reduce

> reduce(iteratorFn: Function, accumulator: any, array: Array): any

It returns a single item by iterating through the list, successively calling the iterator function `iteratorFn` and passing it an `accumulator` value and the current value from the array, and then passing the result to the next call.

The iterator function behaves like the native callback of the [`Array.prototype.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) method.

```javascript
const iteratorFn = (acc, val) => acc + val
R.reduce(iteratorFn, 1, [1, 2, 3])   // => 7
```

#### repeat

> repeat(valueToRepeat: T, num: Number): Array<T>

```javascript
R.repeat('foo', 2) // => ['foo', 'foo']
```

#### replace

> replace(strOrRegex: String|Regex, replacer: String, str: String): String

Replace `strOrRegex` found in `str` with `replacer`

```javascript
R.replace('foo', 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/, 'bar', 'foo foo') // => 'bar foo'
R.replace(/foo/g, 'bar', 'foo foo') // => 'bar bar'
```

#### reverse

!!! It modifies the array instead of returning new copy, as original `Ramda` method does.

```
const arr = [1, 2]
R.reverse(arr)
console.log(arr) // => [2, 1]
```

#### sort

> sort(sortFn: Function, arr: Array): Array

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return `Number`

```javascript
const sortFn = (a, b) => a - b
R.sort(sortFn, [3, 1, 2]) // => [1, 2, 3]
```

#### sortBy

> sortBy(sortFn: Function, arr: Array): Array

It returns copy of `arr` sorted by `sortFn`.

`sortFn` must return value for comparison

```javascript
const sortFn = obj => obj.foo
R.sortBy(sortFn, [
  {foo: 1},
  {foo: 0}
])
// => [{foo: 0}, {foo: 1}]
```

#### split

> split(separator: String, str: String): Array

```javascript
R.split('-', 'a-b-c') // => ['a', 'b', 'c']
```

#### splitEvery

> splitEvery(sliceLength: Number, arrOrString: Array|String): Array

- Splits `arrOrStr` into slices of `sliceLength`

```javascript
R.splitEvery(2, [1, 2, 3]) // => [[1, 2], [3]]
R.splitEvery(3, 'foobar') // => ['foo', 'bar']
```

#### startsWith

> startsWith(x: any, arrOrStr: Array|String): Boolean

```
R.endsWith(
  'bar',
  "foo-bar"
) // => true

R.endsWith(
  'baz',
  "foo-bar"
) // => false
```

#### subtract

> subtract(a: Number, b: Number): Number

```javascript
R.subtract(3, 1) // => 2
```

#### T

`R.T() // => true`

#### tail

> tail(arrOrStr: Array|String): Array|String

- It returns all but the first element of `arrOrStr`

```javascript
R.tail([1, 2, 3])  // => [2, 3]
R.tail('foo')  // => 'oo'
```

#### take

> take(num: Number, arrOrStr: Array|String): Array|String

- It returns the first `num` elements of `arrOrStr`.

```javascript
R.take(1, ['foo', 'bar']) // => ['foo']
R.take(2, ['foo']) // => 'fo'
```

#### takeLast

> takeLast(num: Number, arrOrStr: Array|String): Array|String

- It returns the last `num` elements of `arrOrStr`.

```javascript
R.takeLast(1, ['foo', 'bar']) // => ['bar']
R.takeLast(2, ['foo']) // => 'oo'
```

#### test

> test(regExpression: Regex, str: String): Boolean

- Determines whether `str` matches `regExpression`

```javascript
R.test(/^f/, 'foo') // => true
R.test(/^f/, 'bar') // => false
```

#### toLower

> toLower(str: String): String

```javascript
R.toLower('FOO') // => 'foo'
```

#### toString
> toString(x: any): String

`R.toString([1, 2]) // => '1,2'`

#### toUpper

> toUpper(str: String): String

```javascript
R.toUpper('foo') // => 'FOO'
```

#### trim

> trim(str: String): String
```javascript
R.trim('  foo  ') // => 'foo'
```

#### type

> type(a: any): String

```javascript
R.type(() => {}) // => "Function"
R.type(async () => {}) // => "Async"
R.type([]) // => "Array"
R.type({}) // => "Object"
R.type('foo') // => "String"
R.type(1) // => "Number"
R.type(true) // => "Boolean"
R.type(null) // => "Null"
R.type(/[A-z]/) // => "RegExp"

const delay = ms => new Promise(resolve => {
  setTimeout(function () {
    resolve()
  }, ms)
})
R.type(delay) // => "Promise"
```

#### typedDefaultTo

> typedDefaultTo(defaultValue: T, inputArgument: any): T

It returns `defaultValue`, if `inputArgument` and `defaultValue` has different types.

It returns `inputArgument` in any other case.

```javascript
R.typedDefaultTo('foo', undefined) // => 'foo'
R.typedDefaultTo('foo', 'bar') // => 'bar'
R.typedDefaultTo('foo', 1) // => 'foo'
```

- Note that `typedDefaultTo` is method specific for **Rambda** and the method is not part of **Ramda**'s API

#### typedPathOr

> typedPathOr(defaultValue: any, pathToSearch: Array<String>|String, obj: Object): any

`pathFound` is the result of calling `R.path(pathToSearch, obj)`.

If `pathFound` has different type than `defaultValue`, then `defaultValue` will be returned.

If `pathFound` has the same type as `defaultValue`, then `pathFound` will be returned.

```javascript
R.typedPathOr(1, 'a.b', {a: {b: 2}}) // => 2
R.typedPathOr(1, 'a.b', {a: {b: 'foo'}}) // => 1
```

- Note that `typedDefaultTo` is method specific for **Rambda** and the method is not part of **Ramda**'s API

#### uniq

> uniq(arr: Array): Array

It returns a new array containing only one copy of each element in `arr`.

```javascript
R.uniq([1, 1, 2, 1]) // => [1, 2]
R.uniq([1, '1'])     // => [1, '1']
```

#### update

> update(i: Number, replaceValue: any, arr: Array): Array

It returns a new copy of the `arr` with the element at `i` index
replaced with `replaceValue`.

```javascript
R.update(0, "foo", ['bar', 'baz']) // => ['foo', baz]
```

#### values

> values(obj: Object): Array

It returns array with of all values in `obj`.

```javascript
R.values({a: 1, b: 2}) // => [1, 2]
```

---

#### includes

> includes(x: any, arrOrStr: Array|String): Boolean

```
R.includes(1, [1, 2]) // => true
R.includes('oo', 'foo') // => true
R.includes('z', 'foo') // => false
```

Note that this method is not part of `Ramda` API.

#### padEnd

> padEnd(x: Number, str: String): String

`R.padEnd(3, 'foo') // => 'foo   '`

Note that this method is not part of `Ramda` API.

#### padStart

> padStart(x: Number, str: String): String

`R.padStart(3, 'foo') // => '   foo'`

Note that this method is not part of `Ramda` API.

## Benchmark

![Screen](https://cdn.rawgit.com/selfrefactor/rambda/7475b559/files/screen1.png)
![Screen](https://cdn.rawgit.com/selfrefactor/rambda/7475b559/files/screen2.png)

## Flowtype

I haven't tested it fully, but the partial test shows that [Ramda
definitions](https://github.com/flowtype/flow-typed/blob/master/definitions/npm/ramda_v0.21.x/flow_v0.28.x-v0.30.x/ramda_v0.21.x.js) can be used.

You need to replace `declare module ramda` with `declare module rambda` on line 10 and store the file as `rambda.js` in your *flow-typed* folder

## Changelog

- 0.9.0 Add `R.pipe` [PR#35](https://github.com/selfrefactor/rambda/pull/35)
- 0.8.9 Add `R.isNil`
- 0.8.8 Migrate to ES modules [PR33](https://github.com/selfrefactor/rambda/pull/33) | Add R.flip to the API | R.map/filter works with objects
- 0.8.7 Change `Webpack` with `Rollup` - [PR29](https://github.com/selfrefactor/rambda/pull/29)
- 0.8.6 Add `R.tap` and `R.identity`
- 0.8.5 Add `R.all`, `R.allPass`, `R.both`, `R.either` and `R.complement`
- 0.8.4 Learning to run `npm test` before `npm publish` the hard way
- 0.8.3 Add `R.always`, `R.T` and `R.F`
- 0.8.2 Add `concat`, `padStart`, `padEnd`, `lastIndexOf`, `toString`, `reverse`, `endsWith` and `startsWith` methods
- 0.8.1 Add `R.ifElse`
- 0.8.0 Add `R.not`, `R.includes` | Take string as condition for `R.pick` and `R.omit`
- 0.7.6 Fix incorrect implementation of `R.values`
- 0.7.5 Fix incorrect implementation of `R.omit`
- 0.7.4 [issue #13](https://github.com/selfrefactor/rambda/issues/13) - Fix `R.curry`, which used to return incorrectly `function` when called with more arguments
- 0.7.3 Close [issue #9](https://github.com/selfrefactor/rambda/issues/9) - Compile to `es2015`; Approve [PR #10](https://github.com/selfrefactor/rambda/pull/10) - add `R.addIndex` to the API
- 0.7.2 Add `Promise` support for `R.type`
- 0.7.1 Close [issue #7](https://github.com/selfrefactor/rambda/issues/7) - add `R.reduce` to the API
- 0.7.0 Close [issue #5](https://github.com/selfrefactor/rambda/issues/5) - change name of `curry` to `partialCurry`; add new method `curry`, which works just like Ramda's `curry`
- 0.6.2 Add separate documentation site via `docsify`

## Browse by category


### Function


[addIndex](#addindex)


[always](#always)


[compose](#compose)


[curry](#curry)


[F](#f)


[identity](#identity)


[T](#t)


[tap](#tap)


### Math


[add](#add)


[divide](#divide)


[modulo](#modulo)


[multiply](#multiply)


[subtract](#subtract)



### List


[adjust](#adjust)


[all](#all)


[any](#any)


[append](#append)


[concat](#concat)


[contains](#contains)


[drop](#drop)


[dropLast](#droplast)


[endsWith](#endswith)


[filter](#filter)


[find](#find)


[findIndex](#findindex)


[flatten](#flatten)


[head](#head)


[indexOf](#indexof)


[init](#init)


[join](#join)


[last](#last)


[lastIndexOf](#lastindexof)


[length](#length)


[map](#map)


[pluck](#pluck)


[prepend](#prepend)


[range](#range)


[reduce](#reduce)


[repeat](#repeat)


[reverse](#reverse)


[sort](#sort)


[splitEvery](#splitevery)


[startsWith](#startswith)


[tail](#tail)


[take](#take)


[takeLast](#takelast)


[uniq](#uniq)


[update](#update)



### Logic


[allPass](#allpass)


[both](#both)


[complement](#complement)


[defaultTo](#defaultto)


[either](#either)


[ifElse](#ifelse)


[not](#not)



### Object


[has](#has)


[merge](#merge)


[omit](#omit)


[path](#path)


[pick](#pick)


[prop](#prop)


[values](#values)



### Relation


[equals](#equals)


[propEq](#propeq)


[sortBy](#sortby)



### String


[match](#match)


[replace](#replace)


[split](#split)


[test](#test)


[toLower](#tolower)


[toString](#tostring)


[toUpper](#toupper)


[trim](#trim)

## Contribution guidelines

If you want to add another `Ramda` method to the API, please feel free to submit a `PR` .

The only requirement is the new method to have exact or very close implementation compared to the corresponding `Ramda` method.

I give you example steps of the `PR` process.

> Create a method file in `modules` folder.

If the new method is `R.endsWith`, then the created file will be `./modules/endsWith.js`

> Write the function declaration and function's logic.

```
function endsWith(x, arrOrStr){
  return arrOrStr.endsWith(x)
}
```

> Any method, which takes more than one argument, should be curried.

We can use the standard curring used throughout `Rambda`.
```
function endsWith(x, arrOrStr){
  if(arrOrStr === undefined){
    return arrOrStrHolder => endsWith(x, arrOrStrHolder)
  }
  return arrOrStr.endsWith(x)
}
module.exports = endsWith
```

Or we can also use `R.curry`, but it is not as performant as the example above.

```
const curry = require('./curry')
function endsWith(x, arrOrStr){
  if(arrOrStr === undefined){
    return holder => endsWith(x, arrOrStr)
  }
  return arrOrStr.endsWith(x)
}
module.exports = curry(endsWith)
```

> Edit `rambda.js` file

Exported methods are sorted alphabetically

```
exports.dropLast = require("./modules/dropLast")
exports.endsWith = require("./modules/endsWith")
exports.equals = require("./modules/equals")
```

> Write your test cases

Create file `endsWith.js` in folder `__tests__`

```
const R = require('../rambda')

test('endsWith', () => {
  expect(R.endsWith('oo')('foo')).toBeTruthy()
})
```

> Run `npm test` to validate your tests

> Edit `./README.md` to add documentation

Note that your documentation should match the pattern visible across `./README.md`

> Lint your files

`npm run lint modules/endsWith.js`

`npm run lint __tests__/endsWith.js`

> Submit PR

Expect response within 2 days.

## Additional info

> Projects using Rambda

- [I Learn Smarter](https://github.com/selfrefactor/ils)

- [json-validity](https://www.npmjs.com/package/json-validity)

- [log-fn](https://www.npmjs.com/package/log-fn)

- [phobetor](https://github.com/selfrefactor/phobetor)

- [string-fn](https://www.npmjs.com/package/string-fn)

- [watch-fn](https://www.npmjs.com/package/watch-fn)

> Articles about Rambda
- [Interview with Dejan Totef at SurviveJS blog](https://survivejs.com/blog/rambda-interview/)
- [Argumentation of Rambda's curry method](https://selfrefactor.gitbooks.io/blog/content/argumenting-rambdas-curry.html)
