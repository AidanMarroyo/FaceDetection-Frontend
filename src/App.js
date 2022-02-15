import React, { Component } from 'react';
import ParticlesBG from './Particles';
import Signin from './components/Signin/Signin';
import Registration from './components/Registration/Registration';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLink from './components/ImageLink/ImageLink';
import Rank from './components/Rank/Rank';
import './App.css';


 const initialState = {
  input: '',
      imageUrl:'',
      box: {},  
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
 

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }


  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://secure-dusk-45732.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
          input: this.state.input
      })
    })
    .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('https://secure-dusk-45732.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count }))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
    <div className="App">
        <ParticlesBG />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
        ? <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLink onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box={box  } imageUrl={imageUrl} />
            </div>
          : (
            this.state.route === 'signin' 
              ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
                <Registration loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          ) 
        
       
        }
      </div>
    );
  }
    
  }
  

export default App;
