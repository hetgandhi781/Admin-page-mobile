import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./Display.css";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    marginLeft: 50,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [mainData, setMainData] = useState({});
  const [brand, setBrand] = useState([]);
  const [filterBrand, setFilterBrandf] = useState();
  const [dataBrand, setDataBrand] = useState([]);
  const [dataFilter, setDataFilter] = useState([]);

  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

  useEffect(() => {
    var d = JSON.parse(localStorage.getItem("data"));
    setData(d);
    setMainData(d);
    setDataBrand(d);
    setDataFilter(d);
    var p = [];
    if (d?.length > 0) {
      d.map((item) => p.push(item.brand));
      const unique1 = p.filter(unique);
      unique1.push("All");
      unique1.reverse();
      setBrand(unique1);
    }
  }, []);

  const handleBrand = (e) => {
    var c = e.target.value;
    var g = [];
    if (c === "All") {
      g = mainData;
      setDataBrand(mainData);
    } else {
      g = mainData.filter((item) => item.brand === c);
      setDataBrand(g);
    }
    const filteredArray = g.filter((value) => dataFilter.includes(value));
    setData(filteredArray);
  };

  const handleFilter = (e) => {
    var lower = e.target.value.split("-")[0];
    var higher = e.target.value.split("-")[1];
    console.log(lower, higher);
    var g = [];
    if (lower === "20000 and more") {
      g = mainData.filter((item) => Number(item.price) >= 20000);
      setDataFilter(g);
    } else if (lower === "All") {
      g = mainData;
      setDataFilter(mainData);
    } else {
      g = mainData.filter(
        (item) =>
          Number(item.price) >= Number(lower) &&
          Number(item.price) <= Number(higher)
      );
      setDataFilter(g);
    }
    const filteredArray = g.filter((value) => dataBrand.includes(value));
    setData(filteredArray);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Container
        maxWidth="sm"
        component="main"
        className={classes.heroContent}
        style={{ padding: 10 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Mobiles
        </Typography>
      </Container>
      <div className="navbar">
        <Link
          to="/form"
          className="nav-item"
          style={{ textDecoration: "none", marginTop: 14 }}
        >
          <Button variant="contained" color="primary">
            <AddIcon /> &nbsp;Add Details
          </Button>
        </Link>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Brand</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterBrand}
            onChange={handleBrand}
          >
            {brand?.map((item) => (
              <MenuItem
                name={item}
                value={item}
                onClick={(e) => handleBrand(e)}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label1">Price</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            value={filterBrand}
            onChange={handleFilter}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="0-5000">0-5000</MenuItem>
            <MenuItem value="5000-10000">5000-10000</MenuItem>
            <MenuItem value="10000-15000">10000-15000</MenuItem>
            <MenuItem value="15000-20000">15000-20000</MenuItem>
            <MenuItem value="20000 and more">20000 and more</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {data?.length > 0 ? (
            data.map((tier) => (
              <Grid item key={tier.mobile_name} xs={12} md={4}>
                <Card>
                  <CardHeader
                    title={tier.mobile_name}
                    subheader={tier.brand}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        {tier.price}₹
                      </Typography>
                    </div>
                    <ul>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        color:{tier.color}
                      </Typography>
                    </ul>
                    <ul>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        RAM: {tier.ram}GB
                      </Typography>
                    </ul>
                    <ul>
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                      >
                        ROM: {tier.rom}GB
                      </Typography>
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : data ? (
            <h1>No result found for this filter</h1>
          ) : (
            <h1>Add Mobiles to Show</h1>
          )}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
