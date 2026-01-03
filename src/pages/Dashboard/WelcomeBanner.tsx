import Skeleton from '@mui/material/Skeleton';
import "./WelcomeBanner.less";

interface WelcomeBannerProps {
  idPic: string;
  userName: string;
  userLastLogin: string;
}

const WelcomeBanner = ({ idPic, userName, userLastLogin }: WelcomeBannerProps) => {
  return (
    <div className='profileFlex'>
      <img className='idPicClass' src={idPic} alt="idPic" />
      <div className='profileText'>
        {userName?.length > 0 ? (
          <h2>Welcome {userName}</h2>
        ) : (
          <Skeleton variant='text' sx={{ fontSize: '24px' }} width={250} />
        )}
        {userLastLogin?.length > 0 ? (
          <p>Last login: {userLastLogin}</p>
        ) : (
          <Skeleton variant='text' sx={{ fontSize: '14px' }} width={150} />
        )}
      </div>
    </div>
  );
};

export default WelcomeBanner;