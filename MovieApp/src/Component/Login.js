import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function Login() {
    const [form, setform] = useState({
      mobile: "",
      password: "",
    });
    const[loading,setloading]=useState(false)
    return (
      <div className="flex flex-col  mt-4  items-center ">
        <h1 className="text-xl font-bold text-blue-600 ">Login</h1>
        <div className="w-1/2 flex flex-col  mt-4  items-center h-60 bg-blue-200 rounded-xl">
          
          <div class="p-2 w-full md:w-1/2">
            <div class="relative">
              <label
                for="email"
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
                for="email"
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
            <button class="flex mx-auto text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-black rounded text-lg">
              {loading ? <TailSpin height={25} color="white" /> : "Login"}
            </button>
          </div>
          <div className="mt-8">
            <p>
              Do not have account ?{" "}
              <Link to="/signup">
                <span className="text-blue-500 font-bold"> Sign up</span>
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    );
}
