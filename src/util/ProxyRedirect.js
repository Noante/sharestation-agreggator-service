class ProxyRedirect {

    constructor() {

        this.urls = {
            file: "http://localhost:3001/",
            user: "http://user-service:3002/",
            email: "http://localhost:3003/"
        };

    }

    selectProxyHost(path){
        path = path.replace("/api/", "");
        const barIndex = path.indexOf("/") === -1 ? path.length : path.indexOf("/");
        const urlProperty = path.substring(0, barIndex);

        console.log(this.urls[urlProperty] ? this.urls[urlProperty] : "http://localhost:3000/");
        return this.urls[urlProperty] ? this.urls[urlProperty] : "http://localhost:3000/";
    }

}

module.exports = new ProxyRedirect();