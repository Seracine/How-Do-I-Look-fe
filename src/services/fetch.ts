const logError = async (response: Response) => {
  if (!response.ok) {
    const data = await response.json()
    console.error(`[프론트] ${response.url} ${response.status}`, data)
  }
}

const enhancedFetch: (
  url: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1] & { next?: { tags: string[] } },
) => ReturnType<typeof fetch> = async (url, init) => {
  let response: Response
  try {
    response = await fetch(url, init)
    if (!response.ok) {
      await logError(response)
    }
  } catch (error) {
    console.error(error)
    throw error
  }

  return response
}

export default enhancedFetch
