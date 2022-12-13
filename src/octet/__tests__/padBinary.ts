import { describe, expect, it } from '@jest/globals'
import length from '../../strings/length.js'
import { modDivideByBits, padBinary } from '../toBinary.js'

describe('pad binary octet', () => {
  describe.each([
    {
      expected: '00000000',
      input: '0',
    },
    {
      expected: '00000000',
      input: '00',
    },
    {
      expected: '00000001',
      input: '1',
    },
    {
      expected: '00000001',
      input: '001',
    },
    {
      expected: '11111111',
      input: '00011111111',
    },
    {
      expected: '11111111',
      input: '11111111',
    },
    {
      expected: '0000000100000000',
      input: '100000000',
    },
    {
      expected: '0111111111111111',
      input: '0111111111111111',
    },
    {
      expected: '0111111111111111',
      input: '111111111111111',
    },
    {
      expected: '1111111111111111',
      input: '1111111111111111',
    },
  ])(
    'input: $input',
    ({ input, expected }: { input: string; expected: string }) => {
      it('should return a padded binary string', () => {
        expect(padBinary(input)).toBe(expected)
      })

      it('should return a string uniformly divisible by 8 bits', () => {
        expect(modDivideByBits(length(padBinary(input)))).toBe(0)
      })
    }
  )
})
