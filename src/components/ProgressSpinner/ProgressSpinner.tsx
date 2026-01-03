import { ColorRing } from "react-loader-spinner";

const ProgressSpinner = () => {
  return (
    <ColorRing
      height={70}
      width={70}
      wrapperStyle={
        {
          'position': 'fixed',
          'top': '40%',
          'left': '50%',
          'zIndex': '9999',
          'transition': 'opacity 0.2s',
          'visibility': 'visible',
          'opacity': '1'
        }
      }
      colors={['#00CCCC', '#00CCCC', '#00CCCC', '#00CCCC', '#00CCCC']}
    />
  )
}
export default ProgressSpinner;