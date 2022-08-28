import "./components/style.css";
import { useState } from "react";
import { useEffect } from "react";
import image from "./components/images/arsla2.jpg";
import icon from "./components/images/wind pressure.png";
import humi from "./components/images/humidity.png";
import head_close from "./components/images/cross-head.png";
import deleterItem from "./components/images/close.png";
import search from "./components/images/history.png";
import preload from "./components/images/preloader.gif";
import { useMemo } from "react";

function App() {
  
 let audio= new Audio("./components/tone.m4r")
  var gitHistoryData = () => {
    let list = localStorage.getItem("query");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };
  const [searchedValue, setsearchedValue] = useState("lahore");
  const [completeInfo, setcompleteInfo] = useState({});
  const [curentWeather, setcurentWeather] = useState("");
  const [Items, setItems] = useState(gitHistoryData);
  const removeAll = () => {
    setItems([]);
  };

  var lenthOfArry = Items.length;
  const globalSearch = () => {
     document.getElementById("wrapper").classList.add("wrap_blur");
     document.querySelector(".preloadImage").style.display = "block";
    getInfo();
    saveSearch();
  };
  let display = document.getElementById("history_wraper");
  const saveSearch = () => {
    const searchObj = {
      id: new Date().getTime().toString(),
      name: searchedValue,
    };

const listItems=[...Items]
listItems.unshift(searchObj)
    setItems(listItems);
    display.style.display = "none";
  };
  const remove = (index) => {
    const filtered = Items.filter((e) => {
      return e.id !== index;
    });
    setItems(filtered);
  };
  useEffect(() => {
    localStorage.setItem("query", JSON.stringify(Items));
  }, [Items]);

  const searchAgain = (nameValue) => {
    setsearchedValue(nameValue);
  };
  // Initial function that will fun after page refreshing to get weather info
  let getInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedValue}&units=metric&appid=22aa3246a81d73f0541dd2f8515de8d4`;
      setsearchedValue("");

      const res = await fetch(url);
      const data = await res.json();
      if (data) {
        
        document.getElementById("wrapper").classList.remove("wrap_blur");
       document.querySelector(".preloadImage").style.display = "none";
      }

      const { temp, humidity, pressure } = data.main;
      const { main: weatherMood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      let sunSetValue = sunset;
      let date = new Date(sunSetValue * 1000);
      let hours = date.getHours();
      let hour = () => {
        if (hours > 12) {
          return `${hours - 12}`;
        } else {
          return hours;
        }
      };
      let min = date.getMinutes();
      let mint = () => {
        if (min < 10) {
          return `0${min}`;
        } else {
          return min;
        }
      };
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
      
       document.getElementById("wrapper").classList.remove("wrap_blur");
       document.querySelector(".preloadImage").style.display = "none";
      if (navigator.onLine) {
        alert("City name is not correct or spelling mistake. Note! You can only search the data of big citys.It's a free api. Thanks! regard Arslan Chaudhry.");
      }
      else{
        alert("You are offline.Check your internet connection before continue.");
      }
    }
  };

  // it will run after page refreshing
  useEffect(() => {
    getInfo();
  }, []);
  const empty = () => {
    alert("Please enter you query");
  };
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
  // to display or hide search history

  const hideSearch = () => {
    display.style.display = "none";
  };
  const displaySearch = () => {
    if (display.style.display === "none") {
      display.style.display = "inline-block";
    } else {
      display.style.display = "none";
    }
  };

  // for dynamic icons
  useEffect(() => {
    if (weatherMood) {
      switch (weatherMood) {
        case "Clouds":
          setcurentWeather("bi-clouds-fill");
          break;
        case "Mist":
          setcurentWeather("bi-cloud-haze2-fill");
          break;
        case "Haze":
          setcurentWeather("bi-cloud-haze2-fill");
          break;
        case "Smoke":
          setcurentWeather("bi-cloud-haze2-fill");
          break;
        case "Clear":
          setcurentWeather("bi-brightness-high");
          break;
        case "Rain":
          setcurentWeather("bi-cloud-lightning-rain-fill");
          break;
        case "Thunderstorm":
          setcurentWeather("bi bi-cloud-lightning");
          break;

        default:
          setcurentWeather("bi-brightness-high");
          break;
      }
    }
  }, [weatherMood]);
const valuesData=useMemo(()=>{
return Items
},[searchedValue]);

  return (
    <>
      <img src={image} className="bcImage" alt="img" />


      <img src={preload} alt="img" className="preloadImage" />


      <div className="wrapper " id="wrapper">
       
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
                onClick={displaySearch}
                maxLength="15"
              />
              {searchedValue ? (
                <button onClick={globalSearch}>
                  <i className="bi bi-search"></i>
                </button>
              ) : (
                <button onClick={empty}>
                  <i className="bi bi-search"></i>
                </button>
              )}
            </div>
            <div className="history_wraper" id="history_wraper">
              <div className="search_header">
                <span>Search History</span>

                <img
                  src={head_close}
                  alt=""
                  onClick={hideSearch}
                  className="del"
                />
              </div>

              {Items.length === 0 ? (
                <div className="error_searcher" id="error_searcher">
                  <img src={search} alt="" className="his_icon" />
                  <h4>No History Found!</h4>
                </div>
              ) : null}
              {Items.map((e, index) => {
                return (
                  <>
                    <div className="search_items" >
                      <div className="ser_main">
                        <img src={search} alt="" className="his_icon" />
                        <span
                          className="cityName"
                          onClick={() => {
                            searchAgain(e.name);
                          }}
                        >
                          {e.name}
                        </span>
                      </div>

                      <img
                        src={deleterItem}
                        alt=""
                        className="del"
                        onClick={() => {
                          remove(e.id);
                        }}
                      />
                    </div>
                    <hr className="hrs" />
                  </>
                );
              })}
              <div className="moreOp">
                <span>Total searched Items ({lenthOfArry})</span>
                <button onClick={removeAll}>Clear All</button>
              </div>
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
              <p className="inlin hed">SUN SET:</p>
              <p className="inlin">{setTime}</p>
            </div>
            <div className="more">
              <i className="bi bi-wind size"></i>
              <p className="hed">Wind:</p>
              <p>{speed} m/s</p>
            </div>
            <div className="more">
              <img src={icon} alt="" className="custom_icon" />
              {/* <i className="bi bi-cloud-haze size"></i> */}
              <p className="hed">Pressure:</p>
              <p>{pressure} pa</p>
            </div>
            <div className="more">
              <img src={humi} alt="" className="custom_icon" />
              {/* <i className="bi bi-droplet size"></i> */}
              <p className="hed">Humidity:</p>
              <p>{humidity} kg-1 </p>
            </div>
          </div>
        </section>
      
      </div>
     
    </>
  );
}

export default App;
