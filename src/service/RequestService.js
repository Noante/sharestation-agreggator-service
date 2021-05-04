const client = require("http");

class RequestService {

    makeRequest(options, body=null) {

        return new Promise((resolve, reject) => {
    
            const chunckArray = [];
    
            const req = client.request(options, (res)=>{
    
                res.on("data", (chunck) => {
                    chunckArray.push(chunck);
                });
    
                res.on("end", ()=>{
    
                    const response = {
                        body: Buffer.concat(chunckArray).toString(),
                        status: res.statusCode
                    }
    
                    resolve(response);
    
                });
    
            });
    
            req.on("error", (err) => {
                reject(err);
            });
    
            if(body != null)
                req.write(JSON.stringify(body));
    
            req.end();
    
        })
    
    }

    async requestApplication(method, path, body=null) {

        const headers = {
            'Content-Type': 'application/json'
        }

        const options = {
            hostname: process.env.APP_HOST,
            port: process.env.APP_PORT,
            path: path,
            method: method,
            headers: headers
        }
    
        const response = await this.makeRequest(options, body);
    
        return response;
    
    }

}

module.exports = new RequestService();