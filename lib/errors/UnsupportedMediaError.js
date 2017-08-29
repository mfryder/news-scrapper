const AbstractError = require("./AbstractError");
class UnsupportedMediaError extends AbstractError{
    constructor(response){
        super(response);
        this.message = "Error: Unsupported Media";
    }
}
module.exports = UnsupportedMediaError;