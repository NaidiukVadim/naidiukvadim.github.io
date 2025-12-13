const inputF = document.getElementById('inputFahrenheit');
const inputC = document.getElementById('inputCelsius');

if (inputF && inputC) {
    inputF.addEventListener('input', () => {
        let f = parseFloat(inputF.value);
        if (!isNaN(f)) {
            let c = (5/9) * (f - 32);
            inputC.value = Math.round(c * 100) / 100;
        } else {
            inputC.value = '';
        }
    });

    inputC.addEventListener('input', () => {
        let c = parseFloat(inputC.value);
        if (!isNaN(c)) {
            let f = (c * 9/5) + 32;
            inputF.value = Math.round(f * 100) / 100;
        } else {
            inputF.value = '';
        }
    });
}

let t2State = { num1: 0, num2: 0, score: 0, total: 0 };

function nextTask2() {
    t2State.num1 = Math.floor(Math.random() * 9) + 2;
    t2State.num2 = Math.floor(Math.random() * 9) + 2;
    
    document.getElementById('t2-question').textContent = `${t2State.num1} × ${t2State.num2} = ?`;
    document.getElementById('t2-answer').value = '';
    document.getElementById('t2-result').textContent = '';
    document.getElementById('t2-result').style.color = 'black';
}

function checkTask2() {
    const input = document.getElementById('t2-answer');
    const resultText = document.getElementById('t2-result');
    const userVal = parseInt(input.value);
    const correct = t2State.num1 * t2State.num2;

    if (isNaN(userVal)) {
        resultText.textContent = "Введіть число!";
        return;
    }

    t2State.total++;
    if (userVal === correct) {
        t2State.score++;
        resultText.textContent = "Правильно!";
        resultText.style.color = "green";
    } else {
        resultText.textContent = `Помилка. Правильна відповідь: ${correct}`;
        resultText.style.color = "red";
    }
    
    document.getElementById('t2-score').textContent = t2State.score;
    document.getElementById('t2-total').textContent = t2State.total;
}

let t3State = { num1: 0, num2: 0, score: 0, total: 0, answered: false };

function nextTask3() {
    t3State.answered = false;
    t3State.num1 = Math.floor(Math.random() * 9) + 2;
    t3State.num2 = Math.floor(Math.random() * 9) + 2;
    const correct = t3State.num1 * t3State.num2;

    document.getElementById('t3-question').textContent = `${t3State.num1} × ${t3State.num2} = ?`;
    document.getElementById('t3-result').textContent = '';

    let options = new Set();
    options.add(correct);
    while(options.size < 4) {
        let wrong = (Math.floor(Math.random() * 9) + 2) * (Math.floor(Math.random() * 9) + 2);
        if(wrong !== correct) options.add(wrong);
    }
    
    const optionsArr = Array.from(options).sort(() => Math.random() - 0.5);

    const container = document.getElementById('t3-options');
    container.innerHTML = '';

    optionsArr.forEach(opt => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 't3_q';
        radio.value = opt;
        radio.onchange = () => checkTask3(opt, correct);
        
        label.appendChild(radio);
        label.appendChild(document.createTextNode(` ${opt}`));
        container.appendChild(label);
    });
}

function checkTask3(selected, correct) {
    if (t3State.answered) return;
    t3State.answered = true;
    t3State.total++;

    const resultText = document.getElementById('t3-result');
    const radios = document.querySelectorAll('input[name="t3_q"]');
    
    radios.forEach(r => r.disabled = true);

    if (selected === correct) {
        t3State.score++;
        resultText.textContent = "Правильно!";
        resultText.style.color = "green";
    } else {
        resultText.textContent = `Неправильно. Правильно: ${correct}`;
        resultText.style.color = "red";
    }

    document.getElementById('t3-score').textContent = t3State.score;
    document.getElementById('t3-total').textContent = t3State.total;
}

let imagesArray = [
    {
        path: 'https://ramsey.com.ua/wp-content/uploads/2020/07/131.jpg',
        title: 'Класичний костюм',
        description: 'Елегантний чоловічий костюм темно-сірого кольору.'
    },
    {
        path: 'https://parkas.com.ua/wa-data/public/shop/products/53/02/253/images/577/577.970.jpg',
        title: 'Шкіряна куртка',
        description: 'Стильна шкіряна куртка для повсякденного носіння.'
    },
    {
        path: 'https://www.aviatsiyahalychyny.com/wp-content/uploads/2024/05/848A3823-1-scaled.webp',
        title: 'Джинси',
        description: 'Класичні сині джинси прямого крою.'
    },
    {
        path: 'https://vicapota.com.ua/imgs/mg69443.jpg',
        title: 'Зимове пальто',
        description: 'Тепле вовняне пальто для холодної погоди.'
    }
];

function initPhotoRotator(divId, images) {
    const container = document.getElementById(divId);
    if (!container) return;

    let currentIndex = 0;

    const counterEl = document.createElement('div');
    counterEl.className = 'rotator-info';
    
    const imgEl = document.createElement('img');
    
    const titleEl = document.createElement('h3');
    
    const descEl = document.createElement('p');
    
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'rotator-controls';
    
    const btnPrev = document.createElement('button');
    btnPrev.textContent = 'Назад';
    
    const btnNext = document.createElement('button');
    btnNext.textContent = 'Вперед';
    btnNext.style.marginLeft = '10px';

    controlsDiv.appendChild(btnPrev);
    controlsDiv.appendChild(btnNext);

    container.appendChild(counterEl);
    container.appendChild(imgEl);
    container.appendChild(controlsDiv);
    container.appendChild(titleEl);
    container.appendChild(descEl);

    function render() {
        const item = images[currentIndex];
        imgEl.src = item.path;
        imgEl.alt = item.title;
        titleEl.textContent = item.title;
        descEl.textContent = item.description;
        counterEl.textContent = `Фото ${currentIndex + 1} з ${images.length}`;

        btnPrev.style.display = (currentIndex === 0) ? 'none' : 'inline-block';
        btnNext.style.display = (currentIndex === images.length - 1) ? 'none' : 'inline-block';
    }

    btnPrev.onclick = () => {
        if (currentIndex > 0) {
            currentIndex--;
            render();
        }
    };

    btnNext.onclick = () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            render();
        }
    };

    render();
}

const digitsMap = {
    0: [1,1,1, 1,0,1, 1,0,1, 1,0,1, 1,1,1],
    1: [0,1,0, 1,1,0, 0,1,0, 0,1,0, 1,1,1],
    2: [1,1,1, 0,0,1, 1,1,1, 1,0,0, 1,1,1],
    3: [1,1,1, 0,0,1, 0,1,1, 0,0,1, 1,1,1],
    4: [1,0,1, 1,0,1, 1,1,1, 0,0,1, 0,0,1],
    5: [1,1,1, 1,0,0, 1,1,1, 0,0,1, 1,1,1],
    6: [1,1,1, 1,0,0, 1,1,1, 1,0,1, 1,1,1],
    7: [1,1,1, 0,0,1, 0,1,0, 0,1,0, 0,1,0],
    8: [1,1,1, 1,0,1, 1,1,1, 1,0,1, 1,1,1],
    9: [1,1,1, 1,0,1, 1,1,1, 0,0,1, 1,1,1]
};

let currentCaptchaValue = "";

function initCaptcha(digitsCount) {
    const container = document.getElementById('captcha-container');
    if (!container) return;

    container.innerHTML = '';
    currentCaptchaValue = "";
    
    document.getElementById('captcha-input').value = "";
    document.getElementById('captcha-result').textContent = "";

    for (let i = 0; i < digitsCount; i++) {
        const digit = Math.floor(Math.random() * 10);
        currentCaptchaValue += digit;

        const digitEl = document.createElement('div');
        digitEl.className = 'digit-grid';

        const pattern = digitsMap[digit];
        pattern.forEach(p => {
            const pixel = document.createElement('span');
            pixel.className = 'pixel' + (p === 1 ? ' active' : '');
            digitEl.appendChild(pixel);
        });

        container.appendChild(digitEl);
    }
}

function checkCaptcha() {
    const userVal = document.getElementById('captcha-input').value;
    const msg = document.getElementById('captcha-result');

    if (userVal === currentCaptchaValue) {
        msg.textContent = "Вірно! Ви не робот.";
        msg.style.color = "green";
    } else {
        msg.textContent = "Помилка. Спробуйте ще раз.";
        msg.style.color = "red";
    }
}

window.onload = function() {
    nextTask2();
    nextTask3();
    initPhotoRotator('rotator', imagesArray);
    initCaptcha(4);
};