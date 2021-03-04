import React from 'react'
import Square from "../Square/Square";

class Board extends React.Component {

    renderSquare(i) {
        const isActive = this.props.squaresWin.includes(i)
        return <Square value={this.props.squares[i]}
                       onClick={() => {
                           this.props.onClick(i)
                       }}
                       isActive={isActive}
        />;
    }

    renderTicTacField(rows, columns) {
        const squares = Array(rows * columns).fill(null).map((item, index) => {
            return this.renderSquare(index)
        })

        const result = []
        for(let i = 0; i < squares.length; i += columns) {
            const row = squares.slice(i, i + columns)
            result.push(<div className='board-row'>{row}</div>)
        }

        return result
    }

    render() {

        return (
            <div>
                {this.renderTicTacField(3,3)}
            </div>
        );

    }
}

export default Board