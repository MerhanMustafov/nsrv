const Comment = require('../models/CommentModel')
const Note = require('../models/NoteModel')

async function createComment(data, noteid){
    const comment = new Comment(data)
    await comment.save()
    const note = await Note.findById(noteid)
    note.comments.push(comment._id)
    await note.save()
    return comment
}

async function updateComment(data, commentid){
    const updated = await Comment.findByIdAndUpdate(commentid, data)
    return updated
}

async function deleteComment(commentid, noteid){
    const note = await Note.findById(noteid)
    const modified =  note.comments.filter(objId => objId.toString() !== commentid)
    note.comments = modified
    await note.save()
    await Comment.findByIdAndDelete(commentid)
    return note
}


module.exports = {createComment, updateComment, deleteComment}