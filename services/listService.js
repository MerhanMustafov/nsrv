const User = require('../models/UserModel')
const List = require('../models/ListModel')
const Note = require('../models/NoteModel')
const Comment = require('../models/CommentModel')

async function createListRecord(noteData, userid) {
  try {
    const list = new List(noteData)
    await list.save()
    const user = await User.findById(userid)
    user.lists.push(list._id)
    await user.save()
    return list
  } catch (err) {
    throw new Error('Something went wrong while creating list !')
  }
}

async function getAllLists(userId) {
  try {
    const lists = await List.find({ ownerid: userId }).populate('notes')
    return lists
  } catch (err) {
    throw new Error('Something went wrong !')
  }
}
async function getOneList(listid) {
  try {
    const list = await List.find({_id: listid}).populate('notes')
    return list
  } catch (err) {
    throw new Error('Something went wrong !')
  }
}

async function updateListTitle(newData, listid) {
  try {
    const updated = await List.findOneAndUpdate({ _id: listid }, newData)
    return updated
  } catch (err) {
    throw new Error('Something went wrong while updating list title !')
  }
}

async function deleteList(listid, userid) {
  try {
    const user = await User.findById(userid)
    const filtered = user.lists.filter((id) => id.toString() !== listid)
    user.lists = filtered
    await user.save()

    const list = await List.findById(listid)

    for (let i = 0; i < list.notes.length; i++) {
      const note = await Note.findById(list.notes[i]).populate('comments')
      for (let i = 0; i < note.comments.length; i++) {
        deleteComment(note.comments[i])
      }
      deleteNoteRecord(list.notes[i])
    }
    await List.findByIdAndDelete(listid)

    return list
  } catch (err) {
    throw new Error('Something went wrong while deleting list !')
  }
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
