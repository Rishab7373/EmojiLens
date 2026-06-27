/* eslint-disable react-hooks/refs */
import { useEffect, useRef, useState } from "react";

const playersId = {
    x: "X",
    o: "O"
}
const GAME_BOX_MATRIX_INITIAL = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

const getWinnerId = (gameBoxMatrix) => {
    //row wise
    const winnerInRows = gameBoxMatrix.reduce((winnerTillNow, currentRow) => {
        if (!winnerTillNow && currentRow.every((value) => { return value === currentRow[0] })) {
            return currentRow[0]
        }
        else return winnerTillNow
    }, null)

    if (winnerInRows) return winnerInRows;

    // cols wise

    for (let i = 0; i < 3; i++) {
        let isColSame = true;
        for (let j = 0; j < 3; j++) {
            isColSame = isColSame && gameBoxMatrix[j][i] === gameBoxMatrix[0][i]
        }
        if (isColSame) {
            return gameBoxMatrix[0][i];
        }
    }

    // diagonals
    // [(0,0),(0,1),(0,2)] 0 , 2 - 0
    // [(1,0),(1,1),(1,2)] 1 , 2 - 1
    // [(2,0),(2,1),(2,2)] 2 , 2 - 2

    let diagnol1 = true;
    let diagnol2 = true;
    for( let i=0; i<3; i++){

        // d1 i , 0 + i
        diagnol1 = diagnol1 && gameBoxMatrix[i][i] === gameBoxMatrix[0][0];
        
        //d2 i , n - 1 - i

        diagnol2 = diagnol2 && gameBoxMatrix[i][2-i] === gameBoxMatrix[0][2];

    }
    if(diagnol1){
        return gameBoxMatrix[0][0];
    }
    if(diagnol2){
        return gameBoxMatrix[0][2];
    }

    return null;
}
const Box = ({ children, onClick, className }) => {
    return <div onClick={onClick} style={{ height: "40px", width: "40px", border: "1px solid grey", ...className }}>
        {children}
    </div>
}
const TicTacToe = (props) => {
    const playerOnTurnRef = useRef(playersId.x)
    const [gameBoxMatrix, setGameBoxMatrix] = useState(GAME_BOX_MATRIX_INITIAL)
    const togglePlayer = () => {

        playerOnTurnRef.current = (playerOnTurnRef.current === playersId.o ? playersId.x : playersId.o)

    }
    const currentPlayer = playerOnTurnRef.current;

    const boxOnClick = (rowInd, colInd) => {
        const playerOnTurn = playerOnTurnRef.current
        console.log({ rowInd, colInd, gameBoxMatrix, playerOnTurn })
        // GAME_BOX_MATRIX[rowInd][colInd] = playerOnTurn;
        if (playerOnTurn === gameBoxMatrix[rowInd][colInd]) {
            return;
        }
        togglePlayer()
        setGameBoxMatrix((prev) => {
            return prev.map((prevRow, prevRowInd) => {
                return prevRow.map((prevItem, prevColInd) => {
                    if (prevRowInd === rowInd && prevColInd === colInd) {
                        return playerOnTurn
                    }
                    return prevItem;
                })
            })
        })

    }

    const winnerId = getWinnerId(gameBoxMatrix);


    return <section>
        <h2>Choose your option</h2>
        <div>
            <div>
                <input
                    type="radio"
                    id={playersId.x}
                    name={"playersId"}
                    value={playersId.x}
                    checked={currentPlayer === playersId.x} />
                <label for={playersId.x}>Player X</label>
            </div>
            <div>
                <input
                    type="radio"
                    id={playersId.o}
                    name={"playersId"}
                    value={playersId.x}
                    checked={currentPlayer === playersId.o} />
                <label for={playersId.o}>Player O</label>
            </div>
        </div>
        {
            !winnerId && (
                <div style={{ position: "relative", paddingBlock: 30, }}>
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>{
                gameBoxMatrix.map((gameBoxRow, rowInd) => {
                    return <div style={{ display: "flex", flexDirection: "row" }}>
                        {gameBoxRow.map((gameBoxId, colInd) => {
                            return <Box
                                onClick={() => { boxOnClick(rowInd, colInd) }}
                                className={
                                    { cursor: currentPlayer === gameBoxId ? "default" : "pointer" }
                                }>
                                {gameBoxId}
                            </Box>
                        })}</div>
                })
            }</div>
        </div>
            )
        }
        {
            winnerId && <div>{winnerId} won!!</div>
        }

        


    </section>
}

export default TicTacToe;