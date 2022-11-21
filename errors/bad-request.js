const {StatusCodes} = require('http-status-codes')
const CustomAPIError = require('./custom-api-error')

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.stausCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError