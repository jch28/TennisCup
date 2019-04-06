import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Styles.css';
import windowSize from 'react-window-size';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const CustomTableCell = withStyles(theme => ({
  head: {
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "#fbfbfb",
  },
  body: {
    fontSize: 14,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableCell);

class History extends Component {

  constructor(props){
    super(props);
    this.state = {
    }
  }

  render(){
    return (

      <div style = {{
        paddingLeft: this.props.windowWidth * 0.2,
        paddingRight: this.props.windowWidth * 0.2,
      }}>
        <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Match</CustomTableCell>
              <CustomTableCell>Won</CustomTableCell>
              <CustomTableCell>Lost</CustomTableCell>
              <CustomTableCell>Date</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

              {this.props.history.slice(0, 25).map((l) => (
                <TableRow>
                  <CustomTableCell>{l.match}</CustomTableCell>
                  <CustomTableCell>{l.won} {" ( "}
                  <div class="ui green" style={{display: "inline-block"}}> {"+" + l.gain} </div>
                  {" )"}</CustomTableCell>
                  <CustomTableCell>{l.lost} {" ( "}
                  <div class="ui red" style={{display: "inline-block"}}>{"-" + l.loss}</div>
                  {" )"}</CustomTableCell>
                  <CustomTableCell>{l.date}</CustomTableCell>
                </TableRow>
                  ))}

          </TableBody>
        </Table>
        </Paper>
      </div>

    )
  }
}

export default windowSize(History);
