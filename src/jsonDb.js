import {readFileSync, writeFileSync} from "fs"
import {v4 as uuidv4} from "uuid"

const FILE = "persistent.json"

function read(id = null){
    //read json array and parse
    const buffer = readFileSync(FILE)
    const entries = JSON.parse(buffer.toString())
    if(id !== null){
        return entries.find(e => e.id === id)
    }
    return entries
}

function create(data){
    //insert new entry
    const dataWithId = {...data, id: uuidv4()}
    //save and return
    writeFileSync(FILE, JSON.stringify([...read(), dataWithId]))
    return dataWithId
}

function update(id, changes){
    //update a value by id - insert changes
    const entries = read()
    let entry = entries.find(e => e.id === id)
    if(!entry){
        return null
    }
    const index = entries.indexOf(entry)
    //update in entries
    entries[index] = {...entry, ...changes, id} //id shall be readonly

    //save and return
    writeFileSync(FILE, JSON.stringify(entries))
    return entries[index]
}

function remove(id){
    //delete an entry - return success true or false
    const entries = read()
    const index = entries.indexOf( entries.find(e => e.id === id) )
    if(index === -1){
        //not found
        return false
    }

    entries.splice(index, 1)
    //save and return
    writeFileSync(FILE, JSON.stringify(entries))
    return true
}

export {read, create, update, remove}