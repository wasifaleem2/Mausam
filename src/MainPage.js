import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Row, Col } from "react-bootstrap";

export default function MainPage() {
  const [data, setData] = useState({});
  const [city, setCity] = useState("karachi");

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = hour + ":" + min;
    return time;
  }

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_URI_KEY}`;
  const getWeather = (e) => {
    // if (e.key === "Enter") {

    axios.get(URL).then((response) => {
      try {
        if (response == null) {
          console.log("city not found");
        }
        setData(response.data);
        console.log(response.data);
        if (response == null) {
          console.log("city not found");
        }
      } catch (error) {
        console.log(error);
      }
    });
    // }
  };
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=${process.env.REACT_APP_WEATHER_URI_KEY}`
      )
      .then((response) => {
        try {
          if (response == null) {
            console.log("city not found");
          }
          setData(response.data);
          console.log(response.data);
          if (response == null) {
            console.log("city not found");
          }
        } catch (error) {
          console.log(error);
        }
      });
  }, []);

  return (
    <div className="app">
      <div className="header">
        <input
          className="search"
          placeholder="Search City"
          aria-label="Username"
          aria-describedby="basic-addon1"
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={() => getWeather}
        />
        <button className="search-btn" onClick={() => getWeather()}>
          Search
        </button>
      </div>
      <div className="top">
        <div>
          <h2 className="app-name">MAUSAM</h2>
          <h1 className="temperature">
            {data.main
              ? (data.main.temp_max - 273).toFixed() + "\u00B0 C"
              : null}
          </h1>
          <p className="city">{data.main ? data.name : "search city"}</p>
          <p className="description">
            {data.main ? data.weather[0].description : "search city"}
          </p>
          {/* <img src={require(data.weather[0].icon)} /> */}
        </div>
      </div>

      <div className="details-box">
        <Container className="overflow-auto">
          <Row>
            <Col xs={6} md={4}>
              <div>
                <h4>Feels Like</h4>
                <p className="detail">
                  {data.main
                    ? (data.main.feels_like - 273).toFixed() + "\u00B0 C"
                    : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <h4>Humidity</h4>
                <p className="detail">
                  {data.main ? data.main.humidity + "%" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <h4>Max Temprature</h4>
                <p className="detail">
                  {data.main
                    ? (data.main.temp_max - 273).toFixed() + "\u00B0 C"
                    : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <h4>Min Temprature</h4>
                <p className="detail">
                  {data.main
                    ? (data.main.temp_min - 273).toFixed() + "\u00B0 C"
                    : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <h4>Pressure</h4>
                <p className="detail">
                  {data.main ? data.main.pressure + " mb" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <h4>Wind Speed</h4>
                <p className="detail">
                  {data.main ? data.wind.speed + " m/s" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <h4>Sunrise</h4>
                <p className="detail">
                  {data.main ? timeConverter(data.sys.sunrise) + " AM" : "---"}
                </p>
              </div>
            </Col>
            <Col xs={6} md={4}>
              <div>
                <h4>Sunset</h4>
                <p className="detail">
                  {data.main ? timeConverter(data.sys.sunset) + " PM" : "---"}
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <p className="credits">Designed by Wasif Aleem</p>
      <p className="credits">Powered by OpenWeatherMap.org</p>
    </div>
  );
}
