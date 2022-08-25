const Section = require('../models/SectionModel')
const List = require('../models/ListModel')
const Note = require('../models/NoteModel')
const Comment = require('../models/CommentModel')


async function createSection(data){
    try{
        const section = new Section(data)
        return await section.save()
    }catch(err){
        throw new Error(err.message)
    }
}


async function getAll(ownerid){
    try{
        const sections = await Section.find({ownerid}).populate('lists')
        return sections
    }catch (err) {
        throw new Error(err.message)
    }
}

async function deleteOne(id){
    try{    
        const deleted = await Section.findByIdAndDelete(id)
        return deleted
    }catch (err) {
        throw new Error(err.message)
    }
}
module.exports = {createSection, getAll, deleteOne}