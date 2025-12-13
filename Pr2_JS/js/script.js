function formatTime(val) {
    return val < 10 ? '0' + val : val;
}

function updateClock() {
    const now = new Date();
    
    const hours = formatTime(now.getHours());
    const minutes = formatTime(now.getMinutes());
    const seconds = formatTime(now.getSeconds());

    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clockDisplay').textContent = timeString;
}

setInterval(updateClock, 1000);

setInterval(() => {
    alert("Пройшла ще одна хвилина!");
}, 60000);

updateClock();

const outputDiv = document.getElementById('typeOutput');

function typeWriterInterval() {
    const text = document.getElementById('typeInput').value;
    outputDiv.textContent = "";
    let i = 0;

    const timer = setInterval(() => {
        outputDiv.textContent += text[i];
        i++;
        
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, 100);
}

function typeWriterTimeout() {
    const text = document.getElementById('typeInput').value;
    outputDiv.textContent = ""; 
    let i = 0;

    function printChar() {
        if (i < text.length) {
            outputDiv.textContent += text[i];
            i++;
            setTimeout(printChar, 100);
        }
    }
    
    printChar();
}

function placeBet() {
    const betAmount = parseFloat(document.getElementById('betInput').value);
    const resultDiv = document.getElementById('betResult');

    if (isNaN(betAmount) || betAmount <= 0) {
        resultDiv.textContent = "Будь ласка, введіть коректну суму ставки!";
        resultDiv.className = "result lose";
        return;
    }

    resultDiv.textContent = "Обчислюємо результат...";
    resultDiv.className = "result";

    setTimeout(() => {
        const multiplier = Math.floor(Math.random() * 11) - 5;

        if (multiplier <= 0) {
            resultDiv.innerHTML = `Випало число <b>${multiplier}</b>. Ви не вгадали. Ставка згоріла.`;
            resultDiv.className = "result lose";
        } else {
            const winAmount = betAmount * multiplier;
            resultDiv.innerHTML = `Випало число <b>${multiplier}</b>. Ви ВИГРАЛИ: <b>${winAmount} грн</b>!`;
            resultDiv.className = "result win";
        }
    }, 1000);
}