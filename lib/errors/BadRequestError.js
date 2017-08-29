const AbstractError = require("./AbstractError");
class BadRequestError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Bad Request";
    }
}
module.exports = BadRequestError;