import React from 'react';
import Cell from './Cell.js';
import { StyledStage } from './styles/StyledStage.js';

const Stage = ({stage}) => (
    <StyledStage width = {stage[0].length} height={stage.length}>
    {stage.map(row => row.map((cell, x) => <Cell key = {x} type ={cell[0]} />))}
    </StyledStage>
);

export default Stage;