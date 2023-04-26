import React from "react";
import AddIcon from "@mui/icons-material/Add";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import {Authcontext} from "../App"
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
      {useAppstate.login ? (
        <Link to="/addmovie">
          <Button>
            <h1 className="text-lg">
              <AddCircleIcon className="mb-1.5 text-black " />
              <span className="text-black font-bold"> Add</span>
              <span className="text-red-500 font-bold"> New</span>
            </h1>
          </Button>
        </Link>
      ) : (
        <Link to="/login">
          <Button>
            <h1 className="text-lg">
              <span className="text-white font-bold p-2 rounded-lg bg-blue-500">
                Login
              </span>
            </h1>
          </Button>
        </Link>
      )}
    </div>
  );
}
