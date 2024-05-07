import React from "react";
import { Typography, Box } from "@mui/material";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

const JobInfo = ({ companyName, jobRole, location, imageUrl }) => {
  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        <Box sx={{ width: 100, height: 100, marginRight: 2 }}>
          <img
            src={imageUrl}
            alt="Company Logo"
            style={{ width: "100%", borderRadius: 3 }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#7f8280",
              textAlign: "left",
              marginLeft: "-5px",
            }}
          >
            {companyName}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#393b39",
              fontWeight: "500",
              marginLeft: "-5px",
              textAlign: "left",
            }}
          >
            {jobRole.charAt(0).toUpperCase() + jobRole.slice(1).toLowerCase()}{" "}
            {jobRole.toLowerCase() !== "tech lead" ? "Developer" : ""}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontSize: "0.8rem",
              color: "#5e615f",
              marginLeft: "-10px",
            }}
          >
            <RoomOutlinedIcon sx={{ marginRight: "1px", fontSize: "1rem" }} />
            <Typography sx={{ textAlign: "left" }}>
              {location.charAt(0).toUpperCase() +
                location.slice(1).toLowerCase()}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JobInfo;
