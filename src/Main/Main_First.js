import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function MainFirst() {


    return (
        <>
            <LoginBox>
                <ProgramBox>프로그램 번호</ProgramBox>
                <MentorBox>멘토명</MentorBox>
                <EmainBox>이메일</EmainBox>
                <PhoneBox>휴대폰번호</PhoneBox>
                <AdminBox>신청일</AdminBox>
                <CategoryBox>프로그램유형</CategoryBox>
                <StateBox>상태</StateBox>
                <ApproveBox>승인하기</ApproveBox>
            </LoginBox>
        </>
    );
}

export default MainFirst;

/* 분류 상단박스 */
const LoginBox = styled.div`
display: flex;
justify-content:center;
align-items: center;
flex-direction:row;
width: 100%;
height: 26px; 
background: #F5F5F5;
margin-top:25px;
`;

/* 프로그램 번호 상단박스 */
const ProgramBox = styled.div`
width:112px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #5C5C5C;
display: flex;
justify-content:center;
align-items: center;
`;

/* 멘토명 번호 상단박스 */
const MentorBox = styled.div`
width:138px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #5C5C5C;
display: flex;
justify-content:center;
align-items: center;
`;

/* 이메일 번호 상단박스 */
const EmainBox = styled.div`
width:260px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #5C5C5C;
display: flex;
justify-content:center;
align-items: center;
`;

/* 휴대폰번호  상단박스 */
const PhoneBox = styled.div`
width:200px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #5C5C5C;
display: flex;
justify-content:center;
align-items: center;
`;

/* 신청일  상단박스 */
const AdminBox = styled.div`
width:120px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #5C5C5C;
display: flex;
justify-content:center;
align-items: center;
`;

/* 프로그램 유형  상단박스 */
const CategoryBox = styled.div`
width:160px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #5C5C5C;
display: flex;
justify-content:center;
align-items: center;
`;

/* 상태  상단박스 */
const StateBox = styled.div`
width:95px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #5C5C5C;
display: flex;
justify-content:center;
align-items: center;
`;

/* 승인하기  상단박스 */
const ApproveBox = styled.div`
width:95px;
height: 26px; 
font-style: normal;
font-weight: 400;
display: flex;
justify-content:center;
align-items: center;font-size: 14px;
color: #5C5C5C;
`;
