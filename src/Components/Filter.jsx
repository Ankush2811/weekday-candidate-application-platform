import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Divider,
  Grid,
} from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

const Filter = ({ candidateDetails, setFilteredCandidates }) => {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    role: [],
    location: [],
    experience: "",
    minSalary: "",
    companyName: "",
  });

  useEffect(() => {
    filterCandidates(filters);
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    handleFilterChange(name, value);
  };

  const handleSearchInputChange = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchInput(inputValue);
    const filteredData = candidateDetails.filter((job) =>
      job.companyName.toLowerCase().includes(inputValue)
    );
    setFilteredCandidates(filteredData);
  };

  const filterCandidates = (filters) => {
    let filteredData = [...candidateDetails];

    if (filters.role.length > 0) {
      filteredData = filteredData.filter((job) =>
        filters.role.includes(job.jobRole.toLowerCase())
      );
    }

    if (filters.location.length > 0) {
      filteredData = filteredData.filter((job) =>
        filters.location.includes(job.location.toLowerCase())
      );
    }

    if (filters.experience !== "") {
      const expRange = parseInt(filters.experience);
      filteredData = filteredData.filter((job) => {
        if (expRange === 5) {
          return job.minExp >= 5;
        } else {
          return job.minExp >= expRange && job.minExp < expRange + 1;
        }
      });
    }

    if (filters.minSalary !== "") {
      filteredData = filteredData.filter(
        (job) => parseInt(filters.minSalary) <= job.minJdSalary
      );
    }

    if (filters.companyName !== "") {
      filteredData = filteredData.filter((job) =>
        job.companyName
          .toLowerCase()
          .includes(filters.companyName.toLowerCase())
      );
    }

    setFilteredCandidates(filteredData);
  };

  const rolesList = Array.from(
    new Set(candidateDetails.map((job) => job.jobRole.toLowerCase()))
  )
    .sort()
    .map((role) => ({ label: role }));

  return (
    <Box p={2}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
      >
        <Grid item xs={12} sm={6} md={2}>
          <TextField
            fullWidth
            type="text"
            label="Company Name"
            name="companyName"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </Grid>
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
              input={<OutlinedInput id="select-multiple-chip" label="Role" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <React.Fragment key={value}>
                      {index > 0 && ", "} {value}
                    </React.Fragment>
                  ))}
                </Box>
              )}
            >
              {rolesList.map((role) => (
                <MenuItem key={role.label} value={role.label}>
                  {role.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="location-select-label">Location</InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={filters.location}
              name="location"
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Location" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected}
                </Box>
              )}
            >
              <MenuItem value="">
                Clear
                <ClearOutlinedIcon
                  style={{
                    marginLeft: "5rem",
                    fontSize: "1.5rem",
                    color: "red",
                  }}
                />{" "}
                <Divider />
              </MenuItem>
              <MenuItem value="delhi ncr">Delhi</MenuItem>
              <MenuItem value="mumbai">Mumbai</MenuItem>
              <MenuItem value="chennai">Chennai</MenuItem>
              <MenuItem value="bangalore">Bangalore</MenuItem>
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
                  {selected}
                </Box>
              )}
            >
              <MenuItem value="">
                Clear
                <ClearOutlinedIcon
                  style={{
                    marginLeft: "5rem",
                    fontSize: "1.5rem",
                    color: "red",
                  }}
                />{" "}
                <Divider />
              </MenuItem>
              <MenuItem value="1">1 Year</MenuItem>
              <MenuItem value="2">2 Years</MenuItem>
              <MenuItem value="3">3 Years</MenuItem>
              <MenuItem value="4">4 Years</MenuItem>
              <MenuItem value="5">5+ Years</MenuItem>
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
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {selected}
                </Box>
              )}
            >
              <MenuItem value="">
                Clear
                <ClearOutlinedIcon
                  style={{
                    marginLeft: "5rem",
                    fontSize: "1.5rem",
                    color: "red",
                  }}
                />{" "}
                <Divider />
              </MenuItem>
              <MenuItem value="10k USD">10k USD</MenuItem>
              <MenuItem value="20k USD">20k USD</MenuItem>
              <MenuItem value="30k USD">30k USD</MenuItem>
              <MenuItem value="40k USD">40k USD</MenuItem>
              <MenuItem value="50k+ USD">50k+ USD</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <FormControl fullWidth>
            <InputLabel id="remote-location-select-label">
              Remote/All
            </InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={filters.location}
              name="location"
              onChange={handleChange}
              input={
                <OutlinedInput id="select-multiple-chip" label="Location" />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected}
                </Box>
              )}
            >
              <MenuItem value="">
                Clear
                <ClearOutlinedIcon
                  style={{
                    marginLeft: "5rem",
                    fontSize: "1.5rem",
                    color: "red",
                  }}
                />{" "}
                <Divider />
              </MenuItem>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
            </Select>
          </FormControl>
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
