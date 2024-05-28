import { JSDOM } from 'jsdom'

const crawlPage = async (url) => {
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
    console.log(await response.text())
  } catch (error) {
    throw new Error(error.message)
  }
}

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

export { crawlPage, getURLsFromHTML, normalizeURL }