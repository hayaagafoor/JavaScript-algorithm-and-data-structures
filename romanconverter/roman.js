document.getElementById("convert-btn").addEventListener("click", () => {
  const numberInput = document.getElementById("number").value;
  const output = document.getElementById("output");

  if (numberInput === "") {
    output.textContent = "Please enter a valid number";
    return;
  }

  const number = parseInt(numberInput);

  if (number < 1) {
    output.textContent = "Please enter a number greater than or equal to 1";
    return;
  }

  if (number >= 4000) {
    output.textContent = "Please enter a number less than or equal to 3999";
    return;
  }

  const romanMap = [
    { val: 1000, sym: "M" },
    { val: 900, sym: "CM" },
    { val: 500, sym: "D" },
    { val: 400, sym: "CD" },
    { val: 100, sym: "C" },
    { val: 90, sym: "XC" },
    { val: 50, sym: "L" },
    { val: 40, sym: "XL" },
    { val: 10, sym: "X" },
    { val: 9, sym: "IX" },
    { val: 5, sym: "V" },
    { val: 4, sym: "IV" },
    { val: 1, sym: "I" },
  ];

  let result = "";
  let temp = number;

  for (const { val, sym } of romanMap) {
    while (temp >= val) {
      result += sym;
      temp -= val;
    }
  }

  output.textContent = result;
});