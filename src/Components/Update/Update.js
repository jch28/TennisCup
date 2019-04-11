import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown, Confirm, Table, Accordion, Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import windowSize from 'react-window-size';
import firebase from 'firebase';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

class Update extends Component {

  constructor(props){
    super(props);
    this.state = {
      confirm: false,
      error: false,
      multiplier: 1,
      active : 1,
      bonus: false,
      accordion: false,
      comment: "N/A",
    }
    this.openDialog = this.openDialog.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSecondChange = this.handleSecondChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.bonus = this.bonus.bind(this);
    this.openAccordion = this.openAccordion.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  openAccordion(){
    var bool = this.state.accordion;
    this.setState({
      accordion: !bool
    })
  }

  bonus(){
    var hasBonus = this.state.bonus;
    this.setState({
      bonus: !hasBonus
    })
  }

  handleClick(variable){
    this.setState({
      active: variable
    })
  }

  handleMessage(e){
    this.setState({
      message: e.target.value
    })
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

    var mult = 1;
    mult += this.state.active * 0.25
    if (this.state.bonus){
      mult += 0.25
    }

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

    var diff = tempOne - one
    var finalDiff = Math.round(diff * mult);

    tempOne = finalDiff + one
    tempTwo = two - finalDiff

    this.props.updateData(this.state.first, tempOne, this.state.second, tempTwo, finalDiff, finalDiff, this.state.message)

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

      {!isMobile ?

      <div style = {{
        paddingLeft: this.props.windowWidth * 0.25,
        paddingRight: this.props.windowWidth * 0.25,
      }}>
      <Accordion styled>
        <Accordion.Title active={this.state.accordion} onClick={this.openAccordion}>
          <Icon name='dropdown' />
          Format
        </Accordion.Title>
        <Accordion.Content active={this.state.accordion}>
          <div>
          <Button.Group basic>
            <Button active={this.state.active === 1} onClick={(value) => this.handleClick(1)}>BO1</Button>
            <Button active={this.state.active === 2} onClick={(value) => this.handleClick(2)}>BO3</Button>
            <Button active={this.state.active === 3} onClick={(value) => this.handleClick(3)}>BO5</Button>
            <Button toggle active={this.state.bonus} onClick={(value) => this.bonus()} icon='star'/>
          </Button.Group>
          </div>
         <div style = {{paddingTop: this.props.windowHeight * 0.025}}><Input onChange={this.handleMessage} label='Score' placeholder='Enter Score..' /></div>
        </Accordion.Content>
      </Accordion>
      </div> :

      <div>
      <Accordion styled>
        <Accordion.Title active={this.state.accordion} onClick={this.openAccordion}>
          <Icon name='dropdown' />
          Format
        </Accordion.Title>
        <Accordion.Content active={this.state.accordion}>
          <div>
          <Button.Group basic>
            <Button active={this.state.active === 1} onClick={(value) => this.handleClick(1)}>BO1</Button>
            <Button active={this.state.active === 2} onClick={(value) => this.handleClick(2)}>BO3</Button>
            <Button active={this.state.active === 3} onClick={(value) => this.handleClick(3)}>BO5</Button>
            <Button toggle active={this.state.bonus} onClick={(value) => this.bonus()} icon='star'/>
          </Button.Group>
          </div>
         <div style = {{paddingTop: this.props.windowHeight * 0.025}}><Input onChange={this.handleMessage} label='Score' placeholder='Enter Score..' /></div>
        </Accordion.Content>
      </Accordion>
      </div> }

      <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <BrowserView><Divider vertical>VS</Divider></BrowserView>
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
