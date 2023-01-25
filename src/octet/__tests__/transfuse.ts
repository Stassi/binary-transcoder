import { describe, expect, it } from '@jest/globals'
import {
  diffuse16,
  diffuse32,
  diffuse64,
  interfuse16,
  interfuse32,
  interfuse64,
} from '../transfuse.js'

describe('transfuse', () => {
  describe('fixed-width lossless', () => {
    describe.each([
      {
        single: [],
        double: [],
        quad: [],
        octad: [],
      },
      {
        single: [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef],
        double: [0x1234, 0x5678, 0x90ab, 0xcdef],
        quad: [0x12345678, 0x90abcdef],
        octad: [0x1234567890abcdefn],
      },
      {
        single: [0xfe, 0xdc, 0xba, 0x09, 0x87, 0x65, 0x43, 0x21],
        double: [0xfedc, 0xba09, 0x8765, 0x4321],
        quad: [0xfedcba09, 0x87654321],
        octad: [0xfedcba0987654321n],
      },
      {
        single: [0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff],
        double: [0xffff, 0xffff, 0xffff, 0xffff],
        quad: [0xffffffff, 0xffffffff],
        octad: [0xffffffffffffffffn],
      },
    ])(
      '$octad',
      ({
        double,
        octad,
        quad,
        single,
      }: {
        octad: bigint[]
      } & Record<'single' | 'double' | 'quad', number[]>) => {
        const eightBits: Uint8Array = Uint8Array.from(single)

        describe('16-bit', () => {
          const sixteenBits: Uint16Array = Uint16Array.from(double)

          describe('diffuse', () => {
            it('should convert 16-bit to 8-bit values', () => {
              expect([...diffuse16(sixteenBits)]).toStrictEqual([...eightBits])
            })
          })

          describe('interfuse', () => {
            it('should convert 8-bit to 16-bit values', () => {
              expect([...interfuse16(eightBits)]).toStrictEqual([
                ...sixteenBits,
              ])
            })
          })
        })

        describe('32-bit', () => {
          const thirtyTwoBits: Uint32Array = Uint32Array.from(quad)

          describe('diffuse', () => {
            it('should convert 32-bit to 8-bit values', () => {
              expect([...diffuse32(thirtyTwoBits)]).toStrictEqual([
                ...eightBits,
              ])
            })
          })

          describe('interfuse', () => {
            it('should convert 8-bit to 32-bit values', () => {
              expect([...interfuse32(eightBits)]).toStrictEqual([
                ...thirtyTwoBits,
              ])
            })
          })
        })

        describe('64-bit', () => {
          const sixtyFourBits: BigUint64Array = BigUint64Array.from(octad)

          describe('diffuse', () => {
            it('should convert 64-bit to 8-bit values', () => {
              expect([...diffuse64(sixtyFourBits)]).toStrictEqual([
                ...eightBits,
              ])
            })
          })

          describe('interfuse', () => {
            it('should convert 8-bit to 64-bit values', () => {
              expect([...interfuse64(eightBits)]).toStrictEqual([
                ...sixtyFourBits,
              ])
            })
          })
        })
      }
    )
  })
})
