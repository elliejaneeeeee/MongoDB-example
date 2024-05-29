"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
    Flex,
    Box,
    Text,
    Link,
    FormControl,
    FormLabel,
    Input,
    Button,
    Alert,
    AlertIcon,
    Heading,
    Divider,
} from "@chakra-ui/react";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !username || !email || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const resUserExists = await fetch("api/userExists", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            const { user } = await resUserExists.json();

            if (user) {
                setError("User already exists.");
                return;
            }
            const res = await fetch("api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    username,
                    email,
                    password,
                }),
            });
            if (res.ok) {
                const form = e.target as HTMLFormElement;
                form.reset();
                router.push("/login");
            } else {
                console.log("User registration failed");
            }
        } catch (error) {
            console.log("Error during registration");
        }
    };

    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bg="gray.100"
        >
            <Box
                borderWidth="1px"
                width="360px"
                minHeight="300px"
                position="relative"
                rounded="md"
                mx={[0, 5]}
                bg="white"
                border={"1px"}
                borderColor="black"
                boxShadow={"6px 6px 0 black"}
            >
                <Box p={4}>
                    <Heading color={"black"} fontSize={"2xl"} mb={2}>
                        Register:
                    </Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="name" mb={4}>
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full name"
                            />
                        </FormControl>
                        <FormControl id="username" mb={4}>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                            />
                        </FormControl>
                        <FormControl id="email" mb={4}>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />
                        </FormControl>
                        <FormControl id="password" mb={4}>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                        </FormControl>
                        <Button
                            type="submit"
                            colorScheme="green"
                            width="full"
                            mb={4}
                        >
                            Login
                        </Button>
                        {error && (
                            <Alert status="error" mb={4}>
                                <AlertIcon />
                                {error}
                            </Alert>
                        )}
                    </form>
                </Box>
                <Divider borderColor="black" />
                <Box p={4}>
                    <Text textAlign="right">
                        Already registered?{" "}
                        <Link href="/login" color="teal.500">
                            <Button variant="outline" color="teal.500">
                                Log in here
                            </Button>
                        </Link>
                    </Text>
                </Box>
            </Box>
        </Flex>

        // <div className="grid place-items-center h-screen">
        //     <div className="shadow-lg p-5 rounded-lgshadow-lg rounded-lg border-t-4 border-green-400">
        //         <h1 className="text-xl font-bold my-4">Register an account:</h1>
        //         <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        //             <input
        //                 onChange={(e) => setName(e.target.value)}
        //                 type="text"
        //                 placeholder="Full Name"
        //             />
        //             <input
        //                 onChange={(e) => setUsername(e.target.value)}
        //                 type="text"
        //                 placeholder="Username"
        //             />
        //             <input
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 type="text"
        //                 placeholder="Email"
        //             />
        //             <input
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 type="password"
        //                 placeholder="Password"
        //             />
        //             <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
        //                 Register
        //             </button>
        //             {error && (
        //                 <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
        //                     {error}
        //                 </div>
        //             )}
        //             <Link className="text-sm mt-3 text-right" href={"/login"}>
        //                 Already registered?
        //                 <span className="underline">Log in here</span>
        //             </Link>
        //         </form>
        //     </div>
        // </div>
    );
};

export default RegisterForm;
