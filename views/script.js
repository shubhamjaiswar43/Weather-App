const maincity = document.getElementById("maincity");
const temp = document.getElementById("temp");
const feels_like = document.getElementById("feels_like");
const min_temp = document.getElementById("min_temp");
const max_temp = document.getElementById("max_temp");
const cloud_pct = document.getElementById("cloud_pct");
const wind_speed = document.getElementById("wind_speed");
const wind_degrees = document.getElementById("wind_degrees");
const humidity = document.getElementById("humidity");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const searchbtn = document.getElementById("searchbtn");
const cityname = document.getElementById("cityname");
const mumbai = document.getElementById("mumbai");
const delhi = document.getElementById("delhi");
const jaipur = document.getElementById("jaipur");
const commonplaces = document.getElementById("commonplaces");
let commonPlacesName = ["Lucknow", "Pune", "Kolkata", "Chennai", "Ahmedabad"];
let commonPlaceTemplate = `<th scope="row" class="text-start"><place></th>`;
let sequence = ['temp',	'feels_like',	'min_temp',	'max_temp',	'cloud_pct',	'wind_speed',	'wind_degrees',	'humidity',	'sunrise',	'sunset'];
let data;
const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '26aa6f1921msh7e617a77f279e8dp1c71eejsn7be1dea0fa77',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
  }
};
const setDataForMain = (city, data) => {
  console.log(data)
  city = city[0].toUpperCase()+city.slice(1,city.length).toLowerCase();
  maincity.innerHTML = `Weather For ${city}`;
  temp.innerHTML = data.temp;
  feels_like.innerHTML = data.feels_like;
  min_temp.innerHTML = data.min_temp;
  max_temp.innerHTML = data.max_temp;
  cloud_pct.innerHTML = data.cloud_pct;
  wind_speed.innerHTML = data.wind_speed;
  wind_degrees.innerHTML = data.wind_degrees;
  humidity.innerHTML = data.humidity;
  sunrise.innerHTML = (new Date(data.sunrise*1000)).toDateString()+" "+ (new Date(data.sunrise*1000)).toTimeString().slice(0,8);
  sunset.innerHTML = (new Date(data.sunset*1000)).toDateString()+" "+ (new Date(data.sunset*1000)).toTimeString().slice(0,8);
}
const getData = async (city) => {
  try {
    const response = await fetch(url + city, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return {};
  }
}
const getDataForCommonPlaces = async () => {
  commonPlacesName.forEach(place => {
    let currPlace = commonPlaceTemplate.replace("<place>", place);
    getData(place).then(data=>{
      sequence.forEach(ele=>{
        if(ele==="sunrise"||ele==="sunset")
          currPlace += `<td>${(new Date(data[ele]*1000)).toDateString()+" "+ (new Date(data[ele]*1000)).toTimeString().slice(0,8)}</td>`
        else
        currPlace += `<td>${data[ele]}</td>`;
      })
      commonplaces.innerHTML += `<tr>${currPlace}</tr>`;
    });
  });
}
getData("Mumbai").then(data=>{
  setDataForMain("Mumbai",data);
});
getDataForCommonPlaces();

searchbtn.addEventListener("click",(e)=>{
  e.preventDefault();
  let cityy = cityname.value;
  getData(cityy).then(data=>{
    setDataForMain(cityy,data);
  });
})

mumbai.addEventListener("click",(e)=>{
  e.preventDefault();
  getData("Mumbai").then(data=>{
    setDataForMain("Mumbai",data);
  })
})
delhi.addEventListener("click",(e)=>{
  e.preventDefault();
  getData("Delhi").then(data=>{
    setDataForMain("Delhi",data);
  })
})
jaipur.addEventListener("click",(e)=>{
  e.preventDefault();
  getData("Jaipur").then(data=>{
    setDataForMain("Jaipur",data);
  })
})



