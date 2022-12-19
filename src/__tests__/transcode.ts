import type { BinaryStringEncoding, BinaryTranscoder } from '../transcode.js'
import { describe, expect, it } from '@jest/globals'
import transcode, { fromBinary, fromHex, fromLatin1 } from '../transcode.js'

describe('binary transcoder', () => {
  describe.each([
    {
      binary: '00000000',
      hex: '00',
      latin1: '\u0000',
      number: 0,
      octets: [0],
    },
    {
      binary: '010010110110010101111001',
      hex: '4b6579',
      latin1: 'Key',
      number: 4941177,
      octets: [0x4b, 0x65, 0x79],
    },
    {
      binary: '01010111011010010110101101101001',
      hex: '57696b69',
      latin1: 'Wiki',
      number: 1466526569,
      octets: [0x57, 0x69, 0x6b, 0x69],
    },
    {
      binary: '010100110110010101100011011100100110010101110100',
      hex: '536563726574',
      latin1: 'Secret',
      number: 91694925243764,
      octets: [0x53, 0x65, 0x63, 0x72, 0x65, 0x74],
    },
    {
      binary: '111111111111111111111111111111111111111111111111',
      hex: 'ffffffffffff',
      latin1: 'ÿÿÿÿÿÿ',
      number: 281474976710655,
      octets: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
    },
  ])(
    'text: "$latin1"',
    ({
      binary,
      hex,
      latin1,
      number,
      octets,
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
            toBinary,
            toHex,
            toLatin1,
            toNumber,
            toUInt8Array,
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

          describe('toBinary()', () => {
            it('should return a binary string', () => {
              expect(toBinary()).toBe(binary)
            })
          })

          describe('toHex()', () => {
            it('should return a hexadecimal string', () => {
              expect(toHex()).toBe(hex)
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
        }
      )
    }
  )
})
