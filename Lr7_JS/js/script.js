const loader = document.getElementById('loader');
const resultDiv = document.getElementById('result');

function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні");
            }
        }, 1000);
    });
}

function runTask4() {
    const n1 = parseFloat(document.getElementById('num1').value);
    const n2 = parseFloat(document.getElementById('num2').value);

    loader.style.display = 'block';
    resultDiv.textContent = '';

    compareNumbers(n1, n2)
        .then(message => {
            resultDiv.textContent = message;
            resultDiv.style.color = 'green';
        })
        .catch(error => {
            resultDiv.textContent = error;
            resultDiv.style.color = 'red';
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}

function createRandomPromise(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 10) + 1;
            console.log(`Згенеровано число: ${num} (затримка ${delay}мс)`);
            resolve(num);
        }, delay);
    });
}

function runTask5() {
    loader.style.display = 'block';
    resultDiv.textContent = '';

    const p1 = createRandomPromise(1000);
    const p2 = createRandomPromise(2000);
    const p3 = createRandomPromise(3000);

    Promise.all([p1, p2, p3])
        .then(values => {
            const sum = values.reduce((a, b) => a + b, 0);
            resultDiv.textContent = `Числа: ${values.join(', ')}. Сума: ${sum}`;
            resultDiv.style.color = 'blue';
        })
        .finally(() => {
            loader.style.display = 'none';
        });
}