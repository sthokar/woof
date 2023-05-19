import React from "react";
import { Grid, Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const ImageContainer = styled(Box)`
  display: flex;
  justify-content: center;
`;

const ResultItem = styled(Grid)`
  display: flex;
  justify-content: center;
`;

const SearchResults = ({ results }) => {
  return (
    <Grid container spacing={2}>
      {results.map((result) => (
        <ResultItem item xs={12} sm={6} md={4} key={result.zip_code}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={1}>
              {result.city}, {result.state}
            </Typography>
            <ImageContainer>
              <img src={result.image} alt={result.city} style={{ maxWidth: "100%", maxHeight: "200px" }} />
            </ImageContainer>
            <Typography variant="body1">Latitude: {result.latitude}</Typography>
            <Typography variant="body1">Longitude: {result.longitude}</Typography>
          </Paper>
        </ResultItem>
      ))}
    </Grid>
  );
};

export default SearchResults;
