import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './component/login/Login';
import { useDispatch, useSelector } from 'react-redux';
import languageSlice from './language/languageSlice';
import { vi } from './language/vi';
import { en } from './language/en';
import { notification } from 'antd';
import notiSlice from './redux/notiSlice';
import { openNotification } from './plugins/notificationProvider';
import { selectLanguage } from './language/selectLanguage';
import { selectNotiApi } from './redux/selectNoti';
import NotFound from './component/notfound/NotFound';

function App() {
  const dispath = useDispatch()
  const [api, contextHolder] = notification.useNotification();
  dispath(notiSlice.actions.setApi(api))
  const notiApi = useSelector(selectNotiApi)
  const languageSystem = useSelector(selectLanguage)
  let language = localStorage.getItem("language");
  if (language === null) {
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
      {contextHolder}
      <Routes>
        <Route path="/*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <button type="" onClick={() => {
        openNotification(languageSystem.systemNotification.system, languageSystem.systemNotification.disconnect, 'error', notiApi.noti)

      }}>sss</button>
    </>
  );
}

export default App;
