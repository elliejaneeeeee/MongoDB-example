import connect from "@/lib";
import {usersData} from './data/users'

async function seed (usersData: any) {
    const client = await connect()
    const db = client.db("test")
    const collections = await db.collection('users').drop()
}

seed(usersData)