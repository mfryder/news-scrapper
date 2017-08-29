const AbstractError = require("./AbstractError");
class ForbiddenError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Forbidden";
    }
}
module.exports = ForbiddenError;