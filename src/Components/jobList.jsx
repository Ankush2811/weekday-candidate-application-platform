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

const JobList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [page, setPage] = useState(1);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const limit = 10;

  const dispatch = useDispatch();
  const { data: candidateDetails, status } = useSelector(
    (state) => state?.candidates
  );

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    setFilteredCandidates(candidateDetails);
  }, [candidateDetails]);

  const fetchData = () => {
    dispatch(getCandidateDetails({ limit: page * limit }));
  };

  const fetchMoreData = () => {
    setPage(page + 1);
  };

  const handleCloseModal = () => setShowModal(false);

  if (status === StatusCode.LOADING && page === 1) {
    return (
      <p>
        <CircularProgress color="success" />
      </p>
    );
  }

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
        <Filter
          setFilteredCandidates={setFilteredCandidates}
          candidateDetails={candidateDetails}
        />

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
