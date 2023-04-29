import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesref } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
export default function Cards() {
  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setloading(true);
      const _data = await getDocs(moviesref);
      // console.log(_data.docs)
      _data.forEach((docs) => {
        setdata((prev) => [...prev, { ...docs.data(), id: docs.id }]);
      });
      setloading(false);
    };
    getData();
  }, []);
  return (
    <div className="flex flex-wrap  p-3 mt-2">
      {loading ? (
        <div className="w-full flex justify-center items-center h-96">
          <ThreeDots color="black" height={50} />
        </div>
      ) : (
        data.map((el, i) => {
          return (
            <Link to={`detail/${el.id}`}>
              <div
                key={i}
                className="rounded-xl shadow-lg px-2 font-medium hover:-translate-y-3 cursor-pointer  mt-6 transition-all duration-500"
              >
                <img className="h-60 md:h-72" src={el.image} />
                <h1>
                 
                  {el.title}
                </h1>
                <h1 className="flex items-center">
                  <span className="text-red-500 mr-1">Reating:</span>
                  <ReactStars
                    size={20}
                    value={el.rating / el.rated}
                    edit={false}
                  />
                </h1>
                <h1>
                  <span className="text-red-500">Year: </span>
                  {el.year}
                </h1>
              </div>{" "}
            </Link>
          );
        })
      )}
    </div>
  );
}
