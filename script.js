
let weather = {
    apiKey:"6573e3a562dfc5da210cc154ba77437b",  //d4df0cddf27a227053c1a99fea8082a7
    fetchWeather: function(city)
    {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            +city +
            "&units=metric&appid="
            +this.apiKey
            )
        .then((response)=> response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data)
    {
        const { name }= data;
        const { icon,description}= data.weather[0];
        const { temp,humidity}= data.main;
        const wind = data.wind.speed;
        document.querySelector(".city").innerHTML= "Weather in "+name;
        document.querySelector(".temp").innerText= temp + "°C";
        document.querySelector(".icon").src= "https://openweathermap.org/img/wn/" + icon +".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".humidity").innerHTML= "Humidity: "+humidity+ "%";
        document.querySelector(".wind").innerHTML = "Wind Speed: "+ wind + "km/h";
    },
    search: function(){
       this.fetchWeather(document.querySelector(".search-bar").value);
    },
};
document.querySelector(".search button")
.addEventListener("click", function(){
    weather.search();
});
document.querySelector(".search-bar")
.addEventListener("keyup", function(event) {
    if (event.key == "Enter"){
        weather.search();
    }
});