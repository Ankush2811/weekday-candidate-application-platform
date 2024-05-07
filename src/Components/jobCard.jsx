import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogContent,
  Button,
  DialogTitle,
} from "@mui/material";
import HourglassFullTwoToneIcon from "@mui/icons-material/HourglassFullTwoTone";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import JobInfo from "./jobInfo";
import ApplyButton from "./applyButton";
import BoltIcon from "@mui/icons-material/Bolt";

const JobCard = ({ candidate }) => {
  const [expanded, setExpanded] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleExpandClick = () => {
    setExpanded(true);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Function to calculate estimated salary
  const getEstimatedSalary = () => {
    const { minJdSalary, maxJdSalary, salaryCurrencyCode } = candidate;
    if (minJdSalary && maxJdSalary) {
      return `${minJdSalary}k - ${maxJdSalary}k ${salaryCurrencyCode}`;
    } else if (minJdSalary) {
      return `${minJdSalary}k ${salaryCurrencyCode} +`;
    } else if (maxJdSalary) {
      return `up to ${maxJdSalary}k ${salaryCurrencyCode}`;
    } else {
      return "As per industry standards";
    }
  };

  return (
    <Card
      sx={{
        margin: 2,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        border: "1px solid #d7dbd8",
        borderRadius: 5,
      }}
    >
      <CardContent>
        {/* Posted day */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 1,
            border: "2px solid #d7dbd8",
            borderRadius: 4,
            width: "60%",
            pl: 1,
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <HourglassFullTwoToneIcon sx={{ fontSize: 18, marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Posted {candidate.maxJdSalary % 30} days ago
          </Typography>
        </Box>

        {/* Job information */}
        <JobInfo
          companyName={candidate.companyName}
          location={candidate.location}
          jobRole={candidate.jobRole}
          imageUrl={candidate.logoUrl}
        />

        {/* Estimated salary */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            sx={{ marginRight: 1 }}
          >
            Estimated Salary: {getEstimatedSalary()}
          </Typography>
          <VerifiedOutlinedIcon sx={{ fontSize: "1.5rem" }} />
        </Box>

        {/* About company */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: 1, marginRight: 24 }}
        >
          About Company:
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginBottom: 1,
            position: "relative",
            overflow: "hidden",
            maxHeight: "100px",
          }}
        >
          {candidate.jobDetailsFromCompany}
          {candidate.jobDetailsFromCompany.length > 100 && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "30px",
                backgroundImage: "linear-gradient(to top, white, transparent)",
              }}
            />
          )}
        </Typography>
        {candidate.jobDetailsFromCompany.length > 100 && (
          <Typography
            onClick={handleExpandClick}
            sx={{
              fontSize: "14px",
              cursor: "pointer",
              marginBottom: "10px",
              color: "#4943da",
              textAlign: "center",
            }}
          >
            Show More
          </Typography>
        )}

        {/* Minimum experience */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            color="text.primary"
            sx={{ marginRight: 1 }}
          >
            Minimum Experience:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {candidate.minExp}
          </Typography>
        </Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#13ebc3",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <BoltIcon style={{ fontSize: "2rem", color: "orange" }} />
            <Typography
              style={{
                color: "black",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              Easy Apply
            </Typography>
          </Button>
        </div>
      </CardContent>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          <Typography variant="body2">
            {candidate.jobDetailsFromCompany}
          </Typography>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default JobCard;
