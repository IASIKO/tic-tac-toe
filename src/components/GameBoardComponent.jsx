import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import ScoreBoxComponent from "./UI/ScoreBoxComponent";
import oFrame from "../assets/oFrame.svg";
import oYellow from "../assets/oYellow.svg";
import xFrame from "../assets/xFrame.svg";
import xGreen from "../assets/xGreen.svg";
import { AppContext } from "../store/context";

const GameBoard = styled.div`
  grid-gap: 20px;
  align-items: center;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 140px);
  justify-items: center;

  @media only screen and (max-width: 480px) {
    grid-gap: 10px;
    gap: 10px;
    grid-template-columns: repeat(3, 100px);
  }
`;

const PlayerTurnBox = styled.div`
  align-items: center;
  background-color: #1f3641;
  border-radius: 10px;
  box-shadow: inset 0 -4px 0 #10212a;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 14px 0 18px;
  width: 100%;

  @media only screen and (max-width: 480px) {
    width: 100px;
  }
`;

const PlayerTurnText = styled.p`
  color: #a8bfc9;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ButtonRestart = styled.div`
  background-color: #a8bfc9;
  border-radius: 10px;
  box-shadow: inset 0 -4px 0 #6b8997;
  cursor: pointer;
  justify-self: end;
  padding: 14px;
  transition: all 0.2s;
`;

const MarkBox = styled.div`
  align-items: center;
  background-color: #1f3641;
  border-radius: 15px;
  box-shadow: inset 0 -8px 0 #10212a;
  cursor: pointer;
  display: flex;
  width: 140px;
  height: 140px;
  justify-content: center;

  @media only screen and (max-width: 480px) {
    width: 100px;
    height: 100px;
  }
`;

const Thumb = styled.img`
  display: none;

  ${MarkBox}:hover & {
    display: flex;
  }
`;

const XscoreBox = styled.div`
  background-color: #31c3bd;
  border-radius: 15px;
  padding: 12px 0;
  width: 100%;

  @media only screen and (max-width: 480px) {
    width: 100px;
  }
`;

const TiesScoreBox = styled.div`
  background-color: #a8bfc9;
  border-radius: 15px;
  padding: 12px 0;
  width: 100%;

  @media only screen and (max-width: 480px) {
    width: 100px;
  }
`;

const OscoreBox = styled.div`
  background-color: #f2b137;
  border-radius: 15px;
  padding: 12px 0;
  width: 100%;

  @media only screen and (max-width: 480px) {
    width: 100px;
  }
`;

const Score = styled.p`
  color: #1a2a33;
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

const GameBoardComponent = () => {
  const ctx = useContext(AppContext);

  const switchPlayerTurn = () => {
    ctx.setPlayerTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"));
  };

  const handleTileClick = (x, y) => {
    if (ctx.tiles[x][y] !== null) {
      return;
    }

    const newArr = [...ctx.tiles];
    newArr[x][y] = ctx.playerTurn;
    ctx.setTiles(newArr);

    switchPlayerTurn();
  };

  const makeRandomMove = () => {
    const emptyTiles = [];
    const playerSign = ctx.isX ? "X" : "O";
    const computerSign = ctx.isX ? "O" : "X";

    for (let i = 0; i < ctx.tiles.length; i++) {
      for (let j = 0; j < ctx.tiles[i].length; j++) {
        if (ctx.tiles[i][j] === null) {
          emptyTiles.push({ x: i, y: j });
        }
      }
    }

    // Check if it's the first move and player hasn't marked the center
    if (emptyTiles.length === 9 || emptyTiles.length === 8) {
      if (ctx.tiles[1][1] === null) {
        // Player hasn't marked the center, so computer marks the center
        const newArr = [...ctx.tiles];
        newArr[1][1] = computerSign;
        ctx.setTiles(newArr);
        switchPlayerTurn();
        return;
      }
    }

    // Check if it's the second move and player marked the center
    if (emptyTiles.length === 8 && ctx.tiles[1][1] !== null) {
      // Find the player's move
      const playerMove = emptyTiles.find(
        (tile) => tile.x !== 1 || tile.y !== 1
      );

      // Check if player's move is in the corner
      if (
        (playerMove.x === 0 || playerMove.x === 2) &&
        (playerMove.y === 0 || playerMove.y === 2)
      ) {
        // Player marked a corner, so computer marks the opposite corner
        const oppositeCorner = { x: 2 - playerMove.x, y: 2 - playerMove.y };
        const newArr = [...ctx.tiles];
        newArr[oppositeCorner.x][oppositeCorner.y] = computerSign;
        ctx.setTiles(newArr);
        switchPlayerTurn();
        return;
      }
    }

    // Check for potential winning moves for the player
    const winningMove = checkForPotentialWinningMove(ctx.tiles, computerSign);

    // For subsequent moves, check for player's 2-in-a-row and block it
    const defensiveMove = checkForDefensiveMove(ctx.tiles, playerSign);

    if (winningMove) {
      // Computer has a potential winning move, winning
      const newArr = [...ctx.tiles];
      newArr[winningMove.x][winningMove.y] = computerSign;
      ctx.setTiles(newArr);
    } else if (defensiveMove) {
      // Player has 2-in-a-row, block it
      const newArr = [...ctx.tiles];
      newArr[defensiveMove.x][defensiveMove.y] = computerSign;
      ctx.setTiles(newArr);
    } else {
      // No potential winning or defensive move, make a random move
      const randomIndex = Math.floor(Math.random() * emptyTiles.length);
      const randomTile = emptyTiles[randomIndex];

      if (randomTile) {
        const newArr = [...ctx.tiles];
        newArr[randomTile.x][randomTile.y] = computerSign;
        ctx.setTiles(newArr);
      }

      if (emptyTiles.length === 0) {
        ctx.setIsModal(true);
        ctx.setWinner("T");
        ctx.setScoreT(ctx.scoreT + 1);
        return;
      }
    }

    switchPlayerTurn();
  };

  const checkForDefensiveMove = (tiles, sign) => {
    // Check rows and columns for potential defensive moves
    for (let i = 0; i < tiles.length; i++) {
      let rowCount = 0;
      let colCount = 0;
      let rowEmpty = null;
      let colEmpty = null;

      for (let j = 0; j < tiles[i].length; j++) {
        if (tiles[i][j] === sign) {
          rowCount++;
        } else if (tiles[i][j] === null) {
          rowEmpty = { x: i, y: j };
        }

        if (tiles[j][i] === sign) {
          colCount++;
        } else if (tiles[j][i] === null) {
          colEmpty = { x: j, y: i };
        }
      }

      if (rowCount === 2 && rowEmpty) {
        return rowEmpty;
      }

      if (colCount === 2 && colEmpty) {
        return colEmpty;
      }
    }

    // Check diagonals for potential defensive moves
    let leftDiagonalCount = 0;
    let rightDiagonalCount = 0;
    let leftDiagonalEmpty = null;
    let rightDiagonalEmpty = null;

    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i][i] === sign) {
        leftDiagonalCount++;
      } else if (tiles[i][i] === null) {
        leftDiagonalEmpty = { x: i, y: i };
      }

      if (tiles[i][2 - i] === sign) {
        rightDiagonalCount++;
      } else if (tiles[i][2 - i] === null) {
        rightDiagonalEmpty = { x: i, y: 2 - i };
      }
    }

    if (leftDiagonalCount === 2 && leftDiagonalEmpty) {
      return leftDiagonalEmpty;
    }

    if (rightDiagonalCount === 2 && rightDiagonalEmpty) {
      return rightDiagonalEmpty;
    }

    return null;
  };

  const checkForPotentialWinningMove = (tiles, sign) => {
    // Check rows and columns for potential winning moves
    for (let i = 0; i < tiles.length; i++) {
      let rowCount = 0;
      let colCount = 0;
      let rowEmpty = null;
      let colEmpty = null;

      for (let j = 0; j < tiles[i].length; j++) {
        if (tiles[i][j] === sign) {
          rowCount++;
        } else if (tiles[i][j] === null) {
          rowEmpty = { x: i, y: j };
        }

        if (tiles[j][i] === sign) {
          colCount++;
        } else if (tiles[j][i] === null) {
          colEmpty = { x: j, y: i };
        }
      }

      if (rowCount === 2 && rowEmpty) {
        return rowEmpty;
      }

      if (colCount === 2 && colEmpty) {
        return colEmpty;
      }
    }

    // Check diagonals for potential winning moves
    let leftDiagonalCount = 0;
    let rightDiagonalCount = 0;
    let leftDiagonalEmpty = null;
    let rightDiagonalEmpty = null;

    for (let i = 0; i < tiles.length; i++) {
      if (tiles[i][i] === sign) {
        leftDiagonalCount++;
      } else if (tiles[i][i] === null) {
        leftDiagonalEmpty = { x: i, y: i };
      }

      if (tiles[i][2 - i] === sign) {
        rightDiagonalCount++;
      } else if (tiles[i][2 - i] === null) {
        rightDiagonalEmpty = { x: i, y: 2 - i };
      }
    }

    if (leftDiagonalCount === 2 && leftDiagonalEmpty) {
      return leftDiagonalEmpty;
    }

    if (rightDiagonalCount === 2 && rightDiagonalEmpty) {
      return rightDiagonalEmpty;
    }

    return null;
  };

  const checkForWinner = (tiles) => {
    const signsArr = ["X", "O"];

    signsArr.forEach((sign) => {
      tiles.forEach((tile, x) => {
        if (tile.every((memb) => memb == sign)) {
          ctx.setIsModal(true);
          ctx.setWinner(sign);
          ctx.setWinComb(x);
          if (sign === "X") {
            ctx.setScoreX(ctx.scoreX + 1);
          }
          if (sign === "O") {
            ctx.setScoreO(ctx.scoreO + 1);
          }
        }
      });

      if (
        tiles[0][0] === sign &&
        tiles[1][1] == sign &&
        tiles[2][2] == sign &&
        sign === "X"
      ) {
        ctx.setScoreX(ctx.scoreX + 1);
        ctx.setIsModal(true);
        ctx.setWinner("X");
        ctx.setWinComb("leftDiagonal");
      }

      if (
        tiles[0][0] === sign &&
        tiles[1][1] == sign &&
        tiles[2][2] == sign &&
        sign === "O"
      ) {
        ctx.setScoreO(ctx.scoreO + 1);
        ctx.setIsModal(true);
        ctx.setWinner("O");
        ctx.setWinComb("leftDiagonal");
      }

      if (
        tiles[0][2] === sign &&
        tiles[1][1] == sign &&
        tiles[2][0] == sign &&
        sign === "X"
      ) {
        ctx.setScoreX(ctx.scoreX + 1);
        ctx.setIsModal(true);
        ctx.setWinner("X");
        ctx.setWinComb("rightDiagonal");
      }

      if (
        tiles[0][2] === sign &&
        tiles[1][1] == sign &&
        tiles[2][0] == sign &&
        sign === "O"
      ) {
        ctx.setScoreO(ctx.scoreO + 1);
        ctx.setIsModal(true);
        ctx.setWinner("O");
        ctx.setWinComb("rightDiagonal");
      }

      for (let i = 0; i < tiles.length; i++) {
        if (
          tiles[0][i] === sign &&
          tiles[1][i] === sign &&
          tiles[2][i] === sign
        ) {
          ctx.setIsModal(true);
          ctx.setWinner(sign);
          ctx.setWinComb(`vertical${i}`);
          if (sign === "X") {
            ctx.setScoreX(ctx.scoreX + 1);
          }
          if (sign === "O") {
            ctx.setScoreO(ctx.scoreO + 1);
          }
        }
      }

      let isTilesFull = true;

      for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
          if (tiles[i][j] === null) {
            isTilesFull = false;
          }
        }
      }

      if (isTilesFull) {
        ctx.setIsModal(true);
        ctx.setWinner("T");
        ctx.setScoreT(ctx.scoreT + 1);
      }
    });
  };

  useEffect(() => {
    checkForWinner(ctx.tiles);
  }, [ctx.tiles]);

  useEffect(() => {
    if (ctx.enterCpuGame) {
      if (ctx.isX && ctx.playerTurn === "O") {
        makeRandomMove();
      }
      if (!ctx.isX && ctx.playerTurn === "X") {
        makeRandomMove();
      }
    }
  }, [ctx.playerTurn]);

  return (
    <GameBoard>
      <img src={logo} alt="logo" style={{ justifySelf: "start" }} />
      <PlayerTurnBox>
        <svg
          viewBox="0.27 0.27 63.46 63.46"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {ctx.playerTurn === "X" ? (
            <path
              fill="#a8bfc9"
              d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
            ></path>
          ) : (
            <path
              fill="#a8bfc9"
              d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
            ></path>
          )}
        </svg>
        <PlayerTurnText>turn</PlayerTurnText>
      </PlayerTurnBox>
      <ButtonRestart
        onClick={() => {
          ctx.setIsModal(true);
          ctx.setRestarted(true);
        }}
      >
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#1f3641"
            d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z"
          ></path>
        </svg>
      </ButtonRestart>
      {ctx.tiles.map((box, x) =>
        box.map((_, y) => (
          <MarkBox
            onClick={() => handleTileClick(x, y)}
            key={y}
            style={{
              backgroundColor:
                (ctx.winComb === x && ctx.winner === "X") ||
                (ctx.winComb === "leftDiagonal" &&
                  x === y &&
                  ctx.winner === "X") ||
                (ctx.winComb === "rightDiagonal" &&
                  x + y === 2 &&
                  ctx.winner === "X") ||
                (ctx.winComb === `vertical${y}` &&
                  ctx.tiles[0][y] === "X" &&
                  ctx.tiles[1][y] === "X" &&
                  ctx.tiles[2][y] === "X")
                  ? "#31c3bd"
                  : (ctx.winComb === x && ctx.winner === "O") ||
                    (ctx.winComb === "leftDiagonal" &&
                      x === y &&
                      ctx.winner === "O") ||
                    (ctx.winComb === "rightDiagonal" &&
                      x + y === 2 &&
                      ctx.winner === "O") ||
                    (ctx.winComb === `vertical${y}` &&
                      ctx.tiles[0][y] === "O" &&
                      ctx.tiles[1][y] === "O" &&
                      ctx.tiles[2][y] === "O")
                  ? "#f2b137"
                  : "",
            }}
          >
            {ctx.tiles[x][y] !== null ? (
              ctx.tiles[x][y] === "X" ? (
                <img
                  src={xGreen}
                  alt="x sign green"
                  style={{
                    filter:
                      (ctx.winComb === x && ctx.winner === "X") ||
                      (ctx.winComb === "leftDiagonal" && x === y) ||
                      (ctx.winComb === "rightDiagonal" && x + y === 2) ||
                      (ctx.winComb === `vertical${y}` &&
                        ctx.tiles[0][y] === "X" &&
                        ctx.tiles[1][y] === "X" &&
                        ctx.tiles[2][y] === "X")
                        ? "brightness(0) saturate(1) opacity(.8)"
                        : "",
                  }}
                />
              ) : (
                <img
                  src={oYellow}
                  alt="x sign green"
                  style={{
                    filter:
                      (ctx.winComb === x && ctx.winner === "O") ||
                      (ctx.winComb === "leftDiagonal" && x === y) ||
                      (ctx.winComb === "rightDiagonal" && x + y === 2) ||
                      (ctx.winComb === `vertical${y}` &&
                        ctx.tiles[0][y] === "O" &&
                        ctx.tiles[1][y] === "O" &&
                        ctx.tiles[2][y] === "O")
                        ? "brightness(0) saturate(1) opacity(.8)"
                        : "",
                  }}
                />
              )
            ) : ctx.playerTurn == "X" ? (
              <Thumb src={xFrame} alt="x sign frame"></Thumb>
            ) : (
              <Thumb src={oFrame} alt="0 sign frame"></Thumb>
            )}
          </MarkBox>
        ))
      )}
      <XscoreBox>
        <ScoreBoxComponent>
          {ctx.enterCpuGame ? (ctx.isX ? "x (you)" : "x (cpu)") : "x (p1)"}
        </ScoreBoxComponent>
        <Score>{ctx.scoreX}</Score>
      </XscoreBox>
      <TiesScoreBox>
        <ScoreBoxComponent>ties</ScoreBoxComponent>
        <Score>{ctx.scoreT}</Score>
      </TiesScoreBox>
      <OscoreBox>
        <ScoreBoxComponent>
          {ctx.enterCpuGame ? (!ctx.isX ? "x (you)" : "x (cpu)") : "o (p2)"}
        </ScoreBoxComponent>
        <Score>{ctx.scoreO}</Score>
      </OscoreBox>
    </GameBoard>
  );
};

export default GameBoardComponent;
