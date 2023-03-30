import axios from "axios";
import { useState } from "react";
import styled from "styled-components";

function App() {
  const API_KEY = "553b395b17def710a9edd9944684aaf6";
  const [location, setlocation] = useState('');
  const [result, setresult] = useState({}); // 빈오브젝트 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=kr&units=metric`;
  const temp = result.data.main.temp
  const realTemp = temp / 1.8 - 32

  const serachWeather = async(e) => {
    if(e.key ==='Enter') {
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
  return (
    <Appwrap>
      <div className="appContentWarp">
      <input 
            placeholder="도시이름을 입력해주세요."
            value={location}
            onChange = {(e)=>setlocation(e.target.value)}
            type = "text"
            onKeyDown={serachWeather}
      />
      {
        Object.keys(result).length !== 0 &&(
          <ResultWarp>
          <div className="city">{result.data.name}</div>
          <div className="temp">{result.data.main.temp}</div>
          <div className="sky">{result.data.weather[0].main}</div>
          </ResultWarp>
        )}
        </div>
    
    </Appwrap>
  );
}

export default App;

const Appwrap = styled.div`
   width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .appContentWarp {
    left: 50;
    top: 50;
    position: absolute;
    
  }
  input {
    padding: 16px;
    border: 2px black solid;
    border-radius: 16px;
  }
`;

const ResultWarp = styled.div`

margin-top: 60px;
padding: 10px;
border: 1px black solid;
border-radius: 8px;
.city {
  font-size: 24px;
}
.temp {
  font-size: 60px;
  margin-top: 6px;
}
.sky {
  font-size: 20px;
  text-align: right;
  margin-top: 8px;
}
`;