import React, { useEffect, useState } from "react";
import {
  AppBar,
  Autocomplete,
  Box,
  Tab,
  Tabs,
  TextField,
  Toolbar,
} from "@mui/material";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/index";
import { adminActions } from "../store/index";

const Header = () => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState("");
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllMovies()
      .then((result) => {
        // Ensure that result.movies is an array before setting it to data
        if (Array.isArray(result.movies)) {
          setData(result.movies);
        } else {
          setData([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const handleChange = (e, val) => {
    setSelectedMovie(val);
    const movie = data.find((mov) => mov.title === val);
    console.log(movie);
    if (isUserLoggedIn) {
      navigate(`/booking/${movie?._id}`);
    }
  };

  const authTabs = [
    <Tab key="auth" to="/auth" component={NavLink} label="Auth" />,
    <Tab key="admin" to="/admin" component={NavLink} label="Admin" />,
  ];

  const userTabs = [
    <Tab key="user" to="/user" component={Link} label="User" />,
    <Tab
      key="logout"
      onClick={() => dispatch(userActions.logout())}
      component={Link}
      to="/"
      label="Logout"
    />,
  ];

  const adminTabs = [
    <Tab key="profile" to="/profile" component={Link} label="Profile" />,
    <Tab key="add-movie" to="/add" component={Link} label="Add Movie" />,
    <Tab
      key="logout-admin"
      onClick={() => dispatch(adminActions.logout())}
      component={Link}
      to="/"
      label="Logout"
    />,
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width="20%">
          <Link to="/" style={{ color: "white" }}>
            <MovieCreationIcon />
          </Link>
        </Box>
        <Box width="50%" marginRight={"auto"} marginLeft="auto">
            <Autocomplete
              onChange={handleChange}
              sx={{ borderRadius: 10, width: "40%", margin: "auto" }}
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={data.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  sx={{
                    borderRadius: 2,
                    input: { color: "white" },
                    bgcolor: "#2b2d42",
                    padding: "6px",
                  }}
                  variant="standard"
                  placeholder="Search Across Multiple Movies"
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
        </Box>
        <Box display="flex">
          <Tabs
            onChange={(e, val) => setValue(val)}
            value={value}
            textColor="inherit"
          >
            {!isAdminLoggedIn && !isUserLoggedIn && authTabs}
            {isUserLoggedIn && userTabs}
            {isAdminLoggedIn && adminTabs}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
