import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { usersRef } from "../Firebase/Firebase";
import bcrypt from "bcrypt"
import {getAuth,RecaptchaVerifier,signInWithPhoneNumber } from "firebase/auth"
import { Container } from "@mui/system";
import swal from "sweetalert";
import app from "../Firebase/Firebase"
const auth = getAuth(app);
export default function Signup() {
    const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    mobile: "",
    password:"",
  });
  const [loading, setloading] = useState(false);
  const [otp, setotp] = useState("");
  const [otpsend, setotpsend] = useState(false);
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
        },
      },
      auth
    );
  };
  const requestOtp = () => {
    setloading(true);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setotpsend(true);
        setloading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //  const verifyOTP = () => {
  //    try {
  //      setloading(true);
  //      window.confirmationResult.confirm(otp).then((result) => {
  //       //  uploadData();
  //        swal({
  //          text: "Sucessfully Registered",
  //          icon: "success",
  //          buttons: false,
  //          timer: 3000,
  //        });
  //        navigate("/login");
  //        setloading(false);
  //      });
  //    } catch (error) {
  //      console.log(error);
  //    }
  // };
    // const uploadData = async () => {
    //   try {
    //     const salt = bcrypt.genSaltSync(10);
    //     var hash = bcrypt.hashSync(form.password, salt);
    //     await addDoc(usersRef, {
    //       name: form.name,
    //       password: hash,
    //       mobile: form.mobile,
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
  return (
    <div className="flex flex-col  mt-4  items-center ">
      {otpsend ? (
        <>
          <h1 className="text-xl font-bold text-blue-600 ">Sign up</h1>
          <div className="w-1/2 flex flex-col  mt-4  items-center h-44 bg-blue-200 rounded-xl">
            <div class="p-2 w-full md:w-1/2">
              <div class="relative">
                <label
                  for="mobile"
                  class="leading-7 flex flex-col items-start text-sm "
                >
                  Enter Otp
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={otp}
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                  class="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <button
                onClick={verifyOTP}
                class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg"
              >
                {loading ? (
                  <TailSpin height={25} color="white" />
                ) : (
                  "Confirm OTP"
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-xl font-bold text-blue-600 ">Sign up</h1>
          <div className="w-1/2 flex flex-col  mt-4  items-center h-80 bg-blue-200 rounded-xl">
            <div class="p-2 w-full md:w-1/2">
              <div class="relative">
                <label
                  for="name"
                  class="leading-7 flex flex-col items-start text-sm "
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={(e) => {
                    setform({ ...form, name: e.target.value });
                  }}
                  class="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full md:w-1/2">
              <div class="relative">
                <label
                  for="mobile"
                  class="leading-7 flex flex-col items-start text-sm "
                >
                  Mobile No.
                </label>
                <input
                  type="number"
                  id="number"
                  name="number"
                  value={form.mobile}
                  onChange={(e) => {
                    setform({ ...form, mobile: e.target.value });
                  }}
                  class="w-full bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full md:w-1/2">
              <div class="relative">
                <label
                  for="password"
                  class="leading-7 flex flex-col text-sm  items-start"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  // value={}
                  onChange={(e) => {
                    setform({ ...form, password: e.target.value });
                  }}
                  class="w-full  bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div class="p-2 w-full">
              <button
                onClick={requestOtp}
                class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg"
              >
                {loading ? <TailSpin height={25} color="white" /> : "Sign up"}
              </button>
            </div>
            <div className="mt-8">
              <p>
                Already have an account ?{" "}
                <Link to="/login">
                  <span className="text-blue-500 font-bold"> Login</span>
                </Link>{" "}
              </p>
            </div>
          </div>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
}
