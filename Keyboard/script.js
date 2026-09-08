const keyboardLayout = [
  ["ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "⌫"],
  ["й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
  ["Caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Enter"],
  ["Shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "Shift"],
  ["Space"],
];

const keyboard = document.getElementById("keyboard");
const textInput = document.getElementById("textInput");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");

let isShift = false;
let isCaps = false;

keyboardLayout.forEach((row) => {
  row.forEach((key) => {
    const keyBtn = document.createElement("div");
    keyBtn.className = "key";
    keyBtn.textContent = key;

    if (key === "Space") keyBtn.classList.add("extra-wide");
    if (key === "Shift" || key === "Caps" || key === "Enter" || key === "⌫")
      keyBtn.classList.add("wide");

    keyBtn.addEventListener("click", () => handleKeyPress(key));

    keyboard.appendChild(keyBtn);
  });
});

function handleKeyPress(key) {
  if (key === "Shift") {
    isShift = !isShift;
    toggleKeyHighlight(key);
    return;
  }

  if (key === "Caps") {
    isCaps = !isCaps;
    toggleKeyHighlight(key);
    return;
  }

  if (key === "⌫") {
    textInput.value = textInput.value.slice(0, -1);
    return;
  }

  if (key === "Enter") {
    textInput.value += "\n";
    return;
  }

  if (key === "Space") {
    textInput.value += " ";
    return;
  }

  let char = key;
  if (isShift ^ isCaps) {
    char = key.toUpperCase();
  } else {
    char = key.toLowerCase();
  }

  textInput.value += char;

  if (isShift) {
    isShift = false;
    removeShiftHighlight();
  }
}

function toggleKeyHighlight(keyName) {
  const keys = Array.from(document.querySelectorAll(".key"));
  keys.forEach((k) => {
    if (k.textContent === keyName) {
      k.classList.toggle("toggle-active");
    }
  });
}

function removeShiftHighlight() {
  const keys = Array.from(document.querySelectorAll(".key"));
  keys.forEach((k) => {
    if (k.textContent === "Shift") k.classList.remove("toggle-active");
  });
}

copyBtn.addEventListener("click", () => {
  if (textInput.value.trim() === "") return;

  navigator.clipboard
    .writeText(textInput.value)
    .then(() => {
      copyMsg.textContent = "Скопировано!";
      copyMsg.style.opacity = 1;

      setTimeout(() => {
        copyMsg.style.opacity = 0;
      }, 1500);
    })
    .catch((err) => {
      copyMsg.textContent = "Ошибка копирования";
      copyMsg.style.opacity = 1;
      setTimeout(() => {
        copyMsg.style.opacity = 0;
      }, 1500);
    });
});
