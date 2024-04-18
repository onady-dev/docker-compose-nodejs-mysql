import morgan = require("morgan");
import Logger from "../loaders/logger";

const format = () => {
    return process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
};

// 로그 작성을 위한 Output stream옵션.
const stream = { write: (message) => Logger.http(message) }

const morganMiddleware = morgan(format(), { stream });
export default morganMiddleware