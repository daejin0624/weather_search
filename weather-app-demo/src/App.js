import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const API_KEY = "553b395b17def710a9edd9944684aaf6";
  const [location, setlocation] = useState('');
  const [result, setresult] = useState({}); // 빈오브젝트 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=kr&units=metric`;

  const serachWeather = async(e) => {
    if(e.key === 'Enter') {
      try {
        const data = await axios({
          method: 'get',
          url: url
        })
        console.log(data);
        setresult(data);
      } catch(err) {
        alert(err);
      }
    }
  }

  const AppContentWarp = styled.div`
    position: relative;
  `;

  return (
      <div id="root">
        <AppContentWarp>
          <h1>실시간 온도 검색</h1>
          <input
            className="input"
            placeholder="도시 이름을 입력해주세요."
            value={location}
            onChange={(e) => setlocation(e.target.value)}
            type="text"
            onKeyDown={serachWeather}
          />
          {Object.keys(result).length !== 0 && (
            <div className="ResultWarp">
              <div className="city">{result.data.name}</div>
              <div className="temp">{result.data.main.temp}</div>
              <div className="sky">{result.data.weather[0].main}</div>
            </div>
          )}
        </AppContentWarp>
      </div>
  );
}

export default App;