import "./ExpenseItemCard.less";
// import { useState } from "react";
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const ExpenseItemCard = (props: any) => {
  return (
    <Card
  sx={{
    minHeight: "fit-content",
    minWidth: "fit-content",
    borderRadius: 4,

    // keep the "outlined" look, but don't rely on variant for it
    border: "1px solid var(--border-subtle)",
    bgcolor: "var(--bg-child)",

    px: 2.75,
    py: 2,

    // IMPORTANT for shadows
    position: "relative",
    zIndex: 0,
    overflow: "visible",

    // soft, diffused shadow like your reference
    boxShadow:
      "rgba(0, 31, 44, 0.4) 0px 3px 9px -4px",

    transition: "box-shadow 180ms ease, border-color 180ms ease",

    "&:hover": {
      boxShadow:
        "0 18px 44px rgba(42, 58, 51, 0.12), 0 6px 14px rgba(42, 58, 51, 0.07)",
      borderColor: "var(--primary-highlight-strong)",
      zIndex: 1,
    },
  }}
>
      <CardContent
        sx={{
          padding: 2,
          // pb: 0,
          "&:last-child": { pb: 0 },
        }}>
        {/* <Box sx={{ flexGrow: 1 }}> */}
        <Grid container spacing={2}>
          <Grid
            className="gridItem"
            item
            xs={7}
          >
            <Typography variant="body1" sx={{ mb: 1.5 }}>{ props.expenseName }</Typography>
          </Grid>
          {/* <Grid xs={}>
          </Grid> */}
          <Grid className="gridItem" item xs={4}>
            <Typography variant="body1" sx={{ mb: 1.5 }}>
              { props.loanerName } → { props.forName }
            </Typography>
          </Grid>
          <Grid className="gridItem" item xs={1}>
            <Typography variant="body1" sx={{ mb: 1.5, color: "var(--heading-gold)"}}>
                { props.amount }
            </Typography>
          </Grid>
        </Grid>
        {/* </Box> */}
      </CardContent>
    </Card>
  )
}
export default ExpenseItemCard;
