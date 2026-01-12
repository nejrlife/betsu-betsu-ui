import { useEffect, useState, useMemo } from "react";

// import Skeleton from '@mui/material/Skeleton';
import "./Account.less";
// import { AccountDetail } from "../types";
// import { get, find, partition } from 'lodash';
// import { useNavigate } from "react-router-dom";
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
import { find, get, mapValues, groupBy, sumBy, omit, filter } from "lodash";
import { Button } from "@mui/material";
import SummaryContent from "./components/SummaryContent";

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
      contrastText: '#FFFFFF',
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
  // const navigate = useNavigate();

  const handleAddExpenseItem = (event: any) => {
    event.preventDefault();
    setAddExpenseDialogOpen(true);
  }

  const handleMakePaymentItem = (event: any) => {
    event.preventDefault();
    setMakePaymentDialogOpen(true);
  }

  useEffect(() => {
    if (props.stMembersDetails?.membersPool?.length > 0) {
      setMemberPool(props.stMembersDetails?.membersPool);
    }
  },[props.stMembersDetails]);

  useEffect(() => {
    if (accountId && (!props.stExpandedAcctId)) {
      dispatch({
        type: RETRIEVE_EXPANDED_ACCOUNT_DETAILS,
        payload: {
          accountId
        }
      });
    }
  },[accountId, props.stExpandedAcctId]);

  const membersTotalLoanMap = useMemo(() => mapValues(
    groupBy(props.stExpandedAccts?.expenseDetails, "forMemberId"),
    expenseItem => sumBy(expenseItem, "amount")
  ), [props.stExpandedAccts?.expenseDetails]);

  const loaneesMapToPayToEachLoaner = useMemo(() => mapValues(
    groupBy(props.stExpandedAccts?.expenseDetails, "forMemberId"),
    borrowerItems =>
      mapValues(
        groupBy(borrowerItems, "cashOutByMemberId"),
        lenderItems => sumBy(lenderItems, "amount")
      )
  ), [props.stExpandedAccts?.expenseDetails]);

  const loaneesMapRemainingToPay = useMemo(() => {
    const ret = mapValues(loaneesMapToPayToEachLoaner, (toPayDetes: any, loaneeId: any) => {
      console.log("loaneesMapRemainingToPay - ret");
      console.log(loaneeId);
      console.log(toPayDetes);
      const remBal = mapValues(omit(toPayDetes, loaneeId), (remainingBalanceToLoaner: any, loanerId: any) => {
        console.log("loaneesMapRemainingToPay - remBal");
        console.log(loanerId);
        console.log(remainingBalanceToLoaner);
        const loanerBalanceToLoanee = get(get(loaneesMapToPayToEachLoaner, loanerId), loaneeId);
        console.log("loaneesMapRemainingToPay - loanerBalanceToLoanee");
        console.log(loanerBalanceToLoanee);
        console.log("loaneesMapRemainingToPay - loanerBalanceToLoanee");
        
        const adjustedBalanceOfLoanee = remainingBalanceToLoaner - loanerBalanceToLoanee;
        console.log(adjustedBalanceOfLoanee);
        const totalPaymentsOfLoaneeToLoaner = sumBy(
          filter(props.stExpandedAccts?.paymentDetails, p =>
            p.paidByMemberId === loaneeId &&
            p.paidToMemberId === loanerId
          ),
          "amount"
        );
        console.log("loaneesMapRemainingToPay - totally");
        console.log(totalPaymentsOfLoaneeToLoaner);
        return (adjustedBalanceOfLoanee < 0 ? 0 : adjustedBalanceOfLoanee) - totalPaymentsOfLoaneeToLoaner;
      });
      return remBal;
    });
    console.log('loaneesMapRemainingToPay - ret 2');
    console.log(ret);
    return ret;
    }, [loaneesMapToPayToEachLoaner, props.stExpandedAccts?.paymentDetails]);

  useEffect(() => {
    console.log("Totals changed");
    console.log(membersTotalLoanMap);
  },[membersTotalLoanMap])

  useEffect(() => {
    console.log("Loanee map to pay to loaner Totals changed");
    console.log(loaneesMapToPayToEachLoaner);
  },[loaneesMapToPayToEachLoaner])

  useEffect(() => {
    console.log("Payment details");
    console.log(props.stExpandedAccts?.paymentDetails);
  },[props.stExpandedAccts?.paymentDetails])

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
          <Item key={'expenseTitle'} elevation={3}>
            <div className="globalFlexRow">
              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1.5
                }}
                variant="h5"
                component="h2">
                Account Name
              </Typography>
              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  color: '#5B2D8B'
                }}
                variant="h5"
                component="h2">
                { props.stExpandedAccts?.name }
              </Typography>
            </div>
          </Item>
          <Item key={'expenseSummary'} elevation={3}>
            <Typography
              sx={{
                mt: 1.5,
                mb: 1.5
              }}
              variant="h5"
              component="h2">
              Summary
            </Typography>
            <SummaryContent
              loaneesMapRemainingToPay={loaneesMapRemainingToPay}
              membersTotalLoanMap={membersTotalLoanMap}
              loaneesMapToPayToEachLoaner={loaneesMapToPayToEachLoaner}
            />
          </Item>
          <Item key={'expenseList'} elevation={3}>
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
                gap: '2.5rem'
              }}>
              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '2rem'
                }}
                variant="h5"
                component="h2">
                Expenses List
                <Button
                  onClick={handleAddExpenseItem}
                  sx={{
                    color: '#FFFFFF',
                    backgroundColor: '#CC0000'
                  }}
                  variant="contained"
                  color="primary">Add Expense</Button>
              </Typography>
              <Box
                sx={{
                  pt: 1.5,
                  pb: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  maxHeight: 700,
                  overflowY: "auto",
                }}
              >
                {props.stExpandedAccts?.expenseDetails?.length > 0 ?
                  props.stExpandedAccts.expenseDetails?.map((expenseItem: any) => (
                    <ExpenseItemCard
                      key={expenseItem._id}
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
                }
              </Box>
            </div>
            <div
              style= {{
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem'
              }}>
              <Typography
                sx={{
                  mt: 1.5,
                  mb: 1.5,
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '2rem'
                }}
                variant="h5"
                component="h2">
                Payments List
                <Button
                  onClick={handleMakePaymentItem}
                  sx={{
                    color: '#FFFFFF',
                    backgroundColor: '#CC0000'
                  }}
                  variant="contained"
                  color="primary">Add Payment</Button>
              </Typography>
              <Box
                sx={{
                  pt: 1.5,
                  pb: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                  maxHeight: 700,
                  overflowY: "auto",
                }}
              >
                {props.stExpandedAccts?.paymentDetails?.length > 0 ?
                  props.stExpandedAccts.paymentDetails?.map((paymentItem: any) => (
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
                }
              </Box>
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
  stMembersDetails: state.membersDetails
});

export default connect(mapStateToProps, null)(Account);