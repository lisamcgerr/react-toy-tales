import React, { Component } from 'react';

class ToyForm extends Component {
  constructor(){
    super()
    //setting the initial state of the values in the form to an empty string
    this.state = {
      name: ' ',
      image: ' '
    }
  }

  handleImageChange = (e) => {
    //updating the state of a new Toy's image
    //set the value in the input field below to value={this.state.image}
    //console.log(e.target.value)
    this.setState({
      image: e.target.value
    })
    //console.log('state', this.state.image)
  }

  handleNameChange = (e) => {
    //updating the state of a new Toy's Name
    //set the value in the input field below to value={this.state.name}
    //console.log(e.target.value)
    this.setState({
      name: e.target.value
    })
  }

  //handling the submit of the Form, 1st preventing the default of the form, creating a newToy object 
  //to be placed in the reqObj so that it can be rendered in the back end
  //Create a POST fetch request in reqObj then inside the fetch request calling the function
  //this.props.createToy(newToy) to update the state of the toy in App.js so that it can be rendered in the 
  //front end
  handleSubmit = (e) => {
    e.preventDefault()

    const newToy = {
      ...this.state, 
      likes: 0
    }

    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newToy)
    }

    fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(newToy => {
      this.props.createToy(newToy)
    })
    
  }
  //Form -onSubmit={this.functionName}
  //Input -onChange={this.functionName} is used in the input field, value={this.state.attribute}

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="add-toy-form">
          <h3>Create a toy!</h3>
          <input onChange={this.handleNameChange} value={this.state.name} type="text" name="name" placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input onChange={this.handleImageChange} value={this.state.image} type="text" name="image" placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
