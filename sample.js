const array = [
    { name: 'John', date: '2022-03-01' },
    { name: 'Jane', date: '2021-06-15' },
    { name: 'Bob', date: '2023-01-01' },
    { name: 'Alice', date: '2020-12-31' },
];

array.sort((a, b) => new Date(a.date) - new Date(b.date));
console.log(array);