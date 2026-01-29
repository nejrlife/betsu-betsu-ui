import React, { useEffect, useState, useRef } from "react";
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
import { get, find, partition, first } from 'lodash';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import AddAccountForm from "./components/AddAccountForm";

const Tracker = (props: any) => {

  const [expandedPanel, setExpandedPanel] = useState<string | false>(false);
  const [openedTab, setOpenedTab] = useState<number>(1);

  const [addAcctDialogOpened, setAddAcctDialogOpened] = useState<boolean>(false);
  const [openAccounts, setOpenAccounts] = useState<AccountDetail[]>([]);
  const [closedAccounts, setClosedAccounts] = useState<AccountDetail[]>([]);

  const [accountsData, setAccountsData] = useState<AccountDetail[]>([]);

  const handleChange =
    (panelId: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpandedPanel(newExpanded ? panelId : false);
    };
  
  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setOpenedTab(newValue);
  };

  const handleAddAccount = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAddAcctDialogOpened(!addAcctDialogOpened);
  };

  const usePrevious = (value:any) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const prevOpenedTab = usePrevious(openedTab);

  const navigate = useNavigate();

  useEffect(() => {
    if (props.stAuthMemberId && props.stUserAcctsAccounts?.length > 0) {
      setAccountsData(props.stUserAcctsAccounts);
    }
  },[props.stAuthMemberId, props.stUserAcctsAccounts]);

  useEffect(() => {
    if (accountsData?.length > 0) {
      const [open, closed] = partition(accountsData, { isAccountOpen: true });
      setOpenAccounts(open);
      setClosedAccounts(closed);
      const prioritizedId = get(first(accountsData), '_id');
      if (prioritizedId) {
        setExpandedPanel('panel-' + prioritizedId);
      }
    }
  }, [accountsData]);

  useEffect(() => {
    if (accountsData?.length > 0) {
      const [open, closed] = partition(accountsData, { isAccountOpen: true });
      setOpenAccounts(open);
      setClosedAccounts(closed);
      const prioritizedId = get(first(accountsData), '_id');
      if (prioritizedId) {
        setExpandedPanel('panel-' + prioritizedId);
      }
    }
  }, []);

  useEffect(() => {
    if (openedTab !== prevOpenedTab) {
      const prioritizedId = get(first(openedTab === 1 ? openAccounts: closedAccounts), '_id');
      if (prioritizedId) {
        setExpandedPanel('panel-' + prioritizedId);
      }
    }
  }, [openedTab, prevOpenedTab]);
  
  return (
    <div className='accountBalanceTable'>
      <AddAccountForm 
        open={addAcctDialogOpened}
        handleClose={() => {
          setAddAcctDialogOpened(false)
        }}
      />
      {true ?
        (<div
          style={{
            alignItems: 'center'
          }}
          className="globalFlexRow">
          <h3>Account Tracker</h3>
          <IconButton
            sx={{
              maxHeight: 40
            }}
            onClick={handleAddAccount}
            aria-label="addAcc"
          >
            <AddIcon />
          </IconButton>
        </div>) :
        (<Skeleton variant='text' sx={{ fontSize: '18px', marginBlockStart: '1em', marginBlockEnd: '1em' }} width={200} />)
      }
      <div>
        <Tabs value={openedTab} onChange={handleTabChange} aria-label="Tracker tabs">
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
                  <h4>The account was opened on {item.createdAt}</h4>
                </AccordionDetails>
                <AccordionActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--btn-primary-bg)",
                      color: "var(--btn-primary-text)",
                      "&:hover": {
                        backgroundColor: "var(--btn-primary-bg)",
                      },
                    }}
                    onClick={() => {
                      navigate('/home/dashboard/account/' + item._id);
                    }}
                  >
                    View Account
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
                    <h4>The account was closed on {item.createdAt}</h4>
                  </AccordionDetails>
                <AccordionActions>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "var(--btn-primary-bg)",
                      color: "var(--btn-primary-text)",
                      "&:hover": {
                        backgroundColor: "var(--btn-primary-bg)",
                      },
                    }}
                    onClick={() => {
                      navigate('/home/dashboard/account/' + item._id);
                    }}
                  >
                    View Account
                    </Button>
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
  stAuthMemberId: state.authenticateUser.memberId,
  stUserAcctsAccounts: state.userAccounts.accounts,
});

export default connect(mapStateToProps, null)(Tracker);
