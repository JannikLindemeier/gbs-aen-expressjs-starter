import {read} from "./jsonDb.js"

function contactCrudMiddleware(req, res, next){
    //get id
    res.locals.id = req.params.id

    //check if the contact exists
    res.locals.contact = read(res.locals.id)
    if(!res.locals.contact){
        return res.sendStatus(404)
    }

    next()
}

export {contactCrudMiddleware}