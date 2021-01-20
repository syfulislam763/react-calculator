  
import React from 'react';
import { ButtonGroup } from 'reactstrap';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { buttonStyle, divStyle, equalButton } from './style.js';


const Button = props => {
    return <button 
        style={buttonStyle}
        onClick={() => props.handleClickEvent(props.value)}
    >
        {props.value}
    </button>
}

const Buttons = props => {
    let fz = props.current.length>17?'20px':'30px';
    return <div style={{
            width:'100%',
            textAlign:'center'
        }} className='mt-1'>

       <ButtonGroup>
            <div style={divStyle}>
                <p style={{marginTop:'20px',fontSize:'15px',marginRight:'10px'}}>
                    {props.previous?props.previous:''}
                </p>
                <p style={{marginTop:'0px',fontSize:fz,marginRight:'10px'}}>
                    {props.current?props.current:''}
                </p>
            </div>
        </ButtonGroup>
        <br/>
        <ButtonGroup className="">
            <Button handleClickEvent={props.handleClear} value='c'/>
            <Button handleClickEvent={props.handleDelete} value={<FontAwesomeIcon icon={faBackspace}/>}/>
            <Button handleClickEvent={props.handleMRSF} value='%'/>
            <Button handleClickEvent={props.handleMRSF} value='x!'/>
        </ButtonGroup>
        <br/>
        <ButtonGroup>
            <Button handleClickEvent={props.handleMRSF} value='√x'/>
            <Button handleClickEvent={props.handleMRSF} value='a^b'/>
            <Button handleClickEvent={props.handleMRSF} value='π'/>
            <Button handleClickEvent={props.handleOperation} value='÷'/>
        </ButtonGroup>
        <br/>
        <ButtonGroup>
            <Button handleClickEvent={props.handleNumber} value='7'/>
            <Button handleClickEvent={props.handleNumber} value='8'/>
            <Button handleClickEvent={props.handleNumber} value='9'/>
            <Button handleClickEvent={props.handleOperation} value='×'/>
        </ButtonGroup>
        <br/>
        <ButtonGroup>
            <Button handleClickEvent={props.handleNumber} value='4'/>
            <Button handleClickEvent={props.handleNumber} value='5'/>
            <Button handleClickEvent={props.handleNumber} value='6'/>
            <Button handleClickEvent={props.handleOperation} value='−'/>
        </ButtonGroup>
        <br/>
        <ButtonGroup>
            <Button handleClickEvent={props.handleNumber} value='1'/>
            <Button handleClickEvent={props.handleNumber} value='2'/>
            <Button handleClickEvent={props.handleNumber} value='3'/>
            <Button handleClickEvent={props.handleOperation} value='+'/>
        </ButtonGroup>
        <br/>
        <ButtonGroup>
            <Button handleClickEvent={props.handleDot} value='.'/>
            <Button handleClickEvent={props.handleNumber} value='0'/>
            <button onClick={() => props.handleCalculate('=')} style={equalButton}>=</button>
        </ButtonGroup>
    </div>
}

export default Buttons;