import * as React from 'react';
import { useState, useRef } from 'react';

const Gugudan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);  // useRef는 선언 시 제너릭 타입 사용 가능

  /* 
    함수 분리를 하는 경우에는 DOM 이벤트 함수에 대한 타입 추론이 제대로 되지 않는다.
    그래서 타입을 적지 않으면 에러가 난다.
    따라서 따로 타입을 기술해줘야 한다.
  */
  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = inputRef.current;

    if (parseInt(value) === first * second) {
      setResult('정답: ' + value);
      setValue('');
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
    } else {
      setResult('땡');
      setValue('');
    }

    if (input) {
      input.focus();
    }
  }

  return (
    <>
      <div>{first} 곱하기 {second}는?</div>
      <form onSubmit={onSubmitForm}>
        <input 
          ref={inputRef} 
          type="number"
          value={value} 
          onChange={(e) => setValue(e.target.value)}
        />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
}

export default Gugudan;