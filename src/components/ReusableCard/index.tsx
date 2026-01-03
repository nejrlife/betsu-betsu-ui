import "./ReusableCard.less";
// import { useState } from "react";
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ReusableCard = () => {

  // const bull = (
  //   <Box
  //     component="span"
  //     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  //   >
  //     •
  //   </Box>
  // );

  return (
    <Card sx={{ maxWidth: 275 }}>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Labor - Day 1 - hukay for spetic tank
        </Typography>
        <Typography variant="body1" sx={{ mt: 2.5, mb: 1.5 }}>Loaner: Arth</Typography>
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          For: Braw, Craw
        </Typography>
        <Typography variant="body1" sx={{ mb: 1.5 }}>
          Value: 1000
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Remarks</Button>
      </CardActions>
    </Card>
  )
}
export default ReusableCard;