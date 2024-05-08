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
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import JobInfo from "./jobInfo";

// Component for rendering individual job cards
const JobCard = ({ job }) => {
  // State to manage dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  // Toggle dialog visibility
  const handleDialogToggle = () => {
    setOpenDialog((prev) => !prev);
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
        {/* Posted time */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 1,
            border: "2px solid #d7dbd8",
            borderRadius: 4,
            width: "60%",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          <HourglassFullTwoToneIcon
            sx={{ fontSize: 18, marginRight: 1, marginLeft: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            Posted {job.maxJdSalary % 30} days ago
          </Typography>
        </Box>

        {/* Job information */}
        <JobInfo
          companyName={job.companyName}
          location={job.location}
          jobRole={job.jobRole}
          imageUrl={job.logoUrl}
        />

        {/* Estimated salary */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            sx={{ marginRight: 1 }}
          >
            Estimated Salary:{" "}
            {job?.minJdSalary && job?.maxJdSalary
              ? `${job?.minJdSalary}k - ${job?.maxJdSalary}k ${job?.salaryCurrencyCode}`
              : job?.minJdSalary
              ? `${job?.minJdSalary}k ${job?.salaryCurrencyCode} +`
              : job?.maxJdSalary
              ? `up to ${job?.maxJdSalary}k ${job?.salaryCurrencyCode}`
              : "As per industry standards"}
          </Typography>
          <CheckCircleOutlinedIcon
            sx={{ fontSize: "1.5rem", color: "green" }}
          />
        </Box>

        {/* Company description */}
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: 1, textAlign: "left" }}
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
            textAlign: "left",
          }}
        >
          {job.jobDetailsFromCompany}
          {job.jobDetailsFromCompany.length > 100 && (
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
        {/* Show more button for long descriptions */}
        {job.jobDetailsFromCompany.length > 100 && (
          <Typography
            onClick={handleDialogToggle}
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
            {job.minExp}
          </Typography>
        </Box>

        {/* Easy apply button */}
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

        {/* Ask for referral button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{
              backgroundColor: "#3e13eb",
              width: "100%",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "10px",
                }}
              >
                <AccountCircleIcon style={{ fontSize: "2rem" }} />
              </div>
              <Typography
                style={{
                  fontSize: "0.9rem",
                  color: "white",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                Ask for Referral
              </Typography>
            </div>
          </Button>
        </div>
      </CardContent>

      {/* Dialog for showing full job description */}
      <Dialog open={openDialog} onClose={handleDialogToggle}>
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          <Typography variant="body2">{job.jobDetailsFromCompany}</Typography>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default JobCard;
