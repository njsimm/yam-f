import React from "react";
import ProtectedLayout from "../layout/ProtectedLayout";
import Grid from "@mui/material/Grid";
import BusinessesList from "./BusinessesList";

const BusinessesPage = ({ deleteBusiness }) => {
  return (
    <ProtectedLayout title="Businesses">
      <Grid container spacing={3}>
        <BusinessesList deleteBusiness={deleteBusiness} />
      </Grid>
    </ProtectedLayout>
  );
};

export default BusinessesPage;
