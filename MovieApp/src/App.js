import "./App.css";
import AddMovie from "./Component/AddMovie";
import Cards from "./Component/Cards";
import Header from "./Component/Header";
import { Route, Routes } from "react-router-dom";
import Detail from "./Component/Detail";
import { createContext, useState } from "react";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
const Authcontext = createContext();
function App() {
  const [login, setlogin] = useState(true);
  const [userName, setuserName] = useState("");
  return (
    <Authcontext.Provider value={{ login, userName, setlogin, setuserName }}>
      <div className="App relative">
        <Header />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/addmovie" element={<AddMovie />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Authcontext.Provider>
  );
}
export { Authcontext };
export default App;
