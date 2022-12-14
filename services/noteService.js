const Note = require('../models/NoteModel')
const List = require('../models/ListModel')
const Comment = require('../models/CommentModel')

async function createNoteRecord(noteData) {
  const note = new Note(noteData)
  const created = await note.save()

  await addNote(created._id, created.listid)
  return created

  
  async function addNote(noteId, listId) {
    const list = await List.findOne({ _id: listId })
    list.notes.push(noteId)
    list.save()
  }
}

async function getNoteById(noteid){
    const note = await Note.findById(noteid).populate({path: 'comments'})
    return note
}

async function getAllNoteRecords(listid){
    const notes = await Note.find({listid: listid})
    return notes
}

async function updateNoteRecord(newData, noteId) {
  const note = await Note.findOneAndUpdate({ _id: noteId }, newData)
}

async function deleteNoteRecord(noteid, listid){
    const list = await List.findById(listid)
    const modified =  list.notes.filter(objId => objId.toString() !== noteid)
    list.notes = modified
    await list.save()

    deleteComments(noteid)
    
    await Note.findByIdAndDelete(noteid)
    
    return list

}

async function deleteComments(noteid){
    const note = await Note.findById(noteid).populate('comments')
    for (let i = 0; i < note.comments.length; i++){
        await Comment.findByIdAndDelete(note.comments[i])
    }
}

module.exports = { createNoteRecord, updateNoteRecord, deleteNoteRecord, getAllNoteRecords, getNoteById }
