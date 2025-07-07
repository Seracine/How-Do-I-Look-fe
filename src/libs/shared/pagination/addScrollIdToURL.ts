
const addScrollIdToURL = (url: string, scrollId?: string) => {
  if (!scrollId) return url
  return `${url}#${scrollId}`
}

export default addScrollIdToURL
