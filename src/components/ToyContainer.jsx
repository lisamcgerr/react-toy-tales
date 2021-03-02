import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {
  

  //a method renderToys is called to map over the Toys array and return a key key={toyObj.id} toy={toyObj}
  //pass down any additional methods like deleteToy and updateLikes into the ToyCare from App
  renderToys = () => {
    return this.props.toys.map(toyObj => {
      return <ToyCard toy={toyObj} key={toyObj.id} deleteToy={this.props.deleteToy} updateLikes={this.props.updateLikes} />
    })
  }


  render() {
    return(
      <div id="toy-collection">
      {this.renderToys()}
      </div>
    )
  }
}

export default ToyContainer;

