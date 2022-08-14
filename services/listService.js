const User = require('../models/UserModel')
const List = require('../models/ListModel')
const Note = require('../models/NoteModel')
const Comment = require('../models/CommentModel')

async function createListRecord(noteData, userid) {
  const list = new List(noteData)
  await list.save()
  const user = await User.findById(userid)
  user.lists.push(list._id)
  await user.save()
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

async function deleteList(listid, userid) {
  const user = await User.findById(userid)
  const filtered = user.lists.filter((id) => id.toString() !== listid)
  user.lists = filtered
  await user.save()


  const list = await List.findById(listid)


  for (let i = 0; i < list.notes.length; i++) {
    const note = await Note.findById(list.notes[i]).populate('comments')
    for (let i = 0; i < note.comments.length; i++){
        deleteComment(note.comments[i])
    }
    deleteNoteRecord(list.notes[i])
  }
  await List.findByIdAndDelete(listid)

  
  return list
}

async function deleteNoteRecord(noteid) {
    await Note.findByIdAndDelete(noteid)
  }
async function deleteComment(commentid) {
    await Comment.findByIdAndDelete(commentid)
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
