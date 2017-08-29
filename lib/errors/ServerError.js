const AbstractError = require("./AbstractError");
class ServerError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Server Error";
    }
}
module.exports = ServerError;