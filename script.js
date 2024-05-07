"use strict"
document.getElementById("search-button").addEventListener("click", consultarAPI);

function consultarAPI() {
    let xhr, city, apiKey, url;

    city = document.getElementById("place-input").value;
    apiKey = "f946f8ff489c1ad9d8a33772f9ad828f";
    url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric";
    
    xhr = new XMLHttpRequest();
    xhr.onload = function() {
        mostrarInformacion(this);
    }
    xhr.open("GET", url);
    xhr.send();
}

function mostrarInformacion(xhr) {
    let obj, city, temp, weatherDescription, weatherIcon, country, html;
    obj = JSON.parse(xhr.responseText);
    city = obj.name;
    temp = String(Math.round(obj.main.temp));
    weatherDescription = obj.weather[0].description;
    weatherIcon = obj.weather[0].icon;
    country = obj.sys.country;
    html =
    '<div class="card">' +
        '<h2 class="city-name">' + city + '<sup>' + country + '</sup></h2>' +
        '<p class="city-temp">' + temp +'<sup>ºC</sup></p>' +
        '<figure>' +
            '<img src="https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png" alt="">' +
            '<figcaption>' + weatherDescription + '</figcaption>' +
        '</figure>' +
    '</div>';

    document.getElementById("cards").innerHTML += html;
    document.getElementById("place-input").value = "";
}