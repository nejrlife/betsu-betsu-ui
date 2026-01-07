import "./About.less";
import placeholder from "../../assets/img/static_placeholder.jpg";

const About = () => {
  return (
    <>
      <div className='grey-box aboutContainer'>
        <h2 className='aboutHeader'>
          About betsu-betsu
        </h2>
        <hr />
        <div className='placeholderFlex'>
          <img className='placeholderScaled' src={placeholder} alt="placeholder" />
          <p>
            betsu-betsu is a research group, founded to check different javascript frameworks based on different design patterns. <br /><br />During Kick-off it will test React, Angular, Knockout and Ember JS features. This use case will prove different aspects of framework capabilities.
          </p>
        </div>
        {/* <h3 className='reusableComponentHeader'>
          Re-usable Component
        </h3>
        <div className='reusableComponentFlex'>
        </div> */}
      </div>
    </>
  )
}

export default About;