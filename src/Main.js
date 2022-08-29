import "./style.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";
import Day from "./weather/day.jpg";
import Night from "./weather/night.jpg";
import { FcSearch } from 'react-icons/fc';
import { FaTemperatureHigh } from 'react-icons/fa';
import { GiSunrise } from 'react-icons/gi';
import { FiWind } from 'react-icons/fi';
import { WiHumidity  } from 'react-icons/wi';
import { BsCloudsFill, BsFillSunsetFill  } from 'react-icons/bs';
import { MdVisibility, MdCompress  } from 'react-icons/md';







export default function Main() {
  const [background, setBackground] = useState();
  const [data, setData] = useState({});
  const [icon, setIcon] = useState("");
  const [day, setDay] = useState("");
  const [city, setCity] = useState("karachi");

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    // var date = date + "/" + month + "/" + year
    var time = hour + ":" + min;
    return time;
  }

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_URI_KEY}`;
  const getWeather = (e) => {
    axios.get(URL).then((response) => {
      try {
        if (response == null) {
          console.log("city not found");
        }
        setData(response.data);
        console.log(response.data);
        setIcon(response.data.weather[0].icon);
        // console.log("icon", response.data.weather[0].icon);
        // console.log("last", response.data.weather[0].icon.slice(-1));
        if (response.data.weather[0].icon.slice(-1) == "d") {
          setBackground(Day);
          setDay("Day");
        } else if (response.data.weather[0].icon.slice(-1) == "n") {
          setBackground(Night);
          setDay("Night");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="app"  style={{ backgroundImage: `url(${background})` }}>
      <div className="header">
        <h3 className="app-name">MAUSAM</h3>
        <input
          className="search"
          placeholder="Search City"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={() => getWeather}
        />
        <button className="search-btn" onClick={() => getWeather()}>
          <FcSearch size={20}/>
        </button>
      </div>
      {/* Header ends */}

      <div className="top">
        <div className="right">
          <img
            className="icon-img"
            src={`http://openweathermap.org/img/w/${icon}.png`}
            alt="icon"
          />
          <h1 className="temp">{data.main
              ? (data.main.temp - 273).toFixed() + "\u00B0" + "C"
              : null}</h1>
          <p className="city">{data.main ? data.name : "search city"},{" "}
            {data.main ? data.sys.country : ""}</p>
        </div>
        <div className="left">
          <p className="detail-top">{data.main ? data.weather[0].description : "search city"}</p>
          <p className="detail-top">Max:{" "}
            {data.main
              ? (data.main.temp_max - 273).toFixed() + "\u00B0" + "C"
              : "---"}</p>
          <p className="detail-top">Min:{" "}
            {data.main
              ? (data.main.temp_min - 273).toFixed() + "\u00B0" + "C"
              : "---"}</p>
        </div>
      </div>

      <div className="details-box">
        <Container className="overflow-auto">
          <Row>
            <Col xs={6} md={4}>
              <div className="bubble">
              <FaTemperatureHigh className="icons" size={50}/>
                <h4>Feels Like</h4>
                <p className="detail">
                  {data.main
                    ? (data.main.feels_like - 273).toFixed() + "\u00B0" + "C"
                    : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="bubble">
                <WiHumidity className="icons" size={50}/>
                <h4>Humidity</h4>
                <p className="detail">
                  {data.main ? data.main.humidity + "%" : "---"}
                </p>
              </div>
            </Col>

            <Col xs={6} md={4}>
              <div className="bubble">
                <MdCompress className="icons" size={50}/>
                <h4>Pressure</h4>
                <p className="detail">
                  {data.main ? data.main.pressure + " mb" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="bubble">
                <FiWind className="icons" size={50}/>
                <h4>Wind Speed</h4>
                <p className="detail">
                  {data.main ? data.wind.speed + " m/s" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="bubble">
                <MdVisibility className="icons" size={50}/>
                <h4>Visibility</h4>
                <p className="detail">
                  {data.main ? data.visibility / 1000 + " KM" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="bubble">
                <BsCloudsFill className="icons" size={50}/>
                <h4>Clouds</h4>
                <p className="detail">
                  {data.main ? data.clouds.all + " %" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="bubble">
              <GiSunrise className="icons" size={50}/><h4>Sunrise</h4>
                <p className="detail">
                  {data.main ? timeConverter(data.sys.sunrise) + " AM" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div className="bubble">
                <BsFillSunsetFill className="icons" size={50}/>
                <h4>Sunset</h4>
                <p className="detail">
                  {data.main ? timeConverter(data.sys.sunset) + " PM" : "---"}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="credits-box">
        <p className="credits">
          Designed by Wasif Aleem || Powered by OpenWeatherMap.org
        </p>
        <p className="credits"></p>
      </div>
    </div>
  );
}
