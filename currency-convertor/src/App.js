import axios from 'axios';
import React, { useState, useEffect } from 'react';

import { Block } from './Block';
import './index.scss';

function App() {
  const [fromCurrency, setFromCurrency] = useState('UAN');
  const [toCurrency, setToCurrency] = useState('USD');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(0);

  const [rates, setRates] = useState({});

  useEffect(() => {
    try {
      const dataConvert = async () => {
        const res = await axios.get('https://api.monobank.ua/bank/currency');
        console.log(res);
      };
      dataConvert();
    } catch (err) {
      console.log(err, 'Не удалось получить информацию');
    }
  }, []);

  const onChangeFromPrice = (value) => {
    const price = value / rates[fromCurrency];
    const result = price * rates[toCurrency];
    console.log('result: ', value);
    setFromPrice(value);
    setToPrice(result);
  };
  const onChangeToPrice = (value) => {
    setToPrice(value);
  };
  return (
    <div className="App">
      <Block
        value={fromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
        onChangeValue={onChangeFromPrice}
      />
      <Block
        value={toPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
        onChangeValue={onChangeToPrice}
      />
    </div>
  );
}

export default App;
