import {body, validationResult} from 'express-validator'
import {ValidationError, Result} from 'express-validator'

import {Request, Response, NextFunction} from 'express'

export const validationSchema = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const errors: Result<ValidationError> = validationResult(request)
  if (!errors.isEmpty())
    return response.status(400).json({errors: errors.array()})
  next()
}

export const validationOptions = {checkNull: true, checkFalsy: true}
