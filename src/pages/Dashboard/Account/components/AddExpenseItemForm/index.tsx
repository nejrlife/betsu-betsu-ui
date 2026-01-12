import "./AddExpenseItemForm.less";
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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import DatePicker from "react-datepicker";
import { ADD_EXPENSE_ITEM } from "../../../../../sagas/constants";
import { connect } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

const AddExpenseItemForm = (props: any) => {

  const {
    dispatch  
  } = props;

  const [nameVal, setNameVal] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  
  const [selectedLoaner, setSelectedLoaner] = useState<string>('');
  const [loanerError, setLoanerError] = useState<string>('');

  const [selectedLoanee, setSelectedLoanee] = useState<string>('');
  const [loaneeError, setLoaneeError] = useState<string>('');

  const [amountVal, setAmountVal] = useState<string>("0.00");
  const [amountError, setAmountError] = useState<string>('');

  const [dateVal, setDate] = useState<Date>(new Date());
  const [dateError, setDateError] = useState<string>('');

  const [remarksVal, setRemarksVal] = useState<string>('');
  
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

  const handleSelectLoaner = (event:any) => {
    event.preventDefault();
    setSelectedLoaner(event?.target?.value)
  };

  const handleSelectLoanee = (event:any) => {
    event.preventDefault();
    setSelectedLoanee(event?.target?.value)
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const reqst = {
      accountId: props.stExpandedAcctId,
      name: nameVal,
      cashOutByMemberId: selectedLoaner,
      forMemberId: selectedLoanee,
      amount: Math.round(Number(amountVal) * 100) / 100,
      remarks: remarksVal,
      createdAt: transformDateToISO(dateVal)
    }
    dispatch({
      type: ADD_EXPENSE_ITEM,
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

  const stPrevPending = usePrevious(props.stAddExpenseItemPending);

  useEffect(() => {
    if (nameVal?.length === 0) {
      setNameError("Name is empty");
      return;
    }
    setNameError("");
  }, [nameVal]);

  useEffect(() => {
    if (selectedLoaner?.length === 0) {
      setLoanerError("Loaner is empty");
      return;
    }
    setLoanerError("");
  }, [selectedLoaner]);

  useEffect(() => {
    if (selectedLoanee?.length === 0) {
      setLoaneeError("Loanee is empty");
      return;
    }
    setLoaneeError("");
  }, [selectedLoanee]);

  useEffect(() => {
    if ( amountVal?.length === 0 || Number(amountVal) === 0) {
      setAmountError("Amount is zero or empty");
      return;
    }
    setAmountError("");
  }, [amountVal]);

  useEffect(() => {
    if (!isTodayOrPast(dateVal)) {
      setDateError("The selected date must not go beyond today");
      return;
    }
    setDateError("");
  }, [dateVal]);

  useEffect(() => {
    const oldVal = stPrevPending;
    const newVal = props.stAddExpenseItemPending;
    if (oldVal === true && newVal === false) {
      props.handleClose();
    }

    
  }, [props.stAddExpenseItemPending]);

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Expense Item</DialogTitle>
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
              error={nameError?.length > 0}
              autoFocus
              required
              margin="dense"
              id="nameVal"
              name="nameVal"
              label="Expense Name"
              type="text"
              fullWidth
              variant="standard"
              value={nameVal}
              onChange={(e) => setNameVal(e.target.value)}
              helperText={nameError}
            />
            <div
              className="globalFlexRow"
              style={{
                alignItems: 'center',
              }}>
              <InputLabel id="loaner-select-label">Loaner</InputLabel>
              <Select
                error={loanerError?.length > 0}
                sx={{
                  minWidth: '300px'
                }}
                labelId="loaner-select-label"
                id="loaner-simple-select"
                value={selectedLoaner}
                onChange={handleSelectLoaner}
              >
                {props.memberPool?.length > 0 ?
                    props.memberPool?.map((member: any) => (
                      <MenuItem key={member._id} value={member._id}>{member.name}</MenuItem>
                  )) :
                  <div />
                  }
              </Select>
            </div>
            <div
              className="globalFlexRow"
              style={{
                alignItems: 'center',
              }}>
              <InputLabel id="loanee-select-label">Loanee</InputLabel>
              <Select
                error={loaneeError?.length > 0}
                sx={{
                  minWidth: '300px'
                }}
                labelId="loanee-select-label"
                id="loanee-simple-select"
                value={selectedLoanee}
                onChange={handleSelectLoanee}
              >
                {props.memberPool?.length > 0 ?
                    props.memberPool?.map((member: any) => (
                      <MenuItem key={member._id} value={member._id}>{member.name}</MenuItem>
                  )) :
                  <div />
                  }
              </Select>
            </div>
            <TextField
              error={amountError?.length > 0}
              required
              margin="dense"
              id="amountVal"
              name="amountVal"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              value={amountVal}
              onChange={(e) => {
                const val = e.target.value;
                setAmountVal(val);
              }}
              helperText={amountError}
            />
            <div
              className="globalFlexRow"
              style={{
                alignItems: 'center',
              }}>
              <InputLabel id="date-select-label">Date</InputLabel>
              <DatePicker selected={dateVal} onChange={(date:any) => setDate(date)} />
            </div>
            <TextField
              margin="dense"
              id="remarksVal"
              name="remarksVal"
              label="Remarks"
              type="text"
              fullWidth
              variant="standard"
              value={remarksVal}
              onChange={(e) => setRemarksVal(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            disabled={nameError?.length > 0 || loanerError.length > 0 || loaneeError.length > 0 || amountError.length > 0 || dateError.length > 0}
            type="submit"
            form="subscription-form">
            Add Expense Item
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state:any) => ({
  stAddExpenseItemPending: state.currentOpenedAccount.expandedAcctDetails.addExpenseItemPending,
  stAddExpenseItemStatus: state.currentOpenedAccount.expandedAcctDetails.addExpenseItemStatus,
});

export default connect(mapStateToProps, null)(AddExpenseItemForm);