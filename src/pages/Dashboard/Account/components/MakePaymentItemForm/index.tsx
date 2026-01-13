import "./MakePaymentItemForm.less";
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
import { MAKE_PAYMENT_ITEM } from "../../../../../sagas/constants";
import { connect } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";

const MakePaymentItemForm = (props: any) => {

  const {
    dispatch  
  } = props;
  
  const [selectedPayor, setSelectedLoaner] = useState<string>('');
  const [payorError, setLoanerError] = useState<string>('');

  const [selectedPayee, setSelectedLoanee] = useState<string>('');
  const [payeeError, setLoaneeError] = useState<string>('');

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

  const handleSelectPayor = (event:any) => {
    event.preventDefault();
    setSelectedLoaner(event?.target?.value)
  };

  const handleSelectPayee = (event:any) => {
    event.preventDefault();
    setSelectedLoanee(event?.target?.value)
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
    const reqst = {
      accountId: props.stExpandedAcctId,
      paidByMemberId: selectedPayor,
      paidToMemberId: selectedPayee,
      amount: Math.round(Number(amountVal) * 100) / 100,
      remarks: remarksVal,
      createdAt: transformDateToISO(dateVal)
    }
    dispatch({
      type: MAKE_PAYMENT_ITEM,
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

  const stPrevPending = usePrevious(props.stMakePaymentItemPending);

  useEffect(() => {
    if (selectedPayor?.length === 0) {
      setLoanerError("Payor is empty");
      return;
    }
    setLoanerError("");
  }, [selectedPayor]);

  useEffect(() => {
    if (selectedPayee?.length === 0) {
      setLoaneeError("Payee is empty");
      return;
    }
    setLoaneeError("");
  }, [selectedPayee]);

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
    const newVal = props.stMakePaymentItemPending;
    if (oldVal === true && newVal === false) {
      props.handleClose();
    }

    
  }, [props.stMakePaymentItemPending]);

  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>Add Payment Item</DialogTitle>
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
            <div
              className="globalFlexRow"
              style={{
                alignItems: 'center',
              }}>
              <InputLabel id="payor-select-label">Payor</InputLabel>
              <Select
                error={payorError?.length > 0}
                sx={{
                  minWidth: '300px'
                }}
                labelId="payor-select-label"
                id="payor-simple-select"
                value={selectedPayor}
                onChange={handleSelectPayor}
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
              <InputLabel id="payee-select-label">Payee</InputLabel>
              <Select
                error={payeeError?.length > 0}
                sx={{
                  minWidth: '300px'
                }}
                labelId="payee-select-label"
                id="payee-simple-select"
                value={selectedPayee}
                onChange={handleSelectPayee}
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
            disabled={payorError.length > 0 || payeeError.length > 0 || amountError.length > 0 || dateError.length > 0}
            type="submit"
            form="subscription-form">
            Add Payment Item
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

const mapStateToProps = (state:any) => ({
  stMakePaymentItemPending: state.currentOpenedAccount.makePaymentItemPending,
  stMakePaymentItemStatus: state.currentOpenedAccount.makePaymentItemStatus,
});

export default connect(mapStateToProps, null)(MakePaymentItemForm);