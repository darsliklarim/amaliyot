const container = document.getElementById("container");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const modeBtn = document.getElementById("modeBtn");

let countries = [];

function getData() {
    fetch("http://localhost:3002/countries")
        .then(res => res.json())
        .then(data => {
            countries = data;
            renderData(countries);
        });
}

function renderData(data) {

    container.innerHTML = "";

    data.map(item => {

        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${item.flag}" alt="">
            <h3>${item.name}</h3>
            <p>${item.region}</p>
        `;

        container.append(card);
    });
}


function filterData() {

    let value = search.value.toLowerCase();
    let region = filter.value;

    let result = countries.filter(item => {

        return (
            item.name.toLowerCase().includes(value) &&
            (region === "All" || item.region === region)
        );

    });

    renderData(result);
}

function darkLight() {

    document.body.classList.toggle("light");

}

search.addEventListener("input", filterData);

filter.addEventListener("change", filterData);

modeBtn.addEventListener("click", darkLight);

getData();