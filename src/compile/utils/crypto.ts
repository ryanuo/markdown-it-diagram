// crypto.ts
function xor(str: string, key = 'ryanuo') {
  return Array.from(str)
    .map((c, i) =>
      String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length)),
    )
    .join('')
}

export function encrypt(str: string): string {
  // Base64 + URI 安全
  return encodeURIComponent(btoa(xor(str)))
}
