import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function ConsultingDetail() {

    const location = useLocation()
    const [data, setData] = useState([]);
    const [program, setprogram] = useState(""); //프로그램명
    const [programtrue, setprogramtrue] = useState(true); //프로그램명 입력할경우
    const [programdetail, setprogramdetail] = useState(""); //프로그램 상세
    const [programdetailtrue, setprogramdetailtrue] = useState(true); //프로그램 상세 입력할경우
    const [choice, setChoice] = useState(0); // 진행형식
    const [q2, setQ2] = useState("멘토관리"); // 멘토관리 

    useEffect(() => {
        fetch(`/api/admin/Consulting/detail/${location.pathname.split('/')[3]}`, {
            method: 'GET',
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                setData(data)
            });

    }, [data]);

    useEffect(() => {
        if (data[0]?.Progress === "온라인 화상통화") {
            setChoice(1)
        }
        else if (data[0]?.Progress === "1:1 메세지") {
            setChoice(2)
        }
        else if (data[0]?.Progress === "오프라인") {
            setChoice(3)
        }
    }, [data]);


    return (
        <div>
            <LoginBox>
                <TopLeft value={q2} onChange={(e) => setQ2(e.target.value)}>
                    <option value="멘토관리" >멘토관리</option>
                    <option value="입금관리">입금관리</option>
                </TopLeft>

                <TopRight>
                    <TopRightImg src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/Admin_profile.png" />
                    <span>Master&nbsp;&nbsp;</span>
                    <span>|&nbsp;&nbsp;&nbsp;&nbsp;Logout</span>
                </TopRight>
            </LoginBox>

            <Total>
                <Topinner>

                    <FirstBox>
                        <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/Arrow+back+ios.png" style={{ width: "24px", height: "auto" }} />
                        <span style={{ marginLeft: "46px", fontSize: "14px", fontWeight: "400", textDecoration: "underline" }}>{data[0]?.id}</span>
                        <span style={{ color: "#797979", marginLeft: "6px", fontSize: "14px", fontWeight: "400" }}>프로그램 신청폼입니다.</span>
                    </FirstBox>

                    <SecondBox>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                            <span style={{ fontSize: "24px", fontWeight: "700", color: "#515151" }}>
                                컨설팅에 대한 정보
                            </span>
                            <span style={{ fontSize: "24px", fontWeight: "400", color: "#515151" }}>
                                를 작성해주세요!
                            </span>
                        </div>
                        <span style={{ color: "#797979", fontSize: "14px", fontWeight: "400" }}>구체적으로 작성할수록 매칭 확률이 높아져요.</span>
                    </SecondBox>

                    {/* 프로그램명 */}
                    <ThirdBox>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>프로그램명</span>
                        <span style={{ color: "#797979", marginTop: "4px", fontSize: "12px", fontWeight: "400" }}>컨설팅 프로그램을 한줄로 설명해주세요.</span>
                        {programtrue ?
                            <Filterinput
                                type="program"
                                value={data[0]?.ProgramName.split("-")[0]}
                                onClick={() => setprogramtrue(false)}
                            />
                            :
                            <Filterinput
                                type="program"
                                onChange={(e) => setprogram(e.target.value)}
                                value={program}
                            />
                        }
                        {data[0]?.ProgramName.includes('-') && programdetailtrue ?
                            <DetaolTextarea
                                style={{ resize: "none", }}
                                value={data[0]?.ProgramName.split("-")[1]}
                                name="TitleDetail"
                                rows="5"
                                cols="50"
                                maxLength={2000}
                                onClick={() => setprogramdetailtrue(false)}
                            />
                            :
                            <DetaolTextarea
                                style={{ resize: "none", }}
                                value={programdetail}
                                onChange={(e) => setprogramdetail(e.target.value)}
                                placeholder="프로그램에 대한 설명을 멘티들에게 임팩트있게 어필해주세요."
                                name="TitleDetail"
                                rows="5"
                                cols="50"
                                maxLength={2000}
                            />
                        }
                    </ThirdBox>

                    {/* 컨설팅주제 */}
                    <FourthBox>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end" }}>
                            <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>컨설팅주제</span>
                            <span style={{ color: "#00C563", fontSize: "12px", fontWeight: "400", marginLeft: "5px" }}>(필수3개)</span>
                        </div>
                        <span style={{ color: "#797979", marginTop: "4px", fontSize: "12px", fontWeight: "400" }}>어떤 경험과 노하우를 멘티들에게 전달하고 싶으신가요?</span>

                        {data[0]?.Subjects.split('-').map((data, index) => (
                            <div key={index}>
                                <Filterinput
                                    type="program"
                                    value={data}

                                />
                            </div>
                        ))}

                    </FourthBox>

                    {/* 프로그램 이미지 */}
                    <FifthBox>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>프로그램이미지</span>
                        <span style={{ color: "#797979", marginTop: "4px", fontSize: "12px", fontWeight: "400" }}>프로그램과 관련된 이미지를 업로드해주세요.
                            이미지 규격 가이드: 640*640</span>
                        <Filterimage>+ 이미지 추가하기</Filterimage>
                        <Filterimage>+ 이미지 추가하기</Filterimage>
                        <Filterimage>+ 이미지 추가하기</Filterimage>
                    </FifthBox>

                    {/* 진행형식 */}
                    <SubjectBox>
                        <span style={{ fontSize: "16px", fontWeight: "500", color: "#515151" }}>진행형식</span>
                        <span style={{ fontSize: "12px", fontWeight: "400", color: "#8E8E93", marginBottom: "16px", marginTop: "4px" }}>원하는 진행방법을 골라주세요!</span>


                        {/* 온라인 화상통화 */}
                        <SubjectInner onClick={() => setChoice(1)}>
                            {choice === 1 ?
                                <SubjectInnerFirstClick>
                                    온라인 화상 통화
                                </SubjectInnerFirstClick>
                                :
                                <SubjectInnerFirst>
                                    온라인 화상 통화
                                </SubjectInnerFirst>
                            }
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: 12, fontWeight: "700", color: "#797979", marginBottom: "4px" }}>줌, 구글 밋 등 온라인 대면</span>
                                <span style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>자유로운 소통을 원할 때</span>
                            </div>
                            {choice === 1 ?
                                <img style={{ width: "16px", height: "auto", marginLeft: "52px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                                : ""
                            }
                        </SubjectInner>

                        {choice === 1 ?
                            <ExplainBox>
                                <ExplainInner>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>화상통화 진행형식에 대한 특징을 간략하게 설명합니다. 유저가 진행형식에 대한 구분을 명확하게 하기 위해 도움을 주는 안내 글입니다.
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                            화상통화 진행에 대한 특징을 간략하게 설명합니다.
                                        </span>
                                    </div>
                                </ExplainInner>
                            </ExplainBox>
                            : ""
                        }

                        {/* 1:1 */}
                        <SubjectInner onClick={() => setChoice(2)}>
                            {choice === 2 ?
                                <SubjectInnerSecondActive>
                                    1:1 메세지
                                </SubjectInnerSecondActive>
                                :
                                <SubjectInnerSecond>
                                    1:1 메세지
                                </SubjectInnerSecond>
                            }
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: 12, fontWeight: "700", color: "#797979", marginBottom: "4px" }}>온라인 비대면</span>
                                <span style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>시간적 여유가 없고, 대면이 어려울때</span>
                            </div>
                            {choice === 2 ?
                                <img style={{ width: "16px", height: "auto", marginLeft: "52px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                                :
                                ""
                            }
                        </SubjectInner>

                        {choice === 2 ?
                            <ExplainBox>
                                <ExplainInner>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>1:1 메시지 운영방식에 대한 특징을 간략하게 설명합니다. 유저가 운영방식에 대한 구분을 명확하게 하기 위해 도움을 주는 안내 글입니다.
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                            1:1 프로그램에 대한 특징을 간략하게 설명합니다.
                                        </span>
                                    </div>
                                </ExplainInner>
                            </ExplainBox>
                            : ""
                        }

                        {/* 오프라인 */}
                        <SubjectInner onClick={() => setChoice(3)}>
                            {choice === 3 ?
                                <SubjectInnerSecondActive>
                                    오프라인
                                </SubjectInnerSecondActive>
                                :
                                <SubjectInnerSecond>
                                    오프라인
                                </SubjectInnerSecond>
                            }
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: 12, fontWeight: "700", color: "#797979", marginBottom: "4px" }}>선배와 깊은 컨설팅</span>
                                <span style={{ fontSize: 12, fontWeight: "400", color: "#797979" }}>질문의 양이 많고 내용이 많을 때</span>
                            </div>
                            {choice === 3 ?
                                <img style={{ width: "16px", height: "auto", marginLeft: "52px" }}
                                    src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin%2CLogin/password_check.png" alt="emailimg" />
                                :
                                ""
                            }

                        </SubjectInner>

                        {choice === 3 ?
                            <ExplainBox>
                                <ExplainInner>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>1:1 메시지 운영방식에 대한 특징을 간략하게 설명합니다. 유저가 운영방식에 대한 구분을 명확하게 하기 위해 도움을 주는 안내 글입니다.
                                        </span>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", lineHeight: "14px" }}>
                                        <span>ㆍ</span>
                                        <span style={{ fontSize: "13px", fontWeight: "400", color: "#8E8E93", lineHeight: "18px" }}>
                                            1:1 프로그램에 대한 특징을 간략하게 설명합니다.
                                        </span>
                                    </div>
                                </ExplainInner>
                            </ExplainBox>
                            : ""
                        }
                    </SubjectBox>

                    {/* 가능요일 및 시간 */}
                    <SixthBox>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>가능 요일 및 시간</span>
                        <span style={{ color: "#797979", marginTop: "4px", fontSize: "12px", fontWeight: "400" }}>컨설팅 진행 가능 일정을 작성해주세요.</span>
                        <Filterinput
                            type="program"
                            value={data[0]?.Avalable}
                        />
                    </SixthBox>

                    {/* 진행시간 */}
                    <SixthBox>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>진행시간</span>
                        <span style={{ color: "#797979", marginTop: "4px", fontSize: "12px", fontWeight: "400" }}>컨설팅 진행시간을 작성해주세요.</span>
                        <Filterinput
                            type="program"
                            value={data[0]?.Time}
                        />
                    </SixthBox>

                    {/* 가격 */}
                    <SixthBox>
                        <span style={{ color: "#515151", fontSize: "16px", fontWeight: "600" }}>가격</span>
                        <span style={{ color: "#797979", marginTop: "4px", fontSize: "12px", fontWeight: "400" }}>컨설팅 비용을 작성해주세요.</span>
                        <Filterinput
                            type="program"
                            value={data[0]?.Value}
                        />
                    </SixthBox>

                    <div style={{ width:"100%" , height:"50px" , display:"flex" , justifyContent:"flex-end" , alignItems:"center" , marginTop:"20px"}}>
                        <div style={{ width:"155px" , height:"45px" , display:"flex" , justifyContent:"center" , alignItems:"center" , color:"white" ,
                    background:"#00C563" , borderRadius:"8px"}}>
                            수정하기
                        </div>
                    </div>

                </Topinner>
            </Total>
        </div>
    );
}

export default ConsultingDetail;

/* 로그인부분 상단박스 */
const LoginBox = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
width: 100%;
height: 70px; 
border-bottom: 1px solid #DCDCDC;
`;

/* 상단 우측 */
const TopRight = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
width:200px;
margin-right:100px;
font-style: normal;
font-weight: 700;
font-size: 16px;
`;

/* 상단 우측 */
const TopRightImg = styled.img`
width:30px;
height:auto;
`;

/* 상단 좌측 */
const TopLeft = styled.select`
margin-left:100px;
width: 200px;
height: 38px;
background: #FFFFFF;
border: 1px solid #000000;
border-radius: 8px;
padding: 8px 12px;
`;


/* 전체  */
const Total = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 100%;
height: auto; 
`;

/* 콘텐츠영역 */
const Topinner = styled.div`
display: flex;
justify-content: flex-start;
align-items: flex-start;
flex-direction:column;
width: 1200px;
height: 2750px;
`;

/* 번호 및 뒤로가기 */
const FirstBox = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
margin-top:60px;
flex-direction:row;
width: 290px;
height: 24px;
`;

/* 안내문구  */
const SecondBox = styled.div`
display: flex;
justify-content:flex-start;
align-items: center;
margin-top:45px;
flex-direction:column;
width: 420px;
height: 52px;
`;

/* 프로그램명  */
const ThirdBox = styled.div`
display: flex;
justify-content:center;
align-items: flex-start;
margin-top:45px;
flex-direction:column;
width: 630px;
height: 200px;
`;

/* 프로그램명 input */
const Filterinput = styled.input`
padding: 0px 12px;
background: #FFFFFF;
border: 1px solid #DBDBDB;
border-radius: 8px;
margin-top:15px;
width: 100%;
height: 55px;
`;

/* 프로그램 상세설명 입력부분 */
const DetaolTextarea = styled.textarea`
width:100%;
height:65px;
display: flex;
border: none;
border: 1px solid #DBDBDB;
border-radius: 8px;
font-weight: 400;
font-size: 14px;
color: #797979;
line-height: 17px;
margin-top:8px;
@media screen and (max-width: 540px) {
}
`;

/*  컨설팅 주제  */
const FourthBox = styled.div`
display: flex;
justify-content:flex-start;
align-items: flex-start;
margin-top:40px;
flex-direction:column;
width: 340px;
height: auto;
`;

/*  컨설팅 주제  */
const FifthBox = styled.div`
display: flex;
justify-content:flex-start;
align-items: flex-start;
margin-top:40px;
flex-direction:column;
width: 340px;
height: 270px;
`;

/* 프로그램명 이미지 */
const Filterimage = styled.div`
padding: 0px 12px;
background: #FFFFFF;
border: 1px solid #DBDBDB;
border-radius: 8px;
margin-top:15px;
width: 100%;
height: 55px;
display: flex;
justify-content:flex-start;
align-items: center;
font-weight: 600;
font-size: 16px;
color: #797979;
`;

/* 선택부분 전체 박스 */
const SubjectBox = styled.div`
width:380px;
height:auto;
display: flex;
justify-content:center;
align-items: flex-start;
flex-direction:column;
margin-top:40px;
@media screen and (max-width: 540px) {
}
`;

/* 선택부분 내부 */
const SubjectInner = styled.div`
width:100%;
height:60.48px;
display: flex;
justify-content:flex-start;
align-items: center;
flex-direction:row;
margin-top:16px;
@media screen and (max-width: 540px) {
    height:11.2vw;
    }
`;

/* 온라인 화상통화 */
const SubjectInnerFirst = styled.div`
width:178.56px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
    width:33vw;
    }
`;

/* 온라인 화상통화 클릭시 */
const SubjectInnerFirstClick = styled.div`
width:178.56px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #00C563;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    width:33vw;
    }
`;


/* 오프라인 및 1대1 메세지 */
const SubjectInnerSecond = styled.div`
width:128.16px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #DCDCDC;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #797979;
@media screen and (max-width: 540px) {
    width:23.7vw;
    }
`;

/* 오프라인 및 1대1 메세지 활성화 */
const SubjectInnerSecondActive = styled.div`
width:128.16px;
height:100%;
display: flex;
justify-content:center;
align-items: center;
border: 1px solid #00C563;
border-radius: 8px;
margin-right:14px;
font-weight: 700;
font-size: 14px;
color: #00C563;
@media screen and (max-width: 540px) {
    width:23.7vw;
    }
`;

/* 선택부분 설명 */
const ExplainBox = styled.div`
width:100%;
height:167.04px;
background: #E2FFF1;
border-radius: 8px;
display:flex;
justify-content: center;
align-items: center;
margin-top:12px;
@media screen and (max-width: 540px) {
    height:30.9vw;
}
`;

/* 선택부분 설명 내부 박스 */
const ExplainInner = styled.div`
width:93%;
height:auto;
display:flex;
justify-content: center;
align-items: flex-start;
flex-direction:column;
@media screen and (max-width: 540px) {
}
`;

/*  가능 요일 및 시간  */
const SixthBox = styled.div`
display: flex;
justify-content:flex-start;
align-items: flex-start;
margin-top:40px;
flex-direction:column;
width: 340px;
height: auto;
`;