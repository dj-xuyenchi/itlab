import { Button, Card, Divider, Input } from "antd";
import {
    exchangeCodeForToken,
    getGoogleAuthUrl,
    getUserInfo,
} from "../../plugins/ggoauth2";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { selectLanguage } from "../../language/selectLanguage";

function Login() {
    const language = useSelector(selectLanguage);
    console.log(language);
    const [typeError, setTypeError] = useState(undefined)
    const loginWithGoogle = async () => {
        const authUrl = await getGoogleAuthUrl();

        // dieu huong sang google
        console.log(authUrl);
        window.location.href = authUrl;
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
        const getUser = async () => {
            const user = await exchangeCodeForToken(code);
            // đã lấy được info
            //  const info = await getUserInfo(user.token);
            // console.log(info);
        };
        getUser();
    }
    const hour = new Date().getHours;

    return (
        <>
            <div className="login-container">
                <div className="login-banner">
                    <div className="login-pannel">
                        <img src={require("../../assets/login/login3.png")} alt="" /> :
                    </div>
                </div>
                <div className="login-option">
                    <div className="login-option-site">
                        <div className="login-option-header">
                            <img
                                src={require("../../assets/login/logo-noname.png")}
                                alt=""
                            />
                            <h3>{language.login.company}</h3>
                            <p>{language.login.subTitle}</p>
                            <label htmlFor="">{language.login.userName}</label>
                            <Input size="large" placeholder={language.login.userNamePlaceHolder} className="input" />
                            <label htmlFor="">{language.login.password}</label>
                            <Input.Password size="large" placeholder={language.login.passwordPlaceHolder} className="input" />
                            <Link>
                                {language.login.forgotPass}
                            </Link>
                            {
                                typeError ?
                                    <Card style={{
                                        width: '100%',
                                        marginBottom: 12,
                                        marginTop: 12,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        <p className="wrong">{language.login.wrong}</p>
                                        <p className="wait">{language.login.wait}</p>
                                    </Card> : ""
                            }

                            <Button size='large'>
                                {language.login.loginBtn}
                            </Button>
                            <Divider className="span"> {language.login.or}</Divider>
                            <div className="social-oauth">
                                <div>
                                    <img src={require('../../assets/login/googleoauth.png')} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;