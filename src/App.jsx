import Calculator from "./components/Calculator";
import OutputScreen from "./components/OutputScreen";
import ButtonWapper from "./components/ButtonWapper";
import Button from "./components/Button";
import CalcProvider from "./context/CalcContext";


const buttonValue = [
  ['AC', '+/-', '%', '/'],
  [7, 8, 9, 'x'],
  [4, 5, 6, '-'],
  [1, 2, 3, '+'],
  [0, '.', '=']
]

function App() {
  return (
    <CalcProvider>
      <Calculator>
        <OutputScreen />
        <ButtonWapper>
          {
            buttonValue.flat().map((btn, index) => (<Button
              key={index}
              value={btn}
            />))
          }
        </ButtonWapper>
      </Calculator>
    </CalcProvider>
  );
}

export default App;
