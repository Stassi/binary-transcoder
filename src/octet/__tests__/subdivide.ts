import { describe, expect, it } from '@jest/globals'
import subdivide from '../subdivide.js'

describe('subdivide octets', () => {
  describe.each([
    {
      input: '00000000',
      expected: ['00000000'],
    },
    {
      input: '00000001',
      expected: ['00000001'],
    },
    {
      input: '0000000100000000',
      expected: ['00000001', '00000000'],
    },
    {
      input: '1000000000000000',
      expected: ['10000000', '00000000'],
    },
    {
      input: '100000000000000100000000',
      expected: ['10000000', '00000001', '00000000'],
    },
  ])(
    'input: $input',
    ({ expected, input }: { expected: string[]; input: string }) => {
      it('should return a binary octet array', () => {
        expect(subdivide(input)).toStrictEqual(expected)
      })
    }
  )
})
