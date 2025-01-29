import { useState } from 'react';

function App() {
  const [input, setInput] = useState('0');
  const [isFrozen, setIsFrozen] = useState(false);

  const handleClick = (value: string) => {
    if (!isFrozen) {
      setInput(input === '0' ? value : input + value);
    }
  };

  const handleClear = () => {
    setInput('0');
    setIsFrozen(false);
  };

  const handleCalculate = () => {
    if (!isFrozen) {
      try {
        let result = eval(input);
        if (result === Infinity) {
          setIsFrozen(true);
          setInput('Error');
        } else {
          if (result.toString().length > 7) {
            result = result.toExponential(4);
          } else {
            result = result % 1 === 0 ? result.toString() : result.toFixed(3);
          }
          setInput(result);
          setIsFrozen(true);
        }
      } catch {
        setInput('Error');
      }
    }
  };

  const getDisplayValue = () => {
    return input.length > 7 ? input.slice(-7) : input;
  };

  return (
    <>
      <div className="flex h-screen justify-center items-center flex-col">
        <h1 className="mb-5 text-3xl font-bold">SMKNJ Bisa <i className="bi bi-hand-thumbs-up-fill"></i></h1>
        <div className="bg-gray-200 p-5 rounded-lg shadow-lg">
          <div className="mb-4">
            <div className="w-full p-2 text-right text-4xl bg-white border rounded">
              {getDisplayValue()}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 w-60">
            {['7', '8', '9', '/'].map((value) => (
              <button
                key={value}
                onClick={() => handleClick(value)}
                className="p-4 bg-white border rounded"
              >
                {value}
              </button>
            ))}
            {['4', '5', '6', '*'].map((value) => (
              <button
                key={value}
                onClick={() => handleClick(value)}
                className="p-4 bg-white border rounded"
              >
                {value}
              </button>
            ))}
            {['1', '2', '3', '-'].map((value) => (
              <button
                key={value}
                onClick={() => handleClick(value)}
                className="p-4 bg-white border rounded"
              >
                {value}
              </button>
            ))}
            {['0', '.', '=', '+'].map((value) => (
              <button
                key={value}
                onClick={() => (value === '=' ? handleCalculate() : handleClick(value))}
                className="p-4 bg-white border rounded"
              >
                {value}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="col-span-4 p-4 bg-red-500 text-white border rounded"
            >
              Clear
            </button>
          </div>
        </div>
        <p className="mt-5 text-sm text-gray-500">UKK 2025 Sukses & Tuntas</p>
      </div>
    </>
  );
}

export default App;
