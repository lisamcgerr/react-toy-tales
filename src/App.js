import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'


class App extends React.Component{

  constructor(){
    super()
    //setting the initial state of the toys array to an empty array to be changed
    //by componentDidMount below using this.setState({})
    this.state = {
      toys: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toysArr => {
      //setting the new state of the fetched API
      this.setState({
        toys: toysArr
      })
    })
  }

  state = {
    display: false
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  createToy = (newToy) => {
    //updating that state of the Toys array to add a new toy recieved by Form.js 
    //pass this method into the Form <Form createToy={this.createToy} />
    this.setState({
      toys:[newToy, ...this.state.toys]
    })
  }

deleteToy = (id) => {
  //needs an ID to be grabbed from the button, updating the state of the Toys array to remove
  //a toy deleted in the ToyCard passed into <ToyContainer deleteToy={this.deleteToy} />
  //then needs to be passed from ToyContainer to ToyCard <ToyCard deleteToy={this.props.deleteToy}/>
  const updatedToys = this.state.toys.filter( toy => toy.id !== id)

  this.setState({
    toys: updatedToys
  })
}

updateLikes = (updatedToy) => {
  //updaying the state of the likes of a Toy, passed into the <ToyContainer updateLikes={this.updateLikes}/>
  //further being passed from ToyContainer to <ToyCard updateLikes={this.props.updateLikes}/>
  //ToyCard will need to make a PATCH fetch request, working with e.target to change the value of the likes
  console.log(updatedToy)

  //mapping over all the toys and compaing ids - if the toy.id is equal to the updatedToy.id (which is 
  //being passed from ToyCard) return the updatedToy and update the state of the likes with this.setState({})
  const updatedToys = this.state.toys.map(toy => {
    if (toy.id === updatedToy.id) {
      return updatedToy
    } else {
      return toy
    }
  })

  this.setState({
    toys: updatedToys
  })

}

  render(){
    return (
      <>
        <Header/>
        { this.state.display
            ?
          <ToyForm createToy={this.createToy} />
            :
          null
        }
        <div className="buttonContainer">
          <button onClick={this.handleClick}> Add a Toy </button>
        </div>
        <ToyContainer updateLikes={this.updateLikes} toys={this.state.toys} deleteToy={this.deleteToy}  />
      </>
    );
  }

}

export default App;

