import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../App";
import MovieIcon from "@mui/icons-material/Movie";
export default function Header() {
  const useAppstate = useContext(Authcontext);

  return (
    <div className="sticky z-10 top-0 bg-white header text-3xl flex justify-between item-center font-bold p-3 border-b-2 border-red-500">
      <Link to="/">
        {" "}
        <span>
          Movie <span className="text-red-500">Dunia</span>
        </span>
      </Link>
      <Link to="/addmovie">
        <Button>
          <h1 className="text-lg">
            <AddCircleIcon className="mb-1.5 text-black " />
            <span className="text-black font-bold"> Add</span>
            <span className="text-red-500 font-bold"> New</span>
            <MovieIcon className="mb-1.5 ml-1 text-black " />
          </h1>
        </Button>
      </Link>
      {useAppstate.login ? (
        <div className="">
          <p className="text-xs">{useAppstate.userName}</p>
          <Link to="/login">
            <Button
              onClick={() => {
                useAppstate.setlogin(false);
              }}
            >
              <h1 className="text-sm">
                <span className="text-white font-bold p-2 rounded-lg bg-green-500">
                  Logout
                </span>
              </h1>
            </Button>
          </Link>
        </div>
      ) : (
        <Link to="/login">
          <Button>
            <h1 className="text-sm">
              <span className="text-white font-bold p-2 rounded-lg bg-green-500">
                Login
              </span>
            </h1>
          </Button>
        </Link>
      )}
    </div>
  );
}
