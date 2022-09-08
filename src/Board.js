/** @format */

import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
	static defaultProps = {
		nrows: 5,
		ncols: 5,
		chanceLightStartsOn: 0.25,
	};
	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: this.createBoard(),
		};
		// TODO: set initial state
		this.flipCellsAround = this.flipCellsAround.bind(this);
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */

	createBoard() {
		let board = [];
		let { chanceLightStartsOn } = this.props;

		function willLit() {
			let random = Math.random();
			if (random < chanceLightStartsOn) return true;
			return false;
		}

		for (let i = 0; i < 5; i++) {
			let row = [];
			for (let j = 0; j < 5; j++) {
				let coord = `${i}-${j}`;
				row.push({ key: coord, isLit: willLit() });
			}
			board.push(row);
		}
		// TODO: create array-of-arrays of true/false values
		return board;
	}

	/** handle changing a cell: update board & determine if winner */

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [y, x] = coord.split('-').map(Number);
		console.log(coord, y, x);
		function flipCell(y, x) {
			// if this coord is actually on board, flip it

			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x].isLit = !board[y][x].isLit;
			}
		}

		// TODO: flip this cell and the cells around it
		flipCell(y, x);

		// win when every cell is turned off
		// TODO: determine is the game has been won

		this.setState({ board });
	}

	/** Render game board or winning message. */

	render() {
		let showBoard = this.state.board.map((row, idx) => (
			<tr key={'row-' + idx}>
				{row.map((c) => {
					return (
						<Cell
							key={c.key}
							coord={c.key}
							isLit={c.isLit}
							flipCellsAroundMe={this.flipCellsAround}
						/>
					);
				})}
			</tr>
		));
		return (
			<>
				<h1>Light Game</h1>
				<table className="Board">
					<tbody>{showBoard}</tbody>
				</table>
			</>
		);
		// if the game is won, just show a winning msg & render nothing else
		// TODO
		// make table board
		// TODO
	}
}

export default Board;
