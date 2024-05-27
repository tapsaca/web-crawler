const main = () => {
  if (process.argv.length < 3) {
    throw Error('URL was not provided')
  } else if (process.argv.length > 3) {
    throw Error('Too many arguments provided')
  }
  console.log(`Crawler started at ${process.argv[2]}`)
}

main()