import React, { Component } from 'react';
import HeaderBar from './Components/HeaderBar/HeaderBar'
import Update from './Components/Update/Update'
import Leaderboard from './Components/Leaderboard/Leaderboard'
import History from './Components/History/History'
import Profile from './Components/Profile/Profile'
import { Loader, Dimmer } from 'semantic-ui-react'
import './App.css';
import windowSize from 'react-window-size';
import firebase from 'firebase';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        currentTab: 2,
        list:[],
        history:[]
    }
    this.handleItemClick = this.handleItemClick.bind(this);
    this.updateData = this.updateData.bind(this);
  }

  componentWillMount(){

    var config = {
      apiKey: "AIzaSyAMkJD64hjCNSXKL-kie2f8_81YawT3ST0",
      authDomain: "horwoodcup.firebaseapp.com",
      databaseURL: "https://horwoodcup.firebaseio.com",
      projectId: "horwoodcup",
      storageBucket: "horwoodcup.appspot.com",
      messagingSenderId: "5369313908"
    };
    if (!firebase.apps.length){
      firebase.initializeApp(config);
    }
  }

  async componentDidMount(){

    const db = firebase.firestore();
    var users = [];
    var dates = [];

    await db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        users.push(doc.data())
        });
    });

    await db.collection("history").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        dates.push(doc.data())
        });
    });

    users.sort((a, b) => (a.elo) - (b.elo)).reverse();
    dates.reverse()

    this.setState({
      list: users,
      history: dates
    })
  }

  handleItemClick(value){
    this.setState({
          currentTab: value,
    });
  }

  async updateData(playerOne, oneElo, playerTwo, twoElo, diffOne, diffTwo){
    const db = firebase.firestore();
    await db.collection("users").doc(playerOne).update({
        "elo": oneElo,
        "wins": firebase.firestore.FieldValue.increment(1)
    })
    await db.collection("users").doc(playerTwo).update({
        "elo": twoElo,
        "losses": firebase.firestore.FieldValue.increment(1)
    })
    await db.collection("history").add({
        "match": playerOne + " vs " + playerTwo,
        "won": playerOne,
        "lost": playerTwo,
        "gain": diffOne,
        "loss": diffTwo,
        "date": new Date().toJSON().slice(0,10).replace(/-/g,'/')
    })
    this.componentDidMount();
  }

  render() {
    return (
      <div className="App">

        <HeaderBar currentTab = {this.state.currentTab} handleItemClick = {this.handleItemClick} />

        <div style = {{paddingTop: this.props.windowHeight * 0.05}}>

        {this.state.currentTab === 1 ?
          <div>
            <Update list = {this.state.list} updateData = {this.updateData}/>
          </div> : null
        }

        {this.state.currentTab === 2 ?
          <div>
            <Leaderboard list = {this.state.list}/>
          </div> : null
        }

        {this.state.currentTab === 3 ?
          <div>
            <History history = {this.state.history}/>
          </div> : null
        }

        </div>
      </div>
    );
  }
}

export default windowSize(App);
