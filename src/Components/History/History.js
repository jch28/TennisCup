import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown, Table, Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './Styles.css';
import windowSize from 'react-window-size';

const index = 5;

class History extends Component {

  constructor(props){
    super(props);
    this.state = {
      activePage: 1,
      start: 0,
      end: index,
    }
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
  }

  handlePaginationChange = (e, { activePage }) => 
      {
        this.setState({ 
            activePage, 
            start: (activePage - 1) * index,
            end: activePage * index
          })
      }

  render(){
    return (

      <div style = {{
        paddingLeft: this.props.windowWidth * 0.2,
        paddingRight: this.props.windowWidth * 0.2,
      }}>

        <Table celled fixed singleLine striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Match</Table.HeaderCell>
              <Table.HeaderCell>Won</Table.HeaderCell>
              <Table.HeaderCell>Lost</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Score</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>

              {this.props.history.slice(this.state.start, this.state.end).map((l) => (
                <Table.Row>
                  <Table.Cell>{l.match}</Table.Cell>
                  <Table.Cell>{l.won} {" ( "}
                  <div class="ui green" style={{display: "inline-block"}}> {"+" + l.gain} </div>
                  {" )"}</Table.Cell>
                  <Table.Cell>{l.lost} {" ( "}
                  <div class="ui red" style={{display: "inline-block"}}>{"-" + l.loss}</div>
                  {" )"}</Table.Cell>
                  <Table.Cell>{l.date}</Table.Cell>
                  <Table.Cell>{l.score}</Table.Cell>
                </Table.Row>
                  ))}

          </Table.Body>
        </Table>

        {this.props.history.length > index ?
          <div style = {{textAlign: "left"}}>
            <Pagination
              boundaryRange={0}
              ellipsisItem={null}
              firstItem={null}
              lastItem={null}
              activePage={this.state.activePage}
              onPageChange={this.handlePaginationChange}
              totalPages={Math.ceil(this.props.history.length / index)}
            />
        </div> :null}

      </div>

    )
  }
}

export default windowSize(History);
