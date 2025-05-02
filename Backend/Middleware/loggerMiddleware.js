import morgan from "morgan"
import logger from "../Logger/logger.js"

const stream = {
    write:(message)=>{
        logger.info(message.trim())
    }
}

//setup the morgan middleware to log HTTP requests

const morganMiddleware = morgan(':method :url :status :response-time ms - :res[content-length]', { stream });
export default morganMiddleware;

