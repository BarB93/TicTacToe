import React from 'react'
import Board from "../Board/Board";
import {calculateWinner} from "../../functions/functions";

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null)
                }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    handleClick = (index) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        if (calculateWinner(squares) || squares[index]) return

        squares[index] = this.state.xIsNext ? 'X' : 'O'

        this.setState({
            history: history.concat([{squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length

        })
    }

    jumpTo = (step) => {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)

        const moves = history.map((step, move) => {
            const desc = move ?
                `Перейти к ходу #${move}`
                : `Перейти к началу игры`

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>
                        {desc}
                    </button>
                </li>
            )
        })

        let status
        if (winner) status = `Выиграл: ${winner}`
        else status = `Следующий ход: ${this.state.xIsNext ? 'X' : 'O'}`

        return (
            <div className="game">
                <div className="game-board">
                    <Board  onClick={(i) => this.handleClick(i)} squares={current.squares}/>
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

export default Game