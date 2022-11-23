const xlevels=[];
const ylevels=[];
let weather = {
    apiKey:"6573e3a562dfc5da210cc154ba77437b",

    fetchWeather: function(city)
    {
        fetch(
            "https://api.openweathermap.org/data/2.5/forecast?q="
            +city +
            "&units=metric&appid="
            +this.apiKey
            )
        .then((response)=> response.json())
        .then((data)=>this.displayWeather(data));
        
    },
    displayWeather: function(data){
        const name=data.city.name;
        console.log( name);
        
        document.querySelector(".cityn").innerText= "Weather at "+name;
        data.list.forEach(row => {
          xlevels.push(row.dt_txt);
          ylevels.push(row.main.temp);
          console.log(row.dt_txt+"    "+row.main.temp);
          chartit();
        });

    },search: function(){
      this.fetchWeather(document.querySelector(".search-bar").value);
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

function chartit(){
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart= new Chart(ctx, {
        type: 'line',
        fill: false,
        data: {
        labels:xlevels,
        datasets: [{
            label:"Temperature for 5days/3hour in °C",
            data: ylevels,
            backgroundColor: 'rgb(250,10,150,0.5)',
            bordercolor: 'rgb(255,98,135,1)',
            borderWidth:2
        }]
        },
        
    });
}