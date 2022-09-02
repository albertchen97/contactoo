import emailjs from "emailjs-com";
import React from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";

export default function Email({ emailIsOpen, setEmailIsOpen }) {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_rqe32dg",
        "template_h7p17sd",
        e.target,
        "7N-HFhkG9zAr3KJ3w"
      )
      .then(
        (result) => {
          console.log(result.text);
          toast.success("Email successfully sent!");
          setEmailIsOpen(false);
        },
        (error) => {
          console.log(error.text);
          toast.error("Unable to send email!");
        }
      );
    e.target.reset();
  }

  return (
    // wrap email form in a modal component
    <Modal
      // styling for semi-transparent overlay (darkens rest of the webpage)
      overlayClassName={
        "z-30 flex justify-center items-center h-screen w-screen bg-black fixed top-0 bottom-0 left-0 right-0 bg-opacity-50 overflow-y-auto"
      }
      // styling for the actual modal window
      className={
        "absolute bg-white w-4/5 md:w-3/4 xl:2/3 z-40 max-w-4xl p-5 pt-20 rounded-2xl"
      }
      isOpen={emailIsOpen}
      onRequestClose={() => setEmailIsOpen(false)}
    >
      {/* close button */}
      <div className="absolute top-10 right-5 md:right-10">
        <button
          className="text-3xl md:text-5xl"
          onClick={() => setEmailIsOpen(false)}
        >
          X
        </button>
      </div>

      {/* email form */}
      <form
        className="flex flex-col items-center justify-center w-full gap-5 text-xl md:text-2xl "
        onSubmit={sendEmail}
      >
        {/* greeting message */}
        <span className="text-3xl md:text-5xl">What can we help you with?</span>

        {/* name input */}
        <div className="flex flex-col w-11/12 md:w-3/4 xl:w-2/3">
          Name
          <input
            className="w-full p-3 border-2 border-gray-500"
            type="text"
            name="name"
          />
        </div>

        {/* email input */}
        <div className="flex flex-col w-11/12 md:w-3/4 xl:w-2/3">
          Email
          <input
            className="w-full p-3 border-2 border-gray-500"
            type="email"
            name="email"
          />
        </div>

        {/* issue input */}
        <div className="flex flex-col w-11/12 md:w-3/4 xl:w-2/3">
          Issue
          <input
            className="w-full p-3 border-2 border-gray-500"
            type="text"
            name="issue"
          />
        </div>

        {/* text area */}
        <div className="flex flex-col w-11/12 md:w-3/4 xl:w-2/3">
          Message
          <textarea className="w-full p-3 border-2 border-gray-500" name="" />
        </div>

        {/* submit button */}
        <div className="flex justify-end w-11/12 mb-10 text-2xl md:text-3xl md:w-3/4 xl:w-2/3">
          <input
            className="p-5 text-white hover:cursor-pointer bg-cyan-600"
            type="submit"
            value="Submit"
          ></input>
        </div>
      </form>
    </Modal>
  );
}
