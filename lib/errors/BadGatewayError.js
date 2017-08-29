const AbstractError = require("./AbstractError");
class BadGatewayError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Bad Gateway";
    }
}
module.exports = BadGatewayError;