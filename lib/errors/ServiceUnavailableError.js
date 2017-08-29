const AbstractError = require("./AbstractError");
class ServiceUnavailableError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Service Unavailable";
    }
}
module.exports = ServiceUnavailableError;