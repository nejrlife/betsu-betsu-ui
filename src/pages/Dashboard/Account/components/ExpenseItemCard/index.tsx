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

  // const bull = (
  //   <Box
  //     component="span"
  //     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  //   >
  //     •
  //   </Box>
  // );
  return (
    <Card
      variant="outlined"
      sx={{
        minHeight: "fit-content",
        maxWidth: 500,
        borderRadius: 3,
        borderColor: "rgba(44, 49, 87, 0.35)",
        bgcolor: "rgba(255,255,255,0.96)",
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
          <Grid xs={12}>
            <Typography variant="body1" sx={{ mt: 1.5, mb: 1.5 }}>{ props.expenseName }</Typography>
          </Grid>
          {/* <Grid xs={}>
          </Grid> */}
          <Grid xs={8}>
            <Typography variant="body1" sx={{ mb: 1.5 }}>
              { props.loanerName } → { props.forName }
            </Typography>
          </Grid>
          <Grid xs={4}>
            <Typography variant="body1" sx={{ mb: 1.5 }}>
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