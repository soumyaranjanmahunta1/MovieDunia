import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { moviesref, db } from "../Firebase/Firebase";
import { ThreeDots } from "react-loader-spinner";
import Review from "./Review";
export default function Detail() {
  const { id } = useParams();
  const [loading, setloading] = useState(false);
  const [data, setdata] = useState({
    title: "",
    year: "",
    image: "",
    des: "",
    rating: 0,
    rated: 0,
  });
  useEffect(() => {
    async function getData() {
      setloading(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setdata(_data.data());
      setloading(false);
    }
    getData();
  }, []);
  return (
    <div className=" flex justify-center">
      {loading ? (
        <ThreeDots />
      ) : (
        <div className="p-4 flex flex-col md:flex-row items-center md:items-start justify-center w-full ">
          <img className="h-96  md:sticky top-24" src={data.image} />
          <div className="md:ml-10 mt-6 w-full md:w-1/2">
            <h1 className="text-3xl font-bold">
              {data.title} <span className="text-xl">({data.year})</span>
            </h1>
            <ReactStars
              size={20}
              value={data.rating / data.rated}
              edit={false}
            />
            <p className="mt-3">{data.des}</p>
            <Review id={id} prevrating={data.rating} userrated={data.rated} />
          </div>
        </div>
      )}
    </div>
  );
}
