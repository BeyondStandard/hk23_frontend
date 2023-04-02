const backend_url = import.meta.env.VITE_BACKEND_URL

export async function loadData(url: string): Promise<Object> {
  const response = await fetch(backend_url + url, { method: "GET" })
  const data = await response.json()
  return data
}
