import FlashcardDisplay from "@/app/components/FlashcardDisplay";
import NavBar from "@/app/components/NavBar";
import { Box } from "@chakra-ui/react";

export default function Flashcard({ params }: { params: { id: string } }) {
    return (
        <>
            <Box
                overflowX="hidden"
                overflowY="auto"
                bg="blue.100"
                minHeight="100vh"
                display="flex"
                flexDirection="column"
            >
                <NavBar />
                <FlashcardDisplay id={params.id} />
            </Box>
        </>
    );
}
