import "./components/style.css";
import { useState } from "react";
import { useEffect } from "react";
function App() {
  const [searchedValue, setsearchedValue] = useState("lahore");
  const [completeInfo, setcompleteInfo] = useState({});
  const [curentWeather,setcurentWeather]=useState('')
  // Initial function that will fun after page refreshing to get weather info
  let getInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedValue}&units=metric&appid=22aa3246a81d73f0541dd2f8515de8d4`;
      setsearchedValue("");
      const res = await fetch(url);
      const data = await res.json();
     
      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      let sunSetValue = sunset;
      let date = new Date(sunSetValue * 1000);
      let hours = date.getHours();
      let hour=()=>{
        if(hours>12){
          return `${hours-12}`
        }else{
          return hours
        }
      }
      let min = date.getMinutes();
      let mint=()=>{
        if(min <10){
          return `0${min}`
        }
        else{
          return min
        }
      }
      let cond = () => {
        return hours > 12 ? "PM" : "AM";
      };
      const setTime = `${hour()} : ${mint()} ${cond()}`;
     
      const resInfo = {
        temp,
        humidity,
        pressure,
        weatherMood,
        name,
        speed,
        country,
        setTime,
      };
      
      setcompleteInfo(resInfo);
    } catch (error) {
      alert('seem like location not exist')
    }
  };
  // it will run after page refreshing
  useEffect(() => {
    getInfo();
  }, []);
const empty=()=>{
  alert("Please enter you query")
}
  const {
    temp,
    humidity,
    pressure,
    name,
    country,
    speed,
    weatherMood,
    setTime,
  } = completeInfo;
  // for dynamic icons
useEffect(()=>{
  if(weatherMood){
    switch (weatherMood) {
      case "Clouds":
        setcurentWeather('bi-clouds-fill')
        break;
      case "Mist":
        setcurentWeather('bi-cloud-haze2-fill')
        break;
      case "Haze":
        setcurentWeather('bi-cloud-haze2-fill')
        break;
      case "Smoke":
        setcurentWeather('bi-cloud-haze2-fill')
        break;
      case "Clear":
        setcurentWeather('bi-brightness-high')
        break;
      case "Rain":
        setcurentWeather('bi-cloud-lightning-rain-fill')
        break;
        
      default:
        setcurentWeather('bi-brightness-high')
        break;
    }
  }
},[weatherMood])

  return (
    <>

      <div className="wrapper">
     
        <header className="design">Developed By: Arslan Chaudhry</header>
        <section className="input-part">
          <div className="content">
            <div className="input_part">
              <input
                type="text"
                placeholder="Search Your Location"
                value={searchedValue}
                onChange={(e) => {
                  setsearchedValue(e.target.value);
                }}
              />
              {
                searchedValue ? <button onClick={getInfo}><i class="bi bi-search"></i></button>:<button onClick={empty}><i class="bi bi-search"></i></button>
              }
             
            </div>
            <div className="weather_part">
              <div className="temreture">
                <i className={`bi ${curentWeather} mode`}></i>
                <h1>{temp}&deg;</h1>
              </div>
              <div className="weather_info">
                <div>{weatherMood}</div>
                <div className="locatio">
                  {name},{country} <i className="bi bi-geo-alt-fill"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="other_info">
            <div className="more">
              <i className="bi bi-sunset size"></i>
              <p className="inlin hed">SUN SET :</p>
              <p className="inlin">{setTime}</p>
            </div>
            <div className="more">
            <i className="bi bi-wind size"></i>
              <p className="hed">Wind :</p>
              <p>{speed}</p>
            </div>
            <div className="more">
            <i className="bi bi-cloud-haze size"></i>
              <p className="hed">Pressure :</p>
              <p>{pressure}</p>
            </div>
            <div className="more">
            <i className="bi bi-droplet size"></i>
              <p className="hed">Humidity :</p>
              <p >{humidity}</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default App;
