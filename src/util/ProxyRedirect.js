class ProxyRedirect {

    constructor() {

        this.urls = {
            file: "http://127.0.0.1:3001/",
            user: "http://127.0.0.1:3002/",
            email: "http://127.0.0.1:3003/"
        };

    }

    selectProxyHost(path){
        path = path.replace("/api/", "");
        const barIndex = path.indexOf("/") === -1 ? path.length : path.indexOf("/");
        const urlProperty = path.substring(0, barIndex);

        return this.urls[urlProperty] ? this.urls[urlProperty] : "http://127.0.0.1:3000/";
    }

}

module.exports = new ProxyRedirect();