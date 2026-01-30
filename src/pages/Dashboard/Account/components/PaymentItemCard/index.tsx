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
      sx={{
        minHeight: "fit-content",
        minWidth: "fit-content",
        borderRadius: 4,
        border: "1px solid #e5eee7",
        bgcolor: "var(--bg-section)",
        px: 2.75,
        py: 2,
        position: "relative",
        zIndex: 0,
        overflow: "hidden",
        boxShadow: "none",
        // boxShadow: "0 12px 26px rgba(42, 58, 51, 0.08), 0 2px 6px rgba(42, 58, 51, 0.05)",
        // transition: "box-shadow 180ms ease, border-color 180ms ease",
        // "&:hover": {
        //   boxShadow:
        //     "0 18px 44px rgba(42, 58, 51, 0.12), 0 6px 14px rgba(42, 58, 51, 0.08)",
        //   borderColor: "var(--primary-highlight-strong)",
        //   zIndex: 1,
        // },
        "&:before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "6px",
          backgroundColor: "var(--primary-3)",
          borderRadius: "16px 0 0 16px",
        },
      }}
    >
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
            <Typography variant="body1" sx={{ mb: 1.5, color: "var(--heading-gold)", fontWeight: 700 }}>
                { props.amount }
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}
export default PaymentItemCard;
