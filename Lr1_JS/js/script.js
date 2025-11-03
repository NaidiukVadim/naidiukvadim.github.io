    const myName = "ВАДИМ";
    const nameList = document.getElementById("nameList");

    for (let letter of myName) {
        const li = document.createElement("li");
        li.textContent = letter;

        li.addEventListener("mouseenter", () => {
            alert(letter);
        });

        nameList.appendChild(li);
    }


    const inputDisplay = document.getElementById("inputDisplay");
    let counter = 1;

    function askName() {
        const fullName = prompt(`Введіть прізвище та ім'я (введення ${counter}):`, "");
        
        if (fullName === null) {
            inputDisplay.innerHTML += "<p><strong>Введення завершено.</strong></p>";
            return;
        }

        if (fullName.trim() !== "") {
            const p = document.createElement("p");
            p.className = "name-list";
            p.textContent = `${counter}. ${fullName.trim()}`;
            inputDisplay.appendChild(p);
            counter++;
            askName();
        } else {
            alert("Будь ласка, введіть коректне прізвище та ім'я.");
            askName();
        }
    }

    window.addEventListener("load", () => {
        setTimeout(askName, 500);
    });

    
    const mySurname = "НАЙДЮК";
    const showBlocksBtn = document.getElementById("showBlocks");
    const lettersContainer = document.getElementById("letters");
    let blocksCreated = false;

    showBlocksBtn.addEventListener("click", () => {
        if (!blocksCreated) {
            for (let letter of mySurname) {
                const div = document.createElement("div");
                div.className = "letter-block";
                div.textContent = letter;

                div.addEventListener("mouseenter", () => {
                    alert(`Це літера ${letter}`);
                });

                lettersContainer.appendChild(div);
            }
            showBlocksBtn.textContent = "Очистити блоки";
            blocksCreated = true;
        } else {
            lettersContainer.innerHTML = "";
            showBlocksBtn.textContent = "Показати блоки";
            blocksCreated = false;
        }
});