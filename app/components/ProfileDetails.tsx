"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const ProfileDetails = () => {
    const { data: session, status } = useSession();
    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <Box
                p={5}
                borderWidth="1px"
                borderRadius="2xl"
                width="360px"
                minHeight="300px"
                position="relative"
            >
                <Text align="center" fontSize="2xl" mt={4} mb={4}>
                    {status === "loading" ? "Loading profile..." : "Profile"}
                </Text>
                <Text mb={4}>
                    Name:
                    <span className="font-bold ml-3">
                        {status === "loading" ? "..." : session?.user?.name}
                    </span>
                </Text>
                <Text>
                    Email:
                    <span className="font-bold ml-3">
                        {status === "loading" ? "..." : session?.user?.email}
                    </span>
                </Text>
                <Flex justifyContent="center" alignItems="center">
                    <Button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        leftIcon={<FiLogOut />}
                        variant="solid"
                        backgroundColor="red.500"
                        color="white"
                        position="absolute"
                        bottom="0"
                        mb={4}
                        isDisabled={!session}
                    >
                        Log out
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
};

export default ProfileDetails;
