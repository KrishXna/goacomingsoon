import "./App.css";
import React, { useState, useEffect, useCallback } from "react";
import { Client, Databases, ID } from "appwrite";
import Instagram from "./assets/icons/Vector.svg";
import Facebook from "./assets/icons/Rectangle.svg";
import Gmail from "./assets/icons/email_svgrepo.com.svg";
import Linkedin from "./assets/icons/Group.svg";

function App() {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    const audio = new Audio("/audio.mpeg");

    const handler = () => {
      audio.play();
      removeEvent();
    };

    const removeEvent = () => {
      document.removeEventListener("click", handler);
    };

    document.addEventListener("click", handler);

    return removeEvent;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isChecked) {
      alert("Please agree to the terms before submitting.");
      return;
    }

    const formData = new FormData(e.target);

    const formDataObj = {};
    formData.forEach(function (value, key) {
      formDataObj[key] = value;
    });
    const { name, email, contactno, interested, companyname } = formDataObj;

    if (!name || !email || !contactno || !interested || !companyname) {
      alert("All fields are required");
    } else {
      const client = new Client();
      const databases = new Databases(client);

      client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("64e0a33e578d27304431");

      const promise = databases.createDocument(
        "64e0b5345a71b49502ef",
        "64e0b54f37f4d6647307",
        ID.unique(),
        formDataObj
      );
      // console.log(formDataObj);

      promise.then(
        function (response) {
          // console.log(response); // Success

          const form = e.target;
          form.reset();
        },
        function (error) {
          console.log(error); // Failure
        }
      );
    }
  };

  const handleNewsletter = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log(formData);

    const formDataObj = {};

    formData.forEach(function (value, key) {
      formDataObj[key] = value;
    });

    const { email } = formDataObj;
    if (!email) {
      alert("Field Required");
    } else {
      const client = new Client();

      const databases = new Databases(client);

      client
        .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
        .setProject("64e0a33e578d27304431"); // Your project ID

      const promise = databases.createDocument(
        "64e0b5345a71b49502ef",
        "64e0bd2e7fab8d5302db",
        ID.unique(),
        formDataObj
      );
      promise.then(
        function (response) {
          // console.log(response); // Success
          const form = e.target;
          form.reset();
        },
        function (error) {
          console.log(error); // Failure
        }
      );
      // console.log(formDataObj);
    }
  };
  return (
    <div className="App">
      <div className="relative">
        {/* video */}
        <video
          width="100%"
          height="100%"
          className="object-cover h-screen"
          autoPlay
          muted
          loop
        >
          <source src="/goa_video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 top-0 left-0 bg-yellow-800/20"></div>
        {/* logo */}
        <div className="absolute inset-0 pl-6">
          <img
            className="relative w-36 lg:w-52 h-auto"
            src="images/bsides-goa-logo.png"
            alt="projectaccompli"
          />
        </div>
        {/* Hero Text */}
        <div className="reative w-full">
          <div className="absolute mx-auto top-[50%] left-[50%] transfor translate-x-[-50%] translate-y-[-50%] w-full">
            <div className="flex justify-center mx-auto">
              <div
                className="max-w-[800px] text-center md:text-left flex flex-col justify-center"
                style={{
                  textShadow: "0px 4px  4px #00000094",
                }}
              >
                <h1 className="text-lg sm:text-xlg text-shadow-ts1 md:text-xl font-montserrat font-medium text-white-A700 tracking-[14.10px] uppercase">
                  Bsides Goa 2024
                </h1>
                <p className="text-lg sm:text-xlg text-white-A700 font-montserrat font-semibold">
                  <span className="border-2 border-yellow-800 w-20 sm:w-32 inline-block"></span>
                  &nbsp; Security by the Beach
                </p>
              </div>

              {/* Social Icons */}
              <div className="absolute right-10 xl:right-36">
                <div className="hidden lg:flex flex-col gap-y-8 pt-8 justify-center items-center">
                  {/* <a
                    href="https://www.instagram.com/bsidesgoa/"
                    target="_blank"
                    className=""
                  >
                    <img src={Instagram} alt="Instagram_Icon" />
                  </a> */}
                  <a href="https://www.facebook.com/bsidesgoa" target="_blank">
                    <img src={Facebook} alt="Facebook_icon" />
                  </a>
                  <a href="mailto:bsidesgoa@gmail.com" target="_blank">
                    <img src={Gmail} alt="Gmail_icon" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/bsidesgoa/about/"
                    target="_blank"
                  >
                    <img src={Linkedin} alt="Linkedin_icon" />
                  </a>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
        <div className="absolute bottom-6 right-4 xl:right-32">
          <p
            className="mt-6 justify-end px-4 lg:mt-0 font-montserrat font-medium italic text-shadow-ts text-md text-white-A700"
            style={{
              textShadow: "0px 4px  4px #00000094",
            }}
          >
            Dates to be announced soon <br /> Stay tuned...
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <div>
        <div
          className="bg-cover w-full bg-no-repeat"
          style={{
            backgroundImage: "url('images/grouplayer.png')",
          }}
        >
          <div className="lg:flex justify-between items-center w-full gap-20 h-auto lg:px-24">
            {/* Form */}
            <div className="lg:pt-44 lg:pb-44 pt-28 pb-20 sm:px-10">
              <div
                className="bg-gradient
                  outline-blue_gray-400_c1 p-8 rounded-[17px] shadow-bs md:w-[28rem]"
              >
                <form className="font-montserrat" onSubmit={handleSubmit}>
                  <h2 className="text-center text-white-A700 mb-6 uppercase font-semibold text-lg pb-2 tracking-[4.10px]">
                    Let&apos;s Connect
                  </h2>
                  <div className="flex flex-col w-full">
                    <label className="text-white-A700 mb-1 font-semibold leading-[normal]">
                      Full Name:
                    </label>
                    <input
                      name="name"
                      type="text"
                      // placeholder="e.g. Sachin Tendulkar"
                      className="h-12 pl-4 bg-blue_gray-100 outline-none rounded-lg leading-[normal] p-0 placeholder:text-blue_gray-900 text-blue_gray-900"
                    />

                    <label className="text-white-A700 mb-1 mt-4 font-semibold">
                      Email Address:
                    </label>
                    <input
                      name="email"
                      type="email"
                      // placeholder="e.g. xyz@gmail.com"
                      className="h-12 pl-4 bg-blue_gray-100 outline-none rounded-lg leading-[normal] p-0 placeholder:text-blue_gray-900 text-blue_gray-900"
                    />
                    <label className="text-white-A700 mb-1 mt-4  font-semibold">
                      Contact No:
                    </label>
                    <input
                      name="contactno"
                      type="number"
                      // placeholder="e.g.9876543210"
                      className="h-12 pl-4 bg-blue_gray-100 outline-none rounded-lg leading-[normal] p-0 placeholder:text-blue_gray-900 text-blue_gray-900"
                    />

                    <label className="text-white-A700 mb-1 mt-4 font-semibold">
                      Interested In:
                    </label>
                    <select
                      name="interested"
                      className="h-12 pl-4 bg-blue_gray-100 outline-none rounded-lg leading-[normal] p-0 placeholder:text-blue_gray-900 text-blue_gray-900"
                    >
                      <option value="" disabled selected>
                        Select
                      </option>

                      <option value="Interested in Sponsorship">
                        Interested in Sponsorship
                      </option>
                      <option value="Attending as Attendee">
                        Attending as attendee
                      </option>
                      <option value="Interested in Collaboration">
                        Interested in Collaboration
                      </option>
                      <option value="Other">Other</option>
                    </select>
                    <label className="text-white-A700 mb-1 mt-4 font-semibold">
                      Your/Company LinkedIn
                    </label>
                    <input
                      name="companyname"
                      type="text"
                      // placeholder="@google"
                      className="h-12 pl-4 bg-blue_gray-100 outline-none rounded-lg leading-[normal] p-0 placeholder:text-blue_gray-900 text-blue_gray-900"
                    />
                    <div className="flex font-montserrat flex-row gap-[18px] justify-start mt-5 md:w-full">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                      />
                      <p
                        className="text-sm font-normal text-white-A700 tracking-[0.35px] sm:w-full"
                        size="txtMontserratRegular14"
                      >
                        I agree to be contacted by BSides Goa team for
                        information about the event .
                      </p>
                    </div>
                    <button
                      type="submit"
                      className="bg-orang bg-gradient2  cursor-pointer font-medium leading-[normal]  mx-auto mt-[33px] py-4 rounded-[5px] text-base text-black-900 text-center uppercase w-[177px] hover:bg-orange-300"
                    >
                      submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* Form Content */}
            <div
              className="px-10 flex justify-end pb-20 lg:pb-0 font-montserrat"
              style={{
                textShadow: "0px 4px  4px #00000094",
              }}
            >
              <div className="text-white-A700 w-full lg:px-0">
                <h2 className="hidden lg:block text-xl text-shadow-ts2 text-white-A700 uppercase xl:text-right font-bold">
                  Coming <br /> Soon
                </h2>
                <h2 className="lg:hidden text-[44px] font-bold xl:text-xl text-shadow-ts2 text-white-A700 uppercase lg:text-right">
                  Coming Soon
                </h2>
                <p className="mt-4 lg:mt-2 xl:ml-32 max-w-[500px] text-md font-semibold font-montserrat text-shadow-ts1 text-white-A700">
                  Watch Out This Space For More News On The Biggest Cyber
                  Security Event of 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Form End */}
      <div className="w-full">
        <div className="relative bg-cover overflow-hidden bg-gray-900 bg-no-repeat flex flex-col items-center justify-start pt-24">
          <div className="w-full">
            <img
              src="../images/dotsimg.png"
              alt="bg-dot"
              className="absolute max-w-[400%] animate-spin-slowest -top-[200px] -left-[200px] sm:-left-[1100px] sm:-top-[400px]"
            />
          </div>
          <div className="flex flex-col items-center justify-start w-full z-50 font-montserrat">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="flex flex-col items-center justify-start max-w-[1217px] mx-auto md:px-5 w-full">
                <div className="lg:flex flex-col justify-start w-full">
                  <div
                    className="lg:px-40 sm:px-10 px-2"
                    style={{
                      textShadow: "0px 4px  4px #00000094",
                    }}
                  >
                    <div className="flex flex-col justify-center items-center">
                      <p
                        className="text-xlg font-medium text-shadow-ts1 text-white-A700 tracking-[7.05px] uppercase"
                        size="txtMontserratMedium30"
                      >
                        BSides Goa 2024
                      </p>
                      <div className="flex items-center mt-2 min-w-[380px]">
                        <span className="bg-yellow-800_01 w-[15%] h-[3px]"></span>
                        &nbsp;
                        <p className="font-medium text-yellow-800_01 font-montserrat text-lg">
                          Security by the Beach
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[41px] items-center justify-start mt-10 w-full">
                    <div className="bg-white-A700_7f h-px w-full" />
                    <div className="sm:flex justify-between w-full px-10 lg:px-40">
                      <div className="flex flex-col gap-6 items-start justify-start">
                        <p className=" text-white-A700 text-lg font-semibold">
                          What
                        </p>
                        <p className="text-white-A700 text-md font-light">
                          <>
                            Cyber Security
                            <br />
                            Conference 2024
                          </>
                        </p>
                      </div>
                      <div className="mt-10 sm:mt-0 flex flex-col gap-2 md:gap-10 items-start justify-start">
                        <p className=" text-white-A700 text-lg font-semibold">
                          When
                        </p>
                        <p className="text-white-A700 text-md font-light">
                          Coming Soon in 2024
                        </p>
                      </div>
                      <div className="flex mt-10 sm:mt-0 flex-col gap-2 md:gap-10 items-start justify-start">
                        <p className=" text-white-A700 text-lg font-semibold">
                          Where
                        </p>
                        <p className="text-white-A700 text-md font-light">
                          Goa, India
                        </p>
                      </div>
                    </div>
                    <div className="bg-white-A700_7f h-px w-full" />
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="w-full lg:w-1/2 sm:px-10 px-2">
                <h2 className="text-center mt-14 sm:text-lg font-montserrat font-medium text-white-A700 tracking-[12px] uppercase">
                  Let&apos;s connect
                </h2>
                <div className="border rounded-full mt-14 p-2 bg-blue_gray-100 relative">
                  <form onSubmit={handleNewsletter} className="flex">
                    <input
                      name="email"
                      type="email"
                      // placeholder="e.g. xyz@gmail.com"
                      className="pl-8 rounded-full h-12 outline-none bg-blue_gray-100 leading-[normal] bg-transparent w-full"
                    />
                    <button
                      type="submit"
                      className="rounded-full px-2 lg:px-0 absolute py-3 top-1/2 transform -translate-y-1/2 right-2 w-1/3 sm:w-1/3 lg:w-1/3 xl:w-1/4 bg-orange-500 cursor-pointer font-bold leading-[normal] text-center text-white text-sm lg:text-md tracking-[0.50px] text-white-A700"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-x-8 mt-14">
                {/* <a
                  href="https://www.instagram.com/bsidesgoa/"
                  target="_blank"
                  className=""
                >
                  <img src={Instagram} alt="Instagram_Icon" />
                </a> */}
                <a href="https://www.facebook.com/bsidesgoa" target="_blank">
                  <img src={Facebook} alt="Facebook_icon" />
                </a>
                <a href="mailto:bsidesgoa@gmail.com" target="_blank">
                  <img src={Gmail} alt="Gmail_icon" className="mt-[2px]" />
                </a>
                <a
                  href="https://www.linkedin.com/company/bsidesgoa/about/"
                  target="_blank"
                >
                  <img src={Linkedin} alt="Linkedin_icon" />
                </a>
              </div>
              <div
                className="relativ flex blur-[8px] justify-center items-center gap-x-8
                bg-cover bg-no-repeat h-[80px] w-full"
                style={{ backgroundImage: "url('images/img_group14.svg')" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="bg-white-A700 relative w-full">
        <div className="w-full pb-14">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15393.223001217822!2d74.12119594906413!3d15.305610387183052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfa9537ed919ab%3A0x425461d09c39c95d!2sBandoli%2C%20Goa%20403706!5e0!3m2!1sen!2sin!4v1691764762828!5m2!1sen!2sin"
            width="100%"
            height="500"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div
          className="absolute bg-yellow-800_01 bottom-[0] flex flex-col inset-x-[0] items-center justify-end mx-auto p-[10px] sm
        :p-[16px] lg:p-[20px] sm:px-5 w-full"
        >
          <div
            className="mt-[7px] text-white-A700 uppercase"
            size="txtMontserratRomanMedium20"
          >
            <span className="text-white-A700 font-montserrat text-sm sm:text-md text-left font-semibold">
              &copy; 2023-24{" "}
            </span>
            <span className="text-white-A700 font-montserrat capitalize text-sm sm:text-md text-left font-semibold">
              bSides goa
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
