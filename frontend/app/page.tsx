"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Paper, Grid, Box, Typography, Card, Icon, TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CloudIcon from '@mui/icons-material/Cloud';
import { alpha } from '@mui/system';
import _, { parseInt } from 'lodash';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const iconMap = {
  '01d': "http://openweathermap.org/img/wn/01d.png",
  '02d': "http://openweathermap.org/img/wn/02d.png",
  '03d': "http://openweathermap.org/img/wn/03d.png",
  '04d': "http://openweathermap.org/img/wn/04d.png",
  '09d': "htpp://openweathermap.org/img/wn/09d.png",
  '10d': "http://openweathermap.org/img/wn/10d.png",
  '11d': "http://openweathermap.org/img/wn/11d.png",
  '13d': "http://openweathermap.org/img/wn/13d.png",
  '50d': "http://openweathermap.org/img/wn/50d.png",
  '01n': "http://openweathermap.org/img/wn/01n.png",
  '02n': "http://openweathermap.org/img/wn/02n.png",
  '03n': "http://openweathermap.org/img/wn/03n.png",
  '04n': "http://openweathermap.org/img/wn/04n.png",
  '09n': "htpp://openweathermap.org/img/wn/09n.png",
  '10n': "http://openweathermap.org/img/wn/10n.png",
  '11n': "http://openweathermap.org/img/wn/11n.png",
  '13n': "http://openweathermap.org/img/wn/13n.png",
  '50n': "http://openweathermap.org/img/wn/50n.png",
}
interface WeatherCardProps {
  time: string; // Assuming 'time' is a string, adjust the type accordingly
  temperature: number; // Assuming 'temperature' is a number, adjust the type accordingly
  index: number;
  len: number;
  icon: string;
}
const WeatherCard :React.FC<WeatherCardProps>= ({ time, temperature, index, len, icon }) => {
  let cardStyle = { padding: 2, borderRadius: "0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }
  if (index == 0) {
    cardStyle = { ...cardStyle, borderRadius: "15px 0 0 15px" }
  }
  if (index == len - 1) {
    cardStyle = { ...cardStyle, borderRadius: "0 15px 15px 0" }
  }
  return (
    <Card sx={cardStyle}>
      <Typography variant="h6">
        {time}
      </Typography>
      <Box component="img" src={iconMap[icon]} sx={{ width: "50px" }} />
      <Typography variant="h5">
        {temperature}°C
      </Typography>
    </Card>
  );
}

const NextDaysCard = ({ day, weather, icon }) => (
  <Grid item>
    <Card sx={{ padding: 4, background: "#fbfcfe", borderRadius: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={3}>
          <Typography variant="h6">
            {day}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Box component="img" src={iconMap[icon]} sx={{ width: "50px" }} />
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h6">
            {weather}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">

          </Typography>
        </Grid>
      </Grid>
    </Card>
  </Grid>
);

export default function Home() {
  const [options, setOptions] = useState<any>([]);
  const [option, setOption] = useState<any>({});
  const [value, setValue] = useState<any>("");
  const [currentWeather, setCurrentWeather] = useState<any>();
  const [nextHours, setNextHours] = useState<any>([]);
  const [nextDays, setNextDays] = useState<any>([]);
  useEffect(() => {
    if (!option) return;
    if (!option.latitude) return;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?lat=` + option.latitude + "&lon=" + option.longitude, { mode: 'cors' }).then((response) => response?.body?.getReader().read())
      .catch((err) => (err))
      .then((result: any) => {
        if (!result) return;
        if (!result.value) return;
        let weather = JSON.parse(new TextDecoder("utf-8").decode(result?.value));
        if (weather.length == 0) return;
        let currentWeatherObj = weather[0];
        let nextHoursArr = weather.slice(1, 6);
        let nextDaysArr = weather.slice(-5);
        setCurrentWeather(currentWeatherObj);
        setNextHours(nextHoursArr);
        setNextDays(nextDaysArr);
      }).
      catch((err) => err);
  }, [option]);
  const getOptionsDelayed = useCallback(
    _.debounce((text, callback) => {
      setOptions([]);
      if (!text) return;
      if (text.length < 3) return;
      getCities(text).then(callback);
    }, 200),
    []
  );
  useEffect(() => {
    getOptionsDelayed(value, (response: any) => {
      if (!response) return;
      if (!response.body) return;
      response.body.getReader().read().then((result: any) => {
        if (!result) return;
        if (!result.value) return;
        let cities = JSON.parse(new TextDecoder("utf-8").decode(result?.value));
        setOptions(cities);
      })
    });
  }, [value, getOptionsDelayed]);

  const getCities = async (str: string) => {
    try {
      let searchableCity = str.replace(/,/g, "");
      let url = "/api?city=" + searchableCity;
      return await fetch(url);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Container>
      <Paper sx={{ minWidth: "500px", marginTop: 3, boxShadow: 10 }}>
        <Grid container>
          <Grid item md={8} sm={12} sx={{ backgroundColor: "#00658f" }}>
            <Grid container justifyContent="center" direction="row" >
              <Grid item xs={8} sx={{ paddingX: 3, marginTop: 2 }}>
                <Autocomplete
                  freeSolo
                  filterOptions={(x) => x}
                  onChange={(e: any) => setOption(
                    options.find((obj: any) => obj.fullName == e.target.innerText))}
                  onInputChange={(_, value) => setValue(value)}
                  loading={options.length === 0 && value.length > 2}
                  options={options ? options.map((obj: any) => obj.fullName) : []}
                  sx={{
                    bgcolor: alpha("#fbfcfe", 0.7),
                    borderRadius: "15px",
                    '& .Mui-focused': {
                      borderColor: '#fbfcfe',
                      color: '#fbfcfe',
                      borderWidth: 2,
                      borderRadius: "15px"
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#fbfcfe',
                        color: '#fbfcfe',
                        borderWidth: 0,
                        borderRadius: "15px"
                      },
                      '&:hover fieldset': {
                        borderColor: '#fbfcfe',
                        color: '#fbfcfe',
                        borderWidth: 2,
                        borderRadius: "15px"
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#fbfcfe',
                        color: '#fbfcfe',
                        borderWidth: 2,
                        borderRadius: "15px"
                      },
                    },
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search city"
                      InputProps={{
                        ...params.InputProps,
                        type: 'search',
                      }}
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ minHeight: "30vh", marginY: 5 }}>
              <Grid item>
                <Box sx={{ display: "flex", color: "#fbfcfe", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h3">
                    {currentWeather ?
                      currentWeather.city.name + ", " + currentWeather.city.country
                      :
                      "..."}
                  </Typography>
                  <Typography variant="h1">
                    {currentWeather ? parseInt(currentWeather.temperature) : "??"}°C
                  </Typography>
                  <Typography variant="h5">
                    {currentWeather ? currentWeather.weatherCondition.description : "..."}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{
              bgcolor: alpha("#fbfcfe", 0.3), justifyContent: "center",
            }}>
              <Grid item sx={{ marginY: "15px" }}>
                <Typography variant="h6" color="#fbfcfe">
                  Weather of Next Hours
                </Typography>
              </Grid>
              <Grid container sx={{ marginBottom: 2, justifyContent: "center" }}>
                {nextHours.map((item, index, arr) => (
                  <Grid item key={index} xs={2}>
                    <WeatherCard
                      icon={item.weatherCondition.icon}
                      time={item.timestamp.split("T")[1].slice(0, 5)}
                      temperature={parseInt(item.temperature)}
                      index={index}
                      len={arr.length} />

                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} sm={12} xs={12} >
            <Box sx={{ minHeight: "100%", minWidth: "200px", bgcolor: "#00658f" }}>
              <Grid container justifyContent="center" direction="column" sx={{ padding: 2 }}>
                <Grid item sx={{ marginY: "15px" }}>
                  <Typography variant="h5" color="#fbfcfe">
                    Weather of Next Days
                  </Typography>
                </Grid>
                {nextDays.map((data, index) => (
                  <NextDaysCard index={index} day={(new Date(data.timestamp)).toLocaleString('default', {
                    weekday: 'short'
                  })} weather={parseInt(data.temperature) + "°C"}
                    icon={data.weatherCondition.icon}
                  />
                ))}

              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};


