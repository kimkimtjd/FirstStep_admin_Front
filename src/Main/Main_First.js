import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

function MainFirst({ parentFunction }) {

    const [data, setData] = useState([]);
    const [tutor, setTutor] = useState([]);
    const location = useLocation()
    const navigation = useNavigate()

    // 컨설팅 
    useEffect(() => {
        fetch(`/api/admin/Consulting/list`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                for(var i = 0 ; i<data.length ; i++){
                    data[i].md = "컨설팅"
                }
                setData(data)    
            });

    }, [data]);

    // 클래스      
    useEffect(() => {
        fetch(`/api/admin/Class/list`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                for(var i = 0 ; i<data.length ; i++){
                    data[i].md = "클래스"
                }
                setTutor(data)
            });

    }, [tutor]);

    // 승인하기
    function ConsultingApprove(a, b) {
        if (b === "컨설팅") {
            fetch(`/api/admin/Consulting/Prove/${a}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result = "success") {
                        alert('승인되었습니다')
                    }
                })
        }
        else {
            fetch(`/api/admin/Class/Prove/${a}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.result = "success") {
                        alert('승인되었습니다')
                    }
                })
        }
    }


    parentFunction(
        location.pathname === "/Main" ?
            data.concat(tutor).length : location.pathname === "/Main/Wait" ?
                data.filter((e) => e.Approve === "N").concat(tutor.filter((e) => e.Approve === "N")).length :
                data.filter((e) => e.Approve === "Y").concat(tutor.filter((e) => e.Approve === "Y")).length
    )

    // 상세보기 이동
    function NaviDetail(a, b) {
        if (b === "컨설팅") {
            navigation(`/Consulting/Detail/${a}`)
        }
        else if (b === "클래스") {
            navigation(`/Class/Detail/${a}`)
        }
    }

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
            {data.length === 0 || tutor.length === 0 ?
                <>로딩중</>
                :
                <>
                    {location.pathname === "/Main" ?
                        <>
                            {data.concat(tutor).map((data, index) => (
                                <ListBox index={index}>
                                    <Programlist onClick={() => NaviDetail(data.id, data.md)}>{index}</Programlist>
                                    <Mentorlist>{data.Name}</Mentorlist>
                                    <Emainlist>{data.User}</Emainlist>
                                    <Phonelist>{data.Phone}</Phonelist>
                                    <Adminlist>{data.Entertime?.substr(0, 10).replace('-', '/').replace('-', '/')}</Adminlist>
                                    <Categorylist>{data.md}</Categorylist>
                                    <Statelist>{data.Approve === "N" ? "승인대기" : "활동중"}</Statelist>
                                    {data.Approve === "N" ?
                                        <Approvelist onClick={() => ConsultingApprove(data.id, data.md)}>승인하기</Approvelist>
                                        :
                                        <Approvelistok>승인완료</Approvelistok>
                                    }
                                </ListBox>
                            ))}
                        </>
                        : location.pathname === "/Main/Wait" ?
                            <>
                                {data.filter((e) => e.Approve === "N").concat(tutor.filter((e) => e.Approve === "N")).map((data, index) => (
                                    <ListBox index={index}>
                                        <Programlist onClick={() => NaviDetail(data.id, data.md)}>{index}</Programlist>
                                        <Mentorlist>{data.Name}</Mentorlist>
                                        <Emainlist>{data.User}</Emainlist>
                                        <Phonelist>{data.Phone}</Phonelist>
                                        <Adminlist>{data.Entertime?.substr(0, 10).replace('-', '/').replace('-', '/')}</Adminlist>
                                        <Categorylist>{data.md}</Categorylist>
                                        <Statelist>{data.Approve === "N" ? "승인대기" : "활동중"}</Statelist>
                                        {data.Approve === "N" ?
                                            <Approvelist onClick={() => ConsultingApprove(data.id, data.md)}>승인하기</Approvelist>
                                            :
                                            <Approvelistok>승인완료</Approvelistok>
                                        }
                                    </ListBox>
                                ))}
                            </>
                            :
                            <>
                                {
                                    data.filter((e) => e.Approve === "Y").concat(tutor.filter((e) => e.Approve === "Y")).map((data, index) => (
                                        <ListBox index={index}>
                                            <Programlist onClick={() => NaviDetail(data.id, data.md)}>{index}</Programlist>
                                            <Mentorlist>{data.Name}</Mentorlist>
                                            <Emainlist>{data.User}</Emainlist>
                                            <Phonelist>{data.Phone}</Phonelist>
                                            <Adminlist>{data.Entertime?.substr(0, 10).replace('-', '/').replace('-', '/')}</Adminlist>
                                            <Categorylist>{data.md}</Categorylist>
                                            <Statelist>{data.Approve === "N" ? "승인대기" : "활동중"}</Statelist>
                                            {data.Approve === "N" ?
                                                <Approvelist onClick={() => ConsultingApprove(data.id, data.md)}>승인하기</Approvelist>
                                                :
                                                <Approvelistok>승인완료</Approvelistok>
                                            }
                                        </ListBox>
                                    ))}
                            </>
                    }
                </>
            }

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

/* 분류 상단박스 */
const ListBox = styled.div`
display: flex;
justify-content:center;
align-items: center;
flex-direction:row;
width: 100%;
height: 26px; 
background: #FFFF;
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

/* 프로그램 리스트 */
const Programlist = styled.div`
width:112px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #000000;
display: flex;
justify-content:center;
align-items: center;
text-decoration-line: underline;
cursor:pointer;
`;

/* 멘토명 번호 상단박스 */
const Mentorlist = styled.div`
width:138px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #000000;
display: flex;
justify-content:center;
align-items: center;
`;

/* 이메일 번호 상단박스 */
const Emainlist = styled.div`
width:260px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #000000;
display: flex;
justify-content:center;
align-items: center;
`;

/* 휴대폰번호  상단박스 */
const Phonelist = styled.div`
width:200px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #000000;
display: flex;
justify-content:center;
align-items: center;
`;

/* 신청일  상단박스 */
const Adminlist = styled.div`
width:120px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #000000;
display: flex;
justify-content:center;
align-items: center;
`;

/* 프로그램 유형  상단박스 */
const Categorylist = styled.div`
width:160px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #000000;
display: flex;
justify-content:center;
align-items: center;
`;

/* 상태  상단박스 */
const Statelist = styled.div`
width:95px;
height: 26px; 
font-style: normal;
font-weight: 400;
font-size: 14px;
color: #000000;
display: flex;
justify-content:center;
align-items: center;
`;

/* 승인하기  상단박스 */
const Approvelist = styled.div`
width:95px;
height: 26px; 
font-style: normal;
font-weight: 400;
display: flex;
justify-content:center;
align-items: center;
font-size: 14px;
color: #000000;
text-decoration-line: underline;
cursor:pointer;
`;

/* 승인완료  상단박스 */
const Approvelistok = styled.div`
width:95px;
height: 26px; 
font-style: normal;
font-weight: 400;
display: flex;
justify-content:center;
align-items: center;
font-size: 14px;
color: #32A751;
`;