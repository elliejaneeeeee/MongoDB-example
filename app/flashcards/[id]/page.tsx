import FlashcardDisplay from "@/app/components/FlashcardDisplay";
import NavBar from "@/app/components/NavBar";

export default function Flashcard({ params }: { params: { id: string } }) {
    return (
        <>
            <NavBar />
            <FlashcardDisplay id={params.id} />
        </>
    );
}
