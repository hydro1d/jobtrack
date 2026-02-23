let thrivingList = [];
let strugglingList = [];
let currentStatus = "all-filter-btn";

const total = document.getElementById("total");
const thrivingCount = document.getElementById("thrivingCount");
const strugglingCount = document.getElementById("strugglingCount");

const allCardSection = document.getElementById("allCards");
const filterSection = document.getElementById("filtered-section");
const mainContainer = document.querySelector("main");
const filterCount = document.getElementById("filterCount");

function calculateCount() {

    const totalCards = document.querySelectorAll("#allCards .card").length;

    total.innerText = totalCards;
    thrivingCount.innerText = thrivingList.length;
    strugglingCount.innerText = strugglingList.length;

    // 🔥 RIGHT SIDE DYNAMIC COUNT
    if (currentStatus === "all-filter-btn") {
        filterCount.innerText = `${totalCards} jobs`;
    } 
    else if (currentStatus === "thriving-filter-btn") {
        filterCount.innerText = `${thrivingList.length} jobs`;
    } 
    else if (currentStatus === "struggling-filter-btn") {
        filterCount.innerText = `${strugglingList.length} jobs`;
    }
}

calculateCount();


// FILTER

function toggleStyle(id) {

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("bg-blue-600", "text-white");
        btn.classList.add("bg-gray-200", "text-black");
    });

    const selected = document.getElementById(id);
    selected.classList.remove("bg-gray-200", "text-black");
    selected.classList.add("bg-blue-600", "text-white");

    currentStatus = id;

    if (id === "all-filter-btn") {
        allCardSection.classList.remove("hidden");
        filterSection.classList.add("hidden");
    }
    else if (id === "thriving-filter-btn") {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderList(thrivingList);
    }
    else {
        allCardSection.classList.add("hidden");
        filterSection.classList.remove("hidden");
        renderList(strugglingList);
    }
    calculateCount();
}


// EVENT DELEGATION 

mainContainer.addEventListener("click", function (event) {

    const card = event.target.closest(".card");
    if (!card) return;

    const id = card.dataset.id; // 🔥 UNIQUE ID
    const plantName = card.querySelector(".plantName").innerText;
    const light = card.querySelector(".light").innerText;
    const water = card.querySelector(".water").innerText;
    const notes = card.querySelector(".notes").innerText;
    const statusElement = card.querySelector(".status");

    // INTERVIEW
    if (event.target.classList.contains("thriving-btn")) {

        statusElement.innerText = "Interview";
        statusElement.className = "status text-green-600 font-semibold";

        const cardInfo = { id, plantName, light, water, notes, status: "Interview" };

        if (!thrivingList.find(item => item.id === id)) {
            thrivingList.push(cardInfo);
        }

        strugglingList = strugglingList.filter(item => item.id !== id);

        calculateCount();
        if (currentStatus === "thriving-filter-btn") renderList(thrivingList);
        if (currentStatus === "struggling-filter-btn") renderList(strugglingList);
    }

    // REJECTED
    if (event.target.classList.contains("struggling-btn")) {

        statusElement.innerText = "Rejected";
        statusElement.className = "status text-red-600 font-semibold";

        const cardInfo = { id, plantName, light, water, notes, status: "Rejected" };

        if (!strugglingList.find(item => item.id === id)) {
            strugglingList.push(cardInfo);
        }

        thrivingList = thrivingList.filter(item => item.id !== id);

        calculateCount();
        if (currentStatus === "thriving-filter-btn") renderList(thrivingList);
        if (currentStatus === "struggling-filter-btn") renderList(strugglingList);
    }

    //delete
    if (event.target.classList.contains("btn-delete")) {

        const id = card.dataset.id;

        card.remove();

        thrivingList = thrivingList.filter(item => item.id !== id);
        strugglingList = strugglingList.filter(item => item.id !== id);

        calculateCount();

        if (currentStatus === "thriving-filter-btn") renderList(thrivingList);
        if (currentStatus === "struggling-filter-btn") renderList(strugglingList);
    }

});


// RENDER FUNCTION 

function renderList(list) {

    filterSection.innerHTML = "";

    if (list.length === 0) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "bg-white shadow rounded-xl p-10 text-center";

        emptyDiv.innerHTML = `
            <p class="text-2xl font-semibold text-gray-500">
                No Applications Found
            </p>
            <p class="text-gray-400 mt-2">
                You don’t have any ${currentStatus === "thriving-filter-btn" ? "Interview" : "Rejected"} applications yet.
            </p>
        `;

        filterSection.appendChild(emptyDiv);
        return;
    }

    list.forEach(item => {

        const div = document.createElement("div");

        div.className = "card flex justify-between bg-white shadow p-8 rounded-xl";
        div.setAttribute("data-id", item.id); // ID add

        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <p class="plantName text-2xl font-semibold">${item.plantName}</p>
                    <p class="latinName text-gray-500">Company</p>
                </div>

                <div class="flex gap-2">
                    <p class="light bg-gray-100 px-4 py-1 rounded">${item.light}</p>
                    <p class="water bg-gray-100 px-4 py-1 rounded">${item.water}</p>
                </div>

                <p class="status ${
                    item.status === "Interview"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                }">
                    ${item.status}
                </p>

                <p class="notes text-gray-400">${item.notes}</p>

                <div class="flex gap-4">
                    <button class="thriving-btn bg-green-500 text-white px-4 py-2 rounded-md">
                        Interview
                    </button>
                    <button class="struggling-btn bg-red-500 text-white px-4 py-2 rounded-md">
                        Rejected
                    </button>
                </div>
            </div>

            <div>
                <button class="btn-delete bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition">
                    Delete
                </button>
            </div>
        `;

        filterSection.appendChild(div);
    });
}