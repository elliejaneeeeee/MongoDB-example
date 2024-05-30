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
    Heading,
    Divider,
} from "@chakra-ui/react";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true)
        try {
            setIsLoading(true)
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (!res) {
                setIsLoading(false)
                setError("Unexpected error");
                return;
            }

            if (res.error) {
                setIsLoading(false)
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
                        Log in:
                    </Heading>
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
                            isLoading={isLoading}
                        loadingText='Logging in'
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
                        No account yet?{" "}
                        <Link href="/register" color="teal.500">
                            <Button variant="outline" color="teal.500">
                                Register here
                            </Button>
                        </Link>
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};

export default LoginForm;
