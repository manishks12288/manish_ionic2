let configs = [
    { 
        firstName: "Amy",
        lastName: "Taylor",
        title: "data@title",
        phone: "617-244-3672",
        mobilePhone: "617-244-3672",
        email: "amy@fakemail.com",
        data:{"title":"yesttested"}
    }
];

// Simulating async calls for plug-and-play replacement with REST services
export let findAll = () => new Promise((resolve, reject) => {
    resolve(configs);
});

// export let findByName = (name) => new Promise((resolve, reject) => {
//     let filtered = employees.filter(employee => (employee.firstName + ' ' + employee.lastName).toLowerCase().indexOf(name.toLowerCase()) > -1);
//     resolve(filtered);
// });

// export let findById = (id) => new Promise((resolve, reject) => {
//     resolve(employees[id-1]);
// });