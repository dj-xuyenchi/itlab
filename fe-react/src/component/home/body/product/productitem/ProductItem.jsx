import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../../../language/selectLanguage";
import { PiHeartStraight } from "react-icons/pi";
function ProductItem({ item }) {
  const language = useSelector(selectLanguage);
  return (
    <>
      <div className="product-item-container">
        <div className="product-item-detail">
          <div className="product-imgs">
            <img
              src={require("../../../../../assets/fakedata/demo1.jpg")}
              alt="san pham"
            />
            <div className="sales">
              <img
                src={require("../../../../../assets/fakedata/sales.webp")}
                alt=""
              />
            </div>
          </div>
          <div className="product-detail">
            <div className="product-name-container">
              <span>Áo choàng póng tối dành cho yasuo - 10HNH213</span>
              <PiHeartStraight />
            </div>
            <div className="product-cost">400k ₫</div>
            <div className="product-color">
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductItem;
