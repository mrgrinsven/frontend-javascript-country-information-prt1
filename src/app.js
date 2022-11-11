import axios from 'axios';

console.log('Hallo daar!');

// Reference naar country-list
const countryList = document.getElementById('country-list');

// Functie die een region verwacht en de juiste kleur-naam-attribuut geeft voor de naam van het land
function countryColor (region) {
    if (region === 'Africa') {
        return 'africa country-name';
    } else if (region === 'Americas') {
        return 'americas country-name';
    } else if (region === 'Asia') {
        return 'asia country-name';
    } else if (region === 'Europe') {
        return 'europe country-name';
    } else if (region === 'Oceania') {
        return 'oceania country-name';
    } else {
        return 'other country-name';
    }
}

// Asynchrone functie om informatie over alle landen op te halen en weer te geven
(async () => {
    const URI = 'https://restcountries.com/v2/';
    const ALL = 'all';
    try {
        // Informatie ophalen met axios
        const result = await axios.get(URI + ALL);
        console.log(result);

        // Lijst leeg maken bij aanvang
        countryList.replaceChildren();

        // Lijst sorteren op populatie
        const sortedResult = result.data.slice().sort((a, b) => a.population - b.population);
        console.log(sortedResult);

        // Gesorteerdelijst mappen en de benodigde elementen creeren en appenden
        sortedResult.map((country) => {
            // Elementen creeren
            const countryListItem = document.createElement('li');
            const countryFlagImage = document.createElement('img');
            const countryNameItem = document.createElement('p');
            const populationCount = document.createElement('p');

            // Atributen toewijzen
            countryNameItem.setAttribute('class', `${countryColor(country.region)}`);
            countryFlagImage.setAttribute('src', `${country.flag}`);
            populationCount.setAttribute('class', 'population-count');

            // Text toewijzen aan de benodigde elementen
            countryNameItem.textContent = country.name;
            populationCount.textContent = `Has a population of ${country.population} people`;

            // Gecreerde elementen aan het juiste element toevoegen
            countryListItem.appendChild(countryFlagImage);
            countryListItem.appendChild(countryNameItem);
            countryListItem.appendChild(populationCount);
            countryList.appendChild(countryListItem);
        });

    } catch(error) {
        // Error loggen
        console.error(error);

        // Error weergeven op het scherm
        const errorMessage = document.getElementById( "error-message" );

        if (error.response.status === 404) {
            errorMessage.textContent = "Page Not Found | 404";
        }
        if (error.response.status === 500) {
            errorMessage.textContent = "Internal Server Error | 500";
        }
    }
})()



