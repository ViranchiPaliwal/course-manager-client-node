var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
    'EnrollmentModel',
    enrollmentSchema
);

function enrollStudentInSection(enrollment) {
    return enrollmentModel.create(enrollment);
}

function unEnrollStudentInSection(studentId, sectionId) {
    return enrollmentModel.remove({section: sectionId, student: studentId});
}

function removeSection(sectionId) {
    return enrollmentModel.remove({section: sectionId});
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .exec();
}

module.exports = {
    enrollStudentInSection: enrollStudentInSection,
    findSectionsForStudent: findSectionsForStudent,
    unEnrollStudentInSection: unEnrollStudentInSection,
    removeSection: removeSection
};