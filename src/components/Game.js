import React, { Component } from 'react';
import Board from './Board';
import axios from 'axios';

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history: [
                {squares: Array(9).fill(null)}
            ]
        }
    }
    
    callAPI(squares) {
        if(squares !== undefined) {
            //initialize square array
            const lines = [
                [0, 1, 2 ],
                [3, 4, 5 ],
                [6, 7, 8 ],
                [0, 3, 6 ],
                [1, 4, 7 ],
                [2, 5, 8 ],
                [0, 4, 8 ],
                [2, 4, 6 ]
            ]
                                 
            for (let x = 0; x < lines.length; x++) {
                const [a, b, c ] = lines[x];
                
                if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
                    return squares[a];
                } 
            }
            return null;
                  
        }

    }

    componentWillMount(squares) {
        this.callAPI(squares);
    }

    handleClick(i) {
       
        const history = this.state.history.slice(0, this.state.stepNumber +1);
        const current = history[history.length - 1];
        // Call API endpoint from API Repository
        axios.post('http://localhost:9000/web_api/create', current)
        .then(response => {
            const squares = response.data.squares.slice();
            const winner = this.callAPI(squares);
          
            if (winner ) {
                return; 
            } 
            
            squares[i] = this.state.xIsNext ? 'X' : 'O';
            this.setState({
                history: history.concat({
                    squares: squares
                }),
                xIsNext: !this.state.xIsNext,
                stepNumber: history.length
            })
        }) //this.setState({ history: current })
       
    }

    jumpTo(step) {
        this.setState({
            xIsNext: (step %2 ) === 0,
            stepNumber: step
        })
        console.log(step, step)
    }

    startGame(step) {
        this.setState({
            xIsNext: (step %2 ) === 0,
            stepNumber: step
        })
    }

    render () {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        let winner = this.callAPI(current.squares);
        const moves = history.map((step, move) => {
            console.log(move, "movesss")
            const desc = move ? 'Go to #' + move : 'Start the Game';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        });
        let status;
        // if array squares does not have null values, display tie message else display winner of player's turn
        if (current.squares.includes(null) === false) {
            status = "It's a tie";
        } else if(winner) {
            status = 'Winner is  ' + winner;
        } else {
            status = 'Player ' + (this.state.xIsNext? 'X' : 'O') +  "'s turn" ; 
        }

        return (
            <div className="game">
               <div className="game-board">
                   <Board onClick={(i) => this.handleClick(i)} squares={current.squares} />
               </div>
               <div className="game-info">
                   <div>{status}</div>
                   <div className="m-t-10"></div>
                   <button onClick={() => this.startGame(0)}>Start the Game</button>
                   
               </div>
            </div>
            
        )
            
    }
}
