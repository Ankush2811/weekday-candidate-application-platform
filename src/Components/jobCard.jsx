import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import HourglassFullTwoToneIcon from "@mui/icons-material/HourglassFullTwoTone";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import JobInfo from "./jobInfo";
import ApplyButton from "../shared/buttons/applyButton";
import ReferralButton from "../shared/buttons/referralButton";
import ScrollableComponent from "../shared/description/scrollableComponent";

const JobCard = ({ candidate }) => {

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
    <Card sx={{ margin: 2, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", border: "1px solid #d7dbd8", borderRadius: 5 }}>
      <CardContent>
        {/* Posted day */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1, border: "2px solid #d7dbd8", borderRadius: 4, width: '60%', pl: 1, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
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
          <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ marginRight: 1 }}>
            Estimated Salary: {getEstimatedSalary()}
          </Typography>
          <VerifiedOutlinedIcon sx={{ fontSize: "1.5rem" }} />
        </Box>

        {/* About company */}
        <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1, marginRight: 29.5 }}>
          About Company:
        </Typography>
        <ScrollableComponent content={candidate.jobDetailsFromCompany} />

        {/* Minimum experience */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
          <Typography variant="body2" fontWeight={600} color="text.primary" sx={{ marginRight: 1 }}>
            Minimum Experience:
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {candidate.minExp ? `${candidate.minExp} years` : "1+ years"}
          </Typography>
        </Box>

        {/* Apply and Referral buttons */}
        <ApplyButton />
        <ReferralButton />
      </CardContent>
    </Card>
  );
};

export default JobCard;
