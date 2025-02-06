import React, { useState, useRef } from "react";
import Message from "./Message";

const OTPVerification = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move focus to the next input if a digit is entered
            if (value && index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // Move focus to the previous input on backspace
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOTP = () => {
        const enteredOTP = otp.join("");
        if (enteredOTP.length === 4) {
            setShowSuccessMessage(true);
            setShowErrorMessage(false); // Hide error message if shown
        } else {
            setShowErrorMessage(true); // Show error message
            setShowSuccessMessage(false); // Hide success message if shown
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <div className="bg-zinc-900/40 border border-zinc-900 px-8 py-16 rounded-xl shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-indigo-500 mb-4 text-center">
                    OTP Verification
                </h2>
                <p className="text-zinc-400 mb-10 text-center">
                    Enter the 4-digit code sent to your email.
                </p>
                <div className="flex justify-center space-x-10">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            ref={(el) => (inputRefs.current[index] = el)}
                            className="w-16 h-16 text-center text-2xl font-bold text-indigo-500 bg-transparent border-2 border-zinc-800/60 rounded-lg focus:outline-none focus:border-indigo-500/40 focus:bg-indigo-500/5 transition-all"
                        />
                    ))}
                </div>
                <button
                    className="w-full h-12 mt-10 bg-indigo-600 text-zinc-50 rounded-lg hover:bg-indigo-700 transition-all cursor-pointer duration-300"
                    onClick={handleVerifyOTP}
                >
                    Verify OTP
                </button>
            </div>
            {/* Success Message */}
            {showSuccessMessage && (
                <Message
                    message="OTP Verification Successful!"
                    onClose={() => setShowSuccessMessage(false)}
                    type="success"
                />
            )}

            {/* Error Message */}
            {showErrorMessage && (
                <Message
                    message="Please fill all OTP digits!"
                    onClose={() => setShowErrorMessage(false)}
                    type="error"
                />
            )}
        </div>
    );
};

export default OTPVerification;