import { test, expect } from '@jest/globals'
import { sortPages } from './report.js'

describe('sortPages', () => {
  test('different and same link counts', () => {
    const pages = {
      urlC: 10,
      urlB: 7,
      urlD: 9,
      urlA: 10,
      urlE: 11,
      urlF: 8
    }
    expect(sortPages(pages)).toEqual([['urlE', 11], ['urlA', 10], ['urlC', 10], ['urlD', 9], ['urlF', 8], ['urlB', 7]])
  })

  test('empty object', () => {
    expect(sortPages({})).toEqual([])
  })
})