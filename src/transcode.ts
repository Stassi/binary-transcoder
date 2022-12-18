import { Buffer } from 'node:buffer'
import toBinaryOctet from './octet/toBinary.js'
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
  LATIN_1 = 'latin1'

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
    paramIsUInt8 = param instanceof Uint8Array,
    toUInt8Array = (): Uint8Array => {
      return paramIsUInt8
        ? param
        : paramIsNumber
        ? encodeNumber(param)
        : Uint8Array.from(
            paramIsArray ? param : Buffer.from(param.text, param.encoding)
          )
    },
    toNumber = (): number => decodeNumber(toUInt8Array()),
    toString = (encoding: BinaryStringEncoding) => (): string =>
      (paramIsString
        ? Buffer.from(param.text, param.encoding)
        : Buffer.from(paramIsNumber ? toUInt8Array() : param)
      ).toString(encoding)

  return {
    toNumber,
    toUInt8Array,
    toHex: toString(HEX),
    toLatin1: toString(LATIN_1),
    toArray(): number[] {
      return paramIsArray
        ? param
        : paramIsUInt8
        ? [...param]
        : paramIsNumber
        ? [...encodeNumber(param)]
        : [...Buffer.from(param.text, param.encoding)]
    },
    toBinary(): string {
      return toBinaryOctet(toNumber())
    },
  }
}

function fromString(encoding: BinaryStringEncoding) {
  return (text: string): BinaryTranscoder => transcode({ encoding, text })
}

export const fromHex: (text: string) => BinaryTranscoder = fromString(HEX)

export const fromLatin1: (text: string) => BinaryTranscoder =
  fromString(LATIN_1)
