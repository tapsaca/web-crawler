const normalizeURL = (url) => {
  if (url.slice(-1) === '/') {
    url = url.slice(0, -1)
  }
  const urlObj = new URL(url)
  return `${urlObj.hostname}${urlObj.pathname}`
}

export { normalizeURL }