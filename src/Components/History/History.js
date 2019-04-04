import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Styles.css';
import windowSize from 'react-window-size';

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

        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Match</Table.HeaderCell>
              <Table.HeaderCell>Won</Table.HeaderCell>
              <Table.HeaderCell>Lost</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

              {this.props.history.slice(0, 20).map((l) => (
                <Table.Row>
                  <Table.Cell>{l.match}</Table.Cell>
                  <Table.Cell>{l.won} {" ( "}
                  <div class="ui green" style={{display: "inline-block"}}> {"+" + l.gain} </div>
                  {" )"}</Table.Cell>
                  <Table.Cell>{l.lost} {" ( "}
                  <div class="ui red" style={{display: "inline-block"}}>{"-" + l.loss}</div>
                  {" )"}</Table.Cell>
                  <Table.Cell>{l.date}</Table.Cell>
                </Table.Row>
                  ))}

          </Table.Body>
        </Table>

      </div>

    )
  }
}

export default windowSize(History);
