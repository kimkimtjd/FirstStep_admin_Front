import React from "react";
import styled from "styled-components";
import { useNavigate , useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function Modal({ onClose }) {

    const navigate = useNavigate();
    const location = useLocation();
  // const handleClose = () => {
  //   onClose?.();
  //   navigate('/Login');
  // };
  console.log(location.pathname.split("/")[3])

  return (
      <Overlay>
        <ModalWrap>
          <Contents>
            <Text>멘토계좌</Text>
            {/* <Line/> */}
            
            <div style={{ width:"366px" , height:"86px" , display:"flex" , flexDirection:"column" , marginTop:"20px"}}>
              <span style={{ fontSize:"14px" , fontWeight:"400" , color:"#424242"}}>멘토닉네임</span>
              <div  style={{ width:"100%" , height:"40px" , display:"flex" , border:"1px solid #DBDBDB" , borderRadius:"8px"}}>

              </div>
            </div>

            <div style={{ width:"366px" , height:"86px" , display:"flex" , flexDirection:"column" , marginTop:"20px"}}>
              <span style={{ fontSize:"14px" , fontWeight:"400" , color:"#424242"}}>이름</span>
              <div  style={{ width:"100%" , height:"40px" , display:"flex" , border:"1px solid #DBDBDB" , borderRadius:"8px"}}>

              </div>
            </div>

            <div style={{ width:"366px" , height:"86px" , display:"flex" , flexDirection:"column" , marginTop:"20px"}}>
              <span style={{ fontSize:"14px" , fontWeight:"400" , color:"#424242"}}>은행</span>
              <div  style={{ width:"100%" , height:"40px" , display:"flex" , border:"1px solid #DBDBDB" , borderRadius:"8px"}}>

              </div>
            </div>

            <div style={{ width:"366px" , height:"86px" , display:"flex" , flexDirection:"column" , marginTop:"20px"}}>
              <span style={{ fontSize:"14px" , fontWeight:"400" , color:"#424242"}}>계좌번호</span>
              <div  style={{ width:"100%" , height:"40px" , display:"flex" , border:"1px solid #DBDBDB" , borderRadius:"8px"}}>

              </div>
            </div>

            <div style={{ width:"366px" , height:"86px" , display:"flex" , flexDirection:"column" , marginTop:"20px"}}>
              <span style={{ fontSize:"14px" , fontWeight:"400" , color:"#424242"}}>이메일</span>
              <div  style={{ width:"100%" , height:"40px" , display:"flex" , border:"1px solid #DBDBDB" , borderRadius:"8px"}}>

              </div>
            </div>
          </Contents>
        </ModalWrap>
      </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;
`;

const ModalWrap = styled.div`
width: 430px;
  height: 697px;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #FFFFFF;
border-radius: 12px;
    display:flex;
	align-items: center;
	justify-content:  center;
`;

const Text = styled.span`
font-weight: 700;
font-size: 24px;
color: #000000;
padding-bottom: 45px;
border-bottom:1px solid #DBDBDB;
width: 366px;
height:auto;
display: flex;
    justify-content: center
`;


const Contents = styled.div`
width: 366px;
height: 132px;
display:flex;
align-items: center;
justify-content:  center;
flex-direction:column;
`;

const Button = styled.button`
  font-size: 14px;
  width: 272px;
  height: 56px;
  background: #00C563;
  border-radius: 8px;
  border:none;
  display:flex;
    align-items: center;
    justify-content:  center;
    font-weight: 700;
    font-size: 16px;
    color:white;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;

const Line = styled.div`
width: 366px;
height: 1px;
background: #DBDBDB;
`;

export default Modal;