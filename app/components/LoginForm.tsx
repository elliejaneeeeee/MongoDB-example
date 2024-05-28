"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
} from "@chakra-ui/react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!res) {
                setError("Unexpected error");
                return;
            }

            if (res.error) {
                setError("Invalid Credentials");
                return;
            }
            router.replace("profile");
        } catch (error) {
            console.log(error);
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
                p={5}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
                width="360px"
            >
                <Text fontSize="2xl" fontWeight="bold" mb={4}>
                    Log in:
                </Text>
                <form onSubmit={handleSubmit}>
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
                    <Text mt={8} textAlign="right">
                        No account yet?{" "}
                        <Link href="/register" color="teal.500">
                            <Button variant="outline" color="teal.500">
                                Register here
                            </Button>
                        </Link>
                    </Text>
                </form>
            </Box>
        </Flex>
    );
};

export default LoginForm;
