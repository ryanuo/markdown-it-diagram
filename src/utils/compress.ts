// compress.ts
export function compress(str: string): string {
  const bytes = new TextEncoder().encode(str)
  const base64 = btoa(String.fromCharCode(...bytes))
  // 转成 URI 安全形式
  return encodeURIComponent(base64)
}

export function decompress(str: string): string {
  try {
    const decodedBase64 = decodeURIComponent(str)
    const binary = atob(decodedBase64)
    const bytes = Uint8Array.from(binary, c => c.charCodeAt(0))
    return new TextDecoder().decode(bytes)
  }
  catch (err) {
    console.error('Decompress error:', err)
    return ''
  }
}
