import { test, expect } from '@jest/globals'
import { normalizeURL } from './crawl.js'

test('normalizeURL, http', () => {
  expect(normalizeURL('http://sub.test.dev/path/')).toEqual('sub.test.dev/path')
})

test('normalizeURL, https', () => {
  expect(normalizeURL('https://sub.test.dev/path')).toEqual('sub.test.dev/path')
})

test('normalizeURL, ends in /', () => {
  expect(normalizeURL('https://sub.test.dev/path/')).toEqual('sub.test.dev/path')
})

test('normalizeURL, partly upper case input', () => {
  expect(normalizeURL('https://sub.TEST.dev/path/')).toEqual('sub.test.dev/path')
})