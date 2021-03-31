const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

console.log(forecast);

const updateUI = (data) =>{
    // console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;
    //destructuring 
    const{ cityDets, weather } = data;

    //update details in html

    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5> 
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Imperial.Value}</span>
            <span>&deg;F</span>
        </div>
    `;
    //night and day, weather icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);

    
    //ternary operator practice ahead
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    // if(weather.IsDayTime){
    //   timeSrc = 'img/day.svg';
    // } else {
    //   timeSrc = 'img/night.svg';
    // }
    time.setAttribute('src', timeSrc);


    //remove d-none class if present. it will be present at first
    if (card.classList.contains('d-none')){
        card.classList.remove('d-none');
    };
};

cityForm.addEventListener('submit', e=>{
    //prevent default
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update UI with new city
    forecast.updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

    //set local storage
    localStorage.setItem('location', city);

});

if (localStorage.getItem('location')){
    forecast.updateCity(localStorage.getItem('location'))
        .then(data => updateUI(data))
        .catch(err =>console.log(err));
}
