"use client";
import React, { useEffect, useState } from "react";
import { flashcards as flashcardType, flashcardsResponse } from "@/types";
import {
    Box,
    Image,
    Text,
    Button,
    IconButton,
    Flex,
    Icon,
    Progress,
    Heading,
    Divider,
} from "@chakra-ui/react";
import {
    FiArrowLeft,
    FiArrowRight,
    FiBookmark,
    FiCheckCircle,
    FiXCircle,
} from "react-icons/fi";

const FlashcardDisplay = ({ id }: { id: string }) => {
    const [flashcard, setFlashcard] = useState<flashcardType | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFlashcardData = async () => {
            try {
                const response = await fetch(`/api/flashcards/${id}`);
                if (!response.ok) {
                    throw new Error("Network error");
                }
                const data: flashcardsResponse = await response.json();
                if (data.flashcards.length > 0) {
                    setFlashcard(data.flashcards[0]);
                } else {
                    throw new Error("No flashcard found");
                }
            } catch (error: any) {
                setError(error.message);
            }
        };
        fetchFlashcardData();
        console.log(flashcard);
    }, [id]);

    const handleNext = () => {
        if (flashcard && currentIndex <= flashcard.body.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    if (error) {
        return (
            <>
                <div>Error: {error}</div>
            </>
        );
    }

    if (!flashcard) {
        return (
            <>
                <div>Loading...</div>
            </>
        );
    }

    const totalSteps = flashcard.body.length + 2;
    const progressPercentage = (currentIndex / (totalSteps - 1)) * 100;

    const isImageCard = currentIndex === 0;
    const isCompleteCard = currentIndex === flashcard.body.length + 1;
    const bodyContent = isImageCard ? (
        <Box width={"100%"} height={"360px"}>
            <Image
                src={flashcard.img_url}
                alt={flashcard.title}
                objectFit="cover"
                height="60%"
                width="100%"
                borderRadius="lg"
            />
        </Box>
    ) : isCompleteCard ? (
        <Box textAlign="center">
            <Text fontSize="1xl" mb={4}>
                Lesson Complete!
            </Text>
            <Flex justifyContent="center" direction="column" gap={4}>
                <Button leftIcon={<FiBookmark />} variant="outline">
                    Add to Bookmarks
                </Button>
                <Button leftIcon={<FiCheckCircle />} variant="solid">
                    Mark as Complete
                </Button>
            </Flex>
        </Box>
    ) : (
        <Text>{flashcard.body[currentIndex - 1]}</Text>
    );

    return (
        <>
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Box
                    width="360px"
                    height="420px"
                    overflow={"hidden"}
                    position="relative"
                    bg={isCompleteCard ? "teal.50" : "white"}
                    rounded="md"
                    mx={[0, 5]}
                    border={"1px"}
                    borderColor="black"
                    boxShadow={"6px 6px 0 black"}
                >
                    <Flex direction={"row"}>
                        <Box p={4}>
                            <IconButton
                                icon={<FiXCircle />}
                                aria-label="Close"
                                position="absolute"
                                top="0"
                                left="0"
                                m={2}
                            />
                        </Box>
                        <Progress
                            value={progressPercentage}
                            m={5}
                            width="80%"
                            size="sm"
                            colorScheme="teal"
                            borderRadius="2xl"
                        />
                    </Flex>
                    <Divider borderColor="black" mt={4} mb={4} />
                    <Box p={4}>
                        <Heading color={"black"} fontSize={"2xl"} mb={4}>
                            {flashcard.title}
                        </Heading>
                        <Box height="100%" mb={10}>
                            {bodyContent}
                        </Box>
                        <IconButton
                            onClick={handlePrev}
                            isDisabled={currentIndex === 0}
                            icon={<FiArrowLeft />}
                            aria-label="Previous"
                            position="absolute"
                            left="0"
                            bottom="0"
                        />
                        <IconButton
                            onClick={handleNext}
                            isDisabled={
                                currentIndex === flashcard.body.length + 1
                            }
                            icon={<FiArrowRight />}
                            aria-label="Next"
                            position="absolute"
                            right="0"
                            bottom="0"
                        />
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default FlashcardDisplay;
