import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown, Confirm } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import windowSize from 'react-window-size';
import firebase from 'firebase';

class Update extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirm: false,
      error: false
    }
    this.openDialog = this.openDialog.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
  }

  openDialog(){
    this.setState({
      confirm: true,
    });
  }

  handleCancel(){
    this.setState({
      confirm: false,
    });
  }

  handleConfirm(){

    var Elo = require( 'elo-js' );
    var elo = new Elo();

    var one = 1000;
    var two = 1000;

    for (var i = 0; i < this.props.list.length; i++){
      if (this.props.list[i].key === this.state.first){
        one = this.props.list[i].elo
      }
      if (this.props.list[i].key === this.state.second){
        two = this.props.list[i].elo
      }
    }

    var tempOne = elo.ifWins( one, two );
    var tempTwo = elo.ifLoses( two, one );

    var diffOne = tempOne - one
    var diffTwo = two - tempTwo

    this.props.updateData(this.state.first, tempOne, this.state.second, tempTwo, diffOne, diffTwo)

    this.setState({
      confirm: false,
    });
  }

  handleChange(e, { name, value }){
    this.setState({
      first: value,
    });
  }

  handleSecondChange(e, { name, value }){
    this.setState({
      second: value,
    });
  }

  render(){

    return (

      <div style = {{
        paddingLeft: this.props.windowWidth * 0.1,
        paddingRight: this.props.windowWidth * 0.1,
      }}>
      <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical>VS</Divider>
        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header icon>
              <Icon name='winner' />
              Won
            </Header>

            <div style = {{
              paddingLeft: this.props.windowWidth * 0.12,
              paddingRight: this.props.windowWidth * 0.12,
            }}>
            <Dropdown
              clearable
              placeholder='Select Player'
              fluid
              selection
              options={this.props.list}
              onChange={this.handleChange}
            />
            </div>

          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon name='flag outline' />
              Lost
            </Header>

            <div style = {{
              paddingLeft: this.props.windowWidth * 0.12,
              paddingRight: this.props.windowWidth * 0.12,
            }}>
            <Dropdown
              clearable
              placeholder='Select Player'
              fluid
              selection
              options={this.props.list}
              onChange={this.handleSecondChange}
            />
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Segment>

      {(this.state.first == null || this.state.first === "" || this.state.second == null || this.state.second === "" || this.state.first === this.state.second) ?
      <Button size='large' disabled onClick={this.openDialog}>Submit</Button> : <Button size='large' onClick={this.openDialog}>Submit</Button>}
      <Confirm
        open={this.state.confirm}
        onCancel={this.handleCancel}
        onConfirm={this.handleConfirm}
        confirmButton="Confirm"
        header='Update'
        content={this.state.first + " has won against " + this.state.second}
      />
      </div>

    );
  }

}

export default windowSize(Update);
