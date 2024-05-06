import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filter = ({ candidateDetails, setFilteredCandidates }) => {
  console.log("candidateDetails", candidateDetails);
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    role: [],
    location: [],
    experience: [],
    minSalary: [],
    companyName: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    filterCandidates({ ...filters, [name]: value });
  };

  const filterCandidates = (filters) => {
    let filteredData = [...candidateDetails];

    // Filter by role
    if (filters.role.length > 0) {
      filteredData = filteredData.filter((candidate) =>
        filters.role.includes(candidate.jobRole)
      );
    }

    // Filter by location
    if (filters.location.length > 0) {
      filteredData = filteredData.filter((candidate) =>
        filters.location.includes(candidate.location)
      );
    }

    // Filter by experience
    if (filters.experience.length > 0) {
      console.log(filters.experience);
      filteredData = filteredData.filter((candidate) => {
        if (filters.experience === "0-2") {
          return candidate.minExp >= 0 && candidate.minExp <= 2;
        } else if (filters.experience === "3-5") {
          return candidate.minExp >= 3 && candidate.minExp <= 5;
        } else {
          return candidate.minExp > 5;
        }
      });
    }

    // Filter by minimum salary
    if (filters.minSalary.length > 0) {
      filteredData = filteredData.filter(
        (candidate) => parseInt(filters.minSalary) <= candidate.minJdSalary
      );
    }

    // Filter by companyName (search filter)
    if (filters.companyName !== "") {
      filteredData = filteredData.filter((candidate) =>
        candidate.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      );
    }

    setFilteredCandidates(filteredData);
  };

  return (
    <Box p={2}>
      <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">Job Role</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              multiple
              value={filters.role}
              name="role"
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="ROLE" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              <MenuItem value="frontend">Frontend</MenuItem>
              <MenuItem value="backend">Backend</MenuItem>
              <MenuItem value="ios">iOS</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              multiple
              value={filters.location}
              name="location"
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Location" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              <MenuItem value="delhi ncr">Delhi NCR</MenuItem>
              <MenuItem value="mumbai">Mumbai</MenuItem>
              <MenuItem value="chennai">Chennai</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="experience-select-label">Experience</InputLabel>
            <Select
              labelId="experience-select-label"
              id="experience-select"
              value={filters.experience}
              name="experience"
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Experience" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <Chip key={selected} label={selected} />
                </Box>
              )}
              MenuProps={MenuProps}
            >
              <MenuItem value="0-2">0-2 Years</MenuItem>
              <MenuItem value="3-5">3-5 Years</MenuItem>
              <MenuItem value="5+">5+ Years</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="minSalary-select-label">Minimum Salary</InputLabel>
            <Select
              labelId="minSalary-select-label"
              id="minSalary-select"
              value={filters.minSalary}
              name="minSalary"
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Minimum Salary"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <Chip key={selected} label={selected} />
                </Box>
              )}
            >
              <MenuItem value="25">25 USD</MenuItem>
              <MenuItem value="50">50 USD</MenuItem>
              <MenuItem value="75">75 USD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="text"
            label="Company Name"
            name="Search"
            value={searchInput}
            onChange={(e) => {
              const inputValue = e.target.value.toLowerCase();
              setSearchInput(inputValue);
              const filteredData = candidateDetails.filter((candidate) =>
                candidate.companyName.toLowerCase().includes(inputValue)
              );
              setFilteredCandidates(filteredData);
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Filter.propTypes = {
  candidateDetails: PropTypes.array.isRequired,
  setFilteredCandidates: PropTypes.func.isRequired,
};

export default Filter;
