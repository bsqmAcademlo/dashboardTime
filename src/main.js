import { dataTime } from "./data.js";

const dashboard = document.querySelector("#dashboard");

function dataFilter(filter = "daily") {
    return dataTime.map((data) => {
        return {
            title: data.title,
            svg: data.title.toLowerCase().split(" ").join("-"),
            infoTime: data.timeframes[filter],
        };
    });
}

function printItem(times) {
    let html = "";

    for (let {
        title,
        svg,
        infoTime: { current, previous },
    } of times) {
        html += `
        <div class="item" style="background-color: var(--${svg})">
            <div class="item_bg">
                <img src="./src/images/icon-${svg}.svg" alt="${svg}">
            </div>
            <div class="item_content">
                <div class="item_content-header">
                    <h3>${title}</h3>
                    <p>...</p>
                </div>
                <div class="item_content-body">
                    <h3>${current}hrs</h3>
                    <p>Last Week - ${previous}hrs</p>
                </div>
            </div>
        </div>
        `;
    }

    return html;
}

function printItems(filter) {
    const times = dataFilter(filter);

    let html = `
    <div class="item_principal">
        <div class="item_principal-header">
            <div class="item_principal-img">
                <img src="./src/images/image-jeremy.png" alt="jeremy">
            </div>
            <div>
                <h3>Report for</h3>
                <h2>Jeremy Robson</h2>
            </div>
        </div>
        <ul class="item_principal-menu">
            <li class="li_active" id="daily">Daily</li>
            <li id="weekly">Weekly</li>
            <li id="monthly">Monthly</li>
        </ul>
    </div>
    ${printItem(times)}
    `;

    dashboard.innerHTML = html;
}

printItems();

const itemPrincipalMenu = document.querySelector(".item_principal-menu");
const lis = document.querySelectorAll(".item_principal-menu li");

itemPrincipalMenu.addEventListener("click", (e) => {
    if (e.target.id) {
        printItems(e.target.id);

        lis.forEach((li) => {
            if (li.classList.contains("li_active")) {
                li.classList.remove("li_active");
            }
        });

        e.target.classList.add("li_active");
    }
});
