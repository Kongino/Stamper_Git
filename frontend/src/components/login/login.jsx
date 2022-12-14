import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  registerUser,
  getUserProfile,
  findUserPassword,
  checkDuplicatedUserId,
} from "../../api/user";
import { findUserId } from "../../api/user"; 

import { doLogin } from "../../api/auth";
import { useDispatch } from "react-redux";
import { SET_LOGIN, SET_TOKEN, SET_USERINFO } from "../../redux/UserInfo";

import "./login.css";



import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  Modal,
  Stack,
  Typography,
} from "@mui/material";

import { Box } from "@mui/system";

import apartment from "../../../public/assets/login/apartment.png";
import bridge from "../../../public/assets/login/bridge.png";
import church from "../../../public/assets/login/church.png";
import circus from "../../../public/assets/login/circus.png";
import tram from "../../../public/assets/login/tram.png";
import ferris from "../../../public/assets/login/ferris.png";
import ferris2 from "../../../public/assets/login/ferris2.png";
import forest from "../../../public/assets/login/forest.png";
import government from "../../../public/assets/login/government.png";
import lighthouse from "../../../public/assets/login/lighthouse.png";
import park from "../../../public/assets/login/park.png";
import eye1 from "../../../public/assets/login/eye1.png";
import eye2 from "../../../public/assets/login/eye2.png";



const LoginPage = () => {
  const dispatch = useDispatch();
  const [IsSignUp, setIsSignUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const [userNick, setUserNick] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const [isUserId, setIsUserId] = useState(false);
  const [isUserPass, setIsUserPass] = useState(false);
  const [isUserName, setIsUserName] = useState(false);
  const [isUserNick, setIsUserNick] = useState(false);
  const [isUserEmail, setIsUserEmail] = useState(false);
  const [isUserPhone, setIsUserPhone] = useState(false);

  const [userIdMessage, setUserIdMessage] = useState("");
  const [userPassMessage, setUserPassMessage] = useState("");
  const [userNameMessage, setUserNameMessage] = useState("");
  const [userNickMessage, setUserNickMessage] = useState("");

  // const useStyles = makeStyles((theme) => ({
  //   input: {
  //     color: "black",
  //   },
  // }));

  const LoginOrSignUp = (e) => {
    e.preventDefault(); // form ?????? ??????
    setUserId(""); // id, password ??????????????? ?????????
    setUserPass("");
    setUserName("");
    setUserNick("");
    setUserEmail("");
    setUserPhone("");
    const newValue = !IsSignUp;
    setIsSignUp(newValue); // true -> false ??????
  };




  // ????????????
  const onSubmitRegisterForm = (event) => {
    event.preventDefault();
    const data = {
      userId: userId,
      userPassword: userPass,
      userName: userName,
      userEmail: userEmail,
      userPhone: userPhone,
      userNickname: userNick,
    };
    console.log(data)
    registerUser(
      data,
      (response) => {
        setUserId(""); // id, password ??????????????? ?????????
        setUserPass("");
        setUserName("");
        setUserNick("");
        setUserEmail("");
        setUserPhone("");
        setIsSignUp(false);
        alert("???????????? ?????? ?????? ???????????????!");
      },
      (error) => {
        console.log(error);
        // alert(error.response.data.message);
      }
    );
  };

  const onSubmitLoginForm = (event) => {
    event.preventDefault();

    console.log(userPass + "" + userId)
    doLogin(
      { userId: userId, userPassword: userPass },
      (response) => {
        console.log(response.data);
        dispatch(SET_TOKEN(response.data.accessToken));
        let token = response.data.accessToken;
        getUserProfile(
          response.data.accessToken,
          (response) => {
            dispatch(SET_USERINFO(response.data.userRes));
            console.log("profile get", response.data.userRes);
            dispatch(SET_LOGIN());
            console.log()
          },
          (error) => {
            console.log(error);
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };
  

  // ????????? ??????
  const [findUserName, setFindUserName] = useState("");
  const [findUserPhone, setFindUserPhone] = useState("");

  const [foundUserId, setFoundUserId] = useState("");
  const onFindUserName = (event) => {
    setFindUserName(event.target.value);
  };
  const onFindUserPhone = (event) => {
    setFindUserPhone(event.target.value);
  };

  const [openFindUserId, setOpenFindUserId] = useState(false);
  const [openResponseUserId, setOpenResponseUserId] = useState(false);

  const handleOpenFindUserId = () => {
    setOpenFindUserId(true);
  };
  const handleCloseFindUserId = () => {
    setOpenFindUserId(false);
    setFindUserName("");
    setFindUserPhone("");
  };
  const handleOpenResponseUserId = () => {
    setOpenResponseUserId(true);
  };
  const handleCloseResponseUserId = () => {
    setOpenResponseUserId(false);
    handleCloseFindUserId();
  };
  const onFindUserId = () => {
    const findUserIdInfo = {
      userName: findUserName,
      userPhone: findUserPhone,
    };
    const success = (res) => {
      handleOpenResponseUserId();
      setFoundUserId(res.data.userId);
    };
    const error = (res) => {
      console.log(res);
    };
    findUserId(findUserIdInfo, success, error);
  };


  // ???????????? ??????
  const [passUserId, setPassUserId] = useState("");
  const [passUserName, setPassUserName] = useState("");
  const [passUserPhone, setPassUserPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const onPassUserId = (event) => {
    setPassUserId(event.target.value);
  };
  const onPassUserName = (event) => {
    setPassUserName(event.target.value);
  };
  const onPassUserPhone = (event) => {
    setPassUserPhone(event.target.value);
  };
  const onNewPassword = (event) => {
    setNewPassword(event.target.value);
  };

  const [openFindPassword, setOpenFindPassword] = React.useState(false);
  const [openResponseFindPassword, setOpenResponseFindPassword] =
    useState(false);

  const handleOpenFindPassword = () => {
    setOpenFindPassword(true);
  };
  const handleCloseFindPassword = () => {
    setOpenFindPassword(false);
    setPassUserId("");
    setPassUserName("");
    setPassUserPhone("");
    setNewPassword("");
  };
  const handleOpenResponseFindPassword = () => {
    setOpenResponseFindPassword(true);
  };
  const handleCloseResponseFindPassword = () => {
    setOpenResponseFindPassword(false);
    handleCloseFindPassword();
  };

  const onFindPassword = () => {
    const findUserPasswordInfo = {
      userId: passUserId,
      userName: passUserName,
      userPhone: passUserPhone,
      newPassword: newPassword,
    };
    const success = (res) => {
      console.log(res);
      handleOpenResponseFindPassword();
    };
    const error = (res) => {
      console.log(res);
    };
    findUserPassword(findUserPasswordInfo, success, error);
  };

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

  return (
    <div className="LoginSignUp">
      {IsSignUp ? (
        <div class="center">
          <span className='logo3 muruk'>????????????</span>
          <div>             
           <img className="sticker1" src={apartment} alt="" />
           <img className="sticker2" src={bridge} alt="" />
           <img className="sticker3" src={church} alt="" />
           <img className="sticker4" src={circus} alt="" />
           <img className="sticker5" src={tram} alt="" />
           <img className="sticker6" src={ferris} alt="" />
           <img className="sticker7" src={ferris2} alt="" />
           <img className="sticker8" src={forest} alt="" />
           <img className="sticker9" src={government} alt="" />
           <img className="sticker10" src={lighthouse} alt="" />
           <img className="sticker11" src={park} alt="" />
           {/* <img className="sticker12" src={eye1} alt="" />
           <img className="sticker13" src={eye2} alt="" /> */}
         </div>
         <br />

          <form method="post" onSubmit={onSubmitRegisterForm}>
            <div
              class={`txt_field ${isUserId ? "txt_field" : "txt_field_false"} ${
                userIdMessage ? "txt_field_message" : ""
              }`}
            >
              <TextField                
                label = "?????????"
                variant = "outlined"
                id = "outlined-basic"
                className="inputwidth"
                type="text"
                color="secondary"
                required
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  if (e.target.value.length < 5 || e.target.value.length > 10) {
                    setIsUserId(false);
                    setUserIdMessage("5~10??? ????????? ID??? ???????????????");
                    if (e.target.value.length < 1) {
                      setUserIdMessage("");
                    }
                    return;
                  }
                  else{
                    setIsUserId(true);
                    setUserIdMessage("");
                  }
                  checkDuplicatedUserId(
                    e.target.value,
                    (response) => {
                      if (response.data.statusCode === 200) {
                        setIsUserId(true);
                        setUserIdMessage("?????? ????????? ID ?????????");
                      } else if (response.data.statusCode === 409) {
                        setIsUserId(false);
                        setUserIdMessage("?????? ???????????? ??????????????????")
                      }
                    },
                    (error) => {
                      // if (error.response.data.statusCode === 409) {
                      //   setIsUserId(false);
                      //   setUserIdMessage("?????? ???????????? ??????????????????");
                      // }
                      console.log(error);
                    }
                  );
                }}
              ></TextField>
              <br />
              <span>{userIdMessage}</span>
              <br />
              <br />

            </div>
            <div
              class={`txt_field ${
                isUserPass ? "txt_field" : "txt_field_false"
              } ${userPassMessage ? "txt_field_message" : ""}`}
            >

              <TextField
                label = "????????????"
                variant = "outlined"
                id = "outlined-password-input"
                className="inputwidth"
                type="password"
                color="secondary"
                sx={{ input: { fontFamily : 'Arial' } }}
                required
                onChange={(e) => {
                  setUserPass(e.target.value);
                  if (!passwordRegex.test(e.target.value)) {
                    setIsUserPass(false);
                    setUserPassMessage(
                      "8?????? ????????? ??????+?????????+???????????? ???????????? ???????????????."
                    );
                    if (e.target.value.length < 1) {
                      setUserPassMessage("");
                    }
                  } else {
                    setIsUserPass(true);
                    setUserPassMessage("");
                  }
                }}
              ></TextField>
              <br />
              <span>{userPassMessage}</span>
              <br />
              <br />

            </div>
            <div
              class={`txt_field ${
                isUserName ? "txt_field" : "txt_field_false"
              } ${userNameMessage ? "txt_field_message" : ""}`}
            >
              <TextField
                label = "??????"
                variant = "outlined"
                id = "outlined-basic"
                className="inputwidth"
                type="text"
                color="secondary"
                required
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                  if (e.target.value.length > 20) {
                    setIsUserName(false);
                    setUserNameMessage("?????? ??? ???????????????");
                    return;
                  } else {
                    setIsUserName(true);
                    setUserNameMessage("");
                  }
                }}
              ></TextField>
              <br />
              <span>{userNameMessage}</span>
            </div>
            <br />
            <br />

            <div
              class={`txt_field ${
                isUserNick ? "txt_field" : "txt_field_false"
              } ${userNickMessage ? "txt_field_message" : ""}`}
            >
              <TextField
                label = "?????????"
                variant = "outlined"
                id = "outlined-basic"
                className="inputwidth"
                type="text"
                color="secondary"
                value={userNick}
                required
                onChange={(e) => {
                  setUserNick(e.target.value);
                  if (e.target.value.length > 12) {
                    setIsUserNick(false);
                    setUserNickMessage("12??? ????????? ???????????? ???????????????");
                    return;
                  } else {
                    setIsUserNick(true);
                    setUserNickMessage("");
                  }
                }}
              ></TextField>
              <br />
              <span>{userNickMessage}</span>
              <br />
              <br />

            </div>
            <div>
              <TextField
                label = "?????????"
                varient = "outlined"
                id = "outlined-basic"
                className="inputwidth"
                type = "text"
                color="secondary"
                value = {userEmail}
                onChange={(e) => {
                  setUserEmail(e.target.value);
                  if (e.target.value.length==0) setIsUserEmail(false);
                  else setIsUserEmail(true);
                }}>
              </TextField>
              <br />
              <br />
            </div>
            <div>
              <TextField
                label = "????????????"
                varient = "outlined"
                id = "outlined-basic"
                className="inputwidth"
                color="secondary"
                type = "text"
                value = {userPhone}
                onChange={(e) => {
                  setUserPhone(e.target.value);
                  if (e.target.value.length==0) setIsUserPhone(false);
                  else setIsUserPhone(true);
                }}>
              </TextField>
              <br />
            </div>
            <br />


            
            <Button
              color="secondary"
              type="submit"
              value="SignUp"
              disabled={
                !(
                  isUserId &&
                  isUserName &&
                  isUserNick &&
                  isUserPass &&
                  isUserEmail &&
                  isUserPhone
                )
              }
            >????????????</Button>
            <br /><br />
            <div class="signup_link">
              ?????? ???????????????????{" "}
              <span className="LoginOrout" onClick={LoginOrSignUp}>
                ?????????
              </span>
            </div>
          </form>
        </div>
      ) : (
        <div>
        {/* ????????? ????????? ?????? */}
          <div>             
          <img className="logo" src="/assets/LOGO.png" alt="" />
          <h2 className="muruk english_title">Stamper</h2>
            <img className="sticker1" src={apartment} alt="" />
            <img className="sticker2" src={bridge} alt="" />
            <img className="sticker3" src={church} alt="" />
            <img className="sticker4" src={circus} alt="" />
            <img className="sticker5" src={tram} alt="" />
            <img className="sticker6" src={ferris} alt="" />
            <img className="sticker7" src={ferris2} alt="" />
            <img className="sticker8" src={forest} alt="" />
            <img className="sticker9" src={government} alt="" />
            <img className="sticker10" src={lighthouse} alt="" />
            <img className="sticker11" src={park} alt="" />
            {/* <img className="sticker12" src="/src/assets/login/eye1.png" alt="" />
            <img className="sticker13" src="/src/assets/login/eye2.png" alt="" /> */}
          <h1 className="muruk gradtext korean_title">?????????</h1>
          </div>

          {/* ????????? ??????  */}
          <div>
          <Box component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '200px'},
          }}
          noValidate autoComplete="off"
        > 
          
          <form method="post" onSubmit={onSubmitLoginForm}>
            <div class="txt_field">
              <TextField
                label = "?????????"
                variant = "outlined"
                id = "outlined-basic"
                className="inputwidth"
                type="text"
                color="secondary"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              ></TextField>
            </div>
            <div class="txt_field">
              <TextField
                label = "????????????"
                variant = "outlined"
                id = "outlined-password-input"
                className="inputwidth"
                type="password"
                color="secondary"
                sx={{ input: { fontFamily : 'Arial' } }}
                required
                value={userPass}
                onChange={(e) => setUserPass(e.target.value)}
              ></TextField>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", width: "200px", marginLeft: "auto", marginRight: "auto"}}>
              <div class="pass" onClick={handleOpenFindUserId}>
                ????????? ??????
              </div>
              <div class="pass password" onClick={handleOpenFindPassword}>
                ???????????? ??????
              </div>
            </div>
            {/* <input type="submit" value="Login"></input> */}
            <Button color="secondary" onClick={onSubmitLoginForm}>?????????</Button>
            <br />
            <div class="signup_link">
              ????????? ????????????????{" "}
              <span className="LoginOrout" onClick={LoginOrSignUp}>
                ????????????
              </span>
            </div>
          </form>
          </Box>
          </div>
        
          {/* ?????? ?????? */}
        <p className="footer_blank kkultip">???????????? ?????? ????????? ??????????????? ??????????????????!</p>
        <p className="kkultip">????????? ?????? AI ???????????? ?????? ??????????????? ???????????????!</p>
    
         {/* ?????? ?????? Footer */}
         <footer className="footer_blank2">
          <a className="chulcheo" href="https://www.flaticon.com/authors/freepik" title="LOGO and Components icons">
            <span>Logo and Components icons</span>
           <br />
           <span>created by Freepik - Flaticon</span>
           </a>
         </footer>
        </div>
      )}


      {/* ????????? ?????? */}

      <Dialog
        open={openFindUserId}
        keepMounted
        onClose={handleCloseFindUserId}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="dialog-title">
          {"???????????? ????????????????"}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <div>
            ????????? ????????? ???????????????.
            <br />
            <br />
            <br />
          </div>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog-content-text"
          >
            <label for="userName">??????</label>
            <div>
              <Input
              color="secondary"
                value={findUserName}
                id="userName"
                className="dialog-input"
                onChange={onFindUserName}
              ></Input>
            </div>
            <br />

            <label for="userPhone">????????????</label>
            <div>
              <Input
              color="secondary"
                value={findUserPhone}
                id="userPhone"
                className="dialog-input"
                onChange={onFindUserPhone}
              ></Input>
            </div>
            <br />

          </DialogContentText>
        </DialogContent>

        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleCloseFindUserId}>
              <div className="cancel-button-text">??????</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={onFindUserId}>
              <div className="accept-button-text">??????</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openResponseUserId}
        onClose={handleCloseResponseUserId}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="dialog-content">
          ???????????? ???????????? {foundUserId} ?????????.
          <br />
          <DialogContentText></DialogContentText>
        </DialogContent>

        <div className="option-cell">
          <Button onClick={handleCloseResponseUserId}>??????</Button>
        </div>
      </Dialog>

      {/* ???????????? ?????? */}
      <Dialog
        open={openFindPassword}
        keepMounted //??
        onClose={handleCloseFindPassword}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="dialog-title">
          {"??????????????? ????????????????"}
        </DialogTitle>
        <DialogContent className="dialog-content">
          <div>
            ????????? ????????? ???????????????.
            <br />
            <br />
            <br />
          </div>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="dialog-content-text"
          >
            <label for="userId">?????????</label>
            <div>
              <Input
              color="secondary"
                value={passUserId}
                id="userId"
                className="dialog-input"
                onChange={onPassUserId}
              ></Input>
            </div>
            <br />

            <label for="userName">??????</label>
            <div>
              <Input
              color="secondary"
                value={passUserName}
                id="userName"
                className="dialog-input"
                onChange={onPassUserName}
              ></Input>
            </div>
            <br />

            <label for="userPhone">????????????</label>
            <div>
              <Input
              color="secondary"
                value={passUserPhone}
                id="userPhone"
                className="dialog-input"
                onChange={onPassUserPhone}
              ></Input>
            </div>
            <br />

            <label for="newPassword">??? ????????????</label>
            <div>
              <Input
              color="secondary"
                type="password"
                value={newPassword}
                id="newPassword"
                className="dialog-input"
                sx={{ input: { fontFamily : 'Arial' } }}
                onChange={onNewPassword}
              ></Input>
            </div>
          </DialogContentText>
        </DialogContent>

        <DialogActions className="option-cell">
          <div className="cancel-button">
            <Button onClick={handleCloseFindPassword}>
              <div className="cancel-button-text">??????</div>
            </Button>
          </div>
          <div className="accept-button">
            <Button onClick={onFindPassword}>
              <div className="accept-button-text">??????</div>
            </Button>
          </div>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openResponseFindPassword}
        onClose={handleCloseResponseFindPassword}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          style={{ backgroundColor: "#202225", borderRadius: "10px" }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="white"
          >
            ??????????????? ?????????????????????.
            <Stack
              direction="row-reverse"
              alignItems="center"
              spacing={2}
              style={{ marginTop: "2rem" }}
            >
              <Button onClick={handleCloseResponseFindPassword}>??????</Button>
            </Stack>
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
 };

export default LoginPage;