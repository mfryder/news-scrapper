const AbstractError = require("./AbstractError");
class NotFoundError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Not Found";
    }
}
module.exports = NotFoundError;