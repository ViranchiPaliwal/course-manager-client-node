var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: -1}
    });
}

function findSectionById(sectionId) {
    return sectionModel.find({
        _id: sectionId
    });
}

function updateSection(sectionId, section) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $set: section
    })
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {seats: +1}
    });
}

function findAllSections() {
    return sectionModel.find();
}

function deleteSection(sectionId) {
    return sectionModel.remove({
        _id: sectionId
    });
}


module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    decrementSectionSeats: decrementSectionSeats,
    incrementSectionSeats: incrementSectionSeats,
    updateSection: updateSection,
    findAllSections: findAllSections,
    findSectionById: findSectionById,
    deleteSection: deleteSection
};