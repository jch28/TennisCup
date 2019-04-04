import React, { Component } from 'react';
import { Menu, Segment, Grid, Header, Icon, Divider, Search, Button, Dropdown, Table } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import windowSize from 'react-window-size';
import './Styles.css';
import _ from 'lodash'

const players = [
{
  key: 'Jenny Hess',
  elo: 1100,
  value: 'Jenny Hess',
  gxe: 89.5,
  image: { avatar: true, src: 'https://i.imgur.com/1Ux0Ajc.png' },
},
{
  key: 'Elliot Fu',
  elo: 1100,
  value: 'Elliot Fu',
  gxe: 91.5,
  image: { avatar: true, src: 'https://i.imgur.com/1Ux0Ajc.png' },
},
{
  key: 'Stevie Feliciano',
  elo: 1200,
  value: 'Stevie Feliciano',
  gxe: 93.5,
  image: { avatar: true, src: 'https://i.imgur.com/1Ux0Ajc.png' },
},
{
  key: 'Christian',
  elo: 1400,
  value: 'Christian',
  gxe: 75.5,
  image: { avatar: true, src: 'https://i.imgur.com/1Ux0Ajc.png' },
},
{
  key: 'Matt',
  elo: 500,
  value: 'Matt',
  gxe: 77.5,
  image: { avatar: true, src: 'https://i.imgur.com/1Ux0Ajc.png' },
},
{
  key: 'Justen Kitsune',
  elo: 850,
  value: 'Justen Kitsune',
  gxe: 84.0,
  image: { avatar: true, src: 'https://i.imgur.com/1Ux0Ajc.png' },
},
]

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {

    }
    this.resetComponent = this.resetComponent.bind(this)
  }

  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(players, isMatch),
      })
    }, 300)
  }

  render(){
    return(
      <div>
      <Header>Search Player</Header>
      <Search
            loading={this.state.isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={this.state.results}
            value={this.state.value}
      />

      </div>
    )
  }
}

export default windowSize(Profile);
