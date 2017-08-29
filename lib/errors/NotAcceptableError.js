const AbstractError = require("./AbstractError");
class NotAcceptableError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Not Acceptable";
    }
}
module.exports = NotAcceptableError;