import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./component/login/Login";
import { useDispatch } from "react-redux";
import languageSlice from "./language/languageSlice";
import { vi } from "./language/vi";
import { en } from "./language/en";
import NotFound from "./component/notfound/NotFound";
import HomePage from "./component/home/HomePage";
import DashBoard from "./component/admin/dashboard/DashBoard";
import ProductDetail from "./component/home/productdetail/ProductDetail";
import userSlice from "./component/login/userSlice";
import { useEffect } from "react";
import GioHangThanhToan from "./component/home/giohangthanhtoan/GioHangThanhToan";
import Product from "./component/admin/product/Product";
function App() {
  const dispath = useDispatch();
  const disPath = useDispatch();
  useEffect(() => {
    let language = localStorage.getItem("language");
    if (language === null) {
      language = "vi";
      dispath(languageSlice.actions.setLanguage(vi));
      localStorage.setItem("language", "vi");
    } else {
      switch (language) {
        case "vi":
          dispath(languageSlice.actions.setLanguage(vi));
          break;
        case "en":
          dispath(languageSlice.actions.setLanguage(en));
          break;
        default:
      }
    }
    const user = localStorage.getItem("user");
    if (user) {
      disPath(userSlice.actions.dangNhap(JSON.parse(user).data));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/sanpham/:id" element={<ProductDetail />} />
        <Route path="/thanhtoan" element={<GioHangThanhToan />} />
        <Route path="/admin/sanpham" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
