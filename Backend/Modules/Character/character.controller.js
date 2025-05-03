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
        const {_id} = req.user
        const characters = await character.find({createdBy:_id}).populate({
            path:'createdBy'
        })
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

export const deleteMyCharacter = async(req,res,next)=>{
    try {
        const{id} = req.params
        const isCharacter = await character.findOne({_id:id})

        if(!isCharacter){
            logger.error("Character can not be find")
            return res.status(404).json({
                status:'Fail',
                message:"Character can not be found"
            })
        }

        await character.deleteOne({_id:id})

        res.status(200).json({
            status:'Success',
            message:'Successfully deleted the CHaracter'
        })
    } catch (error) {
        logger.error(error.message)
        next(error)
    }
}

export const updateMyCharacter = async (req, res, next) => {
    try {
      const { id } = req.params
      const updates = req.body
  
      const characterData = await character.findOne({ _id: id, createdBy: req.user._id })
      if (!characterData) {
        return res.status(404).json({ message: 'Character not found or not owned by you' })
      }

      Object.assign(characterData, updates)
  
      const updated = await characterData.save()
      res.status(200).json({
        status:'Success',
        message:'Updated Successfully'
       })
    } catch (err) {
      logger.error(err.message)
      next(err)
    }
  }