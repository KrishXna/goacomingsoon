import React, { useState, useEffect, useRef } from "react";
import { Client, Databases, ID } from "appwrite";
import Facebook from "../assets/icons/Rectangle.svg";
import Gmail from "../assets/icons/email_svgrepo.com.svg";
import Linkedin from "../assets/icons/Group.svg";
import Logo from "../assets/images/logo.png";
import BackgroundImg from "../assets/images/bsidesgoa-bg.png";
import ReCAPTCHA from "react-google-recaptcha";

export default function Home() {
    const [isChecked, setIsChecked] = useState(false);
    const [success, setSuccess] = useState(false);

    const recaptchaRef = React.useRef();
    const captchaRef = useRef(null);

    const onSubmitWithReCAPTCHA = async () => {
        const token = await recaptchaRef.current?.getValue();
        captchaRef.current = token;
    };
    useEffect(() => {
        const audio = new Audio("/audio2.mp3");
        const playAudio = () => {
            audio.play();
            removeEvent();
        };
        const pauseAudio = () => {
            audio.pause();
        };
        const removeEvent = () => {
            document.removeEventListener("click", playAudio);
            document.addEventListener("click", pauseAudio);
        };
        document.addEventListener("click", playAudio);
        return removeEvent;
    }, []);

    const inpRef = useRef();

    const clearField = () => {
        if (inpRef.current) {
            inpRef.current.value = "";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmitWithReCAPTCHA();

        if (!isChecked) {
            alert("Please agree to the terms before submitting.");
            return;
        }
        if (!captchaRef.current) {
            alert("Captcha Required");
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
            delete formDataObj["g-recaptcha-response"];

            const promise = databases.createDocument(
                "64e0b5345a71b49502ef",
                "64e0b54f37f4d6647307",
                ID.unique(),
                formDataObj
            );
            // console.log(formDataObj);

            promise.then(
                function (response) {
                    if (response.$id) {
                        setSuccess(true);
                        setTimeout(() => {
                            setSuccess(false);
                        }, 3000);
                        // generateCaptcha();
                        clearField();
                    }
                    // console.log(response); // Success

                    const form = e.target;
                    // form.reset();
                    captchaRef.current = null;
                    recaptchaRef.current.reset();
                },
                function (error) {
                    console.log(error); // Failure
                }
            );
        }
    };

    // const handleNewsletter = (e) => {
    //   e.preventDefault();
    //   const formData = new FormData(e.target);
    //   console.log(formData);

    //   const formDataObj = {};

    //   formData.forEach(function (value, key) {
    //     formDataObj[key] = value;
    //   });

    //   const { email } = formDataObj;
    //   if (!email) {
    //     alert("Field Required");
    //   } else {
    //     const client = new Client();

    //     const databases = new Databases(client);

    //     client
    //       .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
    //       .setProject("64e0a33e578d27304431"); // Your project ID

    //     const promise = databases.createDocument(
    //       "64e0b5345a71b49502ef",
    //       "64e0bd2e7fab8d5302db",
    //       ID.unique(),
    //       formDataObj
    //     );
    //     promise.then(
    //       function (response) {
    //         // console.log(response); // Success
    //         const form = e.target;
    //         // form.reset();
    //       },
    //       function (error) {
    //         console.log(error); // Failure
    //       }
    //     );
    //     // console.log(formDataObj);
    //   }
    // };

    return (
        <>
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
                        src={Logo}
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
                            <div className="absolute top-[50%] translate-y-[-50%] right-10 xl:right-36">
                                <div className="hidden lg:flex flex-col gap-y-8 pt-8 justify-center items-center text-lg text-yellow-300">
                                    <a
                                        href="https://www.instagram.com/bsides_goa/"
                                        target="_blank"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-black-900">
                                            <div className="flex justify-center items-center h-10">
                                                <i class="fa-brands fa-instagram"></i>
                                                {/* <img src={Instagram} alt="Instagram_Icon" /> */}
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="https://twitter.com/bsidesgoa"
                                        target="_blank"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-black-900">
                                            <div className="flex justify-center items-center h-10">
                                                <i class="fa-brands fa-x-twitter"></i>

                                                {/* <i class="fa-brands fa-x-twitter"></i> */}
                                            </div>
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.facebook.com/bsidesgoa"
                                        target="_blank"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-black-900">
                                            <div className="flex justify-center items-center h-10">
                                                {/* <img src={Facebook} alt="Facebook_icon" /> */}
                                                <i class="fa-brands fa-facebook"></i>
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="mailto:hello@bsidesgoa.in"
                                        target="_blank"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-black-900">
                                            <div className="flex justify-center items-center h-10">
                                                {/* <img src={Gmail} alt="Gmail_icon" /> */}
                                                <i class="fa-solid fa-envelope"></i>
                                            </div>
                                        </div>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/bsidesgoa/"
                                        target="_blank"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-black-900">
                                            <div className="flex justify-center items-center h-10">
                                                {/* <img src={Linkedin} alt="Linkedin_icon" /> */}
                                                <i class="fa-brands fa-linkedin-in"></i>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-6 w-full md:px-10">
                    <div className="flex justify-between items-center gap- px-4">
                        <a
                            href="#contact"
                            className="transition delay-200 duration-1000"
                        >
                            <div className="w-10 h-10 rounded-full bg-black-900 cursor-pointer">
                                <div className="flex justify-center items-center h-10 text-yellow-300">
                                    <i class="fa-solid fa-arrow-down"></i>
                                </div>
                            </div>
                        </a>
                        <div className="">
                            <p
                                className="justify-end px-4 lg:mt-0 font-montserrat font-medium italic text-shadow-ts text-md text-white-A700 xl:mr-20"
                                style={{
                                    textShadow: "0px 4px  4px #00000094",
                                }}
                            >
                                Dates to be announced soon. Stay tuned...
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Form Section */}
            <div className="relative" id="contact">
                {/* Success PopUp Message */}
                {success && (
                    <div className="absolute w-full top-0 pointer-events-none">
                        <div className="flex justify-center items-center h-[100vh]">
                            <div class="max-w-[400px] py-10 bg-black-900 text-white-A700 shadow-3xl rounded-3xl relative">
                                <div class="flex flex-col items-center">
                                    <div class="w-14 h-14 rounded-full bg-white-A700 text-yellow-800 mb-4 flex justify-center items-center">
                                        <i class="fa-solid fa-check text-whit text-4xl"></i>
                                    </div>
                                    <h2 class="text-lg">Thankyou!</h2>
                                    <p class="px-4 text-center pt-4 text-md">
                                        Your request has been submitted
                                        successfully. We will contact you soon.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div
                    className="bg-cover w-full bg-no-repeat"
                    style={{
                        backgroundImage: `url(${BackgroundImg})`,
                    }}
                >
                    <div className="lg:flex justify-between items-center w-full lg:px-24">
                        {/* Form Content */}
                        <div
                            className="px-10 pt-16 lg:pb-0 font-montserrat"
                            style={{
                                textShadow: "0px 4px  4px #00000094",
                            }}
                        >
                            <div className="w-full lg:px-0">
                                <h2 className="text-xl text-shadow-ts2 text-white-A700 uppercase xl:text-righ font-bold">
                                    Coming <br /> Soon
                                </h2>
                                {/* <h2 className="lg:hidden text-[44px] font-bold xl:text-xl text-shadow-ts2 text-white-A700 uppercase lg:text-right">
                  Coming Soon
                </h2> */}
                                <p className="mt-4 lg:mt-2 max-w-[500px] text-md font-semibold font-montserrat text-shadow-ts1 text-white-A700">
                                    Watch Out This Space For More News On The
                                    Biggest Cyber Security Event of 2024.
                                </p>
                            </div>
                        </div>
                        {/* Form */}
                        <div className="py-16 sm:px-10">
                            <div
                                className="bg-gradient
                  outline-blue_gray-400_c1 p-8 rounded-[17px] shadow-bs md:w-[28rem]"
                            >
                                <form
                                    className="font-montserrat"
                                    onSubmit={handleSubmit}
                                    autoComplete="off"
                                >
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
                                            pattern="[a-zA-Z/s]{3,}"
                                            title="Invalid Full Name"
                                            required
                                            // placeholder="e.g. Sachin Tendulkar"
                                            className="h-12 pl-4 bg-blue_gray-100 outline-none rounded-lg leading-[normal] p-0 placeholder:text-blue_gray-900 text-blue_gray-900"
                                        />

                                        <label className="text-white-A700 mb-1 mt-4 font-semibold">
                                            Email Address:
                                        </label>
                                        <input
                                            name="email"
                                            type="email"
                                            title="Invalid Email"
                                            required
                                            // placeholder="e.g. xyz@gmail.com"
                                            className="h-12 pl-4 bg-blue_gray-100 outline-none rounded-lg leading-[normal] p-0 placeholder:text-blue_gray-900 text-blue_gray-900"
                                        />
                                        <label className="text-white-A700 mb-1 mt-4  font-semibold">
                                            Contact No:
                                        </label>
                                        <input
                                            name="contactno"
                                            type="text"
                                            pattern="[+0-9]{9,14}"
                                            title="Invalid Contact Number"
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

                                            <option value="Sponsorship">
                                                Sponsorship
                                            </option>
                                            <option value="Attending as Participant">
                                                Attending as Participant
                                            </option>
                                            <option value="Volunteering opportunities">
                                                Volunteering opportunities
                                            </option>
                                            <option value="Others">
                                                Others
                                            </option>
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
                                        <ReCAPTCHA
                                            ref={recaptchaRef}
                                            size="visible"
                                            sitekey="6Lde7x8oAAAAAAMKkGZ4AyvyP1if3fe60y5mcEB9"
                                            className="mt-4"
                                        />
                                        {/*  */}
                                        <div className="flex font-montserrat flex-row gap-[18px] justify-start mt-5 md:w-full">
                                            <input
                                                id="checked"
                                                type="checkbox"
                                                checked={isChecked}
                                                onChange={() =>
                                                    setIsChecked(!isChecked)
                                                }
                                            />
                                            <label
                                                for="checked"
                                                className="text-sm font-normal text-white-A700 tracking-[0.35px] sm:w-full"
                                                size="txtMontserratRegular14"
                                            >
                                                I agree to be contacted by
                                                BSides Goa team for information
                                                about the event
                                            </label>
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
                    </div>
                </div>
            </div>
            {/* Form End */}
            <div className="w-full" id="info">
                <div className="relative bg-cover overflow-hidden bg-gray-900 bg-no-repeat flex flex-col items-center justify-start pt-16">
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
                                            textShadow:
                                                "0px 4px  4px #00000094",
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
                                {/* <div className="border rounded-full mt-14 p-2 bg-blue_gray-100 relative">
                  <form
                    onSubmit={handleNewsletter}
                    className="flex"
                    autoComplete="off"
                  >
                    <input
                      name="email"
                      type="email"
                      required
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
                </div> */}
                            </div>

                            {/* Social Icons */}
                            <div className="flex gap-x-8 mt-8">
                                <a
                                    href="https://www.instagram.com/bsides_goa/"
                                    target="_blank"
                                    className=""
                                >
                                    {/* <img src={Instagram} alt="Instagram_Icon" /> */}
                                    <i class="fa-brands fa-instagram text-white-A700 text-lg"></i>
                                </a>
                                <a
                                    href="https://twitter.com/bsidesgoa"
                                    target="_blank"
                                >
                                    <i class="fa-brands fa-x-twitter text-lg text-white-A700"></i>
                                </a>
                                <a
                                    href="https://www.facebook.com/bsidesgoa"
                                    target="_blank"
                                >
                                    <img src={Facebook} alt="Facebook_icon" />
                                </a>
                                <a
                                    href="mailto:hello@bsidesgoa.in"
                                    target="_blank"
                                >
                                    <img
                                        src={Gmail}
                                        alt="Gmail_icon"
                                        className="mt-[2px]"
                                    />
                                </a>
                                <a
                                    href="https://www.linkedin.com/company/bsidesgoa/"
                                    target="_blank"
                                >
                                    <img src={Linkedin} alt="Linkedin_icon" />
                                </a>
                            </div>
                            <div
                                className="relativ flex blur-[8px] justify-center items-center gap-x-8
                bg-cover bg-no-repeat h-[80px] w-full"
                                style={{
                                    backgroundImage:
                                        "url('images/img_group14.svg')",
                                }}
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
        </>
    );
}
