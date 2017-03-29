import React, { Component } from 'react';
import logo from './pokeball.svg';
import './App.css';
import 'whatwg-fetch';
import PokemonIndexList from './components/PokemonIndexList';
import PokemonModal from './components/PokemonModal';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pokemon: [],
      activePage: 1,
      limit: 50,
      offset: 0,
      totalPages: 0,
      count: 0,
      loaded: false,
      selectedPokemon: undefined
    }
    this.loadPokemon = this.loadPokemon.bind(this);
    this.handlePaginationSelect = this.handlePaginationSelect.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleModalOpen = this.handleModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
  }
  loadPokemon(url){
    fetch(url)
      .then(response => {
        return response.json();
      }).then(json => {
        let pages = Math.round(json.count / this.state.limit);
        this.setState({
          pokemon: json.results,
          totalPages: pages,
          count: json.count,
          loaded: true,
          showModal: false
        })
      }).catch(err => {
        console.log(err)
      })
  }
  componentWillMount(){
    this.loadPokemon(`${this.props.baseURL}/pokemon/?limit=${this.state.limit}&offset=${this.state.offset}`)
  }
  handlePaginationSelect(selectedPage) {
    let offset = this.state.limit * selectedPage;
    this.loadPokemon(`${this.props.baseURL}/pokemon/?limit=${this.state.limit}&offset=${offset}`);
    this.setState({
      activePage: selectedPage
    })
  }
  handleLimitChange(limitSelected){
    this.setState({
      limit: +limitSelected.target.innerHTML || this.state.count,
      activePage: 1
    }, () => {
      this.loadPokemon(`${this.props.baseURL}/pokemon/?limit=${this.state.limit}&offset=0`)
    })
  }
  handleModalOpen(pokemon){
    if(pokemon.url !== undefined){
      fetch(`${pokemon.url}`)
        .then(response => {
          return response.json()
        }).then(json => {
          this.setState({
            selectedPokemon: json,
            showModal: true
          });
        }).catch(err => {
          console.log(err)
        })
    }
  }
  handleModalClose(){
    this.setState({
      showModal: false
    });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>PokeDashboard</h2>
        </div>

        {this.state.loaded ? null : "Loading..."}
        <PokemonIndexList
          display={this.state.loaded}
          options={[10,50,100,200]}
          selectedValue={this.state.limit}
          allValue={this.state.count}
          onOptionSelected={this.handleLimitChange}
          listOfPokemon={this.state.pokemon}
          bsSize="small"
          items={this.state.totalPages}
          activePage={this.state.activePage}
          onSelect={this.handlePaginationSelect}
          totalPages={this.state.totalPages}
          openModal={this.handleModalOpen}
          />

        <PokemonModal closeModal={this.handleModalClose} showModal={this.state.showModal} pokemon={this.state.selectedPokemon} />

      </div>
    );
  }
}

export default App;
