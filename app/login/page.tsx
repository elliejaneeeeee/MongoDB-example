import React from "react";

const login = () => {
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lgshadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Log in:</h1>
                <form className="flex flex-col gap-3">
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default login;
