import React from "react";
import ProtectedLayout from "../layout/ProtectedLayout";
import Grid from "@mui/material/Grid";
import SalesList from "./SalesList";

const SalesPage = ({ deleteSale, deleteBusinessSale }) => {
  return (
    <ProtectedLayout title="Sales">
      <Grid container spacing={3}>
        <SalesList
          deleteSale={deleteSale}
          deleteBusinessSale={deleteBusinessSale}
        />
      </Grid>
    </ProtectedLayout>
  );
};

export default SalesPage;
