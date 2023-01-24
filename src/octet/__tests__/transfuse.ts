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
  describe('16-bit', () => {
    describe.each([
      {
        single: [0x00, 0x00],
        double: [0x0000],
      },
      {
        single: [0x00, 0x01],
        double: [0x0001],
      },
      {
        single: [0x00, 0x10],
        double: [0x0010],
      },
      {
        single: [0x01, 0x00],
        double: [0x0100],
      },
      {
        single: [0x10, 0x00],
        double: [0x1000],
      },
      {
        single: [0xff, 0xff],
        double: [0xffff],
      },
      {
        single: [0x57, 0x69, 0x6b, 0x69],
        double: [0x5769, 0x6b69],
      },
    ])(
      '$double',
      ({ single, double }: { single: number[]; double: number[] }) => {
        const eightBits: Uint8Array = Uint8Array.from(single)
        const sixteenBits: Uint16Array = Uint16Array.from(double)

        describe('diffuse', () => {
          it('should convert 16-bit to 8-bit values', () => {
            expect([...diffuse16(sixteenBits)]).toStrictEqual([...eightBits])
          })
        })

        describe('interfuse', () => {
          it('should convert 8-bit to 16-bit values', () => {
            expect([...interfuse16(eightBits)]).toStrictEqual([...sixteenBits])
          })
        })
      }
    )
  })

  describe('32-bit', () => {
    describe.each([
      {
        single: [0x00, 0x00, 0x00, 0x00],
        quad: [0x00000000],
      },
      {
        single: [0x00, 0x00, 0x00, 0x01],
        quad: [0x00000001],
      },
      {
        single: [0x01, 0x00, 0x00, 0x00],
        quad: [0x01000000],
      },
      {
        single: [0x57, 0x69, 0x6b, 0x69],
        quad: [0x57696b69],
      },
    ])('$quad', ({ single, quad }: { single: number[]; quad: number[] }) => {
      const eightBits: Uint8Array = Uint8Array.from(single)
      const thirtyTwoBits: Uint32Array = Uint32Array.from(quad)

      describe('diffuse', () => {
        it('should convert 32-bit to 8-bit values', () => {
          expect([...diffuse32(thirtyTwoBits)]).toStrictEqual([...eightBits])
        })
      })

      describe('interfuse', () => {
        it('should convert 8-bit to 32-bit values', () => {
          expect([...interfuse32(eightBits)]).toStrictEqual([...thirtyTwoBits])
        })
      })
    })
  })

  describe('64-bit', () => {
    describe.each([
      {
        single: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
        octad: [0x0000000000000000n],
      },
      {
        single: [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01],
        octad: [0x0000000000000001n],
      },
      {
        single: [0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00],
        octad: [0x0000000001000000n],
      },
      {
        single: [0x00, 0x00, 0x00, 0x00, 0x57, 0x69, 0x6b, 0x69],
        octad: [0x0000000057696b69n],
      },
    ])('$octad', ({ single, octad }: { single: number[]; octad: bigint[] }) => {
      const eightBits: Uint8Array = Uint8Array.from(single)
      const sixtyFourBits: BigUint64Array = BigUint64Array.from(octad)

      describe('diffuse', () => {
        it('should convert 64-bit to 8-bit values', () => {
          expect([...diffuse64(sixtyFourBits)]).toStrictEqual([...eightBits])
        })
      })

      describe('interfuse', () => {
        it('should convert 8-bit to 64-bit values', () => {
          expect([...interfuse64(eightBits)]).toStrictEqual([...sixtyFourBits])
        })
      })
    })
  })
})
