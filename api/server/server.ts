import express, {Express, Router} from 'express'

//middleware
import helmet from 'helmet'
import cors from 'cors'
import {errorHandler} from './middleware/error.middleware'
import {notFoundHandler} from './middleware/notFound.middleware'
import logger from './middleware/logger.middleware'
import {jwtCheck} from './middleware/auth/jwtCheck.middleware'

//routes
import {router as boardRouter} from './routes/board/board.route'
import {router as columnRouter} from './routes/column/column.route'
import {router as taskRouter} from './routes/task/task.route'
import {router as subtaskRouter} from './routes/subtask/subtask.route'

//initiate server
const server: Express = express()

// global middleware
server.use(express.json())
server.set('json spaces', 2)
server.use(logger)

const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL
server.use(cors())

server.use(
  helmet({
    hsts: {
      maxAge: 31536000,
    },
    contentSecurityPolicy: {
      useDefaults: false,
      directives: {
        'default-src': ["'none'"],
        'frame-ancestors': ["'none'"],
      },
    },
    frameguard: {
      action: 'deny',
    },
  }),
)
server.use(errorHandler)

server.get('/', (request, response) => {
  response.status(200).json({message: 'success'})
})
server.use(jwtCheck)
server.use('/api', boardRouter)
server.use('/api', columnRouter)
server.use('/api', taskRouter)
server.use('/api', subtaskRouter)

server.post('/protected', (request, response) => {
  console.log(request.body)

  response.status(200).json({message: 'success'})
})
export default server
