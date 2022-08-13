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


module.exports = {createComment,}