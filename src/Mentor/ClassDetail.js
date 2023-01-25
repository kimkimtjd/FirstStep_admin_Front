import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ClassDetail() {

  const location = useLocation()
  console.log(location.pathname.split('/')[3])
  const [data, setData] = useState([]);




    return (
        <div>
          클래스 상세
        </div>
    );
}

export default ClassDetail;

/* 로그인부분 상단박스 */
const LoginBox = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
width: 100%;
height: 70px; 
border-bottom: 1px solid #DCDCDC;
`;



