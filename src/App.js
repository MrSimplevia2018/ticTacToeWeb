// import logo from './logo.svg';
import './App.css';
import react from 'react';
import Game from './components/Game';

class App extends react.Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""}
  }

  // callAPI() {
  //   fetch("http://localhost:9000/web_api").then(res => res.text())
  //   .then(res => this.setState({apiResponse: res}));
  // }

  // componentWillMount() {
  //   this.callAPI();
  // }

  render(){
    return (
      <Game />
    );
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //    </header>
    //    <p>{this.state.apiResponse}</p>
    //   </div>
    // );
  }
  
}



export default App;
