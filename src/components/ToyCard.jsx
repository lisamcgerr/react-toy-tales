import React, { Component } from 'react';

class ToyCard extends Component {

  handleRemove = () => {
    const {id} = this.props.toy

    fetch(`http://localhost:3000/toys/${id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => {
      this.props.deleteToy(id)
    })
  }

  updateLikes = (e) => {
    //updating the likes using a PATCH fetch request, calling parseInt on the innerText of the node above it
    //parseInt removing any additional string - turning to a number
    //this.props.updateLikes(updatedToy) to update the state of the toy's likes in App.js so that it can be 
    //rendered in the front end
    //console.log(e.target)
    const {id} = this.props.toy

    const likes = parseInt(e.target.previousElementSibling.innerText)

    const reqObj = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: likes + 1
      })
    }

    fetch(`http://localhost:3000/toys/${id}`, reqObj)
    .then(resp => resp.json())
    .then(updatedToy => {
      this.props.updateLikes(updatedToy)
    })
    
  }

  render() {

    const { name, image, likes } = this.props.toy

    return (
      <div className="card">
        <h2>{name}</h2>
        <img src={image} alt={name} className="toy-avatar" />
        <p>{likes} Likes </p>
        <button onClick={this.updateLikes} className="like-btn">Like {'<3'}</button>
        <button onClick={this.handleRemove} className="del-btn">Donate to GoodWill</button>
      </div>
    );
  }

}

export default ToyCard;
