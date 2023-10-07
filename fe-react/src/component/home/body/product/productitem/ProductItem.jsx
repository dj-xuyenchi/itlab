import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../../language/selectLanguage";
function ProductItem({ item }) {
  const language = useSelector(selectLanguage);
  return (
    <>
      <div className="product-item">
        <div className="product-detail">
          <div className="product-img">
            <img
              src={require("../../../../../assets/fakedata/demo1.jpg")}
              alt="product"
            />
          </div>
          <div className="product-cost">sss</div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
