const fetch = require("node-fetch");

async function initialize2DArray() {
  const res1 = await fetch(`http://localhost:3000/initialize`);
  const data1 = await res1.json();

  console.log(data1);
  return data1;
}

async function getValuesof2DArrayConcurrently(data1) {
  let twoDArray = [];
  for (let i = 0; i < data1.size; i++) {
    let row = [];
    for (let j = 0; j < data1.size; j += 2) {
      const col1 = fetch(
        `http://localhost:3000/value?rowIndex=${i}&colIndex=${j}`
      ).then((res) => res.json());
      const col2 = fetch(
        `http://localhost:3000/value?rowIndex=${i}&colIndex=${j + 1}`
      ).then((res) => res.json());

      const temp = await Promise.all([col1, col2]);
      row.push(temp[0].value);
      row.push(temp[1].value);
    }
    twoDArray.push(row);
  }
  console.log(twoDArray);
}

async function main() {
  const data1 = await initialize2DArray();

  await getValuesof2DArrayConcurrently(data1);
}

main();
