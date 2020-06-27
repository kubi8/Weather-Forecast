//robie obiekt z kluczem api oraz adresem witryny api
const api = {
    key: '98dcddfc3a5150a4fe79aa35b9fe2e4e',
    baseURL: 'https://api.openweathermap.org/data/2.5/'
}

//formularz
const search = document.querySelector('#form');
search.addEventListener('submit', ()=>{

    const place = document.querySelector('#place');
    event.preventDefault();

    city = place.value;

    //jesli nic nie jest wpisane return zakancza dzialanie programu
    if (city == false) return

        //wywoluje funkcje szukajaca miejscowosci
    getResult(city);

    //czyszcze inputa po wywolaniu danych
    place.value = '';

    
})

    //w warunku funkcji podaje dowolne slowo ktore bedzie przedstawialo slowo wpisane w inpucie
getResult =(myAsk)=> {

    fetch(`${api.baseURL}weather?q=${myAsk}&units=metric&APPID=${api.key}`)
    .then(response => {
        return response.json()
    })
    .then(displayResult)
};
    //przenosze w warunku do tej funkcji response inaczej w tej funkcji bylaby niewidoczna
displayResult =(response)=> {

        // tutaj przegládam dostepne dane
    console.log(response);

    const locality = document.querySelector('#show-place');
    locality.innerHTML = `${response.name}, ${response.sys.country}`;

    //tutaj tworze zmienna z nazwa miejsca pobrana z api i wywoluje funkcje z nazwa w warunku zapisujaca w ls ta wlasnie nazwe
    // const localityToLS = document.querySelector('')
    // saveToLS(locality);

    //ikonka pogodowa
    const icon = document.querySelector('#weather-icon');
    icon.innerHTML = `<img src='./img/${response.weather[0].icon}.png'> `;
    console.log(icon.innerHTML);
    //strona z kodami pogodowymi
    // https://openweathermap.org/weather-conditions
    // biore linka stamtad z dostepem do ikonek a w miejscu nazwy pliku wstawiam ten ciag


    //pobieram aktualna date uzywajac do tego funkcji dateBuilder stworzonej nizej
    // const now = new Date();
    // const actualDate = document.querySelector('#date');
    // actualDate.innerHTML = dataBuilder(now);

    //temperatura
    const temperature = document.querySelector('#degree');
    getTemp = `${Math.round(response.main.temp)} `;
    temperature.innerHTML = getTemp;
    console.log(getTemp);


    // wzor na przeliczenie temperatury z celcuisza na farenheta
    // (°C x 9/5) + 32 = °F
    let fahrenheit = (getTemp * (9 / 5) + 32);
    console.log(fahrenheit);

    //temperatura imnimalna i maksymalna
    const min = document.querySelector('#min-res');
    const max = document.querySelector('#max-res');
    getTempMin = `${Math.round(response.main.temp_min)}`;
    getTempMax = `${Math.round(response.main.temp_max)}`;
    min.innerHTML = getTempMin;
    max.innerHTML = getTempMax;

    let fahrenheitMin = (getTempMin * (9 / 5) + 32);
    let fahrenheitMax = (getTempMax * (9 / 5) + 32);

    // temperatura odczuwalna
    const feels = document.querySelector('#feels');
    tempLike = `${Math.round(response.main.feels_like)} `;
    getTempLike = `${tempLike} ${'<span class="temp-span" id="like-scale"> C</span>'}`
    feels.innerHTML = getTempLike;
    console.log(tempLike);
    
    console.log(getTempLike);

    let fahrenheitLike = (tempLike * (9 / 5) + 32);

    // sila wiatru
    const windSpeed = document.querySelector('#wind');
    windKm = `${Math.round(response.wind.speed)}`;
    getWindKm = `${windKm} ${'<span class="wind-span" id="unit"> m/s</span>'}`
    windSpeed.innerHTML = getWindKm;

    // [ilość kilometrów] / 1.61 = [ilość mil]

    let windMile = (windKm / 1.61);
    console.log(windMile);


    temperature.addEventListener('click', ()=>{

        let changeScale = document.querySelector('#scale');

        let minScale = document.querySelector('#min-scale');
        let maxScale = document.querySelector('#max-scale');
        // let likescale = document.querySelector('#like-scale');

        let unit = document.querySelector('#unit');
        // let wind = document.querySelector('#wind');
        // console.log(changeScale);
        
        if (changeScale.textContent === 'C') {
            changeScale.textContent = 'F';
            minScale.textContent = 'F';
            maxScale.textContent = 'F';
            // likescale.textContent = 'F';
            // unit.textContent = ' m/h';
            temperature.innerHTML = Math.round(fahrenheit);
            min.innerHTML = Math.round(fahrenheitMin);
            max.innerHTML = Math.round(fahrenheitMax);
            feels.innerHTML = Math.round(fahrenheitLike) + '<span class="fahr">F</span>';
            windSpeed.innerHTML = Math.round(windMile) + '<span class="wind-span" id="unit"> y/s</span>';
        } else {
            changeScale.textContent = 'C';
            minScale.textContent = 'C';
            maxScale.textContent = 'C';
            // likescale.textContent = 'C';
            // unit.textContent = ' km/h';
            temperature.innerHTML = getTemp;
            min.innerHTML = getTempMin;
            max.innerHTML = getTempMax;
            feels.innerHTML= getTempLike;
            windSpeed.innerHTML = getWindKm;
        }

        //celowo zostawiam w tej wersji konkatenacje zeby pamietac o drugim sposobie laczenia, w wersji wyjsciowej zamieniam na grawis
    });

    // opis pogody
    const description = document.querySelector('#conditions');
    description.innerHTML = `${response.weather[0].description}`;

    // cisnienie
    const pressure = document.querySelector('#pressure');
    pressure.innerHTML = `${response.main.pressure}`;

    // wilgotnosc
    const humidity = document.querySelector('#humidity');
    humidity.innerHTML = `${response.main.humidity} ${'<span class="percent">%</span>'}`;

    // zachmurzenie
    const cover = document.querySelector('#cover');
    coverDescription = `${response.clouds.all}`;
    console.log(coverDescription);
    
    if (coverDescription <= 15) {
        cover.innerHTML = 'no clouds';
    } else if (coverDescription > 15 && coverDescription <= 40) {
        cover.innerHTML = 'partly';
    } else if (coverDescription > 40 && coverDescription <= 65) {
        cover.innerHTML = 'cloudy';
    } else if (coverDescription > 65 && coverDescription <= 90) {
        cover.innerHTML = 'very cloudy';
    } else {
        cover.innerHTML = 'full';
    }


    // kierunek wiatru
    const windDirection = document.querySelector('#wind-deg');
    windDeg = `${response.wind.deg}`;
    console.log(windDeg);

    if (windDeg >= 337 && windDeg < 22) {
        windDirection.innerHTML = 'north';
    } else if (windDeg >= 22 && windDeg < 67) {
        windDirection.innerHTML = 'north-east';
    } else if (windDeg >= 67 && windDeg < 112) {
        windDirection.innerHTML = 'east';
    } else if (windDeg >= 112 && windDeg < 157) {
        windDirection.innerHTML = 'south-east';
    } else if (windDeg >= 157 && windDeg < 202) {
        windDirection.innerHTML = 'south';
    } else if (windDeg >= 202 && windDeg < 247) {
        windDirection.innerHTML = 'south-west';
    } else if (windDeg >= 247 && windDeg < 292) {
        windDirection.innerHTML = 'west';
    } else {
        windDirection.innerHTML = 'north-west';
    }



    // wschod i zachod slonca

    const sunrise = document.querySelector('#sunrise');
    const sunset = document.querySelector('#sunset');

    const timezone = `${response.timezone}`;
    const time = Number(new Date().getTimezoneOffset() * 60) + Number(timezone);

    const getSunrise = `${response.sys.sunrise}`;
    const setSunrise = Number(getSunrise) + Number(time);
    const resultSunrise = new Date(setSunrise * 1000).toLocaleTimeString();

    const getSunset = `${response.sys.sunset}`;
    const setSunset = Number(getSunset) + Number(time);
    const resultSunset = new Date(setSunset * 1000).toLocaleTimeString();

    sunrise.innerHTML = resultSunrise;
    sunset.innerHTML = resultSunset;
}

presentDate =()=> {

    //skrypt generujacy date wspolpracujay z wywolaniem wpisanym wyzej
    dataBuilder =(myDate)=> {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[myDate.getDay()];
    const date = myDate.getDate();
    const month = months[myDate.getMonth()];
    const year = myDate.getFullYear();

    return `${day}, ${date} ${month} ${year}`
    }

    const now = new Date();
    const actualDate = document.querySelector('#date');
    actualDate.innerHTML = dataBuilder(now);
}
presentDate();