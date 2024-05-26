import { JSDOM } from 'jsdom'

const getURLsFromHTML = (html, baseURL) => {
  const url_list = []
  const dom = new JSDOM(html)
  const anchors = dom.window.document.querySelectorAll('a')
  for (const anchor of anchors) {
    if (anchor.hasAttribute('href')) {
      try {
        url_list.push(new URL(anchor.getAttribute('href'), baseURL).href)
      } catch (error) {
        console.log(error.message)
      }
    }
  }
  return url_list
}

const normalizeURL = (url) => {
  if (url.slice(-1) === '/') {
    url = url.slice(0, -1)
  }
  const urlObj = new URL(url)
  return `${urlObj.hostname}${urlObj.pathname}`
}

export { getURLsFromHTML, normalizeURL }