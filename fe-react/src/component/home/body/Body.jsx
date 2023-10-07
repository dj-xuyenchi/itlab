import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import Fillter from "./filter/Filter";
import Product from "./product/Product";
function Body() {
  const language = useSelector(selectLanguage);
  return (
    <>
      <div className="body-container">
        <Fillter />
        <Product />
      </div>
    </>
  );
}

export default Body;
