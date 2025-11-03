// Завдання 1
function* randomGenerator(min, max) {
  while (true) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    yield randomNum;
  }
}

const min = Number(prompt("Завдання 1: Введіть MIN число:"));
const max = Number(prompt("Завдання 1: Введіть MAX число:"));

const randGen = randomGenerator(min, max);

const nextBtn = document.getElementById("next");
const outDiv = document.getElementById("out");

nextBtn.addEventListener("click", () => {
  const result = randGen.next();
  outDiv.textContent = `Випадкове число: ${result.value}`;
});

// Завдання 2
function* passwordGenerator() {
  let password = "";
  let input = "";

  while (input !== "done") {
    input = yield;

    if (input !== "done" && input) {
      password += input;
    }
  }
  return password;
}

const passwordBtn = document.getElementById("passwordBtn");
const passwordOut = document.getElementById("passwordOut");

passwordBtn.addEventListener("click", () => {
  const passGen = passwordGenerator();
  let result = passGen.next();
  let userInput = "";

  while (userInput !== "done") {
    userInput = prompt("Введіть символ (або 'done' для завершення):");

    result = passGen.next(userInput);
  }

  passwordOut.textContent = `Згенерований пароль: ${result.value}`;
});

// Завдання 3

function* chatBot() {
  const name = yield "Hi! What is your name?";

  const mood = yield `Nice to meet you, ${name}! How are you?`;

  yield `I see, you are ${mood}! Goodbye!`;
}

const chatBtn = document.getElementById("chatBtn");
const chatOut = document.getElementById("chatOut");

chatBtn.addEventListener("click", () => {
  const bot = chatBot();
  chatOut.innerHTML = "";

  let botMsg = bot.next();

  while (!botMsg.done) {
    const question = botMsg.value;
    chatOut.innerHTML += `<p><strong>Bot:</strong> ${question}</p>`;

    const userAnswer = prompt(question);
    chatOut.innerHTML += `<p><strong>You:</strong> ${userAnswer || "..."}</p>`;

    botMsg = bot.next(userAnswer);
  }
});

// Завдання 4

const userName = prompt("Завдання 4: Введіть ваше ім'я:");
const user = {
  name: userName,
  say() {
    alert(`Hello, ${this.name}`);
  },
};

const helloBtn = document.getElementById("hello");

const boundSay = user.say.bind(user);
helloBtn.addEventListener("click", boundSay);
