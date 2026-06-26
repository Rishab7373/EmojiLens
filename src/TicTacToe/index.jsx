import { useRef, useState } from "react";

const playersId = {
    x: "X",
    o: "O"
}
const GAME_BOX_MATRIX_INITIAL = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
const Box = ({ children, onClick }) => {
    return <div onClick={onClick} style={{ height: "40px", width: "40px", border: "1px solid grey" }}>
        {children}
    </div>
}
const TicTacToe = (props) => {
    // let playerOnTurn = playersId.x;
    // const [playerOnTurn, setPlayerOnTurn] = useState(playersId.x)
    const playerOnTurnRef = useRef(playersId.x)
    const [gameBoxMatrix, setGameBoxMatrix] = useState(GAME_BOX_MATRIX_INITIAL)
    const togglePlayer = () => {
        
            playerOnTurnRef.current = (playerOnTurnRef.current === playersId.o ? playersId.x : playersId.o)
        
    }
    const boxOnClick = (rowInd, colInd) => {
        const playerOnTurn = playerOnTurnRef.current
        console.log({ rowInd, colInd, gameBoxMatrix, playerOnTurn })
        // GAME_BOX_MATRIX[rowInd][colInd] = playerOnTurn;
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
    return <section>
        <h2>Choose your option</h2>
        <div>
            <div>
                <input
                    type="radio"
                    id={playersId.x}
                    name={"playersId"}
                    value={playersId.x}
                    checked={playerOnTurnRef.current === playersId.x} />
                <label for={playersId.x}>Player X</label>
            </div>
            <div>
                <input
                    type="radio"
                    id={playersId.o}
                    name={"playersId"}
                    value={playersId.x}
                    checked={playerOnTurnRef.current === playersId.o} />
                <label for={playersId.o}>Player O</label>
            </div>
        </div>

        <div style={{ position: "relative", paddingBlock: 30, }}>
            <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", cursor: "pointer" }}>{
                gameBoxMatrix.map((gameBoxRow, rowInd) => {
                    return <div style={{ display: "flex", flexDirection: "row" }}> {gameBoxRow.map((gameBoxId, colInd) => {
                        return <Box onClick={() => { boxOnClick(rowInd, colInd) }}>{gameBoxId}</Box>
                    })}</div>
                })
            }</div>
        </div>


    </section>
}

export default TicTacToe;