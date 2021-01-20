
  
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buttons from '../buttons/buttons'
import './calculator.css'



class Calculator extends React.PureComponent{


    state = {
        current: '',
        previous: '',

        square:0,
        root: 0,
        factorial:0,
        isDot: true,
    }

    getSquare = () => {
        let index = this.state.current.indexOf('^');
        let n1 = this.state.current.substr(0, index);
        let n2 = this.state.current.substr(index+1, this.state.current.length);
        let square = '';
        if(!isNaN(+n1) && !isNaN(+n2)){
            let value = Number(n1) ** Number(n2);
            let previous = this.state.current;
            if(Number.isInteger(value)){
                square = ''+value;
            }else{
                square = value.toFixed('2');
            }

            this.setState({
                current: square,
                previous: previous,
                square: 0,
                factorial: 0,
                root: 0,
                isDot: true
            })

        }else{
            this.setState({
                current: 'Program Failed',
                previous: '',
                factorial: 0,
                root: 0,
                square: 0,
                isDot: true
            })
        }
    }

    getEvalValue = () => {
        let arr = this.state.current.split(''), len = arr.length;
        for(let i=0; i<len; i++){
            if(arr[i]==='+'){
                arr[arr.indexOf(arr[i])] = '+';
            }
            if(arr[i]==='÷'){
                arr[arr.indexOf(arr[i])] = '/';
            }
            if(arr[i]==='×'){
                arr[arr.indexOf(arr[i])] = '*';
            }
            if(arr[i]==='−'){
                arr[arr.indexOf(arr[i])] = '-';
            }
            if(arr[i]==='π'){
                arr[arr.indexOf(arr[i])] = '3.1416';
            }
        };
        let sign = '*/-+%'
        let str = arr.join('');
        if(sign.includes(str[str.length-1])){
            return str.slice(0, str.length-1);
        }else{
            return str;
        }
    }

    getRoot = () => {
        let index = this.state.current.length;
        let n = this.state.current.substr(1, index);
        let sqrt = ''
        if(!isNaN(+n)){
            let value = Math.sqrt(+n);
            let previous = this.state.current;
            if(Number.isInteger(value)){
                sqrt = ''+value;
            }else{
                sqrt = value.toFixed(2);
            }

            this.setState({
                current: sqrt,
                previous: previous,
                factorial: 0,
                root: 0,
                square: 0,
                isDot: true
            })
        }else{
            this.setState({
                current: 'Program Failed',
                previous: '',
                factorial: 0,
                root: 0,
                square: 0,
                isDot: true
            })
        }
    }

    getFactorial = () => {
        let index = this.state.current.indexOf('!')

        let n = this.state.current.substr(0, index);
        if(this.state.current.length-1 === index){
        // if(!isNaN(+n)){
            function calculateFactorial(n){
                if(n===0)return 1;
                else{
                    return calculateFactorial(n-1)*n;
                }
            }
            let value = calculateFactorial(+n);
            return value;
        // }else{
        //     return 'Program Faild'
        // }
        }else{
            return 'Error';
        }
    }
    handleCalculate = value => {
       
        let {factorial, square, root} = this.state;

        if(factorial&&square&&root){
            this.setState({
                current:'Error',
                previous: '',
                factorial: 0,
                square: 0,
                root: 0,
                isDot:true
            });
        }

        else if(factorial && square){
            this.setState({
                current:'Error',
                previous: '',
                factorial: 0,
                square: 0,
                root: 0,
                isDot:true
            });
        }
        else if(factorial && root){
            this.setState({
                current:'Error',
                previous: '',
                factorial: 0,
                square: 0,
                root: 0,
                isDot:true
            });
        }

        else if(square&&root){
            this.setState({
                current:'Error',
                previous: '',
                factorial: 0,
                square: 0,
                root: 0,
                isDot:true
            });
        }

        else if(!factorial&&!square&&!root){
            try{
                let ans = eval(this.getEvalValue());
                let previous = this.state.current;
                if(Number.isInteger(ans)){
                    this.setState({
                        current:''+ans,
                        previous: previous
                    });
                }else{
                    let value = ans.toFixed(2);
                    this.setState({
                        current: value,
                        previous: previous,
                        factorial: 0,
                        root: 0,
                        square: 0,
                    });
                }
            }catch(e){
                this.setState({
                    current: 'Unexpected Input',
                    previous: '',
                    factorial: 0,
                    root: 0,
                    square: 0,
                    isDot: true
                });
            }
        }

        else if(factorial && factorial <2){
            try{
                let value = this.getFactorial(), previous = this.state.current;
                this.setState({
                    current:''+value,
                    previous: previous,
                    factorial: 0
                })
            }catch(e){
                this.setState({
                    current:'Program Failed',
                    previous: '',
                    factorial: 0
                })
            }
        }

        else if(root && root<2){
            this.getRoot();
        }

        else if(square && square<2){
            this.getSquare();
        }

        else{
            this.setState({
                current: 'Unexpect Error',
                previous: '',
                factorial: 0,
                root: 0,
                square: 0,
                isDot:true
            })
        }
        
    }


    handleMRSF = value => {
        let condition = !this.state.current.endsWith('÷') && !this.state.current.endsWith('×') && !this.state.current.endsWith('−') && !this.state.current.endsWith('+');
        if(value==='%'){
            if(!this.state.current){
                this.setState({current: 0+'%',isDot:true})
            }else if(!this.state.current.endsWith('%') && condition){
                let current = this.state.current;
                this.setState({current: current+=value,isDot:true})
            }
        }

        if(value==='π'){
            let noNumber = isNaN(+this.state.current[this.state.current.length-1])
            if(!this.state.current.endsWith('π')&&noNumber&&!this.state.current.endsWith('.')){
                let current = this.state.current;
                this.setState({current: current+=value})
            }
        }

        if(value==='a^b'){
            if(!this.state.current){
                this.setState({current:0+'^',square:this.state.square+1})
            }
            else if(!this.state.current.endsWith('^') && condition){
                let current = this.state.current;
                this.setState({current:current+='^',square:this.state.square + 1})
            }
            
        }

        if(value==='√x'){
            let current = this.state.current;
            this.setState({current:current+='√',root:this.state.root+1})
        }

        if(value==='x!'){
            if(!this.state.current){
                this.setState({current: 0+'!',factorial:this.state.factorial+1});
            }else{
                let current = this.state.current;
                this.setState({current:current+='!',factorial:this.state.factorial+1})
            }
        }

    }


    handleOperation = value => {
        let condition = this.state.current.endsWith('%') || this.state.current.endsWith('^');
        if(!this.state.current){
            this.setState({current: 0+value,isDot:true})
        }
        else if(this.state.current.endsWith('÷') || condition){
            let current = this.state.current.slice(0, this.state.current.length-1);
            this.setState({current: current+=value,isDot:true})
        }
        else if(this.state.current.endsWith('×') || condition){
            let current = this.state.current.slice(0, this.state.current.length-1);
            this.setState({current: current+=value,isDot:true})
        }

        else if(this.state.current.endsWith('−') || condition){
            let current = this.state.current.slice(0, this.state.current.length-1);
            this.setState({current: current+=value,isDot:true})
        }

        else if(this.state.current.endsWith('+') || condition){
            let current = this.state.current.slice(0, this.state.current.length-1);
            this.setState({current: current+=value,isDot:true})
        }
        else if(value==='+'){
            let current = this.state.current;
            this.setState({current: current+=value,isDot:true})
        }
        else if(value==='÷'){
            let current = this.state.current;
            this.setState({current: current+=value,isDot:true})
        }
        else if(value==='×'){
            let current = this.state.current;
            this.setState({current: current+=value,isDot:true})
        }
        else if(value==='−'){
            let current = this.state.current;
            this.setState({current: current+=value,isDot:true})
        }
    }


    handleNumber = value => {
        if(!this.state.current.endsWith('π')){
            let current = this.state.current;
            this.setState({current: current+=value})
        }
    }

    handleDot = value => {
        let condition = !this.state.current.endsWith('π')&& this.state.isDot && this.state.current;
        if(!this.state.current){
            this.setState({current: 0+value, isDot:false})
        }
        else if(condition){
            let current = this.state.current;
            this.setState({current: current+=value, isDot:false})
        }
    }

    handleDelete = value => {
        let current = this.state.current.slice(0, this.state.current.length-1);
        this.setState({
            current: current
        })
    }

    handleClear = () => {
        this.setState({
            current:'',
            previous: '',
            factorial: 0,
            root: 0,
            square: 0,
            isDot:true
        })
    }


    render(){
        return <Buttons 
            current = {this.state.current}
            previous = {this.state.previous}
            handleCalculate = {this.handleCalculate}
            handleClear = {this.handleClear}
            handleDelete = {this.handleDelete}
            handleDot = {this.handleDot}
            handleNumber = {this.handleNumber}
            handleOperation = {this.handleOperation}
            handleMRSF = {this.handleMRSF}
        />
    }
}


export default Calculator;