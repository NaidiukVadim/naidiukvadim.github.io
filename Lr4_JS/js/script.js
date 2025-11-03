function createBook(title, author, year, isRead) {
  return {
    title: title,
    author: author,
    year: year,
    isRead: isRead,

    bookInfo() {
      console.log(
        `Назва: ${this.title}, Автор: ${this.author}, Рік: ${
          this.year
        }, Прочитана: ${this.isRead ? "Так" : "Ні"}`
      );
    },

    // ЗАВДАННЯ 2.1: Метод markAsRead
    markAsRead() {
      this.isRead = true;
      console.log(`Книгу "${this.title}" позначено як прочитану.`);
    },
  };
}

let library = [
  createBook(
    "Harry Potter and the Sorcerer's Stone",
    "J.K. Rowling",
    1997,
    true
  ),
  createBook("The Hobbit", "J.R.R. Tolkien", 1937, false),
  createBook("1984", "George Orwell", 1949, true),
];

function displayLibrary() {
  console.log("--- Вся бібліотека ---");
  library.forEach((book) => {

    book.bookInfo();
  });
}

library.push(
  createBook("The Great Gatsby", "F. Scott Fitzgerald", 1925, false)
);
displayLibrary();

console.log("-------------------");

console.log("Перевірка методу markAsRead:");
let hobbitBook = library.find((book) => book.author === "J.R.R. Tolkien");
hobbitBook.bookInfo();
hobbitBook.markAsRead();
hobbitBook.bookInfo();

console.log("-------------------");

// ЗАВДАННЯ 2.2: Функція calculateAverageYear
function calculateAverageYear(booksArray) {
  if (booksArray.length === 0) {
    return 0;
  }

  const totalYears = booksArray.reduce((sum, book) => sum + book.year, 0);

  return totalYears / booksArray.length;
}

const avgYear = calculateAverageYear(library);
console.log(`Середній рік видання всіх книг: ${avgYear.toFixed(0)}`);

console.log("-------------------");

function addBookToLibrary() {
  let title = prompt("Введіть назву книги:");
  let author = prompt("Введіть автора книги:");
  let year = +prompt("Введіть рік видання книги:");
  let isRead = confirm("Чи прочитана книга?");

  const newBook = createBook(title, author, year, isRead);

  library.push(newBook);

  console.log("Книгу додано!");
  displayLibrary();
}

function createCourse(title, platform, duration, isCompleted, hasCertificate) {
  return {
    title: title,
    platform: platform,
    duration: duration,
    isCompleted: isCompleted,
    hasCertificate: hasCertificate,

    courseInfo() {
      console.log(`Назва: ${this.title} (Платформа: ${this.platform})
    Тривалість: ${this.duration} год.
    Завершено: ${this.isCompleted ? "Так" : "Ні"}
    Сертифікат: ${this.hasCertificate ? "Є" : "Немає"}
    --------------------`);
    },

    markAsCompleted() {
      this.isCompleted = true;
      this.hasCertificate = true;
      console.log(`*** Курс "${this.title}" успішно завершено! ***`);
    },
  };
}

let myCourses = [
  createCourse("JavaScript Basics", "Udemy", 25, true, true),
  createCourse("Advanced React", "Coursera", 40, false, false),
  createCourse("Python for Everybody", "Prometheus", 50, true, false),
];

function displayCourses() {
  console.log("======= МІЙ СПИСОК КУРСІВ =======");
  myCourses.forEach((course) => {
    course.courseInfo();
  });
  console.log("===================================");
}

function addCourse() {
  let title = prompt("Введіть назву курсу:");
  if (!title) return;

  let platform = prompt("Введіть платформу (напр. Udemy, Coursera):");
  let duration = +prompt("Введіть тривалість (в годинах):");
  let isCompleted = confirm("Курс вже завершено?");
  let hasCertificate = false;

  if (isCompleted) {
    hasCertificate = confirm("Чи є сертифікат?");
  }

  const newCourse = createCourse(
    title,
    platform,
    duration,
    isCompleted,
    hasCertificate
  );

  myCourses.push(newCourse);

  console.log(`*** Новий курс "${title}" додано! ***`);
  displayCourses();
}

function runProject() {
  console.clear();

  console.log("--- 1. Початковий список курсів ---");
  displayCourses();

  console.log("--- 2. Фільтрація: Незавершені курси ---");
  let unfinishedCourses = myCourses.filter((course) => !course.isCompleted);
  unfinishedCourses.forEach((course) => course.courseInfo());

  console.log("--- 3. Пошук: Курс 'Advanced React' ---");
  let reactCourse = myCourses.find(
    (course) => course.title === "Advanced React"
  );
  if (reactCourse) {
    reactCourse.courseInfo();

    console.log("...позначаємо його як завершений...");
    reactCourse.markAsCompleted();
    reactCourse.courseInfo();
  } else {
    console.log("Курс 'Advanced React' не знайдено.");
  }

  console.log("--- 4. Сортування: Курси за тривалістю (зростання) ---");
  myCourses.sort((a, b) => a.duration - b.duration);
  displayCourses();

  const avgDuration = calculateAverageDuration(myCourses);
  console.log(`!!! Середня тривалість курсу: ${avgDuration.toFixed(1)} год.`);
}

function calculateAverageDuration(coursesArray) {
  if (coursesArray.length === 0) return 0;

  const totalDuration = coursesArray.reduce(
    (sum, course) => sum + course.duration,
    0
  );

  return totalDuration / coursesArray.length;
}