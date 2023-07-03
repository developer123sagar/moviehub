import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithPhoneNumber,
  sendEmailVerification,
  RecaptchaVerifier,
} from "firebase/auth";
import swal from "sweetalert";
import { app, db } from "../firebase";
import bcrypt from "bcryptjs";
import { doc, setDoc } from "firebase/firestore";

const auth = getAuth(app);

const SignUp = () => {
  const navigate = useNavigate();
  const [isMobileSignup, setMobileSignup] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });

  const signupWithEmail = async (e) => {
    e.preventDefault();
    setMobileSignup(false);
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      ).then((userCredentials) => {});
      emailVerify();
      uploadData();
      navigate("/login");
    } catch (error) {
      swal({
        timer: 2000,
        text: error.code,
        icon: "error",
        buttons: "Ok",
      });
    }
    setLoading(false);
  };

  const emailVerify = async () => {
    await sendEmailVerification(auth.currentUser).then(() => {
      swal({
        timer: 2000,
        text: "A verification link is sent to your email. Please verify !",
        icon: "info",
        buttons: "Ok",
      });
    });
  };

  const recaptchaGenerator = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptch-container",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  };

  const signupWithMoblie = async (e) => {
    e.preventDefault();
    setMobileSignup(true);
    setLoading(true);
    try {
      recaptchaGenerator();
      const appVerifier = window.recaptchaVerifier;
      await signInWithPhoneNumber(auth, `+977${form.mobile}`, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          swal({
            text: "A code is sent to your mobile number",
            icon: "success",
            buttons: false,
            timer: 3000,
          });
          setOtpSent(true);
          setLoading(false);
        })
        .catch((e) => {
          swal({
            text: e.message,
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        });
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  const verifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await window.confirmationResult.confirm(OTP).then((result) => {
        uploadData();
        swal({
          text: "Sucessfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/login");
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      if (form.email == null) {
        await setDoc(doc(db, "usersInformations", form.mobile), {
          username: form.username,
          password: hash,
          mobile: form.mobile,
          savedShows: [],
        });
      } else {
        await setDoc(doc(db, "usersInformations", form.email), {
          username: form.username,
          password: hash,
          email: form.email,
          savedShows: [],
        });
      }
    } catch (err) {
      console.log(err);
    }
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
            <h1 className="text-3xl font-bold">Sign Up</h1>
            {otpSent ? (
              <form onSubmit={verifyCode} className="flex flex-col ">
                <input
                  className="p-3 my-3 bg-gray-700 rounded"
                  placeholder="enter the code"
                  required
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
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
                    "Confirm"
                  )}
                </button>
              </form>
            ) : (
              <>
                <form
                  onSubmit={isMobileSignup ? signupWithMoblie : signupWithEmail}
                  className="flex flex-col w-full"
                >
                  <input
                    onChange={(e) =>
                      setForm({ ...form, username: e.target.value })
                    }
                    value={form.username}
                    type="text"
                    className="p-3 my-3 bg-gray-700 rounded"
                    placeholder="Username"
                    required
                  />
                  {isMobileSignup ? (
                    <input
                      onChange={(e) =>
                        setForm({ ...form, mobile: e.target.value })
                      }
                      value={form.mobile}
                      className="p-3 my-3 bg-gray-700 rounded"
                      type="text"
                      placeholder="Mobile "
                      required
                    />
                  ) : (
                    <input
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      value={form.email}
                      className="p-3 my-3 bg-gray-700 rounded"
                      type="email"
                      placeholder="Email"
                      required
                    />
                  )}
                  <input
                    className="p-3 my-3 bg-gray-700 rounded"
                    type="password"
                    placeholder="Password"
                    required
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
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
                      "Sign Up"
                    )}
                  </button>
                  <span className=" mx-auto">Or</span>
                  <p className="mx-auto my-2">
                    Sign Up Using &nbsp;
                    {isMobileSignup ? (
                      <span
                        className="text-blue-800 cursor-pointer"
                        onClick={() => {
                          setMobileSignup(false);
                          setForm({ email: "", username: "", password: "" });
                        }}
                      >
                        Email
                      </span>
                    ) : (
                      <span
                        className="text-blue-800 cursor-pointer"
                        onClick={() => {
                          setMobileSignup(true);
                          setForm({ mobile: "", username: "", password: "" });
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
                    <button
                      type="reset"
                      onClick={() => {
                        setForm({
                          email: "",
                          username: "",
                          password: "",
                          mobile: "",
                        });
                      }}
                    >
                      Reset
                    </button>
                  </div>
                  <p className="py-6">
                    <span className="text-gray-700">
                      Already have an account ?
                    </span>{" "}
                    &nbsp; <Link to="/login">Log In</Link>
                  </p>
                </form>
              </>
            )}
          </div>
          <div id="recaptch-container"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
