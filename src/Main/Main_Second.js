import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Modal from "./Modal";

function MainSecond({ parentFunction }) {

    const [data, setData] = useState([]);
    const [pay, setPay] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false); // 모달

    // const [tutor, setTutor] = useState([]);
    const location = useLocation()
    const navigation = useNavigate()

    // 컨설팅 
    useEffect(() => {
        fetch(`/api/admin/pay/list`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data)
                // console.log(data)
                // console.log(data.filter((e) => e.pay_yn === "N").length)
            });

    }, [data]);



    parentFunction(
        location.pathname === "/pay" ?
            data.length : location.pathname === "/pay/Wait" ?
                data.filter((e) => e.pay_yn === "N").length :
                data.filter((e) => e.pay_yn === "Y").length
    )

    //  계좌클릭시
    function ModalOepn(a) {
        setModalIsOpen(true)
        // console.log(a)
        navigation(`/pay/detail/${a}`)
    }

    // 승인하기
    function PayApprove(a) {

        // console.log(a)
        fetch(`/api/admin/pay/Prove/${a}`, {
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




    return (
        <>
            <LoginBox>
                <ProgramBox>프로그램 번호</ProgramBox>
                <MentorBox>신청멘티</MentorBox>
                <EmainBox>멘티이메일</EmainBox>
                <PhoneBox>입금은행</PhoneBox>
                <AdminBox>입금자</AdminBox>
                <CategoryBox>프로그램유형</CategoryBox>
                <StateBox>멘토계좌</StateBox>
                <ApproveBox>입금확인</ApproveBox>
            </LoginBox>
            {data.length === 0 ?
                <>로딩중</>
                :
                <>
                    {location.pathname === "/pay" ?
                        <>
                            {data.map((data, index) => (
                                <ListBox>
                                    <Programlist>{index}</Programlist>
                                    <Mentorlist>{data.Nickname}</Mentorlist>
                                    <Emainlist>{data.email}</Emainlist>
                                    <Phonelist>{data.Pay?.split("-")[0]}</Phonelist>
                                    <Adminlist>{data.Pay?.split("-")[1]}</Adminlist>
                                    <Categorylist>{data.Category}</Categorylist>
                                    <Approvelist onClick={() => ModalOepn(data.email)}>계좌</Approvelist>
                                    {data.pay_yn === "N" ?
                                        <Approvelist onClick={() => PayApprove(data.id)}>입금확인</Approvelist>
                                        :
                                        <Approvelistok>입금완료</Approvelistok>
                                    }
                                </ListBox>
                            ))}
                        </>
                        : location.pathname === "/pay/Wait" ?
                            <>
                                {data.filter((e) => e.pay_yn === "N").map((data, index) => (
                                    <ListBox>
                                        <Programlist>{index}</Programlist>
                                        <Mentorlist>{data.Nickname}</Mentorlist>
                                        <Emainlist>{data.email}</Emainlist>
                                        <Phonelist>{data.Pay?.split("-")[0]}</Phonelist>
                                        <Adminlist>{data.Pay?.split("-")[1]}</Adminlist>
                                        <Categorylist>{data.Category}</Categorylist>
                                        <Approvelist onClick={() => ModalOepn(data.pay?.split("-")[2])}>계좌</Approvelist>
                                        {data.pay_yn === "N" ?
                                            <Approvelist onClick={() => PayApprove(data.id)}>입금확인</Approvelist>
                                            :
                                            <Approvelistok>입금완료</Approvelistok>
                                        }
                                    </ListBox>
                                ))}
                            </>
                            :
                            <>
                                {
                                    data.filter((e) => e.pay_yn === "Y").map((data, index) => (
                                        <ListBox>
                                            <Programlist>{index}</Programlist>
                                            <Mentorlist>{data.Nickname}</Mentorlist>
                                            <Emainlist>{data.email}</Emainlist>
                                            <Phonelist>{data.Pay?.split("-")[0]}</Phonelist>
                                            <Adminlist>{data.Pay?.split("-")[1]}</Adminlist>
                                            <Categorylist>{data.Category}</Categorylist>
                                            <Approvelist onClick={() => ModalOepn(data.pay?.split("-")[2])}>계좌</Approvelist>
                                            {data.pay_yn === "N" ?
                                                <Approvelist onClick={() => PayApprove(data.id)}>입금확인</Approvelist>
                                                :
                                                <Approvelistok>입금완료</Approvelistok>
                                            }
                                        </ListBox>
                                    ))}
                            </>
                    }
                </>
            }
            {modalIsOpen && (<Modal
                open={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                }}
            />)}
        </>
    );
}


export default MainSecond;

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