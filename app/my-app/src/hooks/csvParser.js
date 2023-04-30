export const csvToObject = (csvData) => {
  const objectKeys = csvData[0]
  const data = []
  if (csvData.length > 0) {
    csvData.shift()
    for (let csvRow = 0; csvRow < csvData.length; csvRow++) {
      const obj = {}

      for (let dataKey = 0; dataKey < objectKeys.length; dataKey++) {
        delete Object.assign(obj, {
          [objectKeys[dataKey]]: csvData[csvRow][dataKey],
        })
      }
      data.push(obj)
    }

    return data
  }
}
