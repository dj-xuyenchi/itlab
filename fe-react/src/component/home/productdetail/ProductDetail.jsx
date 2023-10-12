import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import Header from "../../common/header/Header";
import ProductImgSlider from "./ProductImgSlider";
import { fixMoney } from "../../../extensions/fixMoney";
function ProductDetail() {
    const language = useSelector(selectLanguage);
    return (
        <>
            <Header />
            <div style={{
                width: "96%",
                marginLeft: "2%",
                display: "flex",
                marginTop: "24px"

            }}>
                <div style={{
                    width: "40%"
                }}>

                    <ProductImgSlider />
                </div>
                <div style={{
                    width: "58%",
                    marginLeft: "2%"
                }}>
                    <div style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}>
                        <h1 style={{
                            fontSize: "20px",
                            fontWeight: 500,
                            lineHeight: "24px",
                            textTransform: "uppercase"
                        }}>Áo Khoác Nam Flannel Tay Dài Khóa Kéo Kẻ Caro Form Regular - 10F23JAC002
                        </h1>
                    </div>
                    <div style={{
                        marginTop: "20px",
                        marginBottom: "20px",
                    }}>
                        <span style={{
                            fontWeight: 700,
                            lineHeight: "28px",
                            fontSize: "24px"
                        }}>{fixMoney("1000000")}</span>
                    </div>
                    <div>
                        <span>Chọn màu sắc:</span>

                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;
