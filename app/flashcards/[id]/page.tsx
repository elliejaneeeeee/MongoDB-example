"use client";
import NavBar from "@/app/components/NavBar";
import { flashcards as flashcardType, flashcardsResponse } from "@/types";
import React, { useEffect, useState } from "react";

export default function Flashcard({ params }: { params: { id: string } }) {
    const [flashcard, setFlashcard] = useState<flashcardType | null>(null);
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

    return (
        <>
            <NavBar />
            <div>
                <h1>{flashcard.title}</h1>
                <p>Section: {flashcard.section}</p>
                <p>Unit: {flashcard.unit}</p>
                <div>
                    {flashcard.body.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </div>
                <img src={flashcard.img_url} alt={flashcard.title} />
            </div>
        </>
    );
}
