import {QueryClient} from 'react-query'
const apiURL = import.meta.env.VITE_API_SERVER_URL

const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

async function client(
  endpoint: string,
  {data, token, ...customConfig}: {data?: {}; token: string},
): Promise<Response> {
  const config: RequestInit = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    ...customConfig,
  }
  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      queryClient.clear()

      // refresh the page for them
      window.location.assign(window.location.origin)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export {client}
