const AbstractError = require("./AbstractError");
class UnauthorizedError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Unauthorized";
    }
}
module.exports = UnauthorizedError;