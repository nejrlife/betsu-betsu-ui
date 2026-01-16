import "./PaymentItemCard.less";
// import { useState } from "react";
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const PaymentItemCard = (props: any) => {

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
        minWidth: "fit-content",
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
        <Grid container spacing={2}>
          <Grid className="gridItem" item xs={11}>
            <Typography variant="body1" sx={{ mb: 1.5 }}>
              { props.payorName } → { props.payeeName }
            </Typography>
          </Grid>
          <Grid className="gridItem" item xs={1}>
            <Typography variant="body1" sx={{ mb: 1.5, color: '#CC9900'}}>
                { props.amount }
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default PaymentItemCard;