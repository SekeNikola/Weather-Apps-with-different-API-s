window.onload = () => {

    function getLocation() {
        if (navigator.geolocation) {
            var showPosition = function (position) {
                updateByGeo(position.coords.latitude, position.coords.longitude);
            };
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }
    getLocation()

    function updateByGeo(lat, lon) {
        let AppID = '2172797&appid=8fe3ad3bbb7be5102e0bde65ce9a7ac3';
        var url = "https://api.openweathermap.org/data/2.5/weather?" + "lat=" + lat + "&lon=" + lon + "&id=" + AppID + "&units=metric";
        fetch(url)
            .then(res => res.json())
            .then((data) => {

                // Place data in HTML
                let id = data.weather[0].id
                document.getElementById('img').innerHTML = `<img><i class="wi wi-owm-${id}"></i>`

                let city = data.name
                document.getElementById('city').innerHTML = city

                let temp = Math.round(data.main.temp);
                document.getElementById('temp').innerHTML = temp + '&deg'

                let description = data.weather[0].main
                document.getElementById('weather').innerHTML = description

            })

            // 5 days forecast (Open weather free does not give you true 5 days, you must pay for that feture)
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=44.786567999999995&lon=20.4489216&id=2172797&appid=8fe3ad3bbb7be5102e0bde65ce9a7ac3&units=metric&cnt=5`)
            .then(res => res.json())
            .then((data) => {

                let output = '';

                data.list.forEach(day => {
                    output += `<div class="day">
                               <div class="max">${Math.round(day.main.temp)}&deg</div>
                               <i class="wi wi-owm-${day.weather[0].id}"></i>
                               <div>${day.weather[0].description}&deg</div>
                               </div>`
                });
                document.getElementById('days').innerHTML = output;

            })


    }


    // var days = document.getElementsByTagName('.day')
    // var weekday = new Array(7);

    // weekday[0] = "Monday";
    // weekday[1] = "Tuesday";
    // weekday[2] = "Wednesday";
    // weekday[3] = "Thursday";
    // weekday[4] = "Friday";
    // weekday[5] = "Saturday";
    // weekday[6] = "Sunday";
    // for(var i = 0; i<weekday.length; i++){
    //     var newDiv = document.createElement('div');
    //     days[i].appendChild(newDiv);
    //     newDiv.appendChild(days)
    // }

    updateByGeo()
}