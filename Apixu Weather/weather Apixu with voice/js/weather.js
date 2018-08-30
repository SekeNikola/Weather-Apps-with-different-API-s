window.onload = () => {

    if (navigator.geolocation.getCurrentPosition) {

        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            AppID = '2aecabece53e4e30848222050180507';

            // Fetch data from API
            fetch(`https://api.apixu.com/v1/current.json?key=${AppID}&q=${lat},${lon}`)

                .then(res => res.json())
                .then((data) => {

                    // Place data in HTML
                    let weather = data.current.condition.icon
                    document.getElementById('img').src = weather

                    let condition = data.current.condition.text
                    document.getElementById('condition').innerHTML = condition

                    let temp = Math.round(data.current.temp_c);
                    document.getElementById('temp').innerHTML = temp + '&deg'

                    let city = data.location.name
                    document.getElementById('city').innerHTML = city

                    let msg = new SpeechSynthesisUtterance(`Current weather in ${city} is ${temp} degrees. ${condition}`)
                    window.speechSynthesis.speak(msg)

                    // 5 days forecast
                    fetch(`https://api.apixu.com/v1/forecast.json?key=${AppID}&q=${lat},${lon}&days=5`)
                        .then(res => res.json())
                        .then(data => {

                            // Place data in HTML

                            let output = ''
                            data.forecast.forecastday.forEach(day => {
                                // let date = new Date(day.dt * 1000);
                                // let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
                                // let name = days[date.getDay()];
                                output += `<div class="day">
                                        <div class="date">${day.date}</div>
                                        <div class="max">${Math.round(day.day.maxtemp_c)}&deg</div>
                                        <img class="icon" src="${day.day.condition.icon}">
                                        <div class="description">${day.day.condition.text}</div>
                                        <div class="min">${Math.round(day.day.mintemp_c)}&deg</div>
                                    </div>`
                            });
                            document.getElementById('days').innerHTML = output;
                        })


                })
        });
    }
}