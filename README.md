# binary-transcoder

Convert binary data between common formats and encodings.

## Installation

### Node.js

```shell
npm i @stassi/binary-transcoder
```

## Usage

### Node.js

```javascript
import { fromHex, fromLatin1, transcode } from '@stassi/binary-transcoder'
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

## Supported formats & encodings

Convert between any two formats/encodings listed here.

### `ArrayLike`

- `number[]`
- `Uint8Array`

### `string`

- `'hex'`
- `'latin1'`

## Interface & types

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
