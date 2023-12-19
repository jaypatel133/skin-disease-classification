import { Routes, Route, Navigate ,useLocation} from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./Login";
import Login_v2 from "./login_v2";
import HomeRouter from "./Home/HomeRouter";
import Home from "./Home/Home";
import Demo from "./Home/Demo";
import Upload from "./upload";
import Report from "./Home/Report";
import Registration from "./registration";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion"

const App = () => {
  
  const [isLogin,setIsLogin] = useState('');
  const savedItem = localStorage.getItem("Auth");
  const parsedItem = JSON.parse(savedItem);
  // const location = useLocation();
  // location={location} key={location.pathname}
  useEffect(()=>{
    if(savedItem)
    {
       setIsLogin(parsedItem);
    }
  },[])
  

  return (
    <AnimatePresence>
    <Routes >
    {/* <Route element={<RequireAuth/>}> */}
      <Route exact path="/" element={<HomeRouter />}>
        <Route index element={<Home /> }></Route>
        <Route exact path="Home" element={<Home />}></Route>
        <Route exact path="report" element={<Report />}></Route>
        <Route exact path="demo" element={<Demo />}></Route>
        <Route exact path="Upload" element={isLogin ? <Upload user={isLogin.user}/> : <Navigate to="/login"/>}></Route>
      </Route>
    {/* </Route> */}
      <Route exact path="/Login" element={isLogin ?<Navigate to="/"/> :<Login_v2 setIsLogin={setIsLogin}/>}></Route>

      <Route exact path="/Registration" element={<Registration />}></Route>
    </Routes>
    </AnimatePresence>
  );
};

export default App;
