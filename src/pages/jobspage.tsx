// JobsPage.tsx
import React from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, Grid } from "@mui/material";
import { useSearchJobQuery } from "../services/jobApi"; // Adjust the import path as needed
import JobCard, { Job } from "../components/JobCard";

export interface JobQuery {
  title?: string;
  city?: string;
  jobType?: string;
  jobCountry?: string;
}

const JobsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Call the RTK Query hook, passing the search term as a title filter.
  const { data, error, isLoading } = useSearchJobQuery({ title: searchQuery } as JobQuery);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Jobs Page
      </Typography>
      {searchQuery && (
        <Typography variant="body1" align="center" sx={{ mb: 2 }}>
          Showing results for: <strong>{searchQuery}</strong>
        </Typography>
      )}
      {isLoading ? (
        <Typography align="center">Loading jobs...</Typography>
      ) : error ? (
        <Typography align="center" color="error">
          Error fetching jobs.
        </Typography>
      ) : data && data.data && data.data.length > 0 ? (
        <Grid container spacing={2}>
          {data.data.map((job: Job) => (
            <Grid item xs={12} md={6} key={job._id}>
              <JobCard job={job} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography align="center">No jobs found.</Typography>
      )}
    </Box>
  );
};

export default JobsPage;
