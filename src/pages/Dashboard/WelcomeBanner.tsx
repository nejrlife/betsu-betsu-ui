import Skeleton from '@mui/material/Skeleton';
import Avatar from '@mui/material/Avatar';
import "./WelcomeBanner.less";

interface WelcomeBannerProps {
  userName: string;
  avatarKey: string;
}

const WelcomeBanner = ({ userName, avatarKey }: WelcomeBannerProps) => {
  return (
    <div className='profileFlex'>
      <Avatar
        variant="square"
        className='idPicClass'
        sx={{ width: 150, height: 150 }}
        src={`https://storage.googleapis.com/betsu-betsu_bucket_pic/img/${avatarKey}`}
        alt={userName}
      >
        {userName?.[0]}
      </Avatar>
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
