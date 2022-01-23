/*
//Import statements für express und Persistens-Modul
import express from "express"
import {read, create, remove, update} from "./jsonDb.js"

Hinweise zu jsonDb: 
Speichert Datensätze persistent in einer JSON-Datei im Projektverzeichnis

Verfügbare funktionen: 

- read(id?: string) //Gibt Kontakt mit der id [id] zurück. Falls id undefiniert ist, werden alle Kontakte zurückgegeben
- create(data: object) //Generiert neue id und speichert diese zusammen mit den Properties aus data als neuen Eintrag in der JSON-Datei
- update(id: string, changes: object) //Fügt die Änderungen aus Changes in den Eintrag mit der id [id] ein, speichert anschließend und gibt geänderten Datensatz zurück
- remove(id: string) //Löscht Eintrag mit der id [id]. Diese Funktion darf nicht delete heißen, da "delete" ein reserviertes JavaScript-Keyword ist. 

*/



console.log("hi")