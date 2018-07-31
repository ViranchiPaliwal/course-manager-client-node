module.exports = function (app) {

    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.post('/api/student/section/:sectionId', enrollStudentInSection);
    app.delete('/api/student/section/:sectionId', unEnrollStudentInSection);
    app.get('/api/student/section', findSectionsForStudent);
    app.get("/api/section/:sectionId", getSectionById)
    app.delete("/api/section/:sectionId", removeSection);
    app.put("/api/section/:sectionId", updateSection);
    app.get("/api/section", getAllSections);


    const sectionModel = require('../models/section/section.model.server');
    const enrollmentModel = require('../models/enrollment/enrollment.model.server');

    function findSectionsForStudent(req, res) {
        const currentUser = req.session.currentUser;
        const studentId = currentUser._id;
        enrollmentModel
            .findSectionsForStudent(studentId)
            .then(function (enrollments) {
                res.json(enrollments);
            });
    }

    function enrollStudentInSection(req, res) {
        const sectionId = req.params.sectionId;
        const currentUser = req.session.currentUser;
        const studentId = currentUser._id;
        const enrollment = {
            student: studentId,
            section: sectionId
        };

        sectionModel
            .decrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .enrollStudentInSection(enrollment)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            });
    }

    function unEnrollStudentInSection(req, res) {
        const sectionId = req.params.sectionId;
        const currentUser = req.session.currentUser;
        const studentId = currentUser._id;

        sectionModel
            .incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .unEnrollStudentInSection(studentId, sectionId)
            })
            .then(function (enrollment) {
                res.json(enrollment);
            });
    }

    function getSectionById(req, res) {
        var sectionId = req.params.sectionId;
        return sectionModel
            .findSectionById(sectionId)
            .then(section = > res.send(section)
    )
        ;
    }

    function removeSection(req, res) {
        var sectionId = req.params.sectionId;
        sectionModel
            .deleteSection(sectionId)
            .then(() = > enrollmentModel.removeSection(sectionId)
    )
    .
        then(response = > res.send(response)
    )
        ;
    }

    function updateSection(req, res) {
        var sectionId = req.params.sectionId;
        var section = req.body;
        sectionModel.updateSection(sectionId, section)
            .then(response = > res.send(response)
    )
    }

    function findSectionsForCourse(req, res) {
        const courseId = req.params['courseId'];
        sectionModel
            .findSectionsForCourse(courseId)
            .then(function (sections) {
                res.json(sections);
            })
    }

    function createSection(req, res) {
        const section = req.body;
        sectionModel
            .createSection(section)
            .then(function (section) {
                res.json(section);
            })
    }

    function getAllSections(req, res) {
        sectionModel
            .findAllSections()
            .then(sections = > (
            res.send(sections)
        )
    );
    }
};