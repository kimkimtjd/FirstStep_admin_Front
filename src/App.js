import styled from "styled-components";
import './App.css';
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function App() {

  const [btn, setBtn] = useState(true);
  const [user, setUser] = useState("");
  const [usertrue, setUsertrue] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordtrue, setPasswordtrue] = useState(true);
  const navigation = useNavigate();


  // 닉네임
  useEffect(() => {
    if (user !== "" && password !== "") {
      setBtn(false)
    }
    else if (user === "" || password === "") {
      setBtn(true)
    }

  }, [user, password]);

  function Login() {
    if (user === "admin" && password === "admin") {
      navigation('/Main')
    }
    else {
      setUsertrue(false)
      setPasswordtrue(false)
    }
  }

  return (
    <div className="App">
      <LoginBox />

      <LogoBox>
        <Logo src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Admin_Logo.png" />
        <LogoText src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Admin_Text.png" />
      </LogoBox>

      <Title>관리자로그인</Title>

      <InputBox>
        <Input>
          <Inputtitle>이메일</Inputtitle>
          {usertrue ?
            <Inputinput
              placeholder="이메일을 입력하세요"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
            :
            <InputinputNo
              placeholder="이메일을 입력하세요"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />

          }
        </Input>
        <Input>
          <Inputtitle>비밀번호</Inputtitle>
          {passwordtrue ?
            <Inputinput
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            :
            <InputinputNo
              type="password"
              placeholder="비밀번호를 입력하세요"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          }
        </Input>

        {btn ?
          <LoginBtn>로그인</LoginBtn>
          :
          <LoginBtnActive onClick={() => Login()}>로그인</LoginBtnActive>
        }
      </InputBox>
        {usertrue? "" :
        <div style={{  marginTop:"6px" , display:"flex" , justifyContent:"flex-start" , width:"380px"}}>
        <span style={{ color:"red" , fontSize:"13px"}} 
        >아이디 또는 비밀번호를 잘못 입력하였습니다<br/>입력하신 내용을 다시 확인해주세요.</span>
      </div>
        }
    </div>
  );
}

export default App;

/* 로그인부분 상단박스 */
const LoginBox = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 100%;
height: 70px; 
border-bottom: 1px solid #DCDCDC;
`;

/* 로고 및 관련 글자 부분 */
const LogoBox = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 300px;
height: auto; 
margin-top:103px;
`;

/* 로고  */
const Logo = styled.img`
width:89px;
height: auto; 
`;

/* 로고  */
const LogoText = styled.img`
width:168px;
height: auto;
margin-left: 23px;
`;

/* 관리자 로그인 문구 */
const Title = styled.span`
margin-top: 25px;
font-style: normal;
font-weight: 500;
font-size: 18px;
`;

/* 입력창 */
const InputBox = styled.div`
width:380px;
height:228px;
display:flex;
justify-content:space-between;
flex-direction:column;
margin-top:40px;
`;

/* 입력창 내부[제목 + 입력창]*/
const Input = styled.div`
width:380px;
height:86px;
display:flex;
flex-direction:column;
`;

/* 입력창 내부[제목]*/
const Inputtitle = styled.span`
font-style: normal;
font-weight: 400;
font-size: 14px;
`;

/* 입력창 내부[입력창]*/
const Inputinput = styled.input`
padding: 10px 16px;
background: #FFFFFF;
border: 1px solid #DBDBDB;
border-radius: 8px;
margin-top:6px;
margin-bottom:22px;

`;

/* 입력창 내부[입력창] - 불일치할경우*/
const InputinputNo = styled.input`
padding: 10px 16px;
background: #FFFFFF;
border: 1px solid red;
border-radius: 8px;
margin-top:6px;
margin-bottom:22px;

`;

/* 로그인 버튼 */
const LoginBtn = styled.div`
width:380px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
background: #F5F5F5;
border-radius: 8px;
color: #C2C2C2;
font-weight: 700;
font-size: 14px;
`;

/* 로그인 버튼 */
const LoginBtnActive = styled.div`
width:380px;
height:40px;
display:flex;
justify-content:center;
align-items:center;
background: black;
border-radius: 8px;
color: white;
font-weight: 700;
font-size: 14px;
`;