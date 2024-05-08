import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateDetails } from "../reduxStore/CandidateSlice";
import StatusCode from "../utils/StatusCode";
import Filter from "./Filter";
import JobCard from "./jobCard.jsx";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Component for displaying a list of jobs
const JobList = () => {
  // State for managing modal visibility and selected candidate
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  // State for pagination
  const [page, setPage] = useState(1);
  // State for storing filtered candidates
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const limit = 10; // Number of items to fetch per page

  // Redux hooks
  const dispatch = useDispatch();
  const { data: candidateDetails, status } = useSelector(
    (state) => state?.candidates
  );

  // Fetch data on initial render and when page changes
  useEffect(() => {
    fetchData();
  }, [page]);

  // Set filtered candidates when candidate details change
  useEffect(() => {
    setFilteredCandidates(candidateDetails);
  }, [candidateDetails]);

  // Function to fetch candidate details
  const fetchData = () => {
    dispatch(getCandidateDetails({ limit: page * limit }));
  };

  // Function to fetch more data for infinite scroll
  const fetchMoreData = () => {
    setPage(page + 1);
  };

  // Function to handle modal close
  const handleCloseModal = () => setShowModal(false);

  // Loading state while initial data is being fetched
  if (status === StatusCode.LOADING && page === 1) {
    return (
      <p>
        <CircularProgress color="success" />
      </p>
    );
  }

  // Error state if there's an issue fetching data
  if (status === StatusCode.ERROR) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Something went wrong!!! Please try again later
      </Alert>
    );
  }

  return (
    <Box p={2} sx={{ paddingLeft: "5%", paddingRight: "5%" }}>
      <div>
        {/* Filter component */}
        <Filter
          setFilteredCandidates={setFilteredCandidates}
          candidateDetails={candidateDetails}
        />

        {/* Infinite scroll */}
        <div>
          <InfiniteScroll
            dataLength={filteredCandidates.length}
            next={fetchMoreData}
            hasMore={filteredCandidates?.length % limit === 0}
            loader={
              filteredCandidates.length === 0 && (
                <p>
                  <CircularProgress color="success" />
                </p>
              )
            }
            endMessage={<p>Tada !! You have reached the end.</p>}
          >
            <Grid container spacing={3}>
              {/* Render job cards */}
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((job) => (
                  <Grid item xs={12} sm={6} md={4} key={job.id}>
                    <JobCard job={job} />
                  </Grid>
                ))
              ) : (
                <div>No data Available</div>
              )}
            </Grid>
          </InfiniteScroll>
        </div>

        {/* Modal for displaying job description */}
        <Dialog open={showModal} onClose={handleCloseModal}>
          <DialogContent>
            <h3 className="text-center">Job Description</h3>
            {selectedCandidate && selectedCandidate.jobDetailsFromCompany}
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
};

export default JobList;
