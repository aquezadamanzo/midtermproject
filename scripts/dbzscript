let troopText = document.querySelector("#troopText");
let characterData;

function display(character) {
    let divElement = document.createElement("div");

    let name = document.createElement("p");
    name.textContent = "Name: " + character.name;

    let race = document.createElement("p");
    race.textContent = "Race: " + character.race;

    let affiliation = document.createElement("p");
    affiliation.textContent = "Affiliation: " + character.affiliation;

    let ki = document.createElement("p");
    ki.textContent = "Ki: " + character.ki;

    let maxKi = document.createElement("p");
    maxKi.textContent = "Max Ki: " + character.maxKi;

    divElement.appendChild(name);
    divElement.appendChild(race);
    divElement.appendChild(affiliation);
    divElement.appendChild(ki);
    divElement.appendChild(maxKi);
    troopText.appendChild(divElement);
}


async function getCharacters(filterRace, filterAffiliation) {
    let url = "https://dragonball-api.com/api/characters";

    if (filterRace !== ""){
        url += "?race=" + filterRace;
    }

    if (filterAffiliation !== "" && filterAffiliation !== "All") {
        if(filterRace === ""){
            url += "?affiliation=" + filterAffiliation;
        } 
        else{
            url += "&affiliation=" + filterAffiliation;
        }
    }

    let data = await fetch(url);
    characterData = await data.json();
    console.log(characterData);
}


let affiliationFilter = document.querySelector("#affiliationFilter");
affiliationFilter.addEventListener("change", filterCharacteristics);

let raceFilter = document.querySelector("#raceFilter");
raceFilter.addEventListener("input", filterCharacteristics);

async function filterCharacteristics(){
    let filterRace = raceFilter.value.toLowerCase();
    let filterAffiliation = affiliationFilter.value;
    troopText.textContent = "";

    for(const char of filterRace){
        if(!char.match(/[a-zA-Z ]/)){
            alert("Please enter a valid race.");
            return;
        }
    }

    if(filterRace !== "" || filterAffiliation !== ""){
        await getCharacters(filterRace, filterAffiliation);

        if (Array.isArray(characterData)){
            for (let character of characterData){
                display(character);
                troopText.innerHTML += "<br>";
            }
        }
        else {
            for (let character of characterData.items){
                display(character);
                troopText.innerHTML += "<br>";
            }
        }
    }
}


let resetButton = document.querySelector("#resetButton");
resetButton.addEventListener("click", resetFunction);

function resetFunction(){
    raceFilter.value = "";
    affiliationFilter.value = "";
    troopText.textContent = "";
}

