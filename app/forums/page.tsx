import { forums } from "@/types";
import ForumCard from "../components/ForumCard";

export default async function ForumsPage() {
    const data = await fetch('http://localhost:3001/api/forums')
    const {forums} = await data.json()
    
  return (
    <>
      {forums.map((forum: forums) => {
        const key = forum._id.toString()
        return <ForumCard forum={forum} key={key}/>
      })}
    </>
  );
}
