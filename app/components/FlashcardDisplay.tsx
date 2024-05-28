"use client";
import React, { useEffect, useState } from "react";
import { flashcards as flashcardType, flashcardsResponse } from "@/types";
import { Box, Image, Text, IconButton, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

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
        if (flashcard && currentIndex < flashcard.body.length) {
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

    const isImageCard = currentIndex === 0;
    const bodyContent = isImageCard ? (
        <Image src={flashcard.img_url} alt={flashcard.title} />
    ) : (
        <Text>{flashcard.body[currentIndex - 1]}</Text>
    );

    return (
        <>
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Box
                    p={5}
                    borderWidth="1px"
                    borderRadius="2xl"
                    overflow="hidden"
                    width="300px"
                    height="360px"
                    position="relative"
                >
                    <Text fontSize="2xl" mb={4}>
                        {flashcard.title}
                    </Text>
                    <Box height="80%" mb={10}>
                        {bodyContent}
                    </Box>
                    <IconButton
                        onClick={handlePrev}
                        isDisabled={currentIndex === 0}
                        icon={<ArrowBackIcon />}
                        aria-label="Previous"
                        position="absolute"
                        left="0"
                        bottom="0"
                    />
                    <IconButton
                        onClick={handleNext}
                        isDisabled={currentIndex === flashcard.body.length}
                        icon={<ArrowForwardIcon />}
                        aria-label="Next"
                        position="absolute"
                        right="0"
                        bottom="0"
                    />
                </Box>
            </Flex>
        </>
    );
};

export default FlashcardDisplay;
