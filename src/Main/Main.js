import styled from "styled-components";
import { useEffect, useState } from "react";
import './Main.css';
import MainFirst from "./Main_First";
import { useNavigate, useLocation } from "react-router-dom";

function Main() {


    const [q2, setQ2] = useState("멘토관리"); // 멘토관리 
    const [filter, setfilter] = useState("전체"); // RadioBtn 
    const [name, setName] = useState("");
    const [post, setPost] = useState("");
    const navigation = useNavigate()

    const parentFunction = (x) => {
        setPost(x);
      };

    // 전체 클릭 
    function Totalnavigate(){
        setfilter("전체")
        navigation('/Main')
    }

    // 승인대기 클릭  
    function Wait(){
        setfilter("승인대기")
        navigation('/Main/Wait')
    }

    // 활동중 클릭  
    function Active(){
        setfilter("활동중")
        navigation('/Main/Active')
    }

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

                    <Topcontent>
                        <Topspan>상태필터</Topspan>
                        <label>
                            <input type="radio" name="total" value="total"
                                checked={filter === "전체" ? true : false} onClick={() => Totalnavigate()} />
                            <span>전체</span>
                        </label>
                        <label>
                            <input type="radio" name="wait" value="wait"
                                checked={filter === "승인대기" ? true : false} onClick={() => Wait()} />
                            <span>승인대기</span>
                        </label>
                        <label>
                            <input type="radio" name="active" value="active"
                                checked={filter === "활동중" ? true : false} onClick={() => Active()} />
                            <span>활동중</span>
                        </label>
                        <Topspan>검색필터</Topspan>
                        <FilterName>
                            <span>이름</span>
                            <img src="https://firststepimage.s3.ap-northeast-2.amazonaws.com/Admin/arrow.png" style={{ width: "24px", height: "auto" }} />
                        </FilterName>
                        <Filterinput
                            type="name"
                            placeholder="이름을 입력하세요"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                        <Filtersurvey>조회</Filtersurvey>
                    </Topcontent>


                    <Search>
                        <div style={{ display:"flex" , flexDirection:"row" , width:"200px" , justifyContent:"space-between"}}>
                            <div>
                                <span style={{ color:"#757575" , fontSize:"14px" , marginRight:"5px"}}>총</span>
                                <span style={{ color:"black" , fontSize:"14px" , fontWeight:"bold"}}>{post}건</span>
                            </div>
                            <div style={{ marginLeft:"16px"}}>
                                <span style={{ color:"#757575" , fontSize:"14px" , marginRight:"5px"}}>검색결과</span>
                                <span style={{ color:"black" , fontSize:"14px" , fontWeight:"bold"}}>{post}개</span>
                            </div>
                        </div>
                        <div style={{ display:"flex" , flexDirection:"row" , width:"228px" , justifyContent:"space-between"}}>
                            <Excel>엑셀다운로드</Excel>
                            <Excel>프로그램 추가</Excel>
                        </div>
                    </Search>
                    <MainFirst  parentFunction={parentFunction}/>
                </Topinner>
            </Total>
        </div>
    );
}

export default Main;

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

/* 로그인부분 상단박스 */
const Total = styled.div`
display: flex;
justify-content:center;
align-items: center;
width: 100%;
height: auto; 
`;

/* 로그인부분 상단박스 */
const Topinner = styled.div`
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction:column;
width: 1200px;
height: 1150px;
`;

/* 로그인부분 상단박스 */
const Topcontent = styled.div`
display: flex;
justify-content:space-between;
align-items: center;
margin-top:40px;
width: 890px;
height: 40px; 
`;

/* 필터부분 문구 */
const Topspan = styled.span`
font-weight: 700;
font-size: 14px;
`;

/* 필터부분 이름 */
const FilterName = styled.div`
padding: 0px 12px;
background: #FFFFFF;
border: 1px solid #DBDBDB;
border-radius: 8px;
width: 200px;
height: 40px;
display:flex;
justify-content:space-between;
align-items:center;
`;

/* 필터부분 검색부분 */
const Filterinput = styled.input`
padding: 0px 12px;
background: #FFFFFF;
border: 1px solid #DBDBDB;
border-radius: 8px;
width: 200px;
height: 40px;
display:flex;
justify-content:space-between;
align-items:center;
`;

/* 필터부분 조회 */
const Filtersurvey = styled.div`
width: 74px;
height: 40px;
background: #000000;
border-radius: 8px;
font-style: normal;
font-weight: 700;
font-size: 14px;
color:white;
display: flex;
justify-content:center;
align-items: center;
`;

/* 로그인부분 상단박스 */
const Search = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
flex-direction:row;
width: 1200px;
height: 40px;
margin-top:40px;
`;

/* 엑셀 프로그램 다운 */
const Excel = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 110px;
height: 40px;
background: #FFFFFF;
border: 1px solid #000000;
border-radius: 8px;
font-weight: 700;
font-size: 14px;
`;



