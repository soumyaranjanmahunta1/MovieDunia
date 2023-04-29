import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { moviesref } from "../Firebase/Firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Authcontext } from "../App";
export default function AddMovie() {
  const useAppstate = useContext(Authcontext);
    const navigate = useNavigate();
  const [form, setform] = useState({
    title: "",
    year: "",
    image: "",
    des: "",
    rating: 0,
    rated: 0,
  });
  const [loading, setloading] = useState(false);
  const AddMovie = async () => {
    setloading(true);
    try {
      if (useAppstate.login) {
        await addDoc(moviesref, form);
        swal({
          title: "Successfully Movie Added",
          icon: "success",
          button: false,
          timer: 3000,
        });
        setform({
          title: "",
          year: "",
          image: "",
          des: "",
        });
         navigate("/");
      } else {
        swal({
          title: "Login before Adding any movies",
          icon: "error",
          button: false,
          timer: 3000,
        });
        navigate("/login");
      }
    } catch (err) {
      swal({
        title: "Movie Not Added",
        icon: "error",
        button: false,
        timer: 3000,
      });
    }

    setloading(false);
   
  };
  return (
    <div>
      <section class="text-gray-600 body-font relative">
        <div class="container px-5 py-8 mx-auto">
          <div class="flex flex-col text-center w-full mb-4">
            <h1 class="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">
              Add New Movie
            </h1>
          </div>
          <div class="lg:w-1/2 md:w-2/3 mx-auto">
            <div class="flex flex-wrap -m-2">
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="name" class="leading-7 text-sm text-gray-600">
                    Titel
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={form.title}
                    onChange={(e) => {
                      setform({ ...form, title: e.target.value });
                    }}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-1/2">
                <div class="relative">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Year
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.year}
                    onChange={(e) => {
                      setform({ ...form, year: e.target.value });
                    }}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Image Link
                  </label>
                  <input
                    id="message"
                    name="message"
                    value={form.image}
                    onChange={(e) => {
                      setform({ ...form, image: e.target.value });
                    }}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div class="p-2 w-full">
                <div class="relative">
                  <label for="message" class="leading-7 text-sm text-gray-600">
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.des}
                    onChange={(e) => {
                      setform({ ...form, des: e.target.value });
                    }}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div class="p-2 w-full">
                <button
                  onClick={AddMovie}
                  class="flex mx-auto text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
