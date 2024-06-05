import React, {useState} from 'react';
import { createStage } from '../gameHelper';

//components
import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

//styled components
import { StyledTetrisWrapper, StyledTetris } from './styles/StyledTetris';

//custom hooks
import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';


const Tetris = () =>{

    const [dropTime, setDropTime] = useState(null);
    const [gameOver, setGameOver] = useState(false);

    const [player, updatePlayerPos, resetPlayer] = usePlayer();
    const[stage, setStage] = useStage(player);


    console.log('re-render');

    const movePlayer = dir => {
        updatePlayerPos({x: dir, y:0});
    }

    const startGame = () => {
        //Reset Everything
        setStage(createStage());
        resetPlayer();
    }

    const drop = () => {
        updatePlayerPos({x: 0, y: 1, collided: false})
    }

    const dropPlayer = () => {
        drop();
    }

    const move = ({ keycode }) => {
        if (!gameOver) {
            if (keycode === 37){                //37 kc4 lftArrow
                movePlayer(-1);
            } else if (keycode === 39){         //39 kc4 rghtArrow
                movePlayer(1);
            } else if (keycode === 40){         //40 kc4 downArrow
                dropPlayer();
            }
        }
    }

    return(
        <>
            <StyledTetrisWrapper role = "button" tabIndex = "0" onKeyDown={ e => move(e)}>
                <StyledTetris>
                    <Stage stage={stage}/>
                         <aside>
                         {gameOver ? (
                            <Display gameOver={gameOver} text="Game Over ... you lose xoxoxo" /> ) : (
                         
                         <>
                             <Display text="Score"/>
                            <Display text="Rows"/>
                            <Display text="Level"/>
                                </>
                            )}
                            <StartButton callback={startGame}/>
                        </aside>
                </StyledTetris>
            </StyledTetrisWrapper>
        </>
    );
};

export default Tetris;