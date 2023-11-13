"use client";
import { Autocomplete, Box, Button, Card, CardMedia, Grid, Icon, Paper, TextField, Typography, alpha } from "@mui/material";
import _ from "lodash";
import CloudIcon from '@mui/icons-material/Cloud';
import { useCallback, useEffect, useState } from "react";
import { Container } from "@mui/material";

export default function Home() {
  const [options, setOptions] = useState<any>([]);
  const [value, setValue] = useState<any>("");

  const getOptionsDelayed = useCallback(
    _.debounce((text, callback) => {
      setOptions([]);
      if(!text) return;
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
      <Paper sx={{
        minWidth: "500px", marginTop: 3, borderRadius: "15px", boxShadow: 10
      }}>
        <Grid container>
          <Grid item xs={8} sx={{ backgroundColor: "#00658f", borderRadius: "15px 0 0 15px" }}>
            <Grid container justifyContent="center" direction="row" >
              <Grid item xs={8} sx={{ paddingX: 3, marginTop: 2 }}>
                <Autocomplete
                  freeSolo
                  filterOptions={(x) => x}
                  onChange={(e: any) => setValue(e.target.innerText)}

                  onInputChange={(e, value) => {
                    setValue(value);
                  }}
                  loading={options.length === 0}
                  options={options ? options.map((obj: any) => obj.fullName) : []}
                  sx={{

                    bgcolor: alpha("#fbfcfe", 0.7), borderRadius: "15px", '& .Mui-focused': {
                      borderColor: '#fbfcfe',
                      color: '#fbfcfe',
                      borderWidth: 2,
                      borderRadius: "15px"
                    }, '& .MuiOutlinedInput-root': {
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
              <Grid item >
                <Box sx={{ display: "flex", color: "#fbfcfe", flexDirection: "column", alignItems: "center" }}>
                  <Typography variant="h3">
                    Montreal
                  </Typography>
                  <Typography variant="h1">
                    14°C
                  </Typography>
                  <Typography variant="h5">
                    Cloudy
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid container sx={{
              bgcolor: alpha("#fbfcfe", 0.3), justifyContent: "center", borderRadius: "0 15px 0 15px"
            }}>
              <Grid item sx={{ marginY: "15px" }}>
                <Typography variant="h6" color="#fbfcfe">
                  Weather of Next Hours
                </Typography>
              </Grid>
              <Grid container sx={{ marginBottom: 2, justifyContent: "center" }}>
                <Grid item xs={2}>
                  <Card sx={{ padding: 2, borderRadius: "20px 0 0 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6">
                      12:00
                    </Typography>
                    <Icon>
                      <CloudIcon />
                    </Icon>
                    <Typography variant="h5">
                      12°C
                    </Typography>

                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ padding: 2, borderRadius: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6">
                      12:00
                    </Typography>
                    <Icon>
                      <CloudIcon />
                    </Icon>
                    <Typography variant="h5">
                      12°C
                    </Typography>

                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ padding: 2, borderRadius: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6">
                      12:00
                    </Typography>
                    <Icon>
                      <CloudIcon />
                    </Icon>
                    <Typography variant="h5">
                      12°C
                    </Typography>

                  </Card>
                </Grid>
                <Grid item xs={2}>
                  <Card sx={{ padding: 2, borderRadius: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6">
                      12:00
                    </Typography>
                    <Icon>
                      <CloudIcon />
                    </Icon>
                    <Typography variant="h5">
                      12°C
                    </Typography>

                  </Card>
                </Grid>

                <Grid item xs={2}>
                  <Card sx={{ padding: 2, borderRadius: "0 20px 20px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6">
                      12:00
                    </Typography>
                    <Icon>
                      <CloudIcon />
                    </Icon>
                    <Typography variant="h5">
                      12°C
                    </Typography>

                  </Card>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4} >
            <Box sx={{ minHeight: "100%", minWidth: "200px", bgcolor: "#00658f", borderRadius: "0 15px 15px 0" }}>
              <Grid container justifyContent="center" direction="column" sx={{ padding: 2 }}>
                <Grid item sx={{ marginY: "15px" }}>
                  <Typography variant="h5" color="#fbfcfe">
                    Weather of Next Days
                  </Typography>
                </Grid>
                <Grid item >
                  <Card sx={{ padding: 4, background: "#fbfcfe", borderRadius: "20px 20px 0 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          Seg
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Icon>
                          <CloudIcon />
                        </Icon>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          Cloudy
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          12:00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
                <Grid item >
                  <Card sx={{ padding: 4, background: "#fbfcfe", borderRadius: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          Ter
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Icon>
                          <CloudIcon />
                        </Icon>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          Cloudy
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          12:00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item >
                  <Card sx={{ padding: 4, background: "#fbfcfe", borderRadius: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          Qua
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Icon>
                          <CloudIcon />
                        </Icon>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          Cloudy
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          12:00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item >
                  <Card sx={{ padding: 4, background: "#fbfcfe", borderRadius: "0", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          Qui
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Icon>
                          <CloudIcon />
                        </Icon>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          Cloudy
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          12:00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item >
                  <Card sx={{ padding: 4, background: "#fbfcfe", borderRadius: "0 0 20px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Grid container justifyContent="center" alignItems="center">
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          Sex
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Icon>
                          <CloudIcon />
                        </Icon>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant="h6">
                          Cloudy
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant="h6">
                          12:00
                        </Typography>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Paper >
    </Container>
  )
}
