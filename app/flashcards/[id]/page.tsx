"use client";
import NavBar from "@/app/components/NavBar";
import { flashcards as flashcardType, flashcardsResponse } from "@/types";
import React, { useEffect, useState } from "react";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function Flashcard({ params }: { params: { id: string } }) {
    const [flashcard, setFlashcard] = useState<flashcardType | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFlashcardData = async () => {
            try {
                const response = await fetch(`/api/flashcards/${params.id}`);
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
    }, [params.id]);

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
                <NavBar />
                <div>Error: {error}</div>
            </>
        );
    }

    if (!flashcard) {
        return (
            <>
                <NavBar />
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
            <NavBar />
            <Flex justifyContent="center" alignItems="center" height="100vh">
                <Box
                    p={5}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    width="300px"
                    height="400px"
                >
                    <Text fontSize="2xl" mb={4}>
                        {flashcard.title}
                    </Text>
                    {bodyContent}
                    <Flex mt={4} justifyContent="space-between">
                        <Button
                            onClick={handlePrev}
                            isDisabled={currentIndex === 0}
                            leftIcon={<ArrowBackIcon />}
                            aria-label="Previous"
                        ></Button>
                        <Button
                            onClick={handleNext}
                            isDisabled={currentIndex === flashcard.body.length}
                            rightIcon={<ArrowForwardIcon />}
                            aria-label="Next"
                        ></Button>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}
