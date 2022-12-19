# `@stassi/binary-transcoder`

[![version](https://img.shields.io/npm/v/@stassi/binary-transcoder)](https://www.npmjs.com/package/@stassi/binary-transcoder)
[![license](https://img.shields.io/npm/l/@stassi/binary-transcoder)](LICENSE)
![types](https://img.shields.io/npm/types/@stassi/binary-transcoder)
[![engines](https://img.shields.io/node/v/@stassi/binary-transcoder)](package.json)
![code size](https://img.shields.io/github/languages/code-size/stassi/binary-transcoder)
![minified size](https://img.shields.io/bundlephobia/min/@stassi/binary-transcoder)
![minzipped size](https://img.shields.io/bundlephobia/minzip/@stassi/binary-transcoder)
[![Continuous integration](https://github.com/Stassi/binary-transcoder/actions/workflows/ci.yml/badge.svg)](https://github.com/Stassi/binary-transcoder/actions/workflows/ci.yml)

Convert binary data between any two formats and encodings listed here.

### `ArrayLike`

_Further information: [`Uint8Array` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)_

- `number[]`
- `Uint8Array`

### `number`

_Further information: [`Number` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)_

- `number`

### `string`

_Further information: [Binary number (Wikipedia)](https://en.wikipedia.org/wiki/Binary_number) | [`node:buffer` character encodings (Node.js)](https://nodejs.org/docs/latest-v19.x/api/buffer.html#buffers-and-character-encodings)_

- `'binary'` (binary number `string`, not the legacy Node.js alias of the same name for `'latin1'` encoding)
- `'hex'`
- `'latin1'`

## Demo

_Instant demonstration: [`@stassi/binary-transcoder` (RunKit + npm)](https://npm.runkit.com/%40stassi%2Fbinary-transcoder)_

## Installation

### Node.js

```shell
npm i @stassi/binary-transcoder
```

## Usage

### Node.js

#### ES module

```javascript
import {
  fromBinary,
  fromHex,
  fromLatin1,
  transcode,
} from '@stassi/binary-transcoder'
```

#### CommonJS

```javascript
const {
  fromBinary,
  fromHex,
  fromLatin1,
  transcode,
} = require('@stassi/binary-transcoder')
```

### Web

```javascript
import {
  fromBinary,
  fromHex,
  fromLatin1,
  transcode,
} from 'https://cdn.skypack.dev/@stassi/binary-transcoder'
```

## Examples

### Binary encoding

```javascript
transcode([0b1001011, 0b1100101, 0b1111001]).toBinary()
// '010010110110010101111001'
```

### Binary decoding

```javascript
fromBinary('010010110110010101111001').toUInt8Array()
// Uint8Array <4B, 65, 79>
```

```javascript
transcode({
  encoding: 'binary',
  text: '010010110110010101111001',
}).toUInt8Array()
// Uint8Array <4B, 65, 79>
```

### Hexadecimal encoding

```javascript
fromLatin1('Key').toHex()
// '4b6579'
```

```javascript
transcode({
  encoding: 'latin1',
  text: 'Key',
}).toHex()
// '4b6579'
```

### Hexadecimal decoding

```javascript
fromHex('4b6579').toLatin1()
// 'Key'
```

```javascript
transcode({
  encoding: 'hex',
  text: '4b6579',
}).toLatin1()
// 'Key'
```

### `number` encoding

```javascript
transcode([0x4b, 0x65, 0x79]).toNumber()
// 4941177
```

### `number` decoding

```javascript
transcode(4941177).toUInt8Array()
// Uint8Array <4B, 65, 79>
```

### `number[]` encoding

```javascript
fromLatin1('Key').toArray()
// [75, 101, 121]
```

```javascript
transcode({
  encoding: 'latin1',
  text: 'Key',
}).toArray()
// [75, 101, 121]
```

### `number[]` decoding

#### Byte

```javascript
transcode([0b1001011, 0b1100101, 0b1111001]).toLatin1()
// 'Key'
```

#### Decimal

```javascript
transcode([75, 101, 121]).toLatin1()
// 'Key'
```

#### Hexadecimal

```javascript
transcode([0x4b, 0x65, 0x79]).toLatin1()
// 'Key'
```

#### Nibble

```javascript
transcode([0b100_1011, 0b110_0101, 0b111_1001]).toLatin1()
// 'Key'
```

#### Octal

```javascript
transcode([0o113, 0o145, 0o171]).toLatin1()
// 'Key'
```

### `Uint8Array` encoding

```javascript
fromLatin1('Key').toUInt8Array()
// Uint8Array <4B, 65, 79>
```

```javascript
transcode({
  encoding: 'latin1',
  text: 'Key',
}).toUInt8Array()
// Uint8Array <4B, 65, 79>
```

### `Uint8Array` decoding

```javascript
transcode(Uint8Array.from([75, 101, 121])).toLatin1()
// 'Key'
```

## Interface & types

Function signatures provided here for reference. Built-in types are automatically usable in JavaScript. TypeScript is optional and not required.

### `transcode`

```typescript
type Transcode = (
  param:
    | number
    | number[]
    | Uint8Array
    | { encoding: 'binary' | 'hex' | 'latin1'; text: string }
) => {
  toArray(): number[]
  toBinary(): string
  toHex(): string
  toLatin1(): string
  toNumber(): number
  toUInt8Array(): Uint8Array
}
```

### `fromBinary`, `fromHex`, `fromLatin1`

```typescript
type FromString = (text: string) => {
  toArray(): number[]
  toBinary(): string
  toHex(): string
  toLatin1(): string
  toNumber(): number
  toUInt8Array(): Uint8Array
}
```
