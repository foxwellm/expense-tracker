const mapped = require('../mappedExpenseCategories.json')
const expenseCategories = [
  'Toys',
  'Car', // maintenance
  'Clothing', // good
  'Food', // good
  'Health', // good
  'Home', // good
  'Office', // good
  'Pets', // good
  'Tools', // good
  'Travel', // gas, plane tickets
]

export const uniqueMappedKeys = Object.keys(mapped).reduce((catAcc, cat) => {
  const uniqueValue = cat.split('-')[0].trim().split(' ')[0]
  // Only map expenseCategories
  if (!expenseCategories.includes(uniqueValue)) return catAcc
  if (!catAcc[uniqueValue]) {
    catAcc[uniqueValue] = {}
  }
  const subCats = Object.keys(mapped[cat]).reduce((subCatAcc, subCat) => {
    subCatAcc[subCat] = Object.keys(mapped[cat][subCat])
    return subCatAcc
  }, {})

  catAcc[uniqueValue] = { ...catAcc[uniqueValue], ...subCats }
  return catAcc
}, {})
// console.log(Object.keys(uniqueMappedKeys))
// console.log(uniqueMappedKeys)
