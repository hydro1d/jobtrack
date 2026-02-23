let interviewList = [];
let rejectedList = [];
let activeFilterId = "all-filter-btn";

const totalCountEl = document.getElementById("total");
const interviewCountEl = document.getElementById("thrivingCount");
const rejectedCountEl = document.getElementById("strugglingCount");

const allCardsSection = document.getElementById("allCards");
const filteredSectionEl = document.getElementById("filtered-section");
const mainEl = document.querySelector("main");
const filterCountEl = document.getElementById("filterCount");

function calculateCount() {

    const totalCards = document.querySelectorAll("#allCards .card").length;

    totalCountEl.innerText = totalCards;
    interviewCountEl.innerText = interviewList.length;
    rejectedCountEl.innerText = rejectedList.length;

    //  RIGHT SIDE DYNAMIC COUNT
    if (activeFilterId === "all-filter-btn") {
        filterCountEl.innerText = `${totalCards} jobs`;
    }
    else if (activeFilterId === "thriving-filter-btn") {
        filterCountEl.innerText = `${interviewList.length} jobs`;
    }
    else if (activeFilterId === "struggling-filter-btn") {
        filterCountEl.innerText = `${rejectedList.length} jobs`;
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

    activeFilterId = id;

    if (id === "all-filter-btn") {
        allCardsSection.classList.remove("hidden");
        filteredSectionEl.classList.add("hidden");
    }
    else if (id === "thriving-filter-btn") {
        allCardsSection.classList.add("hidden");
        filteredSectionEl.classList.remove("hidden");
        renderList(interviewList);
    }
    else {
        allCardsSection.classList.add("hidden");
        filteredSectionEl.classList.remove("hidden");
        renderList(rejectedList);
    }
    calculateCount();
}


// EVENT DELEGATION 

mainEl.addEventListener("click", function (event) {

    const card = event.target.closest(".card");
    if (!card) return;

    const id = card.dataset.id; // UNIQUE ID
    const companyName = card.querySelector(".companyName").innerText;
    const jobTitle = card.querySelector(".jobTitle").innerText;
    const location = card.querySelector(".location").innerText;
    const employmentType = card.querySelector(".employmentType").innerText;
    const description = card.querySelector(".description").innerText;
    const salaryRange = card.querySelector(".salaryRange").innerText;
    const statusElement = card.querySelector(".status");

    // INTERVIEW
    if (event.target.classList.contains("thriving-btn")) {

        statusElement.innerText = "Interview";
        statusElement.className = "status text-green-600 font-semibold";

        const cardInfo = { id, companyName, jobTitle, location, employmentType, salaryRange, description, status: "Interview" };

        if (!interviewList.find(item => item.id === id)) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.id !== id);

        calculateCount();
        if (activeFilterId === "thriving-filter-btn") renderList(interviewList);
        if (activeFilterId === "struggling-filter-btn") renderList(rejectedList);
    }

    // REJECTED
    if (event.target.classList.contains("struggling-btn")) {

        statusElement.innerText = "Rejected";
        statusElement.className = "status text-red-600 font-semibold";

        const cardInfo = { id, companyName, jobTitle, location, employmentType, salaryRange, description, status: "Rejected" };

        if (!rejectedList.find(item => item.id === id)) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.id !== id);

        calculateCount();
        if (activeFilterId === "thriving-filter-btn") renderList(interviewList);
        if (activeFilterId === "struggling-filter-btn") renderList(rejectedList);
    }

    //delete
    if (event.target.classList.contains("btn-delete")) {

        const id = card.dataset.id;

        card.remove();

        interviewList = interviewList.filter(item => item.id !== id);
        rejectedList = rejectedList.filter(item => item.id !== id);

        calculateCount();

        if (activeFilterId === "thriving-filter-btn") renderList(interviewList);
        if (activeFilterId === "struggling-filter-btn") renderList(rejectedList);
    }

});


// RENDER FUNCTION 

function renderList(list) {

    filteredSectionEl.innerHTML = "";

    if (list.length === 0) {
        const emptyDiv = document.createElement("div");
        emptyDiv.className = "bg-white shadow rounded-xl p-10 text-center";

        emptyDiv.innerHTML = `
            <div class="flex justify-center"> 
                    <img src="images/assignment_7959593 1.png" alt=""> </div>
                </div>
            <p class="text-2xl font-semibold text-gray-500">
                No Applications Found
            </p>
            <p class="text-gray-400 mt-2">
                You don’t have any ${activeFilterId === "thriving-filter-btn" ? "Interview" : "Rejected"} applications yet.
            </p>
        `;

        filteredSectionEl.appendChild(emptyDiv);
        return;
    }

    list.forEach(item => {

        const div = document.createElement("div");

        div.className = "card flex flex-col md:flex-row justify-between bg-white shadow p-6 md:p-8 rounded-xl hover:shadow-lg transition";
        div.setAttribute("data-id", item.id); // ID add

        div.innerHTML = `
            <div class="space-y-4">
                <div>
                    <p class="companyName text-2xl font-semibold">${item.companyName}</p>
                    <p class="jobTitle text-gray-500">${item.jobTitle}</p>
                </div>

                <div class="flex gap-2">
                    <p class="location bg-gray-100 px-4 py-1 rounded">${item.location}</p>
                    <p class="employmentType bg-gray-100 px-4 py-1 rounded">${item.employmentType}</p>
                    <p class="salaryRange bg-gray-100 px-4 py-1 rounded">${item.salaryRange}</p>
                </div>

                <p class="status ${item.status === "Interview"
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }">
                    ${item.status}
                </p>

                <p class="description text-gray-400">${item.description}</p>

                <div class="flex gap-4">
                    <button class="thriving-btn bg-green-500 text-white px-4 py-2 rounded-md hover:opacity-80 transition">
                        Interview
                    </button>
                    <button class="struggling-btn bg-red-500 text-white px-4 py-2 rounded-md hover:opacity-80 transition">
                        Rejected
                    </button>
            </div>
            <div class="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                <button class="btn-delete bg-red-100 text-red-600 px-4 py-2 rounded-md hover:bg-red-200 transition">
                Delete
                </button>
            </div>
        `;

        filteredSectionEl.appendChild(div);
    });
}