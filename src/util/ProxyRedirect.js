class ProxyRedirect {

    constructor() {

        this.urls = {
            file: process.env.NODE_ENV === "PROD" ? 
                    process.env.FILE_SERVICE_PROD : 
                    process.env.FILE_SERVICE_LOCAL,
            user: process.env.NODE_ENV === "PROD" ? 
                    process.env.USER_SERVICE_PROD : 
                    process.env.USER_SERVICE_LOCAL,
            email: process.env.NODE_ENV === "PROD" ? 
                    process.env.EMAIL_SERVICE_PROD : 
                    process.env.EMAIL_SERVICE_LOCAL
        };

    }

    selectProxyHost(path){
        path = path.replace("/api/", "");
        const barIndex = path.indexOf("/") === -1 ? path.length : path.indexOf("/");
        const urlProperty = path.substring(0, barIndex);
        
        return this.urls[urlProperty];
    }

}

module.exports = new ProxyRedirect();