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
		chanceLightStartsOn: Math.random(),
	};
	constructor(props) {
		super(props);
		this.state = {
			hasWon: false,
			board: [
				[null, null, null, null, null],
				[null, null, null, null, null],
				[null, null, null, null, null],
				[null, null, null, null, null],
				[null, null, null, null, null],
			],
		};
		// TODO: set initial state
	}

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */

	createBoard() {
		let board = [];

		function willLit() {
			let random = Math.random();
			if (random > 0.5) return true;
			return false;
		}

		for (let i = 0; i < 5; i++) {
			let row = [];
			for (let j = 0; j < 5; j++) {
				row.push({ key: `${i}-${j}`, isLit: willLit() });
			}
			board.push(row);
		}
		console.log('board', board);
		// TODO: create array-of-arrays of true/false values
		return board;
	}

	/** handle changing a cell: update board & determine if winner */

	flipCellsAround(coord) {
		let { ncols, nrows } = this.props;
		let board = this.state.board;
		let [y, x] = coord.split('-').map(Number);

		function flipCell(y, x) {
			// if this coord is actually on board, flip it

			if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
				board[y][x] = !board[y][x];
			}
		}

		// TODO: flip this cell and the cells around it

		// win when every cell is turned off
		// TODO: determine is the game has been won

		// this.setState({ board, hasWon });
	}

	/** Render game board or winning message. */

	render() {
		let showBoard = this.createBoard().map((row, idx) => (
			<tr key={'row-' + idx}>
				{row.map((c) => {
					console.log('c is:', c);
					return <Cell key={c.key} isLit={c.isLit} />;
				})}
			</tr>
		));
		console.log(showBoard);
		return (
			<>
				<h1>Light Game</h1>
				<table>
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
