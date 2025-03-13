import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue,
    remove
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

const firebaseConfig = {
    // Copied from firebase console / build / realtime database / database reference link
    databaseURL: 'https://link-stash-2025-default-rtdb.europe-west1.firebasedatabase.app/'
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const referenceInDB = ref(database, 'leads'); // created reference in DB as leads

/* 
Pushing data

push(referenceInDB, someInput.value)
*/

console.log(database);

// --------------

// Interaction code

// let myLeads = []

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

// const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
// const tabBtn = document.getElementById("tab-btn")

/* if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
} */

/* tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
}) */

function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
                <div id='separator'></div>
            </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("click", function () {
    // localStorage.clear()
    // myLeads = []
    // render(myLeads);
    remove(referenceInDB); // clear from DB
    ulEl.innerHTML = ''; // clear from view
});

// Retrieving data
onValue(referenceInDB, function (snapshot) {
    /* console.log(snapshot.val()); // getting the object containing the values on Firebase */

    // returns true of false if the snapshot exits
    const snapshotDoesExist = snapshot.exists();

    // run code below only if the snapshot exists
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val();

        const leads = Object.values(snapshotValues);
        render(leads);
    }
});

inputBtn.addEventListener("click", function () {
    // myLeads.push(inputEl.value)

    // Pushing data to Firebase, how do we fetch/read it?
    console.log(inputEl.value);
    push(referenceInDB, inputEl.value);
    inputEl.value = "";

    // localStorage.setItem("myLeads", JSON.stringify(myLeads))
    // render(myLeads);
});