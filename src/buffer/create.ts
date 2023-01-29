import { Buffer } from 'node:buffer'

const createBuffer: {
  (
    str:
      | WithImplicitCoercion<string>
      | { [Symbol.toPrimitive](hint: 'string'): string },
    encoding?: BufferEncoding
  ): Buffer
  (data: Uint8Array | readonly number[]): Buffer
} = Buffer.from

export default createBuffer
