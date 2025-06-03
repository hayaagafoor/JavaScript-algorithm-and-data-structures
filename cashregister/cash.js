let price = 19.5; // can be changed for testing
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];

const currencyUnits = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.1,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
};

document.getElementById("purchase-btn").addEventListener("click", () => {
  let cash = parseFloat(document.getElementById("cash").value);
  const changeDueElement = document.getElementById("change-due");

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    changeDueElement.textContent = "No change due - customer paid with exact cash";
    return;
  }

  let changeNeeded = parseFloat((cash - price).toFixed(2));
  let totalCid = parseFloat(cid.reduce((sum, curr) => sum + curr[1], 0).toFixed(2));
  let changeArray = [];

  if (changeNeeded > totalCid) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let reversedCid = [...cid].reverse();

  for (let [unit, amount] of reversedCid) {
    let value = currencyUnits[unit];
    let unitTotal = 0;

    while (changeNeeded >= value && amount > 0) {
      changeNeeded = parseFloat((changeNeeded - value).toFixed(2));
      amount -= value;
      unitTotal += value;
    }

    if (unitTotal > 0) {
      changeArray.push([unit, parseFloat(unitTotal.toFixed(2))]);
    }
  }

  if (changeNeeded > 0) {
    changeDueElement.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  }

  let changeTotal = changeArray.reduce((sum, curr) => sum + curr[1], 0).toFixed(2);

  if (parseFloat(changeTotal) === totalCid) {
    let changeStr = changeArray.map(([k, v]) => `${k}: $${v}`).join(" ");
    changeDueElement.textContent = `Status: CLOSED ${changeStr}`;
  } else {
    let changeStr = changeArray.map(([k, v]) => `${k}: $${v}`).join(" ");
    changeDueElement.textContent = `Status: OPEN ${changeStr}`;
  }
});