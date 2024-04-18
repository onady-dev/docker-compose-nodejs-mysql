import {createLogger, format, addColors, transports} from "winston";
import "winston-daily-rotate-file";

const {combine,timestamp,label,printf,colorize } = format

//루트경로
const logDir = `${process.cwd()}/logs`;

//레벨
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}
//색상
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue'
}
addColors(colors); // 색상 적용


const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'http'
}

//로그 포맷
const logFormat = combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    label({label:'Server Logs'}),
    printf((info) => {
        if (info.stack) {
            return `${info.timestamp} ${info.level}: ${info.message} \n Error Stack: ${info.stack}`
        }
        return `${info.timestamp} ${info.level}: ${info.message}`
    })
)

// 콘솔에 찍힐 때는 색깔을 구변해서 로깅해주자.
const consoleOpts = {
    handleExceptions: true,
    level: process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    format: combine(
        colorize({ all: true }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' })
    )
}

const Logger = createLogger({
    level:level(),
    levels,
    format:logFormat,
    transports: [
        new transports.Console(consoleOpts),
    
        new transports.DailyRotateFile({
            level: 'debug', // debug 레벨 로그를 저장할 파일 설정
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            filename: `%DATE%.log`, // %DATE% = 위에서 설정한 datePattern 이 들어감
            dirname: logDir,
            maxFiles: 7,  // 30일치 로그 파일 저장
        }),
        new transports.DailyRotateFile({
            level: 'error', // error 레벨 로그를 저장할 파일 설정
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            filename: `%DATE%.error.log`,
            dirname: logDir + '/error',  // error.log 파일은 /logs/error 하위에 저장
            maxFiles: 30,
        }),
    ]
})

export default Logger