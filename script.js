let thrivingList = [];
let strugglingList = [];
let currentStatus = "all";

const total = document.getElementById("total");
const thrivingCount = document.getElementById("thrivingCount");
const strugglingCount = document.getElementById("strugglingCount");

const allCardSection = document.getElementById("allCards");
const filterSection = document.getElementById("filtered-section");
const mainContainer = document.querySelector("main");

function calculateCount() {
    total.innerText = document.querySelectorAll("#allCards .card").length;
    thrivingCount.innerText = thrivingList.length;
    strugglingCount.innerText = strugglingList.length;
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
}


// EVENT DELEGATION 

mainContainer.addEventListener("click", function (event) {

    const card = event.target.closest(".card");
    if (!card) return;

    const plantName = card.querySelector(".plantName").innerText;
    const light = card.querySelector(".light").innerText;
    const water = card.querySelector(".water").innerText;
    const notes = card.querySelector(".notes").innerText;
    const statusElement = card.querySelector(".status");

    // INTERVIEW
    if (event.target.classList.contains("thriving-btn")) {

        statusElement.innerText = "Interview";
        statusElement.className = "status text-green-600 font-semibold";

        const cardInfo = { plantName, light, water, notes, status: "Interview" };

        if (!thrivingList.find(item => item.plantName === plantName)) {
            thrivingList.push(cardInfo);
        }

        strugglingList = strugglingList.filter(item => item.plantName !== plantName);

        if (currentStatus === "struggling-filter-btn") {
            renderList(strugglingList);
        }

        calculateCount();
    }

    // REJECTED
    if (event.target.classList.contains("struggling-btn")) {

        statusElement.innerText = "Rejected";
        statusElement.className = "status text-red-600 font-semibold";

        const cardInfo = { plantName, light, water, notes, status: "Rejected" };

        if (!strugglingList.find(item => item.plantName === plantName)) {
            strugglingList.push(cardInfo);
        }

        thrivingList = thrivingList.filter(item => item.plantName !== plantName);

        if (currentStatus === "thriving-filter-btn") {
            renderList(thrivingList);
        }

        calculateCount();
    }

    // DELETE
    if (event.target.classList.contains("btn-delete")) {

        card.remove();

        thrivingList = thrivingList.filter(item => item.plantName !== plantName);
        strugglingList = strugglingList.filter(item => item.plantName !== plantName);

        calculateCount();

        if (currentStatus === "thriving-filter-btn") {
            renderList(thrivingList);
        }

        if (currentStatus === "struggling-filter-btn") {
            renderList(strugglingList);
        }
    }
});


// RENDER FUNCTION 

function renderList(list) {

    filterSection.innerHTML = "";

    if (list.length === 0) {

        const emptyDiv = document.createElement("div");
        emptyDiv.className = "bg-white shadow rounded-xl p-10 text-center";

        emptyDiv.innerHTML = `
            
            <div class="flex justify-center">
             <img  src="images/assignment_7959593 1.png" alt="">
            </div>
             <p class="text-2xl font-semibold text-gray-500">
                No jobs available
            </p>
            <p class="text-gray-400 mt-2">
                Check back soon for new job opportunities.
            </p>
        `;

        filterSection.appendChild(emptyDiv);
        return; //important
    }


    list.forEach(item => {

        const div = document.createElement("div");
        div.className = "card flex justify-between bg-white shadow p-8 rounded-xl";

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
                <button class="btn-delete bg-red-100 text-red-600 px-4 py-2 rounded-md">
                    Delete
                </button>
            </div>
        `;

        filterSection.appendChild(div);
    });
}