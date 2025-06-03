document.getElementById('check-btn').addEventListener('click', function () {
  const input = document.getElementById('text-input').value;

  if (!input.trim()) {
    alert('Please input a value');
    return;
  }

  const original = input;
  const cleaned = input.toLowerCase().replace(/[^a-z0-9]/gi, '');
  const reversed = cleaned.split('').reverse().join('');

  const isPalindrome = cleaned === reversed;

  const resultText = isPalindrome
    ? `${original} is a palindrome.`
    : `${original} is not a palindrome.`;

  document.getElementById('result').textContent = resultText;
});