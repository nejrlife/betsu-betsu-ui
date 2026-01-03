import { useEffect } from "react";

// import Skeleton from '@mui/material/Skeleton';
import "./Account.less";
// import { AccountDetail } from "../types";
// import { get, find, partition } from 'lodash';
// import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { AccordionDetails } from "@mui/material";
import ReusableCard from "../../../components/ReusableCard";

const Account = (_props: any) => {

  
  // const navigate = useNavigate();

  useEffect(() => {
  }, []);

  
  return (
    <div>
      <Accordion
        key={'panel-' + '12345'}
        expanded={true}
        // onChange={handleChange('panel-' + item._id)}
      >
        <AccordionSummary
          aria-controls={'panel-controls-' + '12345'}
          id={'panel-header-' + '12345'}
        >
          <Typography component="span">{'Boracay Trip'}</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion
        key={'panel-' + '1234'}
        expanded={true}
        // onChange={handleChange('panel-' + item._id)}
      >
        <AccordionSummary
          aria-controls={'panel-controls-' + '1234'}
          id={'panel-header-' + '1234'}
        >
          <Typography component="span">{'Summary'}</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion
        key={'panel-' + '123'}
        expanded={true}
        // onChange={handleChange('panel-' + item._id)}
      >
        <AccordionSummary
          aria-controls={'panel-controls-' + '123'}
          id={'panel-header-' + '123'}
        >
          <Typography component="span">{'Expenses'}</Typography>
        </AccordionSummary>
        <AccordionDetails className="accDetails">
          <ReusableCard key="card1"/>
          <ReusableCard key="card2"/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const mapStateToProps = (state:any) => ({
  memberId: state.authenticateUser.memberId,
  retrieveAccountDetailsByMember: state.userAccounts.accounts,
});

export default connect(mapStateToProps, null)(Account);