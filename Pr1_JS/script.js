const products = [
    { name: "Ноутбук", category: "Electronics", price: 20000, inStock: 5 },
    { name: "Телефон", category: "Electronics", price: 15000, inStock: 0 },
    { name: "Мишка", category: "Accessories", price: 500, inStock: 10 },
    { name: "Клавіатура", category: "Accessories", price: 1000, inStock: 0 }
];

function getAvailableProducts(arr) {
    return arr.filter(product => product.inStock > 0);
}

function findProductByName(arr, productName) {
    const product = arr.find(item => item.name === productName);
    return product ? product : "Товар не знайдено";
}

console.log(getAvailableProducts(products));
console.log(findProductByName(products, "Мишка"));
console.log(findProductByName(products, "Монітор"));

const students = [
    { name: "Оля", age: 20, grade: 90, group: "A" },
    { name: "Іван", age: 21, grade: 75, group: "B" },
    { name: "Марія", age: 19, grade: 95, group: "A" },
    { name: "Петро", age: 20, grade: 85, group: "B" },
    { name: "Дмитро", age: 22, grade: 60, group: "C" }
];

function groupBy(arr, key) {
    return arr.reduce((acc, student) => {
        const groupName = student[key];
        if (!acc[groupName]) {
            acc[groupName] = [];
        }
        acc[groupName].push(student);
        return acc;
    }, {});
}

function sortStudentsByGrade(arr) {
    return [...arr].sort((a, b) => b.grade - a.grade);
}

console.log(groupBy(students, "group"));
console.log(sortStudentsByGrade(students));

const employees = [
    { name: "Андрій", position: "Developer", salary: 3000, years: 5 },
    { name: "Олена", position: "Manager", salary: 4000, years: 10 },
    { name: "Сергій", position: "Designer", salary: 2500, years: 3 }
];

function getAverageSalary(arr) {
    const totalSalary = arr.reduce((sum, emp) => sum + emp.salary, 0);
    return totalSalary / arr.length;
}

function findMostExperiencedEmployee(arr) {
    return arr.reduce((mostExperienced, current) => {
        return (current.years > mostExperienced.years) ? current : mostExperienced;
    });
}

console.log(getAverageSalary(employees));
console.log(findMostExperiencedEmployee(employees));

const books = [
    { title: "Кобзар", author: "Тарас Шевченко", year: 1840, rating: 5, isRead: true },
    { title: "Захар Беркут", author: "Іван Франко", year: 1883, rating: 4.8, isRead: false },
    { title: "Тіні забутих предків", author: "Михайло Коцюбинський", year: 1911, rating: 4.5, isRead: true },
    { title: "Каменярі", author: "Іван Франко", year: 1878, rating: 4.2, isRead: true },
    { title: "Місто", author: "Валер'ян Підмогильний", year: 1928, rating: 3.9, isRead: false }
];

function getUnreadBooks(arr) {
    return arr.reduce((acc, book) => {
        if (!book.isRead) {
            acc.push(book.title);
        }
        return acc;
    }, []);
}

function getBooksByAuthor(arr, authorName) {
    return arr
        .filter(book => book.author === authorName)
        .sort((a, b) => a.year - b.year);
}

function getTopRatedBooks(arr) {
    return arr
        .filter(book => book.rating > 4)
        .sort((a, b) => b.rating - a.rating);
}

console.log(getUnreadBooks(books));
console.log(getBooksByAuthor(books, "Іван Франко"));
console.log(getTopRatedBooks(books));

const orders = [
    {
        orderId: 101,
        customer: { name: "Олександр", email: "alex@mail.com" },
        items: ["Laptop", "Mouse"],
        total: 21000
    },
    {
        orderId: 102,
        customer: { name: "Марія", email: "maria@mail.com" },
        items: ["Phone"],
        total: 15000
    },
    {
        orderId: 103,
        customer: { name: "Олександр", email: "alex@mail.com" },
        items: ["Keyboard"],
        total: 1000
    }
];

function getTotalSpentByCustomer(ordersArr, customerName) {
    return ordersArr.reduce((sum, order) => {
        if (order.customer.name === customerName) {
            return sum + order.total;
        }
        return sum;
    }, 0);
}

console.log(getTotalSpentByCustomer(orders, "Олександр"));
console.log(getTotalSpentByCustomer(orders, "Марія"));

const salesProducts = [
    { productId: 1, name: "Ноутбук", price: 20000 },
    { productId: 2, name: "Телефон", price: 15000 },
    { productId: 3, name: "Мишка", price: 500 }
];

const purchases = [
    { purchaseId: 1, productId: 1, quantity: 2 },
    { purchaseId: 2, productId: 3, quantity: 5 },
    { purchaseId: 3, productId: 1, quantity: 1 },
    { purchaseId: 4, productId: 2, quantity: 1 }
];

function getTotalSales(productsArr, purchasesArr) {
    return purchasesArr.reduce((acc, purchase) => {
        const product = productsArr.find(p => p.productId === purchase.productId);
        
        if (product) {
            const revenue = product.price * purchase.quantity;
            
            if (acc[product.name]) {
                acc[product.name] += revenue;
            } else {
                acc[product.name] = revenue;
            }
        }
        return acc;
    }, {});
}

const totalSalesResult = getTotalSales(salesProducts, purchases);
console.log(totalSalesResult);