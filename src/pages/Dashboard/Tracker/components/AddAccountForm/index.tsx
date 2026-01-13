import "./AddAccountForm.less";
import * as React from 'react';
import { useState, useEffect, useRef } from "react";
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from "react-datepicker";
import { ADD_ACCOUNT } from "../../../../../sagas/constants";
import { connect } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

const AddAccountForm = (props: any) => {

  const {
    dispatch  
  } = props;

  const [acctNameVal, setAcctNameVal] = useState<string>('');
  const [acctNameError, setAcctNameError] = useState<string>('');

  const [dateVal, setDate] = useState<Date>(new Date());
  const [dateError, setDateError] = useState<string>('');
  
  const isTodayOrPast = (dateStr: any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of today
  
    const inputDate = new Date(dateStr);
    inputDate.setHours(0, 0, 0, 0); // normalize input date
    return inputDate <= today;
  }

  const transformDateToISO = (dateVal: any) => {
    const d = new Date(dateVal);
    d.setUTCHours(0, 0, 0, 0);
    const isoDate = d.toISOString();
    return isoDate
  }

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const reqst = {
      accountName: acctNameVal,
      createdAt: transformDateToISO(dateVal)
    }
    dispatch({
      type: ADD_ACCOUNT,
      payload: {
        ...reqst
      }
    });
  };

  const usePrevious = (value:any) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  const stPrevPending = usePrevious(props.stAddAccountPending);

  useEffect(() => {
    if ( acctNameVal?.length === 0) {
      setAcctNameError("Account Name is zero or empty");
      return;
    }
    setAcctNameError("");
  }, [acctNameVal]);

  useEffect(() => {
    if (!isTodayOrPast(dateVal)) {
      setDateError("The selected date must not go beyond today");
      return;
    }
    setDateError("");
  }, [dateVal]);

  useEffect(() => {
    const oldVal = stPrevPending;
    const newVal = props.stAddAccountPending;
    if (oldVal === true && newVal === false) {
      props.handleClose();
    }

    
  }, [props.stAddAccountPending]);

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Account</DialogTitle>
        <DialogContent
          sx={{
            minWidth: '500px'
          }}>
          <DialogContentText>
            Please fill in the following fields:
          </DialogContentText>
          <form
            className="globalFlexColumn"
            onSubmit={handleSubmit}
            id="subscription-form">
            <TextField
              error={acctNameError?.length > 0}
              autoFocus
              required
              margin="dense"
              id="acctNameVal"
              name="acctNameVal"
              label="Account Name"
              type="text"
              fullWidth
              variant="standard"
              value={acctNameVal}
              onChange={(e) => setAcctNameVal(e.target.value)}
              helperText={acctNameError}
            />
            <div
              className="globalFlexRow"
              style={{
                alignItems: 'center',
              }}>
              <InputLabel id="date-select-label">Created Date</InputLabel>
              <DatePicker selected={dateVal} onChange={(date:any) => setDate(date)} />
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            disabled={acctNameError.length > 0 || dateError.length > 0}
            type="submit"
            form="subscription-form">
            Add Account
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state:any) => ({
  stAddAccountPending: state.userAccounts.addAccountPending,
  stAddAccountStatus: state.userAccounts.addAccountStatus,
});

export default connect(mapStateToProps, null)(AddAccountForm);