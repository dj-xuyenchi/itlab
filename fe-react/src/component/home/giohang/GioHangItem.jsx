import { useSelector } from "react-redux";
import "./style.css";
import { selectLanguage } from "../../../language/selectLanguage";
import { AiOutlineClose } from "react-icons/ai";
import { fixMoney } from "../../../extensions/fixMoney";
import { InputNumber } from "antd";
function GioHangItem({ item }) {
  const language = useSelector(selectLanguage);
  console.log(item);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "96%",
          marginLeft: "2%",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "140px",
            overflow: "hidden",
            height: "180px",
            display: "flex",
            justifyItems: "center",
            alignItems: "center",
          }}
        >
          <img
            src={item.sanPhamChiTiet.hinhAnh}
            alt="anh"
            style={{
              height: "180px",
              width: "auto",
              borderRadius: "10px",

            }}
          />
        </div>
        <div
          style={{
            marginLeft: "4px",
            width: "176px"
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                marginLeft: "2%",
                width: "88%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 500,
              }}
            >
              {item.sanPhamChiTiet.tenSanPham}
            </div>
            <div
              style={{
                width: "10%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: 700,
                fontSize: "24px",
              }}
              className="hover-yeuthich"
            >
              <AiOutlineClose />
            </div>
          </div>
          <div>
            <p>
              {fixMoney(item.sanPhamChiTiet.giaBan)}
            </p>
          </div>
          <div>
            <InputNumber value={item.soLuong} />
          </div>
        </div>
      </div>
    </>
  );
}

export default GioHangItem;
