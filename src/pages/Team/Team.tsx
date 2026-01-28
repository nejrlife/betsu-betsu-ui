import "./Team.less";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { Member } from "../../types";

type TeamProps = {
  memberList: Member[];
};

const Team = ({ memberList }: TeamProps) => {

  return (
    <>
      <div className='grey-box teamContainer'>
        <h2 className='teamHeader'>
          Meet the Team (Demo / placeholder data)
        </h2>
        <hr />
        <div className='teamContentFlex'>
          <div className='teamMembersFlex'>
            {memberList.map((member) => (
              <div key={member.id ?? member.name} className='memberInfoFlex'>
                <Avatar
                  className='circleUserScaled'
                  src={`https://storage.googleapis.com/betsu-betsu_bucket_pic/img/${member.avatarKey}`}
                  alt={member.name}
                >
                  {member.name?.[0]}
                </Avatar>
                <p><b>{member.name}</b></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

const mapStateToProps = (state: any) => ({
  memberList: state.membersDetails?.membersPool ?? []
});

export default connect(mapStateToProps, null)(Team);
