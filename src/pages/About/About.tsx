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
            Betsu Betsu is a shared expense-splitting and obligation-tracking app that helps teams manage group expenses with clarity and fairness. When one member covers costs for others, Betsu Betsu records who owes what—making shared spending transparent, organized, and easy to settle.
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