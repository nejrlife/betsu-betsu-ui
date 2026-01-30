import "./SummaryComponent.less";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { map, get, find, forEach, orderBy, filter, set } from "lodash";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SummaryInfoCard, { SummaryInfoRow } from "./SummaryInfoCard";

const secondaryButtonTheme = createTheme({
  palette: {
    secondary: {
      main: "#FFFFFF",
      contrastText: "#2F7D5B",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedSecondary: {
          backgroundColor: "#FFFFFF",
          color: "#2F7D5B",
          border: "1px solid #BFD8CC",
          "&:hover": {
            backgroundColor: "#FFFFFF",
          },
        },
      },
    },
  },
});

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
    forEach(sortedMembers, (memberDete: any) => {
      let tableRowObj = {};
      set(tableRowObj, "memberId", memberDete._id);
      set(tableRowObj, "memberName", memberDete.name);
      set(tableRowObj, "memberTotalLoaned", get(props?.membersTotalLoanMap, memberDete._id));
      forEach(sortedMembers, (loanerDete: any) => {
        set(tableRowObj, [loanerDete._id], get(
          props?.loaneesMapToPayToEachLoaner?.[memberDete._id],
          loanerDete._id
        ));
      });
      tableArr.push(tableRowObj);
    });
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
  };

  return (
    <Box sx={{ pb: 2 }}>
      <div className="summaryCards">
        {loaneesMapToPayToEachLoaner ?
          loaneesMapToPayToEachLoaner.map((details: any) => {
            const loaneeName = get(find(props.stMembersDetails?.membersPool, { _id: details?.loaneeId }), "name");
            const rows: SummaryInfoRow[] = details?.loaneeBalanceDetails?.map((loanerAndBalanceDetes: any) => {
              const loanerName = get(
                find(props.stMembersDetails?.membersPool, { _id: loanerAndBalanceDetes?.loanerId }),
                "name"
              );
              return {
                id: details?.loaneeId + "-" + loanerAndBalanceDetes?.loanerId,
                label: "Pay to",
                name: loanerName,
                amount: loanerAndBalanceDetes?.remainingBalance,
                isPaid: loanerAndBalanceDetes?.remainingBalance === 0,
              };
            }) || [];

            return (
              <SummaryInfoCard
                key={details?.loaneeId + "theSummary"}
                title={loaneeName}
                rows={rows}
              />
            );
          }) :
          <div />
        }
      </div>

      <div className="summaryActions">
        <ThemeProvider theme={secondaryButtonTheme}>
          <Button
            onClick={handleLearMoreClicked}
            size="small"
            variant="contained"
            color="secondary"
          >
            Learn More
          </Button>
        </ThemeProvider>
      </div>

      {tableOpened ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell align="right">Total money expended</TableCell>
                {sortedMembers && sortedMembers.map((member: any) =>
                  <TableCell key={member._id + "header"} align="right">{ "From " + member.name}</TableCell>)
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {loaneesMapToPayDetails.map((row) => (
                <TableRow
                  key={row.memberId + "row"}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell key={row.memberId + "rowCell"} component="th" scope="row">
                    {row.memberName}
                  </TableCell>
                  <TableCell key="detailTableCell3" align="right">{row.memberTotalLoaned?.toFixed(2)}</TableCell>
                  {sortedMembers && sortedMembers.map((member: any) =>
                    <TableCell key={row.memberId + "" + member._id + "cell"} align="right">{row[member._id]?.toFixed(2)}</TableCell>)
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>) : <div />
      }
    </Box>
  );
};

const mapStateToProps = (state: any) => ({
  stMembersDetails: state.membersDetails
});

export default connect(mapStateToProps, null)(SummaryComponent);
