import express from "express"
import {read, create, remove, update} from "./jsonDb.js"
import { contactCrudMiddleware } from "./middleware.js"

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
server.get("/:id", contactCrudMiddleware, (req, res) => {
    res.json(res.locals.contact)
})

//delete a contact
server.delete("/:id", contactCrudMiddleware, (req, res) => {
    remove(res.locals.id)
    res.sendStatus(200)
})

//update a contact
server.patch("/:id", contactCrudMiddleware, (req, res) => {
    const updatedContact = update(res.locals.id, req.body)
    res.json(updatedContact)
})


//let the server listen on port PORT
server.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})