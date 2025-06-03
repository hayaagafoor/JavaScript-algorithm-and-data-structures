const input = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const resultsDiv = document.getElementById("results-div");

checkBtn.addEventListener("click", () => {
  const number = input.value.trim();

  if (number === "") {
    alert("Please provide a phone number");
    return;
  }

  const isValid = validateUSPhone(number);

  resultsDiv.textContent = isValid
    ? `Valid US number: ${number}`
    : `Invalid US number: ${number}`;
});

clearBtn.addEventListener("click", () => {
  resultsDiv.textContent = "";
});

function validateUSPhone(str) {
  // Valid patterns for US phone numbers
  const validPatterns = [
    // With country code
    /^1\s?\d{3}[-\s]?\d{3}[-\s]?\d{4}$/,
    /^1\s?\(\d{3}\)\s?\d{3}[-\s]?\d{4}$/,
    /^1\(\d{3}\)\d{3}[-\s]?\d{4}$/,

    // Without country code
    /^\d{10}$/,
    /^\d{3}-\d{3}-\d{4}$/,
    /^\(\d{3}\)\d{3}-\d{4}$/,
    /^\(\d{3}\)\s?\d{3}-\d{4}$/,
    /^\d{3}\s\d{3}\s\d{4}$/
  ];

  for (let pattern of validPatterns) {
    if (pattern.test(str)) return true;
  }

  return false;
}