async function GetDogBreeds() {
    try {
        let dog_breed_results = await fetch("https://dogapi.dog/api/v2/breeds?page[size]=300");

        let dog_breed_data = await dog_breed_results.json();

        return dog_breed_data.data;
    } catch (error) {
        let results = document.querySelector("#dog_breed_text_input_results");
        results.innerHTML = "";

        let error_message = document.createElement("p");
        error_message.textContent = "There was an error getting the data.";

        results.append(error_message);

        return;
    }
}

function DisplayDogBreedResults(array) {
    let results = document.querySelector("#dog_breed_text_input_results");
    results.innerHTML = "";

    for (let i = 0; i < array.length; i++) {
        let dog_name = array[i].attributes.name;
        let dog_description = array[i].attributes.description;
        let dog_life = array[i].attributes.life;
        let dog_male_weight = array[i].attributes.male_weight;
        let dog_female_weight = array[i].attributes.female_weight;
        let dog_hypoallergenic = array[i].attributes.hypoallergenic;

        let dog_card = document.createElement("div");
        dog_card.className = "dog_card";

        let name = document.createElement("h3");
        name.textContent = dog_name;

        let description = document.createElement("p");
        description.textContent = dog_description;

        let life = document.createElement("p");
        life.textContent = `Life Span: ${dog_life.min} - ${dog_life.max} Years`;

        let male_weight = document.createElement("p");
        male_weight.textContent = `Male Weight: ${dog_male_weight.min} - ${dog_male_weight.max} Pounds`;

        let female_weight = document.createElement("p");
        female_weight.textContent = `Female Weight: ${dog_female_weight.min} - ${dog_female_weight.max} Pounds`;

        let hypoallergenic = document.createElement("p");

        if (dog_hypoallergenic == true) {
            hypoallergenic.textContent = "Hypoallergenic: Yes";
        } else {
            hypoallergenic.textContent = "Hypoallergenic: No";
        }

        dog_card.append(name);
        dog_card.append(description);
        dog_card.append(life);
        dog_card.append(male_weight);
        dog_card.append(female_weight);
        dog_card.append(hypoallergenic);

        results.append(dog_card);
    }
}

let search_number = 0;

async function DisplayFilteredDogBreedResults() {
    let dog_filter = document.querySelector("#dog_breed_text_input").value.toLowerCase();

    let hypoallergenic_filter = document.querySelector("#hypoallergenic_input").checked;

    let validation_message = document.querySelector("#validation_message");
    validation_message.textContent = "";

    if (dog_filter.length >= 20) {
        validation_message.textContent = "CANNOT BE 30 OR MORE CHARACTERS LONG";
        DisplayDogBreedResults([]);
        return;
    }

    if (/\d/.test(dog_filter)) {
        validation_message.textContent = "NO NUMBERS";
        DisplayDogBreedResults([]);
        return;
    }

    if (dog_filter == "" & hypoallergenic_filter == false) {
        DisplayDogBreedResults([]);
        return;
    }

    let dog_breeds = await GetDogBreeds();

    if (dog_breeds == null) {
        return;
    }

    let filtered_dog_breeds = [];

    for (let i = 0; i < dog_breeds.length; i++) {
        let dog_name = dog_breeds[i].attributes.name.toLowerCase();
        let dog_hypoallergenic = dog_breeds[i].attributes.hypoallergenic;

        let name_match = dog_name.includes(dog_filter);
        let hypoallergenic_match = hypoallergenic_filter == false || dog_hypoallergenic == true;

        if (name_match && hypoallergenic_match) {
            filtered_dog_breeds.push(dog_breeds[i]);
        }
    }

    DisplayDogBreedResults(filtered_dog_breeds);
}

function ResetFilters() {
    document.querySelector("#dog_breed_text_input").value = "";
    document.querySelector("#hypoallergenic_input").checked = false;
    document.querySelector("#validation_message").textContent = "";
    document.querySelector("#dog_breed_text_input_results").innerHTML = "";
}

document.querySelector("#dog_breed_text_input").addEventListener("input", DisplayFilteredDogBreedResults);
document.querySelector("#hypoallergenic_input").addEventListener("change", DisplayFilteredDogBreedResults);
document.querySelector("#reset_button").addEventListener("click", ResetFilters);

window.addEventListener("pageshow", ResetFilters);
