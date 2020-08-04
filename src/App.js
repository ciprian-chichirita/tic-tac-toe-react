import React, { useState, useCallback } from 'react';
import './App.css';
//TODO: mail to: sergey.rura@elbitsystems.com
const TIC_TAC_TOE_GRID_LIMIT = 9;
function App() {
  const [cells, setCells] = useState(Array(TIC_TAC_TOE_GRID_LIMIT).fill());
  const [xToggle, setXtoggle] = useState(true);//start with x or not
  const restartGame = useCallback(() => {
    setCells(Array(TIC_TAC_TOE_GRID_LIMIT).fill());
    setXtoggle(true);
  }, []);

  const getWinner = (cellsArr) => {
    cellsArr = [...cellsArr];
    const validationArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let index = 0; index < validationArr.length; index++) {
      const validSolutionArr = validationArr[index];
      /* const [pos_1, pos_2, pos_3] = validationArr[index];
      if (cellsArr[pos_1] && cellsArr[pos_1] === cellsArr[pos_2] && cellsArr[pos_2] === cellsArr[pos_3]) {
        return cellsArr[pos_1];
      } */
      let winner;
      for (let i = 0; i < validSolutionArr.length; i++) {
        const arrPoss = validSolutionArr[i];
        if (i === 0) {
          winner = cellsArr[arrPoss];
          continue;
        }

        if (typeof cellsArr[arrPoss] !== "undefined" && winner === cellsArr[arrPoss]) {
          continue;
        } else {
          winner = undefined;
          break;
        }
      }

      if (winner) {
        return winner;
      }
    }
    return;
  }
  const winner = getWinner(cells);

  const onClickHandler = (index) => {
    return (event) => {
      const newCells = [...cells];
      if (winner || newCells[index]) {
        return;
      }
      newCells[index] = xToggle ? "X" : "O";//x or o
      setCells(newCells);
      setXtoggle(!xToggle);
    }
  }

  const renderCells = (ticTacToeCellsArr) => {
    ticTacToeCellsArr = [...ticTacToeCellsArr];
    return ticTacToeCellsArr.map((value, index) => {
      return (<div key={`tic-tac-toe_${index}`} className="cell" onClick={onClickHandler(index)}>{value ? value : ""}</div>);
    });
  }

  return (
    <div className="App">
      <h3>Winner: {winner ? winner : ""}</h3>
      <button onClick={restartGame}>restart</button>
      <hr />
      <div className="board">
        {renderCells(cells)}
      </div>
    </div>
  );
}

export default App;
