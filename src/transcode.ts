import { Buffer } from 'node:buffer'
import strictEquals from './logic/strictEquals.js'
import toBinaryOctet from './octet/toBinary.js'
import toDecimalOctet from './octet/toDecimal.js'
import {
  decode as decodeNumber,
  encode as encodeNumber,
} from './transcodeNumber.js'

type BufferEncoding = 'base64' | 'hex' | 'latin1' | 'utf8'
type BufferEncodingNonstandard = 'binary' | 'json'

export type BinaryStringEncoding = BufferEncoding | BufferEncodingNonstandard

export type BinaryTranscoder = {
  toArray(): number[]
  toBase64(): string
  toBinary(): string
  toHex(): string
  toJSON(): string
  toLatin1(): string
  toNumber(): number
  toUInt8Array(): Uint8Array
  toUTF8(): string
}

const BASE_64 = 'base64',
  BINARY = 'binary',
  HEX = 'hex',
  JSON_STRING = 'json',
  LATIN_1 = 'latin1',
  UTF_8 = 'utf8',
  strictEqualsBinary: (x: string) => boolean = strictEquals(BINARY),
  strictEqualsJSON: (x: string) => boolean = strictEquals(JSON_STRING)

export default function transcode(
  param:
    | number
    | number[]
    | Uint8Array
    | { encoding: BinaryStringEncoding; text: string }
): BinaryTranscoder {
  const paramIsArray = Array.isArray(param),
    paramIsNumber = typeof param === 'number',
    paramIsString = !paramIsNumber && 'encoding' in param && 'text' in param,
    paramIsBinary = paramIsString && strictEqualsBinary(param.encoding),
    paramIsJSON = paramIsString && strictEqualsJSON(param.encoding),
    toUInt8Array = (): Uint8Array => {
      // TODO: Return ternary expression
      if (paramIsNumber) {
        return encodeNumber(param)
      } else if (paramIsBinary) {
        return encodeNumber(toDecimalOctet(param.text))
      } else if (paramIsJSON) {
        return Buffer.from(JSON.parse(param.text))
      } else if (paramIsArray) {
        return Uint8Array.from(param)
      } else if (paramIsString) {
        return Uint8Array.from(
          Buffer.from(param.text, <BufferEncoding>param.encoding)
        )
      } else {
        return param
      }
    },
    toNumber = (): number => decodeNumber(toUInt8Array()),
    toString = (targetEncoding: BufferEncoding) => (): string =>
      Buffer.from(toUInt8Array()).toString(targetEncoding)

  return {
    toNumber,
    toUInt8Array,
    toBase64: toString(BASE_64),
    toHex: toString(HEX),
    toLatin1: toString(LATIN_1),
    toUTF8: toString(UTF_8),
    toArray(): number[] {
      return [...toUInt8Array()]
    },
    toBinary(): string {
      return toBinaryOctet(toNumber())
    },
    toJSON(): string {
      return JSON.stringify(Buffer.from(toUInt8Array()))
    },
  }
}

function fromString(encoding: BinaryStringEncoding) {
  return (text: string): BinaryTranscoder => transcode({ encoding, text })
}

export const fromBase64: (text: string) => BinaryTranscoder =
  fromString(BASE_64)

export const fromBinary: (text: string) => BinaryTranscoder = fromString(BINARY)

export const fromHex: (text: string) => BinaryTranscoder = fromString(HEX)

export const fromLatin1: (text: string) => BinaryTranscoder =
  fromString(LATIN_1)
