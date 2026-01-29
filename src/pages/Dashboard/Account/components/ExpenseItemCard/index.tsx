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
      variant="outlined"
      sx={{
        minHeight: "fit-content",
        minWidth: "fit-content",
        borderRadius: 3,
        borderColor: "rgba(44, 49, 87, 0.35)",
        bgcolor: "var(--bg-child)",
        px: 2.25,
        py: 1.75,
        boxShadow:
          "0 10px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.06)",
        backdropFilter: "blur(6px)",
        transition: "transform 160ms ease, box-shadow 160ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow:
            "0 18px 38px rgba(0,0,0,0.14), 0 4px 10px rgba(0,0,0,0.08)",
        },
    }}>
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
