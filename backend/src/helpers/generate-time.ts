let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2); // текущий месяц
let year = date_ob.getFullYear(); // текущий год
let hours = date_ob.getHours(); // текущие часы
let minutes = date_ob.getMinutes(); // текущие минуты

export default (year + "-" + month + "-" + date).split("-").reverse().join("-") + ", " + hours + ":" + minutes;

