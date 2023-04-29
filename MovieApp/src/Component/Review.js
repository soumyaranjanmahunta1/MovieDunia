import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { Authcontext } from "../App";
import { reviewref } from "../Firebase/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../Firebase/Firebase";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
export default function Review({ id, prevrating, userrated }) {
  const navigate = useNavigate();
  const Appstate = useContext(Authcontext);
  const [rate, setrate] = useState(0);
  const [loading, setloading] = useState(false);
  const [reviewloading, setreviewloading] = useState(false);
  const [form, setform] = useState("");
  const [data, setdata] = useState([]);
  const [added, setadded] = useState(0);
  
  const sendreview = async () => {
    setloading(true);
    setdata([]);
    try {
       if (Appstate.login) {
         await addDoc(reviewref, {
           movieid: id,
           name: Appstate.userName,
           rating: rate,
           thought: form,
           timestamp: new Date().getTime(),
         });
         const ref = doc(db, "movies", id);
         await updateDoc(ref, {
           rating: prevrating + rate,
           rated: userrated + 1,
         });
         setrate(0);
         setform("");
         swal({
           title: "Successfully Review send",
           icon: "success",
           button: false,
           timer: 3000,
         });
         navigate("/login");
        
      }
       else {
         navigate("/login")
      }
    } catch (err) {
      swal({
        title: "Review Not added",
        icon: "error",
        button: false,
        timer: 3000,
      });
    }
    setloading(false);
    
  };
  useEffect(() => {
    async function getdata() {
      setreviewloading(true);
      let qr = query(reviewref, where("movieid", "==", id));
      const qrsnp = await getDocs(qr);
      qrsnp.forEach((doc) => {
        setdata((prev) => [...prev, doc.data()]);
      });
      setreviewloading(false);
    }
    getdata();
  }, [added]);
  return (
    <div className="mt-4  w-full border-t-2 border-gray-300">
      <ReactStars
        size={30}
        value={rate}
        edit={true}
        onChange={(e) => {
          setrate(e);
        }}
      />
      <input
        value={form}
        onChange={(e) => {
          setform(e.target.value);
        }}
        placeholder="Share your thoughts..."
        className="w-full p-4 outline-none bg-gray-100"
      />
      <button
        className="bg-green-600 w-full p-1 text-white flex justify-center"
        onClick={sendreview}
      >
        {loading ? <TailSpin height={25} color="white" /> : "Share"}
      </button>
      {reviewloading ? (
        <div className="flex justify-center mt-8">
          <ThreeDots height={15} />
        </div>
      ) : (
        <div className="mt-4 ">
          {data.map((el, i) => {
            return (
              <div
                className="w-full p-2 mt-2  border-b border-gray-300 bg-gray-50"
                key={i}
              >
                <div className="flex items-center">
                  <p className="text-blue-500 font-bold">{el.name}</p>
                  <p className="ml-3 text-xs">
                    ({new Date(el.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars size={15} value={el.rating} edit={false} />
                <p>{el.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
