import type { BinaryStringEncoding, BinaryTranscoder } from '../transcode.js'
import { Buffer } from 'node:buffer'
import { describe, expect, it } from '@jest/globals'
import transcode, {
  fromBase64,
  fromBase64URL,
  fromBinary,
  fromHex,
  fromJSON,
  fromLatin1,
} from '../transcode.js'

describe('binary transcoder', () => {
  describe.each([
    {
      base64: 'AA==',
      base64url: 'AA',
      binary: '00000000',
      hex: '00',
      json: '{"type":"Buffer","data":[0]}',
      latin1: '\u0000',
      number: 0,
      octets: [0x00],
      utf8: '\u0000',
    },
    {
      base64: 'S2V5',
      base64url: 'S2V5',
      binary: '010010110110010101111001',
      hex: '4b6579',
      json: '{"type":"Buffer","data":[75,101,121]}',
      latin1: 'Key',
      number: 4941177,
      octets: [0x4b, 0x65, 0x79],
      utf8: 'Key',
    },
    {
      base64: 'Pj/+/w==',
      base64url: 'Pj_-_w',
      binary: '00111110001111111111111011111111',
      hex: '3e3ffeff',
      json: '{"type":"Buffer","data":[62,63,254,255]}',
      latin1: '>?þÿ',
      number: 1044381439,
      octets: [0x3e, 0x3f, 0xfe, 0xff],
      utf8: '>?��',
    },
    {
      base64: 'V2lraQ==',
      base64url: 'V2lraQ',
      binary: '01010111011010010110101101101001',
      hex: '57696b69',
      json: '{"type":"Buffer","data":[87,105,107,105]}',
      latin1: 'Wiki',
      number: 1466526569,
      octets: [0x57, 0x69, 0x6b, 0x69],
      utf8: 'Wiki',
    },
    {
      base64: 'U2VjcmV0',
      base64url: 'U2VjcmV0',
      binary: '010100110110010101100011011100100110010101110100',
      hex: '536563726574',
      json: '{"type":"Buffer","data":[83,101,99,114,101,116]}',
      latin1: 'Secret',
      number: 91694925243764,
      octets: [0x53, 0x65, 0x63, 0x72, 0x65, 0x74],
      utf8: 'Secret',
    },
    {
      base64: '////////',
      base64url: '________',
      binary: '111111111111111111111111111111111111111111111111',
      hex: 'ffffffffffff',
      json: '{"type":"Buffer","data":[255,255,255,255,255,255]}',
      latin1: 'ÿÿÿÿÿÿ',
      number: 281474976710655,
      octets: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
      utf8: '������',
    },
  ])(
    'text: "$latin1"',
    ({
      base64,
      base64url,
      binary,
      hex,
      json,
      latin1,
      number,
      octets,
      utf8,
    }: {
      number: number
      octets: number[]
    } & Record<BinaryStringEncoding, string>) => {
      describe.each([
        {
          name: 'array',
          transcoder: transcode(octets),
        },
        {
          name: 'base64 alias',
          transcoder: fromBase64(base64),
        },
        {
          name: 'base64 explicit',
          transcoder: transcode({
            encoding: 'base64',
            text: base64,
          }),
        },
        {
          name: 'base64URL alias',
          transcoder: fromBase64URL(base64url),
        },
        {
          name: 'base64URL explicit',
          transcoder: transcode({
            encoding: 'base64url',
            text: base64url,
          }),
        },
        {
          name: 'binary alias',
          transcoder: fromBinary(binary),
        },
        {
          name: 'binary explicit',
          transcoder: transcode({
            encoding: 'binary',
            text: binary,
          }),
        },
        {
          name: 'buffer',
          transcoder: transcode(Buffer.from(octets)),
        },
        {
          name: 'hex alias',
          transcoder: fromHex(hex),
        },
        {
          name: 'hex explicit',
          transcoder: transcode({
            encoding: 'hex',
            text: hex,
          }),
        },
        {
          name: 'json alias',
          transcoder: fromJSON(json),
        },
        {
          name: 'json explicit',
          transcoder: transcode({
            encoding: 'json',
            text: json,
          }),
        },
        {
          name: 'latin1 alias',
          transcoder: fromLatin1(latin1),
        },
        {
          name: 'latin1 explicit',
          transcoder: transcode({
            encoding: 'latin1',
            text: latin1,
          }),
        },
        {
          name: 'number',
          transcoder: transcode(number),
        },
        {
          name: 'uInt8Array',
          transcoder: transcode(Uint8Array.from(octets)),
        },
      ])(
        'input: $name',
        ({
          transcoder: {
            toArray,
            toBase64,
            toBase64URL,
            toBinary,
            toBuffer,
            toHex,
            toJSON,
            toLatin1,
            toNumber,
            toUInt8Array,
            toUTF8,
          },
        }: {
          name: string
          transcoder: BinaryTranscoder
        }) => {
          describe('toArray()', () => {
            it('should return an untyped array', () => {
              expect(toArray()).toStrictEqual(octets)
            })
          })

          describe('toBase64()', () => {
            it('should return a Base64 string', () => {
              expect(toBase64()).toBe(base64)
            })
          })

          describe('toBase64URL()', () => {
            it('should return a Base64 URL string', () => {
              expect(toBase64URL()).toBe(base64url)
            })
          })

          describe('toBinary()', () => {
            it('should return a binary string', () => {
              expect(toBinary()).toBe(binary)
            })
          })

          describe('toBuffer()', () => {
            it('should return a buffer', () => {
              expect([...toBuffer()]).toStrictEqual(octets)
            })
          })

          describe('toHex()', () => {
            it('should return a hexadecimal string', () => {
              expect(toHex()).toBe(hex)
            })
          })

          describe('toJSON()', () => {
            it('should return a JSON string buffer', () => {
              expect(toJSON()).toBe(json)
            })
          })

          describe('toLatin1()', () => {
            it('should return a Latin-1 string', () => {
              expect(toLatin1()).toBe(latin1)
            })
          })

          describe('toNumber()', () => {
            it('should return a number', () => {
              expect(toNumber()).toBe(number)
            })
          })

          describe('toUInt8Array()', () => {
            it('should return an octet typed array', () => {
              expect([...toUInt8Array()]).toStrictEqual(octets)
            })
          })

          describe('toUTF8()', () => {
            it('should return a UTF-8 string', () => {
              expect(toUTF8()).toBe(utf8)
            })
          })
        }
      )
    }
  )
})
