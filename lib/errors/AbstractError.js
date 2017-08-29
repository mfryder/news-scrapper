class AbstractError{
    constructor(response){
        this.statusCode = response.statusCode;
        this.message = "This is an abstract message";
        this.stack = null;
    }

    setMessage(message){
        if(message){
            this.message = message;
        }
    }

    getMessage(){
        return this.message;
    }

    getStatusCode(){
        return this.statusCode;
    }

    setStack(stack){
        if(stack){
            this.stack = stack;
        }
    }
    getStack(){
        if(this.stack){
            return this.stack;
        }else{
            return "No stack present";
        }
    }
}

module.exports = AbstractError;