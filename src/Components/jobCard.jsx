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

const JobCard = ({ candidate }) => {
  const [openDialog, setOpenDialog] = useState(false);

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
            Posted {candidate.maxJdSalary % 30} days ago
          </Typography>
        </Box>

        <JobInfo
          companyName={candidate.companyName}
          location={candidate.location}
          jobRole={candidate.jobRole}
          imageUrl={candidate.logoUrl}
        />

        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            sx={{ marginRight: 1 }}
          >
            Estimated Salary:{" "}
            {candidate?.minJdSalary && candidate?.maxJdSalary
              ? `${candidate?.minJdSalary}k - ${candidate?.maxJdSalary}k ${candidate?.salaryCurrencyCode}`
              : candidate?.minJdSalary
              ? `${candidate?.minJdSalary}k ${candidate?.salaryCurrencyCode} +`
              : candidate?.maxJdSalary
              ? `up to ${candidate?.maxJdSalary}k ${candidate?.salaryCurrencyCode}`
              : "As per industry standards"}
          </Typography>
          <CheckCircleOutlinedIcon
            sx={{ fontSize: "1.5rem", color: "green" }}
          />
        </Box>

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

      <Dialog open={openDialog} onClose={handleDialogToggle}>
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
