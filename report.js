const printReport = (pages) => {
  console.log()
  console.log('========')
  console.log(' REPORT ')
  console.log('========')
  const sortedPages = sortPages(pages)
  for (const page of sortedPages) {
    console.log(`Found ${page[1]} internal links to ${page[0]}`)
  }
  console.log()
}

// Sort by internal link count with highest count first
// If the count is equal, sort by url alphabetically
const sortPages = (pages) => {
  const pagesArray = Object.entries(pages)
  pagesArray.sort((pageA, pageB) => {
    if (pageA[1] === pageB[1]) {
      return pageA[0].localeCompare(pageB[0])
    }
    return pageB[1] - pageA[1]
  })
  return pagesArray
}

export { printReport, sortPages }