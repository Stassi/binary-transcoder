# binary-transcoder

Convert binary data between any two formats and encodings listed here.

### `ArrayLike`

_Further information: [`Uint8Array` (MDN)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)_

- `number[]`
- `Uint8Array`

### `string`

_Further information: [`node:buffer` character encodings (Node.js)](https://nodejs.org/docs/latest-v19.x/api/buffer.html#buffers-and-character-encodings)_

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
import { fromHex, fromLatin1, transcode } from '@stassi/binary-transcoder'
```

#### CommonJS

```javascript
const { fromHex, fromLatin1, transcode } = require('@stassi/binary-transcoder')
```

## Examples

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
// Uint8Array: [75, 101, 121]
```

```javascript
transcode({
  encoding: 'latin1',
  text: 'Key',
}).toUInt8Array()
// Uint8Array: [75, 101, 121]
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
  param: number[] | Uint8Array | { encoding: 'hex' | 'latin1'; text: string }
) => {
  toArray(): number[]
  toHex(): string
  toLatin1(): string
  toUInt8Array(): Uint8Array
}
```

### `fromHex`, `fromLatin1`

```typescript
type FromString = (text: string) => {
  toArray(): number[]
  toHex(): string
  toLatin1(): string
  toUInt8Array(): Uint8Array
}
```
