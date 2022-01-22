import express from "express"
import {read, create, remove, update} from "./jsonDb.js"

//app and port
const server = express()
const PORT = 3000

//middleware for static content, middleware for parsing json in request body
server.use(express.static("public"), express.json()) //express.static() --> Funktion (Req handler)

//get all contacts
server.get("/", (req, res) => {
    res.json(read())
})

//create new contact
server.post("/", (req, res) => {
    res.json(create(req.body))
})

//get contact by id
server.get("/:id", (req, res) => {
    const id = req.params["id"]
    const contact = read(id)

    if(!contact){
        res.sendStatus(404)
        return;
    }

    res.json(contact)
})

//delete a contact
server.delete("/:id", (req, res) => {
    const id = req.params["id"]
    const deleteSuccess = remove(id)
    
    res.sendStatus(deleteSuccess ? 200 : 404)
})

//update a contact
server.patch("/:id", (req, res) => {
    const id = req.params["id"]
    const updatedContact = update(id, req.body)

    if(!updatedContact){
        return res.sendStatus(404)
    }

    res.json(updatedContact)
})


//let the server listen on port PORT
server.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})