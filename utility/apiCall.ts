export const fetchData = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options)
    const result = await res.json()
    return { result, error: null }
  } catch (error) {
    return { error }
  }
}
