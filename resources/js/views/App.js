import React, {useEffect, useState} from 'react';
import ReactDOM from "react-dom";
import {BrowserRouter, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import {UserContext} from "../context/UserContext";

function PrivateRoute({ element, path }) {
    const localUser = JSON.parse(localStorage.getItem("user"));

    return localUser ? <Outlet /> : <Navigate to="/" />
}

function App() {

    return (
      <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="home" element={<Home />} />
          </Route>
      </Routes>

    );
}

function Router(){
    const localUser = JSON.parse(localStorage.getItem("user"));
    const [value, setValue] = useState(localUser);

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(value));
    }, [value])
    return(
        <BrowserRouter>
            <UserContext.Provider value={{value, setValue}}>
                <App />
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<Router />, document.getElementById('app'));
}
