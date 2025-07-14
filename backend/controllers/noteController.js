import { Model } from "mongoose";
import Note from "../models/Note.js";

export async function getAllNotes(req,res){
    try {
        const notes = await Note.find().sort({createdAt: -1})
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error while get method",error)
        res.status(500).json({messsage: "Internal server error"})
    }
}

export async function getNotesByID(req,res){
    try {
        const note = await Note.findById(req.params.id)
        if(!note){
            res.status(404).json({message: "Note not found!"})
        }
        res.status(200).json(note)
    } catch (error) {
        console.log("Error while get method",error)
        res.status(500).json({messsage: "Internal server error"})
    }
}

export async function createNotes(req,res){
    try {
        const data = new Note({
            title: req.body.title,
            content: req.body.content
        })
        const dataToSave = await data.save()
        res.status(201).json(dataToSave)
    } catch (error) {
        console.log("Error while creating notes",error)
        res.status(400).json({message: error.message})
    }
}

export async function updateNotes(req,res){
    try {
        const {title,content} = req.body
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title,content},
            {
                new:true
            }
        ) 
        if(!updateNote){
            res.status(404).josn({message: "Note Not Found!"})
        }
        res.status(200).json({message: "Note Updated successfully!",updateNote})
    } catch (error) {
        console.log("Error while creating notes",error)
        res.status(400).json({message: error.message})
    }
}

export async function deleteNotes(req,res){
    try {
        const id = req.params.id
        const note = await Note.findByIdAndDelete(id)
        if(!note){
            res.status(404).json({message: "Note Not Found"})
        }
        res.status(200).json({message: "Note deleted successfully!"});
    } catch (error) {
         console.log("Error while creating notes",error)
        res.status(500).json({message: error.message})
    }
}