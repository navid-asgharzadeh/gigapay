export const fetchData = async (url: string, options: RequestInit) => {
  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''
  try {
    const res = await fetch(`${origin}/api${url}`, options)
    const result = await res.json()
    return result
  } catch (error) {
    return error
  }
}
