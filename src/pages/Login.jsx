import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { usersInfo } from "../firebase";
import { RotatingLines } from "react-loader-spinner";
import swal from "sweetalert";
import { getDocs, query, where } from "firebase/firestore";
import bcrypt from "bcryptjs";
import { UserAuth } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const [isMobileSignIn, setMobileSignIn] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const { setIsLogin, setUserAccountDet } = UserAuth();

  const loginWithEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await getDocs(usersInfo);
      const value = data.docs.map((doc) => doc.data());
      const match = value.filter((item) => {
        return item.email == form.email;
      });
      if (match.length > 0) {
        const quer = query(usersInfo, where("email", "==", form.email));
        const querySnapshot = await getDocs(quer);
        querySnapshot.forEach((doc) => {
          const _data = doc.data();
          const isUser = bcrypt.compareSync(form.password, _data.password);
          if (isUser) {
            setIsLogin(true);
            setUserAccountDet({
              id: _data.email,
              username: _data.username
            });
            swal({
              title: "Logged In Successfully !",
              icon: "success",
              buttons: false,
              timer: 2000,
            });
            navigate("/");
          } else {
            swal({
              title: "Password did not match",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          }
        });
      } else {
        swal({
          title: "Invalid Credentials",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const loginWithMobile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await getDocs(usersInfo);
      const value = data.docs.map((doc) => doc.data());
      const match = value.filter((item) => {
        return item.mobile == form.mobile;
      });

      if (match.length > 0) {
        const quer = query(usersInfo, where("mobile", "==", form.mobile));
        const querySnapshot = await getDocs(quer);

        querySnapshot.forEach((doc) => {
          const _data = { ...doc.data(), id: doc.id };
          const isUser = bcrypt.compareSync(form.password, _data.password);
          if (isUser) {
            setIsLogin(true);
            setUserAccountDet({
              id: _data.mobile,
              username: _data.username
            });
            swal({
              title: "Logged In Successfully !",
              icon: "success",
              buttons: false,
              timer: 2000,
            });
            navigate("/");
          } else {
            swal({
              title: "Password did not match ",
              icon: "error",
              buttons: false,
              timer: 3000,
            });
          }
        });
      } else {
        swal({
          title: "Invalid Credentials",
          icon: "error",
          buttons: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-screen">
      <img
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/61e79073-50cf-4f7b-9a23-73290e6f7dca/1f74657f-bd81-4d73-9a78-20ad01fd584b/NP-en-20230410-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
        alt="/"
      />
      <div className=" bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
      <div className="fixed w-full py-24 z-50">
        <div className="max-w-[440px] h-[600px] mx-auto bg-black/70 rounded text-white ">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold my-3">Login to your account !</h1>
            <form
              onSubmit={isMobileSignIn ? loginWithMobile : loginWithEmail}
              className="flex flex-col w-full"
            >
              {isMobileSignIn ? (
                <>
                  <input
                    className="p-3 my-3 bg-gray-700 rounded"
                    type="text"
                    placeholder="Mobile "
                    autoComplete="off"
                    required
                    onChange={(e) =>
                      setForm({ ...form, mobile: e.target.value })
                    }
                    value={form.mobile}
                  />
                </>
              ) : (
                <input
                  className="p-3 my-3 bg-gray-700 rounded"
                  type="email"
                  placeholder="Email"
                  autoComplete="off"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  value={form.email}
                />
              )}
              <input
                className="p-3 my-3 bg-gray-700 rounded"
                type="password"
                placeholder="Password"
                required
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                value={form.password}
              />
              <button
                type="submit"
                className="bg-red-700 py-2 px-2 rounded mt-4 mb-2 flex justify-center"
              >
                {loading ? (
                  <RotatingLines
                    strokeWidth="6"
                    strokeColor="gray"
                    width="30"
                  />
                ) : (
                  "Login"
                )}
              </button>
              <span className=" mx-auto">Or</span>
              <p className="mx-auto my-2">
                Login Using &nbsp;
                {isMobileSignIn ? (
                  <span
                    className="text-blue-800 cursor-pointer"
                    onClick={() => {
                      setMobileSignIn(false);
                      setForm({ email: "", password: "" });
                    }}
                  >
                    Email
                  </span>
                ) : (
                  <span
                    className="text-blue-800 cursor-pointer"
                    onClick={() => {
                      setMobileSignIn(true);
                      setForm({ mobile: "", password: "" });
                    }}
                  >
                    Mobile Number
                  </span>
                )}
              </p>
              <div className="flex justify-between items-center text-gray-700">
                <p>
                  <input type="checkbox" />
                  &nbsp; Remember me
                </p>
                <p>Forgot Password ?</p>
              </div>
              <p className="py-6">
                <span className="text-gray-700">Do not have an account ?</span>{" "}
                &nbsp; <Link to="/signup">Sign Up</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
