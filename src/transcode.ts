import { Buffer } from 'node:buffer'

export type BinaryStringEncoding = 'hex' | 'latin1'

export type BinaryTranscoder = {
  toArray(): number[]
  toHex(): string
  toLatin1(): string
  toUInt8Array(): Uint8Array
}

const HEX = 'hex',
  LATIN_1 = 'latin1'

export default function transcode(
  param:
    | number[]
    | Uint8Array
    | { encoding: BinaryStringEncoding; text: string }
): BinaryTranscoder {
  const paramIsArray = Array.isArray(param),
    paramIsString = 'encoding' in param && 'text' in param,
    paramIsUInt8 = !(paramIsArray || paramIsString),
    toString = (encoding: BinaryStringEncoding) => (): string =>
      (paramIsUInt8 || paramIsArray
        ? Buffer.from(param)
        : Buffer.from(param.text, param.encoding)
      ).toString(encoding)

  return {
    toHex: toString(HEX),
    toLatin1: toString(LATIN_1),
    toArray(): number[] {
      return paramIsUInt8
        ? [...param]
        : paramIsArray
        ? param
        : [...Buffer.from(param.text, param.encoding)]
    },
    toUInt8Array(): Uint8Array {
      return paramIsUInt8
        ? param
        : Uint8Array.from(
            paramIsArray ? param : Buffer.from(param.text, param.encoding)
          )
    },
  }
}

function fromString(encoding: BinaryStringEncoding) {
  return (text: string): BinaryTranscoder => transcode({ encoding, text })
}

export const fromHex: (text: string) => BinaryTranscoder = fromString(HEX)

export const fromLatin1: (text: string) => BinaryTranscoder =
  fromString(LATIN_1)
