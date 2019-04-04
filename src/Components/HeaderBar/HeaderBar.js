import React, { Component } from 'react';
import { Menu, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

class HeaderBar extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  handleItem(value){
    this.props.handleItemClick(value);
  }

  render(){

    return (
      <Segment>
      <Menu compact>
        <Menu.Item
          name='Update'
          active={this.props.currentTab === 1}
          onClick={(value) => this.handleItem(1)}
        >
          Update
        </Menu.Item>

        <Menu.Item
          name='Leaderboard'
          active={this.props.currentTab === 2}
          onClick={(value) => this.handleItem(2)}
        >
          Ladder
        </Menu.Item>

        <Menu.Item
          name='History'
          active={this.props.currentTab === 3}
          onClick={(value) => this.handleItem(3)}
        >
          History
        </Menu.Item>
      </Menu>
      </Segment>
    );
  }

}

export default (HeaderBar);
