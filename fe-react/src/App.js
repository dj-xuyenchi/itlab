import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './component/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from './redux/select';
import languageSlice from './language/languageSlice';
import { vi } from './language/vi';
import { en } from './language/en';

function App() {
  const dispath = useDispatch()
  const languageSystem = useSelector(selectLanguage)
  let language = localStorage.getItem("language");
  if (language == null) {
    language = "vi";
    dispath(languageSlice.actions.setLanguage(vi))
    localStorage.setItem("language", "vi")
  } else {
    switch (language) {
      case "vi":
        dispath(languageSlice.actions.setLanguage(vi))
        break;
      case "en":
        dispath(languageSlice.actions.setLanguage(en))
        break;
      default:
    }
  }
  return (
    <>
      <Routes>
        {/* <Route path="/*" element={<NotFound />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
