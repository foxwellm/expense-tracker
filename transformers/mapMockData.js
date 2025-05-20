const data = require('./MOCK_DATA.json')
// console.log("🚀 ~ data:", data);

const mapped = {}

data.forEach((d) => {
  if (!mapped[d.Cat]) {
    mapped[d.Cat] = {}
  }
  if (!mapped[d.Cat][d.Sub]) {
    mapped[d.Cat] = { ...mapped[d.Cat], [d.Sub]: {} }
  }

  mapped[d.Cat][d.Sub] = { ...mapped[d.Cat][d.Sub], [d.Name]: null }
})

// console.log(mapped)
