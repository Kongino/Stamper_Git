import "./userProfile.css"
import * as React from 'react';

const userprofile = () => {
    return (
        <div className="aligncenter">
            {/* 프로필 카드 */}
            <div className="container profile_background">
                {/* 프로필 사진과 이름 */}
                <div className="item">
                    <img className="temp_dummy_profile_photo" src="/assets/components/user.png" alt="" />
                    <p> 김싸피 </p>
                </div>
                
                {/* 자기소개 */}
                <div className="item">
                    <p>나이: 29  성별: 남  취미: 클라이밍</p>
                    <p>성북구 랜드마크 뿌셔!</p>
                </div>

                <a className="item" href="#">
                    <img className="profile_control_comp" src="/assets/components/myintro.png" alt="" />
                </a>

                <a className="item" href="/profile/:userNo/modify">
                    <img className="profile_control_comp" src="/assets/components/account.png" alt="" />
                </a>

            </div>
                    
                {/* 프로필의 기념도장과 랜드마크 아이콘 */}
            <div className="item">
                <br />
                
                <div>
                    <h1> 나의 업적 </h1>
                </div>
                
                {/* 로고 나열 */}
                <div>
                  <img className="profile_comp" src="/assets/components/stamp.png" alt="" />
                </div>
            </div> 
        </div>
    );
  };

export default userprofile;