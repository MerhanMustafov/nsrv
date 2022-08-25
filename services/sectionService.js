const Section = require('../models/SectionModel')
const List = require('../models/ListModel')
const Note = require('../models/NoteModel')
const Comment = require('../models/CommentModel')


async function createSection(data){
    const section = new Section(data)
    return await section.save()
}

module.exports = {createSection}