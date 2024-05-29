"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Flex, Box, Text, Button, Heading, Divider } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const ProfileDetails = () => {
    const { data: session } = useSession();

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
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
                    <Heading color={"black"} fontSize={"2xl"}>
                        {status === "loading"
                            ? "Loading profile..."
                            : "Profile"}
                    </Heading>
                </Box>
                <Divider borderColor="black" mt={2} mb={4} />
                <Box p={4}>
                    <Text mb={4}>
                        Name:
                        <span className="font-bold ml-3">
                            {status === "loading" ? "..." : session?.user?.name}
                        </span>
                    </Text>
                    <Text>
                        Email:
                        <span className="font-bold ml-3">
                            {status === "loading"
                                ? "..."
                                : session?.user?.email}
                        </span>
                    </Text>
                </Box>
                <Flex justifyContent="center" alignItems="center">
                    <Button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        leftIcon={<FiLogOut />}
                        variant="solid"
                        backgroundColor="red.500"
                        color="white"
                        position="absolute"
                        bottom="0"
                        right="0"
                        mb={4}
                        mr={4}
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
