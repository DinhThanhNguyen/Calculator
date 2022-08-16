import React, { useContext } from 'react'
import { CalcContext } from '../context/CalcContext'


const getStyleName = (btn) => {
    const className = {
        'AC': 'greyColor',
        '+/-': 'greyColor',
        '%': 'greyColor',
        '+': 'option',
        '-': 'option',
        'x': 'option',
        '/': 'option',
        '=': 'option',
        '0': 'buttonZero'
    }
    return className[btn]
}

export default function Button({ value }) {

    let { calc, setCalc } = useContext(CalcContext)

    const math = (prevNumber, currentNumber, sign) => {
        const result = {
            '+': (prevNumber, currentNumber) => prevNumber + currentNumber,
            '-': (prevNumber, currentNumber) => prevNumber - currentNumber,
            'x': (prevNumber, currentNumber) => prevNumber * currentNumber,
            '/': (prevNumber, currentNumber) => prevNumber / currentNumber,
        }
        return result[sign](prevNumber, currentNumber);
    }

    const commaClick = () => {
        setCalc({
            ...calc,
            num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
        });
    }

    const resetClick = () => {
        setCalc({ sign: '', num: 0, res: 0 })
    }

    const numberClick = () => {
        const numberString = value.toString()

        let numberValue;
        if (numberString === '0' && calc.num === 0) {
            numberValue = "0"
        } else {
            numberValue = Number(calc.num + numberString)
        }

        setCalc({
            ...calc,
            num: numberValue
        })
    }

    const equalsClick = () => {
        if (calc.res && calc.num) {
            const math = (prevNumber, currentNumber, sign) => {
                const result = {
                    '+': (prevNumber, currentNumber) => prevNumber + currentNumber,
                    '-': (prevNumber, currentNumber) => prevNumber - currentNumber,
                    'x': (prevNumber, currentNumber) => prevNumber * currentNumber,
                    '/': (prevNumber, currentNumber) => prevNumber / currentNumber,
                }
                return result[sign](prevNumber, currentNumber);
            }
            setCalc({
                res: math(calc.res, calc.num, calc.sign),
                sign: '',
                num: 0
            })
        }
    }

    const signClick = () => {
        if (calc.res && calc.num) {
            setCalc({
                sign: value,
                res: math(calc.res, calc.num, calc.sign),
                num: 0
            })
        } else {
            setCalc({
                sign: value,
                res: !calc.res && calc.num ? calc.num : calc.res,
                num: 0
            })
        }
    }

    const percentClick = () => {
        if (calc.res && calc.num) {
            setCalc({
                sign: value,
                res: (math(calc.res, calc.num, calc.sign) / 100),
                num: 0
            })
        } else {
            setCalc({
                num: (calc.num / 100),
                res: (calc.res / 100),
                sign: ''
            })
        }
    }

    const invertedClick = () => {
        if (calc.res && calc.num) {
            setCalc({
                sign: value,
                res: (math(calc.res, calc.num, calc.sign) * -1),
                num: 0
            })
        } else {
            setCalc({
                num: calc.num ? calc.num * -1 : 0,
                res: calc.res ? calc.res * -1 : 0,
                sign: ''
            })
        }
    }


    let handleOnClick = () => {
        const result = {
            '.': commaClick,
            'AC': resetClick,
            '+': signClick,
            '-': signClick,
            'x': signClick,
            '/': signClick,
            '=': equalsClick,
            '%': percentClick,
            '+/-': invertedClick
        }
        if (result[value]) {
            return result[value]()
        } else {
            return numberClick()
        }

    }
    return (
        <button onClick={handleOnClick} className={`button ${getStyleName(value)}`}>{value}</button>
    )
}