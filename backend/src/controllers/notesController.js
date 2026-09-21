// export function getAllnotes(req,res){  // get is used to get an information from user that a browser ask in the address that someone has to visit to trigger this req/res is api/notes and req is infothe visitor ask for and res is what browser gives in response
//     res.status(200).send("you got 25 notes") //this is the response we get when opens the route localhost:5001/api/notes and status 200 shows that the activity is successfully done
//  }

// export function createNote(req,res){
//     res.status(201).json({message:"note created successfully"})   //status 201 shows that post is created successfully
// }

// export function updateNote(req,res){  //:id is written so that the particular id note is updated
//     res.status(200).json({message:"note updated successfully"})
// }

// export function deleteNote(req,res){
//      res.status(200).json({message:"note deleted successfully"})
// }
import Note from "../models/Note.js"
export async function getAllnotes(_,res){  // get is used to get an information from user that a browser ask in the address that someone has to visit to trigger this req/res is api/notes and req is infothe visitor ask for and res is what browser gives in response
    try{
        const notes=await Note.find().sort({createdAt:-1}) //createdAt:-1 shows the newest first ( -1 will sort in desc order - newest first )
        res.status(200).json(notes)
    } catch(error){
        console.log("Error in getAllNotes controller",error)
        res.status(500).json({message:"Internal server error"})
    }
 }

 export async function getNotebyId(req,res){  
    try{
        const notes=await Note.findById(req.params.id)
        if(!notes) return res.status(404).json({message:"Note not found"})
        res.status(200).json(notes)
    } catch(error){
        console.log("Error in getNotebyId controller",error)
        res.status(500).json({message:"Internal server error"})
    }
 }

export async function createNote(req,res){
    try{
        const {title,content}=req.body
        const newNote= new Note({title,content})

        await newNote.save()
        res.status(201).json({message:"Note created successfully"})
    }catch(error){
        console.log("Error in createNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function updateNote(req,res){  //:id is written so that the particular id note is updated
    try{
        const {title,content}=req.body
        const updatedNote= await Note.findByIdAndUpdate(req.params.id,{title,content},{new:true})
        if(!updatedNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json(updateNote)
    }catch(error){
        console.error("Error in updateNote controller",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export async function deleteNote(req,res){
    try{
        const deleteNote= await Note.findByIdAndDelete(req.params.id)
        if(!deleteNote) return res.status(404).json({message:"Note not found"})
        res.status(200).json({message:"Note deleted successfully"})
    }catch(error){
        console.error("Error in deleteNote controller",error)
        res.status(500).json({message:"Server error"})

    }
}