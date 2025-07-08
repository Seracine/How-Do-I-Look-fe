// src/services/fetch.ts

interface ErrnoException extends Error {
  errno?: number
  code?: string
  syscall?: string
  path?: string
  address?: string
  port?: number
}

const enhancedFetch = async (
  url: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1] & { next?: { tags: string[] } },
): Promise<any> => {
  let response: Response
  let responseText: string // 응답 본문을 한 번만 읽기 위한 변수

  try {
    console.log(`[enhancedFetch DEBUG] Attempting to fetch from URL: ${url}`)
    response = await fetch(url, init)

    // 응답 본문을 미리 텍스트로 읽어둡니다. (성공/실패 여부와 상관없이)
    // 이 시점에서 본문은 한 번만 읽힙니다.
    responseText = await response.text()
    console.log(`[enhancedFetch DEBUG] Received response for ${url}. Status: ${response.status} ${response.statusText}`)
    console.log(`[enhancedFetch DEBUG] Response Body (first 500 chars): ${responseText.substring(0, 500)}`)

    // HTTP 상태 코드가 2xx 범위가 아니라면 (404, 500 등) 에러 처리
    if (!response.ok) {
      console.error(`[enhancedFetch ERROR] Non-OK status detected for ${url}.`)

      let errorData: any // 파싱된 에러 데이터를 저장할 변수

      // 1. 응답 본문이 HTML로 시작하는지 확인
      if (responseText.trim().startsWith('<!DOCTYPE html>')) {
        console.error(`[enhancedFetch ERROR] Received HTML instead of JSON. Raw text:`, responseText.substring(0, 500))
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText || '예상치 못한 HTML 응답'}`, { cause: new Error(responseText) })
      }

      // 2. 백엔드가 JSON 에러를 보낸다고 가정하고, JSON 파싱을 시도
      try {
        errorData = JSON.parse(responseText) // 이미 읽어둔 responseText를 파싱
        console.error(`[enhancedFetch ERROR] Parsed Error JSON:`, errorData)
      } catch (jsonParseError) {
        console.error(`[enhancedFetch ERROR] Failed to parse response as JSON. Raw text:`, responseText.substring(0, 500))
        throw new Error(`HTTP Error: ${response.status} - ${response.statusText || '유효하지 않은 응답 형식'}`, { cause: new Error(responseText) })
      }

      // 3. JSON 파싱에 성공했으므로, 해당 데이터를 포함하여 에러를 던짐
      throw new Error(`API Error: ${response.status} - ${errorData.message || '알 수 없는 오류'}`, { cause: errorData })
    }

    // 응답이 성공적 (response.ok === true)이라면 JSON으로 파싱
    try {
      const jsonResponse = JSON.parse(responseText) // 이미 텍스트로 읽었으므로 여기서 파싱
      console.log(`[enhancedFetch DEBUG] Successfully parsed JSON for ${url}`)

      Object.defineProperty(jsonResponse, 'json', {
        value: async () => jsonResponse,
        writable: false,
        configurable: false,
      })

      return jsonResponse // JSON 객체 자체를 반환
    } catch (jsonParseError) {
      console.error(`[enhancedFetch ERROR] Received 200 OK but failed to parse JSON. Raw text:`, responseText.substring(0, 500))
      throw new Error(`Invalid JSON response from ${url}`, { cause: new Error(responseText) })
    }
  } catch (error: unknown) {
    console.error(`[enhancedFetch CATCH] Fetch operation failed for URL: ${url}. Original error:`, error)

    if (error instanceof TypeError && error.message === 'fetch failed' && (error.cause as ErrnoException)?.code === 'ECONNRESET') {
      console.error(`[enhancedFetch CATCH] Specific Network Error: ECONNRESET for ${url}. Connection reset by peer.`)
      throw new Error('네트워크 연결이 갑자기 끊겼습니다. 백엔드 서버 상태를 확인해 주세요.', { cause: error })
    } else if (error instanceof Error && error.message.includes('Body is unusable: Body has already been read')) {
      console.error(`[enhancedFetch CATCH] Logic Error: Body already read for ${url}. This means the response stream was consumed multiple times. Check previous logs.`)
      throw new Error('응답 데이터를 읽는 중 내부 오류가 발생했습니다. (이미 읽은 본문)', { cause: error })
    } else if (error instanceof SyntaxError && error.message.includes('Unexpected token') && error.message.includes('is not valid JSON')) {
      console.error(`[enhancedFetch CATCH] Parsing Error: Received non-JSON response (likely HTML) that caused JSON.parse to fail from ${url}.`)
      throw new Error('서버로부터 JSON이 아닌 예상치 못한 응답을 받았습니다. 백엔드 로그 확인이 필요합니다.', { cause: error })
    }

    throw error
  }
}

export default enhancedFetch
