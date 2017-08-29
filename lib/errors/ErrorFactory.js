const ServerError = require("./ServerError");
const BadRequestError = require("./BadRequestError");
const UnauthorizedError = require("./UnauthorizedError");
const ForbiddenError = require("./ForbiddenError");
const NotFoundError = require("./NotFoundError");
const NotAcceptableError = require("./NotAcceptableError");
const ConflictError = require("./ConflictError");
const RequestToLargeError = require("./RequestToLargeError");
const UnsupportedMediaError = require("./UnsupportedMediaError");
const BadGatewayError = require("./BadGatewayError");
const ServiceUnavailableError = require("./ServiceUnavailableError");


class ErrorFactory{
    static createError(response){
        let error;
        switch(response.statusCode){
            case 400:
                error = new BadRequestError(response);
            break;
            case 401:
                error = new UnauthorizedError(response);
            break;
            case 403:
                error = new ForbiddenError(response);
            break;
            case 404:
                error = new NotFoundError(response);
            break;
            case 406:
                error = new NotAcceptableError(response);
            break;
            case 409:
                error = new ConflictError(response);
            break;
            case 413:
                error = new RequestToLargeError(response);
            break;
            case 415:
                error = new UnsupportedMediaError(response);
            break;
            case 502:
                error = new BadGatewayError(response);
            break;
            case 503:
                error = new ServiceUnavailableError(response);
            break;
            default:
                error = new ServerError(response);
        }
        return error;
    }
}

module.exports = ErrorFactory;