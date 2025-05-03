import logger from "../../Logger/logger.js";
import character from "./character.model.js";

export const createCharacter = async(req,res,next)=>{
    try {
        const {_id} = req.user
        let data = req.body;
        data.createdBy = _id;

        const createCharacter = await character.create(data)

        res.status(200).json({
            status:'Success',
            message:'Character successfully created',
            data: createCharacter
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const getMyCharacter = async(req,res,next)=>{
    try {
        const characters = await character.find({})
        res.status(200).json({
            status:'Success',
            message:"Fetched the character successfully",
            data:characters
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}