import React, { useEffect, useState } from "react";
import Skeleton from '@mui/material/Skeleton';
import "./Tracker.less";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { AccountDetail } from "../types";
import { get, find, partition } from 'lodash';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Tracker = (props: any) => {

  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);
  const [openedTab, setOpenedTab] = useState<number>(1);

  const [openAccounts, setOpenAccounts] = useState<AccountDetail[]>([]);
  const [closedAccounts, setClosedAccounts] = useState<AccountDetail[]>([]);

  const [userBalance, setUserBalance] = useState<string>('');
  const [accountsData, setAccountsData] = useState<AccountDetail[]>([]);

  const handleChange =
    (panelId: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedPanel(newExpanded ? panelId : false);
    };
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setOpenedTab(newValue);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (props.memberId && props.retrieveAccountDetailsByMember?.length > 0) {
      setAccountsData(props.retrieveAccountDetailsByMember);
    }
  },[props.memberId, props.retrieveAccountDetailsByMember]);

  useEffect(() => {
    console.log("it loaded");
    setUserBalance("12");
  }, []);

  useEffect(() => {
    if (accountsData?.length > 0) {
      const [open, closed] = partition(accountsData, { isAccountOpen: true });
      setOpenAccounts(open);
      setClosedAccounts(closed);
      const prioritizedId = get(find(accountsData, { isAccountPriority: true }), '_id');
      if (prioritizedId) {
        setExpandedPanel('panel-' + prioritizedId);
      }
    }
  }, [accountsData]);
  
  return (
    <div className='accountBalanceTable'>
      {userBalance?.length > 0 ?
        (<h3>Account Tracker</h3>) :
        (<Skeleton variant='text' sx={{ fontSize: '18px', marginBlockStart: '1em', marginBlockEnd: '1em' }} width={200} />)
      }
      <div>
        <Tabs value={openedTab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Closed" />
          <Tab label="Open" />
        </Tabs>
        {openedTab === 1 && openAccounts && openAccounts.length > 0 ?
          (
            <div>
              {openAccounts?.map((item, i) => (
                <Accordion
                  key={'panel-' + item._id}
                  expanded={expandedPanel === 'panel-' + item._id}
                  onChange={handleChange('panel-' + item._id)}
                >
                <AccordionSummary
                  aria-controls={'panel-controls-' + item._id}
                  id={'panel-header-' + item._id}
                >
                  <Typography component="span">{item.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <h4>The account was opened on {item.dateOpened}</h4>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    onClick={() => {
                      navigate('/home/dashboard/account/' + item._id);
                    }}
                  >
                    Expand Account
                  </Button>
                </AccordionActions>
              </Accordion>
              ))}
            </div>
          ) : openedTab === 0 && closedAccounts && closedAccounts.length > 0 ?
            (
              <div>
                {closedAccounts?.map((item, i) => (
                  <Accordion
                    key={'panel-' + item._id}
                    expanded={expandedPanel === 'panel-' + item._id}
                    onChange={handleChange('panel-' + item._id)}
                  >
                  <AccordionSummary
                    aria-controls={'panel-controls-' + item._id}
                    id={'panel-header-' + item._id}
                  >
                    <Typography component="span">{item.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <h4>The account was closed on {item.dateOpened}</h4>
                  </AccordionDetails>
                  <AccordionActions>
                    <Button>Expand Account</Button>
                  </AccordionActions>
                </Accordion>
                ))}
              </div>
            ) :
            // (<Skeleton variant='rounded' width={680} height={150} />)
            (<div />)
        }
      </div>
    </div>
  );
};

const mapStateToProps = (state:any) => ({
  memberId: state.authenticateUser.memberId,
  retrieveAccountDetailsByMember: state.userAccounts.accounts,
});

export default connect(mapStateToProps, null)(Tracker);