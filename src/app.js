import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
const BaseURL = "https://data.mongodb-api.com/app/application-0-mqvuy/endpoint/";

app.get("/", (req, res) => {
    try {
        res.status(200).json({ status: "OK" });
    } catch (e) {
        res.status(500).json({ status: "ERROR" });
    }
});

app.post("/SendMail", async (req, res) => {
    try {
        if (req.body.name == null || req.body.email == null || req.body.password == null) {
            res.status(500).json({ message: "Preencha todos os campos!", code: "Algum dos dados informados está vazio" });
        } else {
            if (req.body.name.toString().length < 3) {
                res.status(500).json({ message: "Preencha os campos corretamente!", code: "O apelido deve ter no minimo 03 caracteres" });
            } else if (req.body.password.toString().length < 5) {
                res.status(500).json({ message: "Preencha os campos corretamente!", code: "A senha deve ter no minimo 05 caracteres" });
            } else {
                const mongoReq = await axios.post(`${BaseURL}CriarConta`, { apelido: req.body.name, email: req.body.email, senha: req.body.password })
                    .then((mongoRes) => {
                        res.status(mongoRes.status).json({ message: mongoRes.data.message, code: mongoRes.data.code });
                    })
                    .catch((mongoError) => {
                        res.status(mongoError.response.status).json({ message: mongoError.response.data.message, code: mongoError.response.data.code });
                    });
            }
        }
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
});

export default app;