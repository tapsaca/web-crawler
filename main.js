import { crawlPage } from './crawl.js'
import { printReport } from './report.js'

const main = async () => {
  if (process.argv.length < 3) {
    throw new Error('URL was not provided')
  } else if (process.argv.length > 3) {
    throw new Error('Too many arguments provided')
  }
  const url = process.argv[2]
  console.log(`Crawler started at ${url}`)
  const pages = await crawlPage(url)
  printReport(pages)
}

main()