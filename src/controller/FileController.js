const fs = require("fs");

class FileController {

    async getFile(req, res, next) {

        try {

            const file = req.body;
            const base64Image = file.data.split(';base64,').pop();

            fs.writeFile(file.name, base64Image, { encoding: "base64" }, (error) => {
                
                if(error){
                    console.error(error);
                    res.status(500);
                    res.json({ "msg": "Ocorreu um erro ao salvar a imagem" });
                } else {
                    res.status(200);
                    res.json({ "msg": "Imagem salva com sucesso" });
                }

            })
            
        } catch (error) {

            res.status(500);
            res.send({"error": error});
            
        }

    }

}

module.exports = new FileController();