import "./style.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectLanguage } from "../../language/selectLanguage";
function Login() {
    const language = useSelector(selectLanguage);
    const [typeError, setTypeError] = useState(undefined)
   
    return (
        <>
            <div></div>
        </>
    );
}

export default Login;