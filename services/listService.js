const List = require('../models/ListModel')
const Note = require('../models/NoteModel')
async function createListRecord(noteData) {
  const list = new List(noteData)
   await list.save()
   return list
}

async function getAllLists(userId) {
  return await List.find({ ownerid: userId }).populate('notes')
}
async function getOneList(listid) {
  return await List.find({ _id: listid }).populate('notes')
}

async function updateListTitle(newData, listid) {
  return await List.findOneAndUpdate({ _id: listid }, newData)
}

async function deleteList(listid) {
  const list = await List.findById(listid)

  for (let i = 0; i < list.notes.length; i++) {
    await deleteNoteRecord(list.notes[i])
  }
  await List.findByIdAndDelete(listid)

  async function deleteNoteRecord(noteid) {
    await Note.findByIdAndDelete(noteid)
  }
}

async function addNote(noteId, listId) {
  const list = await List.findOne({ _id: listId })
  list.notes.push(noteId)
  list.save()
}

module.exports = {
  createListRecord,
  getAllLists,
  getOneList,
  addNote,
  updateListTitle,
  deleteList,
}
