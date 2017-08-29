const AbstractError = require("./AbstractError");
class RequestToLargeError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Request Too Large";
    }
}
module.exports = RequestToLargeError;