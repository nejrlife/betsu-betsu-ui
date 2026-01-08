import { useEffect, useState } from "react";

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
import { find, get } from "lodash";
import { Button } from "@mui/material";

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
            <Typography
              sx={{
                mt: 1.5,
                mb: 1.5
              }}
              variant="h5"
              component="h2">
              Account Name
            </Typography>
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