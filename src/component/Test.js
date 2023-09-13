import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const Test = () => {
  const recaptchaRef = React.useRef();

  const onSubmitWithReCAPTCHA = async () => {
    const token = await recaptchaRef.current.executeAsync();
    console.log({ token });

    // apply to form data
  };
  return (
    <>
      <form onSubmit={onSubmitWithReCAPTCHA}>
        <input type="text" placeholder="Name" className="border" />
        <button
          type="submit"
          className="bg-black-900 px-2 rounded text-white-A700"
        >
          Submit
        </button>

        <ReCAPTCHA
          ref={recaptchaRef}
          size="invisible"
          sitekey="6Lde7x8oAAAAAAMKkGZ4AyvyP1if3fe60y5mcEB9"
        />
      </form>
    </>
  );
};

export default Test;

// 6Lde7x8oAAAAAJGT2wgLEwwYnIM6IOBUmBtTVGhV
