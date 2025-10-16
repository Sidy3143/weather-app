// src/index.js
import "./styles.css";

const submitButton = document.querySelector("button");
const container = document.querySelector(".display");
const img = document.createElement("img");

submitButton.addEventListener("click", (e)=>{
    e.preventDefault();

    const input = document.getElementById("location");
    const location = input.value;
    getWeather(location);

    input.value = "";
})


function getWeather(location){
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=4W5WN5R2AHX5U55E9Q29TDF4A`)
    .then(response => {
        return response.json();
    })
    .then(data =>{
        console.log(data);

        const temperature = data.days[0].temp;
        const description = data.days[0].description;
        const humidity =  data.days[0].humidity;
        const icon = data.days[0].icon;

        displayWeather(icon, description, temperature, humidity);
        displayIcon(icon);
    })
    .catch(error => {
        console.log("Error" + error);
    })
}

function displayWeather(icon, description, temperature, humidity){
    container.classList.add("container");

    container.innerHTML = `
        <h2>${icon} Weather</h2>
        <p>${description}</p> 
        <p> <strong> Temperature: </strong> ${temperature}</p>
        <p> <strong> Humidity: </strong> ${humidity} %</p>`

}

function displayIcon(icon){
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=YsCpBnDjONGwvYZUX0zo13hJHyTrEixq&s=${icon}`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        img.src = response.data.images.original.url;
        container.appendChild(img);
    })
}