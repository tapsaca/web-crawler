import { test, expect } from '@jest/globals'
import { getURLsFromHTML, normalizeURL } from './crawl.js'

describe('getURLsFromHTML', () => {
  test('absolute URL', () => {
    const html = '<html><body><a href="https://sub.test.dev"><span>link</span></a></body></html>'
    const baseURL = 'https://sub.test.dev'
    expect(getURLsFromHTML(html, baseURL)).toEqual(['https://sub.test.dev/'])
  })

  test('relative URL', () => {
    const html = '<html><body><a href="/path/test"><span>link</span></a></body></html>'
    const baseURL = 'https://sub.test.dev'
    expect(getURLsFromHTML(html, baseURL)).toEqual(['https://sub.test.dev/path/test'])
  })

  test('both', () => {
    const html = '<html><body><a href="https://other.dev"><span>link</span></a><a href="/path/test"><span>link</span></a></body></html>'
    const baseURL = 'https://sub.test.dev'
    expect(getURLsFromHTML(html, baseURL)).toEqual(['https://other.dev/', 'https://sub.test.dev/path/test'])
  })
})

describe('normalizeURL', () => {
  test('http', () => {
    expect(normalizeURL('http://sub.test.dev/path/')).toEqual('sub.test.dev/path')
  })
  
  test('https', () => {
    expect(normalizeURL('https://sub.test.dev/path')).toEqual('sub.test.dev/path')
  })
  
  test('ends in /', () => {
    expect(normalizeURL('https://sub.test.dev/path/')).toEqual('sub.test.dev/path')
  })
  
  test('upper case', () => {
    expect(normalizeURL('https://sub.TEST.dev/path/')).toEqual('sub.test.dev/path')
  })
})