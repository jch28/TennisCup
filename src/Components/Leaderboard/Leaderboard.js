import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown, Dimmer, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import windowSize from 'react-window-size';
import firebase from 'firebase';
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

class Leaderboard extends Component {

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
        {this.props.list.length === 0 &&
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        }
        {this.props.list.length > 0 &&
        <div>
        <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Rank</CustomTableCell>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Elo</CustomTableCell>
              <CustomTableCell>Won</CustomTableCell>
              <CustomTableCell>Lost</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>

          {this.props.list.map((l, index) => (
            <TableRow>
              {index === 0 ?
                <CustomTableCell>{index + 1}
                <span>&nbsp;&nbsp;</span>
                <Icon name='chess king' />
                </CustomTableCell>
                : <CustomTableCell>{index + 1}
                </CustomTableCell>
              }
              <CustomTableCell>{l.key}</CustomTableCell>
              <CustomTableCell>{l.elo}</CustomTableCell>
              <CustomTableCell>{l.wins}</CustomTableCell>
              <CustomTableCell>{l.losses}</CustomTableCell>
            </TableRow>
              ))}

          </TableBody>
        </Table>
        </Paper>
        </div>
      }
      </div>

    )
  }
}

export default windowSize(Leaderboard);
