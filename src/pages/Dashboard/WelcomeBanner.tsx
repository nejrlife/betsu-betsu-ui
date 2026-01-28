import { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import "./WelcomeBanner.less";

interface WelcomeBannerProps {
  userName: string;
  avatarKey: string;
}

const WelcomeBanner = ({ userName, avatarKey }: WelcomeBannerProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [avatarKey]);

  const avatarSrc = avatarKey
    ? `https://storage.googleapis.com/betsu-betsu_bucket_pic/img/${avatarKey}`
    : "";

  return (
    <div className='profileFlex'>
      <Box sx={{ position: "relative", width: 150, height: 150 }}>
        {!imageLoaded && avatarSrc && (
          <CircularProgress
            size={36}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-18px",
              marginLeft: "-18px",
            }}
          />
        )}
        <Avatar
          variant="square"
          className='idPicClass'
          sx={{ width: 150, height: 150 }}
          src={avatarSrc}
          alt={userName}
          imgProps={{
            onLoad: () => setImageLoaded(true),
            onError: () => setImageLoaded(true),
          }}
        >
          {userName?.[0]}
        </Avatar>
      </Box>
      <div className='profileText'>
        {userName?.length > 0 ? (
          <h2>Welcome {userName}</h2>
        ) : (
          <Skeleton variant='text' sx={{ fontSize: '24px' }} width={250} />
        )}
      </div>
    </div>
  );
};

export default WelcomeBanner;
