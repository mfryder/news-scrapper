const AbstractError = require("./AbstractError");
class ConflictError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Conflict";
    }
}
module.exports = ConflictError;