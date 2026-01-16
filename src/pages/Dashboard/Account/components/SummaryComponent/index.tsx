import "./SummaryComponent.less";
import { useMemo, useEffect, useState } from "react";
// import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import { connect } from "react-redux";
import { map, get, find, forEach, omit, orderBy, filter, set } from "lodash";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const SummaryComponent = (props: any) => {
  
  const [tableOpened, setTableOpened] = useState<boolean>(false);



  const sortedMembers = useMemo(() => {
    const idToOmit = "66be1ebfcca569893604bcae";
    const result = filter(props.stMembersDetails?.membersPool, m => m._id !== idToOmit);
    const sorted = orderBy(
      result,
      [item => item.name.toLowerCase()],
      ["asc"]
    );
    return sorted;
  }, [props.stMembersDetails?.membersPool]);

  const loaneesMapToPayDetails = useMemo(() => {
    let tableArr: any[] = [];
    console.log("loaneesMapToPayDetails");
    console.log(props?.membersTotalLoanMap);
    console.log(props?.loaneesMapToPayToEachLoaner);
    console.log(props?.stMembersDetails?.membersPool);
    forEach(sortedMembers, (memberDete: any) => {
      let tableRowObj = {};
      set(tableRowObj, "memberId", memberDete._id);
      set(tableRowObj, "memberName", memberDete.name);
      set(tableRowObj, "memberTotalLoaned", get(props?.membersTotalLoanMap, memberDete._id));
      // const membersPoolOmitted = filter(sortedMembers, m => m._id !== memberDete._id);
      forEach(sortedMembers, (loanerDete: any) => {
        set(tableRowObj, [loanerDete._id], get(
          props?.loaneesMapToPayToEachLoaner?.[memberDete._id],
          loanerDete._id
        ));
      });
      tableArr.push(tableRowObj);
    })
    console.log(tableArr);
    return tableArr;
  }, [props?.membersTotalLoanMap, props?.loaneesMapToPayToEachLoaner, sortedMembers]);

  const loaneesMapToPayToEachLoaner = useMemo(() => map(props?.loaneesMapRemainingToPay, (loaners, loaneeId) => ({
    loaneeId,
    loaneeBalanceDetails: map(loaners, (remainingBalance, loanerId) => ({
      loanerId,
      remainingBalance
    }))
  })), [props?.loaneesMapRemainingToPay]);

  

  const handleLearMoreClicked = (event: any) => {
    event.preventDefault();
    setTableOpened(!tableOpened);
  }

  return (
    <Box
      sx={{
          pb: 2,
        }}
    >
      <Card
        variant="outlined"
        sx={{
          minHeight: "fit-content",
          maxWidth: 800,
        }}>
        <CardContent>
          {loaneesMapToPayToEachLoaner ?
              loaneesMapToPayToEachLoaner.map((details: any) => (
                <div key={details?.loaneeId + "theSummary"}>
                  <Typography key={details?.loaneeId + "summaryWord1"} variant="h5" component="div">
                    { get(find(props.stMembersDetails?.membersPool, { _id: details?.loaneeId }), "name") }
                  </Typography>
                  {
                    details?.loaneeBalanceDetails?.map((loanerAndBalanceDetes: any) => (
                      <div
                        key={details?.loaneeId + "" + loanerAndBalanceDetes?.loanerId + "infoLine"}
                        className="globalFlexRow"
                        style={{
                          alignItems: 'baseline'
                        }}
                        >
                        <Typography key={details?.loaneeId + "" + loanerAndBalanceDetes?.loanerId + "payTo"} sx={{ color: 'text.secondary', mb: 1.5, mt: 2.5 }}>Pay to</Typography>
                        <Typography key={details?.loaneeId + "" + loanerAndBalanceDetes?.loanerId + "namey"} variant="h6" sx={{ mb: 1.5, mt: 2.5 }}>{ get(find(props.stMembersDetails?.membersPool, { _id: loanerAndBalanceDetes?.loanerId }), "name") }</Typography>
                        {loanerAndBalanceDetes?.remainingBalance !== 0 ?
                          (<Typography key={details?.loaneeId + "" + loanerAndBalanceDetes?.loanerId + "remBal"} variant="h5" sx={{ color: '#5B2D8B', mb: 1.5, mt: 2.5 }}>{ loanerAndBalanceDetes?.remainingBalance }</Typography>) :
                          (<Typography key={details?.loaneeId + "" + loanerAndBalanceDetes?.loanerId + "paid"} variant="h5" sx={{ color: '#3A7F5A', mb: 1.5, mt: 2.5 }}>PAID</Typography>)
                        }
                      </div>
                    ))
                  }
                </div>
            )) :
            <div />
          }
        </CardContent>
        <CardActions>
          <Button onClick={handleLearMoreClicked} size="small">Learn More</Button>
        </CardActions>
        {tableOpened ? 
        (<TableContainer
          component={Paper}>
          <Table
            sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">Total money expended</TableCell>
                {sortedMembers && sortedMembers.map((member: any) =>
                  <TableCell key={member._id + "header"} align="right">{ 'From ' + member.name}</TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>

              {loaneesMapToPayDetails.map((row) => (
                <TableRow
                  key={row.memberId  + "row"}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell key={row.memberId + "rowCell"} component="th" scope="row">
                    {row.memberName}
                  </TableCell>
                  <TableCell key={"detailTableCell3"}align="right">{row.memberTotalLoaned}</TableCell>
                  {sortedMembers && sortedMembers.map((member: any) =>
                    <TableCell key={row.memberId + "" + member._id + "cell"} align="right">{row[member._id]}</TableCell>)
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>) : <div />
        }
      </Card>
    </Box>
  )
}

const mapStateToProps = (state:any) => ({
  stMembersDetails: state.membersDetails
});

export default connect(mapStateToProps, null)(SummaryComponent);