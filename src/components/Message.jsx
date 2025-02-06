import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";

const Message = ({ message, onClose, type }) => {
    const [visible, setVisible] = useState(true);
    const [countdown, setCountdown] = useState(5); // Start countdown from 10 seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setVisible(false);
                    onClose();
                }
                return prev - 1;
            });
        }, 1000); // Update countdown every second

        return () => clearInterval(timer);
    }, [onClose]);


    return (
        <div
            className={`fixed top-4 right-4 transform transition-transform duration-500 ${visible ? "translate-x-0" : "translate-x-full"
                }`}
        >
            <div className={`${type === "error" ? "bg-red-500/5 border-red-700 text-red-600" : "bg-green-500/5 border-green-700 text-green-600"} px-6 py-4 border rounded-xl shadow-lg flex items-center space-x-4`}>
                <span className="text-lg">
                    {
                        type === "error"
                            ?
                            <IoCloseCircle />
                            : <IoCheckmarkCircle />
                    }
                </span>
                <span>
                    {message} <span className="text-red-600">({countdown}s)</span>
                </span>
            </div>
        </div>
    );
};

export default Message;