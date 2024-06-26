const rootElement = document.querySelector("#rootElement");
const BASE_URL = "https://randomuser.me/api/?results=15";

const table = document.createElement("table");
const thead = document.createElement("thead");
const tbody = document.createElement("tbody");
const tr = document.createElement("tr");

table.classList.add('table', 'table-light', 'table-hover', 'table-bordered', 'table-striped-columns');

table.appendChild(thead);
table.appendChild(tbody);

async function fetchedTableData(url) {
    try {
        const response = await fetch(url);
        const fetchedTableData = await response.json();
        return fetchedTableData;
    } catch (error) {
        console.log(error);
    }
};

const tableColumns = [{
        first: "Firstname"
    },
    {
        last: "Lastname"
    },
    {
        age: "Age"
    },
    {
        email: "Mail"
    },
    {
        address: "Address"
    },
    {
        phone: "Phone"
    },
    {
        birthDate: "Birth Date"
    }
];

tableColumns.forEach((column) => {
    let th = document.createElement("th");
    th.innerHTML = Object.values(column)[0];
    tr.appendChild(th);
});
thead.appendChild(tr);

const tableItemKeys = {
    first: data => data.name.first,
    last: data => data.name.last,
    age: data => data.dob.age,
    email: data => data.email,
    address: data => data.location.country,
    phone: data => data.phone,
    birthDate: data => new Date(data.dob.date).toLocaleDateString()
};

(async function tableItems() {
    const fetchedData = await fetchedTableData(BASE_URL);

    fetchedData.results.forEach((data) => {
        const tr = document.createElement("tr");

        tableColumns.forEach((column) => {
            const td = document.createElement("td");
            const key = Object.keys(column)[0];
            td.innerHTML = tableItemKeys[key] ? tableItemKeys[key](data) : 'Not Found';
            tr.appendChild(td);
        });

        tbody.appendChild(tr);
    });
})();

rootElement.appendChild(table);
