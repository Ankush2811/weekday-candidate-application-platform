import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import HourglassFullTwoToneIcon from "@mui/icons-material/HourglassFullTwoTone";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import JobInfo from "./jobInfo";
import ApplyButton from "../shared/buttons/applyButton";
import ReferralButton from "../shared/buttons/referralButton";
import ScrollableComponent from "../shared/description/scrollableComponent";

const JobCard = ({ candidate }) => {
  const postedDay = candidate.maxJdSalary % 30;

  const estimatedSalary =
    candidate.minJdSalary && candidate.maxJdSalary
      ? `${candidate.minJdSalary}k - ${candidate.maxJdSalary}k ${candidate.salaryCurrencyCode}`
      : candidate.minJdSalary
      ? `${candidate.minJdSalary}k ${candidate.salaryCurrencyCode} +`
      : candidate.maxJdSalary
      ? `up to ${candidate.maxJdSalary}k ${candidate.salaryCurrencyCode}`
      : "As per industry standards";

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
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1,border: "2px solid #d7dbd8", borderRadius: 4,width: '50%', pl: 1,boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)"  }}>
          <HourglassFullTwoToneIcon sx={{ fontSize: 18, marginRight: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Posted {postedDay} days ago
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
            Estimated Salary: {estimatedSalary}
          </Typography>
          <VerifiedOutlinedIcon sx={{ fontSize: "1.5rem" }} />
        </Box>
        <Typography
          variant="body2"
          sx={{ fontWeight: "bold", marginBottom: 1, marginRight: 29.5 }}
        >
          About Company:
        </Typography>

        <ScrollableComponent content={candidate.jobDetailsFromCompany} />
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Typography
            variant="body2"
            fontWeight={600}
            color="text.primary"
            sx={{ marginRight: 1 }}
          >
            Minimum Experience
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {candidate.minExp ? `${candidate.minExp} years` : "1+ years"}
          </Typography>
        </Box>
        <ApplyButton />
        <ReferralButton />
      </CardContent>
    </Card>
  );
};

export default JobCard;
