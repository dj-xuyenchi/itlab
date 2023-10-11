import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import Header from "../../common/header/Header";
import Body from "../body/Body";
import FotoramaSlider from "./FotoramaSlider";
function ProductDetail() {
    const language = useSelector(selectLanguage);
    return (
        <>
            <Header />
            <FotoramaSlider />
        </>
    );
}

export default ProductDetail;
