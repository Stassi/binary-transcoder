import length from '../strings/length.js'

const OCTET_BITS = 8

export default function subdivide(str: string): string[] {
  const stringLength: number = length(str)

  // TODO: Declarative replacement via subarrays
  let chunks: string[] = []

  for (let i = 0; i < stringLength; i += OCTET_BITS)
    chunks.push(str.substring(i, i + OCTET_BITS))

  return chunks
}
