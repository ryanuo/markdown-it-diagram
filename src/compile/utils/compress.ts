// compress.ts
export function compress(str: string): string {
  const bytes = new TextEncoder().encode(str)
  const base64 = btoa(String.fromCharCode(...bytes))
  // 转成 URI 安全形式
  return encodeURIComponent(base64)
}
