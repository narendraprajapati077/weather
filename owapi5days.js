let dname;
let icon;
let min;
let max;
let description;
let date;
let day;
let humidity;
let wind;
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


let weather = {
    getcord:function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
                + city +
                "&units=metric&appid=6573e3a562dfc5da210cc154ba77437b"
        ).then(res => res.json())
        .then(data=>{
            console.log(city);
            
            document.querySelector(".cityn").innerText= "Weather at "+city.toUpperCase()+" for five days"; 
            this.fetchWeather(data.coord.lat,data.coord.lon);
        })
    },
    fetchWeather: function(latitude,longitude)
    {
        fetch(
            "https://api.openweathermap.org/data/2.5/onecall?lat="
            +latitude+
            "&lon="
            +longitude+
            "&exclude=hourly&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74"
            )
        .then((response)=> response.json())
        .then((data)=>this.displayWeather(data));
    },
    displayWeather: function(data){
        
        
        for(i=0;i<5;i++){
            const unix_timestamp=data.daily[i].dt;
            date = new Date(unix_timestamp * 1000);
            day = date.getDay();
            icon=data.daily[i].weather[0].icon;
            description=data.daily[i].weather[0].description;
            min=data.daily[i].temp.min;
            max=data.daily[i].temp.max;
            humidity=data.daily[i].humidity;
            wind=data.daily[i].wind_speed;
            console.log(days[day]+"  "+min+" "+max);
            document.querySelector("h2.dname"+(i+1)).innerText=days[day];
            document.querySelector("img.icon"+(i+1)).innerHTML="https://openweathermap.org/img/wn/"+icon+".png";
            document.querySelector(".description"+(i+1)).innerHTML = description;
            document.querySelector("h6.min"+(i+1)).innerText=min+"°C";
            document.querySelector("h6.max"+(i+1)).innerText=max+"°C";
            document.querySelector(".humidity"+(i+1)).innerHTML= "Humidity: "+humidity+ "%";
            document.querySelector(".wind"+(i+1)).innerHTML = "Wind Speed: "+ wind + "km/h";

        }
        
    },
    search: function(){
        this.getcord(document.querySelector(".search-bar").value);

     }
}
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



