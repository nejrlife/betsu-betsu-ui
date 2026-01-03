import "./Team.less";
import circleUser from "../../assets/img/circle-user.png"

const Team = () => {
  const data = {
    memberList :[
      {
        name:"Beng Tiong Tang",
      },
      {
        name:"Niraj Kumar Jha",
      },
      {
        name:"Siddharth Pandey",
      },
      {
        name:"Jatin Suri",
      },
      {
        name:"Parasmani Jain",
      },
      {
        name:"Saurabh Nilegaonkar",
      },
      {
        name:"Bhawana Sharma",
      },
      {
        name:"Vimlesh Singh",
      }
    ]
  };

  return (
    <>
      <div className='grey-box teamContainer'>
        <h2 className='teamHeader'>
          Meet the Team
        </h2>
        <hr />
        <div className='teamContentFlex'>
          <div className='teamMembersFlex'>
            {data.memberList.map((member) => (
              <div key={member.name} className='memberInfoFlex'>
                <img className='circleUserScaled' src={circleUser} alt="circleUser" />
                <p><b>{member.name}</b></p>
              </div>
            ))}
          </div>
          {/* <div className='animateContent'>
            <div className='animation'/>
          </div> */}
        </div>
      </div>
    </>
  )
}

export default Team;