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
        const sections = await Section.find({ownerid}).populate({path: 'lists', populate: {path: 'notes', populate: {path: 'comments'}}})
        return sections
    }catch (err) {
        throw new Error(err.message)
    }
}
async function getOne(sectionid){
    try{
        const sections = await Section.find({_id: sectionid}).populate({path: 'lists', populate: {path: 'notes', populate: {path: 'comments'}}})
        return sections
    }catch (err) {
        throw new Error(err.message)
    }
}
async function getByName(sectionname){
    try{
        const section = await Section.findOne({sectionname}).populate({path: 'lists', populate: {path: 'notes', populate: {path: 'comments'}}})
        return section
    }catch (err) {
        throw new Error(err.message)
    }
}

async function deleteOne(id){
    try{    
        const section = await Section.findById(id)
        if(section.lists.length > 0){
            for (let i = 0; i < section.lists.length; i++){
                const list = await List.findById(section.lists[i])
                if(list.notes.length > 0){
                    for (let i = 0; i < list.notes.length; i++){
                        const note = await Note.findById(list.notes[i])
                        if(note.comments.length > 0){
                            for (let i = 0; i < note.comments.length; i++){
                                await Comment.findByIdAndDelete(note.comments[i])
                            }
                        }
                        await Note.findByIdAndDelete(list.notes[i])
                        
                    }
                }
                await List.findByIdAndDelete(section.lists[i])
            }
        }
        const deleted = await Section.findByIdAndDelete(id)
        return deleted
    }catch (err) {
        throw new Error(err.message)
    }
}
module.exports = {createSection, getAll, getByName, getOne, deleteOne}