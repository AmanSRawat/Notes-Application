import mongoose from "mongoose";

const Schema = mongoose.Schema;

const notesSchema = new Schema({
     title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required:true
    },
},
{timestamps:true}
)

const Note = mongoose.model("note",notesSchema)

export default Note