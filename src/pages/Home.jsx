import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      // 언마운트 시
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  });

  let timerId = null;
  const [state, setState] = useState(true);

  const throttle = (delay) => {
    if (timerId) {
      // timerId가 있으면 바로 함수 종료
      return;
    }
    setState(!state);
    console.log(`API 요청 실행! ${delay}ms 동안 추가 요청은 안 받습니다.`);
    timerId = setTimeout(() => {
      console.log(`${delay}ms 지남. 추가 요청 받습니다.`);
      timerId = null;
    }, delay);
  };

  // 반복적인 event 이후, delay가 지나면 function
  const debounce = (delay) => {
    if (timerId) {
      // 할당되어 있는 timerId에 해당하는 timer 제거
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      console.log(`마지막 요청으로부터 ${delay}ms 지났으므로 API 요청 실행!`);
      timerId = null;
    }, delay);
  };

  return (
    <div
      style={{
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <h1>Button event 예제</h1>
      <button onClick={() => throttle(2000)}>Throttling</button>
      <button onClick={() => debounce(2000)}>debounce</button>
      <div>
        <button
          onClick={() => {
            navigate("/company");
          }}
        >
          page
        </button>
      </div>
    </div>
  );
};

export default Home;
