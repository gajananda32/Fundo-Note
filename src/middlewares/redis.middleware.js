import HttpStatus from 'http-status-codes';
import { client } from '../config/redis';

export const redisCheck = async (req, res, next) => {
    const notesData = await client.get('getallData');
    //console.log(notesData);
    if (notesData != null) {
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: JSON.parse(notesData),
            message: ' RedisNotes: All notes fetched successfully'
        });
        
    }
    else{
        next();
    }
}

export const redisGetsingle = async (req, res, next) => {
    const notesData = await client.get('getData');
    //console.log(notesData);
    if (notesData != null) {
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: JSON.parse(notesData),
            message: ' RedisSingle:  note fetched successfully'
        });
        
    }
    else{
        next();
    }
}