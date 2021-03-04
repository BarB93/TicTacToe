import React from 'react'
import Board from "../Board/Board";
import {calculateWinner, getSquaresWin} from "../../functions/functions";
import Filter from "../Filter/Filter";

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
            isReverseHistoryList: false,
            squaresWin: []
        }
    }


    handleClick = (index) => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = current.squares.slice()

        if(calculateWinner(squares) || squares[index]) return

        squares[index] = this.state.xIsNext ? 'X' : 'O'
        this.setState({
            history: history.concat([{squares}]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length
        })

        if(calculateWinner(squares)) {
            const squaresWin = getSquaresWin(squares)
            this.setState({
                squaresWin: squaresWin
            })
        }
    }

    jumpTo = (step) => {
        const history = this.state.history

        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            squaresWin: history.length - 1 === step ? getSquaresWin(history[history.length - 1].squares) : []
        })
    }

    sortList = () => {
        this.setState({
            isReverseHistoryList: !this.state.isReverseHistoryList
        })
    }

    render() {
        const history = this.state.history
        const current = history[this.state.stepNumber]
        const winner = calculateWinner(current.squares)


        const moves = history.map((step, move) => {
            if(this.state.isReverseHistoryList) move = history.length - 1 - move
            const desc = move ?
                `Перейти к ходу #${move}`
                : `Перейти к началу игры`


            return (
                <tr key={move}>
                    <td className={'table_data ' + (move === this.state.stepNumber? 'current' : '')} onClick={() => this.jumpTo(move)}>
                        {desc}
                    </td>
                </tr>
            )
        })

        let status
        if (winner) status = <span className='status_bold'>Выиграл: <span className='status_symbol'>{winner}</span></span>
        else if(!current.squares.includes(null)) status = <span className='status_bold'>{'Ничья'}</span>
        else status = <span>Следующий ход: <span className='status_symbol'>{this.state.xIsNext ? 'X' : 'O'}</span></span>

        return (
            <div className="game">
                <div className="game-board">
                    <Board  onClick={(i) => this.handleClick(i)} squares={current.squares} squaresWin={this.state.squaresWin}/>
                </div>
                <div className="game-info">
                    <div className='status'>{status}</div>
                    <Filter isReverseHistoryList={this.state.isReverseHistoryList} onClik={this.sortList}/>
                    <table><tbody>{moves}</tbody></table>
                </div>
            </div>
        );
    }
}

export default Game