        // Завдання 1
        
        function calculate() {
            let result = 'Це зовнішня змінна';

            if (true) {
                let result = 'Це внутрішня змінна';
                console.log(result);
            }

            console.log(result);
        }

        calculate();

        // Завдання 2

        
        const journalNumber = 11; 

        const secretNumber = journalNumber % 10;
        
        const userGuess = prompt('Введіть число від 0 до 9:');

        if (userGuess == secretNumber) {
            alert('Correct!');
        } else {
            alert('Wrong!');
        }

        // Завдання 3

        const userName = prompt("Введіть ваше ім'я:");
        const num1Str = prompt('Введіть перше число:');
        const num2Str = prompt('Введіть друге число:');

        const num1 = Number(num1Str);
        const num2 = Number(num2Str);

        const sum = num1 + num2;

        const message = 'Hello, ' + userName + '! The sum of ' + 
                        num1 + ' and ' + num2 + ' is ' + sum;

        console.log(message);