import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown, Table, Dimmer, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import windowSize from 'react-window-size';
import firebase from 'firebase';

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
        <Table celled fixed singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Rank</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Elo</Table.HeaderCell>
              <Table.HeaderCell>Won</Table.HeaderCell>
              <Table.HeaderCell>Lost</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

          {this.props.list.map((l, index) => (
            <Table.Row>
              {index === 0 ?
                <Table.Cell>{index + 1}
                <span>&nbsp;&nbsp;</span>
                <Icon name='chess king' />
                </Table.Cell>
                : <Table.Cell>{index + 1}
                </Table.Cell>
              }
              <Table.Cell>{l.key}</Table.Cell>
              <Table.Cell>{l.elo}</Table.Cell>
              <Table.Cell>{l.wins}</Table.Cell>
              <Table.Cell>{l.losses}</Table.Cell>
            </Table.Row>
              ))}

          </Table.Body>
        </Table>
        </div>
      }
      </div>

    )
  }
}

export default windowSize(Leaderboard);
