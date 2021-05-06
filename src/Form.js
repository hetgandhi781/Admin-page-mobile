import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./Form.css";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form() {
  const classes = useStyles();
  const [details, setDetails] = useState({
    mobile_name: "",
    brand: "",
    ram: "",
    rom: "",
    color: "",
    price: "",
  });
  const history = useHistory();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    if (
      details.mobile_name === "" ||
      details.brand === "" ||
      details.ram === "" ||
      details.rom === "" ||
      details.color === "" ||
      details.price === ""
    ) {
      alert("Please do not leave any input empty");
    } else {
      e.preventDefault();
      var d = JSON.parse(localStorage.getItem("data"));
      console.log(d);
      if (d === null) {
        var a = [];
        a.push(details);
        localStorage.setItem("data", JSON.stringify(a));
      } else {
        d.push(details);
        localStorage.setItem("data", JSON.stringify(d));
      }
      history.push("/");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4">
          Add Mobile Details
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={(e) => handleSubmit(e)}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Mobile Name"
                name="mobile_name"
                value={details.mobile_name}
                autofocus
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Brand"
                name="brand"
                value={details.brand}
                onChange={(e) => handleChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="ram"
                variant="outlined"
                required
                fullWidth
                label="RAM"
                type="number"
                value={details.ram}
                onChange={(e) => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">GB</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="ROM"
                name="rom"
                type="number"
                value={details.rom}
                onChange={(e) => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">GB</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="color"
                variant="outlined"
                required
                fullWidth
                value={details.color}
                onChange={(e) => handleChange(e)}
                label="Color"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="price"
                name="price"
                type="number"
                value={details.price}
                onChange={(e) => handleChange(e)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">GB</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            <AddIcon /> &nbsp;Add Details
          </Button>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <HomeIcon />
              &nbsp; Go to Home
            </Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
