import { useEffect, useState, useMemo } from "react";

// import Skeleton from '@mui/material/Skeleton';
import "./Account.less";
// import { AccountDetail } from "../types";
// import { get, find, partition } from 'lodash';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Typography from '@mui/material/Typography';
import ExpenseItemCard from "./components/ExpenseItemCard";
import PaymentItemCard from "./components/PaymentItemCard";
import AddExpenseItemForm from "./components/AddExpenseItemForm";
import MakePaymentItemForm from "./components/MakePaymentItemForm";
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import { useParams } from "react-router-dom";
import { RETRIEVE_EXPANDED_ACCOUNT_DETAILS } from "../../../sagas/constants";
import { ExpenseItem, Member } from "../../../types"
import { find, get, mapValues, groupBy, sumBy, omit, filter, includes, forEach } from "lodash";
import { Button } from "@mui/material";
import SummaryComponent from "./components/SummaryComponent";
import { setExpandedAccount } from "../../../actions/setExpandedAccountId";
import { sortAndDeduplicateDiagnostics } from "typescript";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  color: theme.palette.text.secondary,
  lineHeight: '60px',
  paddingLeft: '1rem'
}));


const lightTheme = createTheme({
  palette: {
    primary: {
      main: '#CC0000',
      light: '#CC0000',
      dark: '#CC0000',
      contrastText: '#CC0000',
    },
  },
});

const Account = (props: any) => {

  const {
    dispatch  
  } = props;
  
  const { accountId } = useParams();
  const [memberPool, setMemberPool] = useState<Member[]>([]);
  const [isAddExpenseDialogOpen, setAddExpenseDialogOpen] = useState<boolean>(false);
  const [isMakePaymentDialogOpen, setMakePaymentDialogOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const [openedTab, setOpenedTab] = useState<number>(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setOpenedTab(newValue);
  };

  const handleAddExpenseItem = (event: any) => {
    event.preventDefault();
    setAddExpenseDialogOpen(true);
  }

  const handleMakePaymentItem = (event: any) => {
    event.preventDefault();
    setMakePaymentDialogOpen(true);
  }

  const handleBackButton = (event: any) => {
    event.preventDefault();
    navigate('/home/dashboard');
  }


  useEffect(() => {
    if (props.stMembersDetails?.membersPool?.length > 0 && props.stExpandedAcctId && props.stAccounts?.length > 0) {
      const contributingMemberIds = get(
        find(props.stAccounts, { _id: props.stExpandedAcctId }),
        "contributingMemberIds",
        []
      );
      const contributingMembers = filter(props.stMembersDetails?.membersPool, obj =>
        includes(contributingMemberIds, obj._id)
      );
      setMemberPool(contributingMembers);
    }
  },[props.stExpandedAcctId, props.stMembersDetails, props.stAccounts]);

  useEffect(() => {
    if (accountId && props.stExpandedAcctId !== accountId) {
      dispatch(setExpandedAccount(accountId));
    }
  },[accountId]);

  useEffect(() => {
    if (!props.stExpandedAccts[props.stExpandedAcctId]) {
      dispatch({
        type: RETRIEVE_EXPANDED_ACCOUNT_DETAILS,
        payload: {
          accountId
        }
      });
    }
  },[props.stExpandedAcctId]);

  const membersTotalLoanMap = useMemo(() => mapValues(
    groupBy(props.stExpandedAccts[props.stExpandedAcctId]?.expenseDetails, "forMemberId"),
    expenseItem => sumBy(expenseItem, "amount")
  ), [props.stExpandedAccts[props.stExpandedAcctId]?.expenseDetails]);

  const loaneesMapToPayToEachLoaner = useMemo(() => {
    let mapRes = {};
    forEach(memberPool, (lenderMember: any) => {
      const lenderExpenseDetes= filter(
        props.stExpandedAccts[props.stExpandedAcctId]?.expenseDetails,
        item => item.forMemberId === lenderMember._id
      );
      let lenderRecord = {}
      forEach(memberPool, (lendeeMember: any) => {
        const lendeeExpenseDetes= filter(
          lenderExpenseDetes,
          item => item.cashOutByMemberId === lendeeMember._id
        );
        let newVal;
        if (lendeeExpenseDetes?.length > 0) {
          newVal = {
            [lendeeMember._id]: sumBy(lendeeExpenseDetes, "amount")
          }
        } else {
          newVal = {
            [lendeeMember._id]: 0
          }
        }
        
        lenderRecord = { ...lenderRecord, ...newVal }
      })
      const newRecordy = {
        [lenderMember._id]: { ...lenderRecord }
      }
      mapRes = { ...mapRes, ...newRecordy}
    });
    return mapRes;
  }, [memberPool, props.stExpandedAccts[props.stExpandedAcctId]?.expenseDetails]);

  const loaneesMapRemainingToPay = useMemo(() => {
    const ret = mapValues(loaneesMapToPayToEachLoaner, (toPayDetes: any, loaneeId: any) => {
      const remBal = mapValues(omit(toPayDetes, loaneeId), (remainingBalanceToLoaner: any, loanerId: any) => {
        const loanerBalanceToLoanee = get(get(loaneesMapToPayToEachLoaner, loanerId), loaneeId);
        const adjustedBalanceOfLoanee = remainingBalanceToLoaner - loanerBalanceToLoanee;
        const totalPaymentsOfLoaneeToLoaner = sumBy(
          filter(props.stExpandedAccts[props.stExpandedAcctId]?.paymentDetails, p =>
            p.paidByMemberId === loaneeId &&
            p.paidToMemberId === loanerId
          ),
          "amount"
        );
        return (adjustedBalanceOfLoanee < 0 ? 0 : adjustedBalanceOfLoanee) - totalPaymentsOfLoaneeToLoaner;
      });
      return remBal;
    });
    return ret;
    }, [loaneesMapToPayToEachLoaner, props.stExpandedAccts[props.stExpandedAcctId]?.paymentDetails]);

  useEffect(() => {
    console.log("Totals changed");
    console.log(membersTotalLoanMap);
  },[membersTotalLoanMap])

  useEffect(() => {
    console.log("Loanee map to pay to loaner Totals changed");
    console.log(loaneesMapToPayToEachLoaner);
  },[loaneesMapToPayToEachLoaner])

  useEffect(() => {
    console.log("Expense details");
    console.log(props.stExpandedAccts[props.stExpandedAcctId]?.expenseDetails);
  },[props.stExpandedAccts[props.stExpandedAcctId]?.expenseDetails])

  useEffect(() => {
    console.log("Payment details");
    console.log(props.stExpandedAccts[props.stExpandedAcctId]?.paymentDetails);
  },[props.stExpandedAccts[props.stExpandedAcctId]?.paymentDetails])

  useEffect(() => {
    console.log("Remaining Balance details");
    console.log(loaneesMapRemainingToPay);
  },[loaneesMapRemainingToPay])
  
  return (
    <>
      <AddExpenseItemForm
        open={isAddExpenseDialogOpen}
        handleClose={() => {
          setAddExpenseDialogOpen(false)
        }}
        memberPool={memberPool}
        stExpandedAcctId={props.stExpandedAcctId}
      />
      <MakePaymentItemForm
        open={isMakePaymentDialogOpen}
        handleClose={() => {
          setMakePaymentDialogOpen(false)
        }}
        memberPool={memberPool}
        stExpandedAcctId={props.stExpandedAcctId}
      />
      <ThemeProvider theme={lightTheme}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          <Box
            className="globalFlexRow"
            sx={{
              justifyContent: 'flex-start'
            }}>
            <IconButton
              sx={{
                maxHeight: 40,
                maxWidth: '3rem'
              }}
              onClick={handleBackButton}
              aria-label="backButton"
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Item key={'expenseTitle'} elevation={3} sx={{ backgroundColor: "var(--bg-section-alt)" }}>
            <div className="globalFlexRow">
              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  color: "var(--text-primary)"
                }}
                variant="h5"
                component="h2">
                Account Name
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  color: "var(--heading-purple)"
                }}
                variant="h5"
                component="h2">
                { props.stExpandedAccts[props.stExpandedAcctId]?.name }
              </Typography>
            </div>
          </Item>
          <Item key={'expenseSummary'} elevation={3} sx={{ backgroundColor: "var(--bg-section-alt)" }}>
              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  color: "var(--text-primary)"
                }}
                variant="h5"
                component="h2">
                Summary
            </Typography>
            <SummaryComponent
              loaneesMapRemainingToPay={loaneesMapRemainingToPay}
              membersTotalLoanMap={membersTotalLoanMap}
              loaneesMapToPayToEachLoaner={loaneesMapToPayToEachLoaner}
            />
          </Item>
          <Item key={'expenseList'} elevation={3} sx={{ backgroundColor: "var(--bg-section-alt)" }}>
            <div
              style= {{
                display: 'flex',
                flexDirection: 'row',
                gap: '5rem',
                minWidth: '1280px'
              }}>
              <div
                style= {{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem'
                }}>
                <Typography
                  sx={{
                    mt: 1.5,
                    mb: 1.5,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '2rem',
                    color: "var(--text-primary)"
                  }}
                  variant="h5"
                  component="h2">
                  Expenses
                </Typography>
                <Tabs className="accountTabs" value={openedTab} onChange={handleTabChange} aria-label="Account tabs">
                  <Tab label="Expenses" />
                  <Tab label="Payments" />
                </Tabs>
                <div className="globalFlexRow">
                  <Box
                    className="accountItemsSection"
                    sx={{
                      pt: 1.5,
                      pb: 2.5,
                      backgroundColor: "var(--bg-section-alt)",
                      backgroundImage: "none",
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
                      maxHeight: 700,
                      minWidth: '70em',
                      overflowY: "auto",
                    }}
                  >
                    {openedTab === 0 ?
                      (props.stExpandedAccts[props.stExpandedAcctId]?.expenseDetails?.length > 0 ?
                          props.stExpandedAccts[props.stExpandedAcctId].expenseDetails?.map((expenseItem: any) => (
                            <ExpenseItemCard
                              key={expenseItem._id}
                              expenseId={expenseItem._id}
                              expenseName={expenseItem.name}
                              loanerName={
                                get(find(memberPool, { _id: expenseItem.cashOutByMemberId }), "name")
                              }
                              forName={
                                get(find(memberPool, { _id: expenseItem.forMemberId }), "name")
                              }
                              amount={expenseItem.amount}
                            />
                        )) :
                        <div />
                      ) :
                      (props.stExpandedAccts[props.stExpandedAcctId]?.paymentDetails?.length > 0 ?
                          props.stExpandedAccts[props.stExpandedAcctId].paymentDetails?.map((paymentItem: any) => (
                            <PaymentItemCard
                              key={paymentItem._id}
                              payorName={
                                get(find(memberPool, { _id: paymentItem.paidByMemberId }), "name")
                              }
                              payeeName={
                                get(find(memberPool, { _id: paymentItem.paidToMemberId }), "name")
                              }
                              amount={paymentItem.amount}
                            />
                        )) :
                        <div />
                      )
                    }
                  </Box>
                  <Box
                    className="globalFlexColumn"
                    sx={{
                      pt: '12px'
                    }}>
                    <Button
                      onClick={handleAddExpenseItem}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--btn-primary-bg)",
                        color: "var(--btn-primary-text)",
                        "&:hover": {
                          backgroundColor: "var(--btn-primary-hover)",
                        },
                      }}
                    >
                      Add Expense
                    </Button>
                    <Button
                      onClick={handleMakePaymentItem}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--btn-primary-bg)",
                        color: "var(--btn-primary-text)",
                        "&:hover": {
                          backgroundColor: "var(--btn-primary-hover)",
                        },
                      }}
                    >
                      Add Payment
                    </Button>
                    <Button
                      disabled
                      onClick={handleMakePaymentItem}
                      variant="contained"
                      sx={{
                        backgroundColor: "var(--btn-primary-bg)",
                        color: "var(--btn-primary-text)",
                        "&:hover": {
                          backgroundColor: "var(--btn-primary-hover)",
                        },
                      }}
                    >
                      Close Account
                    </Button>
                  </Box>
                </div>
              </div>
            </div>
          </Item>
        </div>
      </ThemeProvider>
    </>
  );
};

const mapStateToProps = (state:any) => ({
  stExpandedAccts: state.currentOpenedAccount.expandedAcctDetails,
  stExpandedAcctId: state.currentOpenedAccount.expandedAcctId,
  stMembersDetails: state.membersDetails,
  stAccounts: state.userAccounts.accounts
});

export default connect(mapStateToProps, null)(Account);
