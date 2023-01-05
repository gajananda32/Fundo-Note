import { createClient } from 'redis';

export const client =createClient();

const redis= async ()=>{
    try {
        await client.connect();
        console.log("client connection is establised.......");

    } catch (error) {
        console.log(error);
    }
}
export default redis;