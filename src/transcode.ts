import { Buffer } from 'node:buffer'
import strictEquals from './logic/strictEquals.js'
import toBinaryOctet from './octet/toBinary.js'
import toDecimalOctet from './octet/toDecimal.js'
import {
  decode as decodeNumber,
  encode as encodeNumber,
} from './transcodeNumber.js'

export type BinaryStringEncoding = 'binary' | 'hex' | 'latin1'

export type BinaryTranscoder = {
  toArray(): number[]
  toBinary(): string
  toHex(): string
  toLatin1(): string
  toNumber(): number
  toUInt8Array(): Uint8Array
}

const HEX = 'hex',
  LATIN_1 = 'latin1',
  BINARY = 'binary',
  strictEqualsBinary: (x: string) => boolean = strictEquals(BINARY)

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
    paramIsUInt8 = param instanceof Uint8Array,
    toUInt8Array = (): Uint8Array => {
      // TODO: Declarative replacement via ternary expressions
      if (paramIsUInt8) {
        return param
      } else if (paramIsNumber) {
        return encodeNumber(param)
      } else if (paramIsBinary) {
        return encodeNumber(toDecimalOctet(param.text))
      } else if (paramIsArray) {
        return Uint8Array.from(param)
      } else {
        return Uint8Array.from(Buffer.from(param.text, param.encoding))
      }
    },
    toNumber = (): number => decodeNumber(toUInt8Array()),
    toString = (targetEncoding: BinaryStringEncoding) => (): string =>
      Buffer.from(toUInt8Array()).toString(targetEncoding)

  return {
    toNumber,
    toUInt8Array,
    toHex: toString(HEX),
    toLatin1: toString(LATIN_1),
    toArray(): number[] {
      return [...toUInt8Array()]
    },
    toBinary(): string {
      return toBinaryOctet(toNumber())
    },
  }
}

function fromString(encoding: BinaryStringEncoding) {
  return (text: string): BinaryTranscoder => transcode({ encoding, text })
}

export const fromBinary: (text: string) => BinaryTranscoder = fromString(BINARY)

export const fromHex: (text: string) => BinaryTranscoder = fromString(HEX)

export const fromLatin1: (text: string) => BinaryTranscoder =
  fromString(LATIN_1)
