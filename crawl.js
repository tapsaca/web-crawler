import { JSDOM } from 'jsdom'

const crawlPage = async (baseURL, currentURL = baseURL, pages = {}) => {
  // Return if currentURL is not on the same domain
  if (new URL(baseURL).hostname != new URL(currentURL).hostname) {
    return pages
  }
  const normalizedURL = normalizeURL(currentURL)
  if (pages.hasOwnProperty(normalizedURL)) {
    pages[normalizedURL]++
    return pages
  }
  pages[normalizedURL] = 1
  console.log(`Crawling ${currentURL}`)
  try {
    const html = await fetchHTML(currentURL)
    const nextURLs = getURLsFromHTML(html, baseURL)
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
  } catch (error) {
    console.log(error.message)
    return pages
  }
  return pages
}

const fetchHTML = async (url) => {
  try {
    const response = await fetch(url)
    if (response.status >= 400) {
      console.log(`${response.status} ${response.statusText}`)
      return
    }
    const contentType = response.headers.get('Content-Type')
    if (!contentType || !contentType.includes('text/html')) {
      console.log('Response was not HTML')
      return
    }
    return response.text()
  } catch (error) {
    throw new Error(error.message)
  }
}

const getURLsFromHTML = (html, baseURL) => {
  const URLs = []
  const dom = new JSDOM(html)
  const anchors = dom.window.document.querySelectorAll('a')
  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      try {
        URLs.push(new URL(anchor.getAttribute('href'), baseURL).href)
      } catch (error) {
        console.log(error.message)
      }
    }
  }
  return URLs
}

const normalizeURL = (url) => {
  if (url.slice(-1) === '/') {
    url = url.slice(0, -1)
  }
  const urlObj = new URL(url)
  return `${urlObj.hostname}${urlObj.pathname}`
}

export { crawlPage, getURLsFromHTML, normalizeURL }