import Link from "next/link";
import React from "react";

const Register = () => {
    return (
        <div className="grid place-items-center h-screen">
            <div className="shadow-lg p-5 rounded-lgshadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold my-4">Register an account:</h1>
                <form className="flex flex-col gap-3">
                    <input type="text" placeholder="Full Name" />
                    <input type="text" placeholder="Username" />
                    <input type="text" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
                        Register
                    </button>
                    <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
                        Error msg here
                    </div>
                    <Link className="text-sm mt-3 text-right" href={"/login"}>
                        Already registered?
                        <span className="underline">Log in here</span>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Register;
