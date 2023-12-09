document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();
    showWarning(``);
    let input = document.querySelector('#searchInput').value;
    if (input !== '') {
        showWarning(`Carregando...`);
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=24b34e9a45ee4007200b71ee3eb5b460&units=metric&lang=pt_br`;

    let results = await fetch(url);
    let json = await results.json();

    if(json.cod === 200) {
        showWarning(``);
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        })
    } else {
        document.querySelector('.resultado').style.display = "none";
        showWarning(`Localização não encontrada.`);
    }
});

function showInfo(json) {
    document.querySelector('.resultado').style.display = "block";
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').setAttribute('style', `transform: rotate(${json.windAngle-90}deg)`);
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}
