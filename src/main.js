import { dataTime } from "./data.js";

const item_principal = document.querySelector(".item_principal");
const itemPrincipalMenu = document.querySelector(".item_principal-menu");
const lis = document.querySelectorAll(".item_principal-menu li");

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

    if (filter) {
        const item = document.querySelectorAll(".item");
        item.forEach((i) => i.remove());
        item_principal.insertAdjacentHTML("afterend", printItem(times));
    } else {
        item_principal.insertAdjacentHTML("afterend", printItem(times));
    }
}

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

printItems();
