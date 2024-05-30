"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Flex,
    Box,
    Text,
    Button,
    Heading,
    Divider,
    Image,
    Link,
} from "@chakra-ui/react";
import { FiBookOpen, FiLogOut } from "react-icons/fi";
import { Lesson } from "../../types";

const ProfileDetails = () => {
    const { data: session, status } = useSession();
    const avatarUrl = `https://i.pravatar.cc/150?u=${session?.user?.email}`;
    const router = useRouter();

    const findFirstIncompleteLesson = (progress: Lesson[]) => {
        for (let i = 0; i < progress.length; i++) {
            const lessonKey = Object.keys(progress[i])[0] as keyof Lesson;
            if (!progress[i][lessonKey]) {
                return { lessonKey, lessonNumber: i + 1 };
            }
        }
        return null;
    };

    const firstIncompleteLesson =
        session?.user?.progress &&
        findFirstIncompleteLesson(session.user.progress);

    const handleGoToNextLesson = () => {
        if (firstIncompleteLesson) {
            router.push(`/flashcards/${firstIncompleteLesson.lessonNumber}`);
        }
    };

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <Box
                borderWidth="1px"
                width="360px"
                minHeight="360px"
                position="relative"
                rounded="md"
                mx={[0, 5]}
                bg="white"
                border={"1px"}
                borderColor="black"
                boxShadow={"6px 6px 0 black"}
            >
                <Box p={4} textAlign={"center"}>
                    <Heading color={"black"} fontSize={"2xl"}>
                        {status === "loading"
                            ? "Loading profile..."
                            : "Profile"}
                    </Heading>
                </Box>
                {/* <Divider borderColor="black" mb={4} /> */}
                <Image
                    borderRadius="full"
                    boxSize="100px"
                    src={avatarUrl}
                    alt="Profile Image"
                    mb={4}
                    mx="auto"
                />
                <Box p={4}>
                    <Text mb={4}>
                        Name:
                        <span className="font-bold ml-3">
                            {status === "loading" ? "..." : session?.user?.name}
                        </span>
                    </Text>
                    <Text mb={4}>
                        Email:
                        <span className="font-bold ml-3">
                            {status === "loading"
                                ? "..."
                                : session?.user?.email}
                        </span>
                    </Text>
                </Box>
                <Divider borderColor="black" mt={4} mb={4} />
                {firstIncompleteLesson && (
                    <Heading
                        color={"black"}
                        fontSize={"lg"}
                        textAlign={"center"}
                        mb={4}
                    >
                        Up next: Lesson {firstIncompleteLesson.lessonNumber}
                        <Link
                            href={`/flashcards/${firstIncompleteLesson.lessonNumber}`}
                            color="blue.500"
                            ml={2}
                        >
                            Go to flashcards
                        </Link>
                    </Heading>
                )}
                <Flex justifyContent="right">
                    <Button
                        onClick={handleGoToNextLesson}
                        leftIcon={<FiBookOpen />}
                        variant="solid"
                        backgroundColor="blue.500"
                        color="white"
                        position="relative"
                        bottom="0"
                        right="0"
                        mb={4}
                        mr={4}
                        isDisabled={!session}
                    >
                        Go to next lesson
                    </Button>
                    <Button
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        leftIcon={<FiLogOut />}
                        variant="solid"
                        backgroundColor="red.500"
                        color="white"
                        position="relative"
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
