const outputContainer = document.getElementById('output');

function showTaskResult(title, result) {
    const div = document.createElement('div');
    div.className = 'task-container';
    
    const h3 = document.createElement('h3');
    h3.textContent = title;
    
    const p = document.createElement('div');
    p.className = 'result';
    p.innerHTML = result;
    
    div.appendChild(h3);
    div.appendChild(p);
    outputContainer.appendChild(div);
}

const task1Date = new Date(2021, 1, 20, 3, 12);
showTaskResult("Завдання №1", task1Date.toString());

function getWeekDay(date) {
    const days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}
showTaskResult("Завдання №2", `День тижня для 20.02.2021: ${getWeekDay(task1Date)}`);

function getLastDayOfMonth(year, month) {
    const date = new Date(year, month + 1, 0);
    return date.getDate();
}
showTaskResult("Завдання №3", 
    `Останній день лютого 2020: ${getLastDayOfMonth(2020, 1)}\n` + 
    `Останній день лютого 2021: ${getLastDayOfMonth(2021, 1)}`
);

function getSecondsToTomorrow() {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const diff = tomorrow - now;
    return Math.round(diff / 1000);
}
showTaskResult("Завдання №4", `Секунд до завтра: ${getSecondsToTomorrow()}`);

function formatDate(date) {
    const diff = new Date() - date;

    if (diff < 1000) {
        return 'прямо зараз';
    }

    const sec = Math.floor(diff / 1000);
    if (sec < 60) {
        return sec + ' сек. назад';
    }

    const min = Math.floor(diff / 60000);
    if (min < 60) {
        return min + ' хв. назад';
    }

    let d = date;
    d = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1),
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2));

    return d.slice(0, 3).join('.') + ' ' + d.slice(3).join(':');
}

showTaskResult("Завдання №5", 
    `new Date(): ${formatDate(new Date())}\n` +
    `30 сек назад: ${formatDate(new Date(new Date() - 30 * 1000))}\n` +
    `5 хв назад: ${formatDate(new Date(new Date() - 5 * 60 * 1000))}\n` +
    `Вчора: ${formatDate(new Date(new Date() - 86400 * 1000))}`
);