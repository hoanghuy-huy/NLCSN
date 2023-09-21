const student = require('../models/student')
const { multipleMongooseToObject } = require('../../util/mongoose');
const lecturer = require('../models/lecturer')
const enterprise = require('../models/enterprises')
const remindertime = require('../models/remindertime')
const internship = require('../models/internship')

class AdminController {
    
    //[GET] /admin
    index(req, res) {
        res.render('admin')
    }

    // find students
    students(req, res, next) {
        student.find({})
        .then(students => {
            // chuyen thanh object binh thuong
            res.render('admin_student' , {
                //van de handlebars bao mat
                students: multipleMongooseToObject(students)
            })
        })
        .catch(error => next(error));  
    }


    // find student id
    studentsFindId(req, res, next) {
        const studentId = req.params.id;
      
        student.find({id:studentId})
          .then(student => {
            if (!student) {
              // Xử lý trường hợp không tìm thấy sinh viên với ID cụ thể
              res.render('not_found');
            } else {
              res.render('admin_student_id', {
                student: multipleMongooseToObject(student)
              });
            }
          })
          .catch(error => next(error));  
    }

    lecturers(req, res, next ) {
      lecturer.find({})
      .then(lecturers => {
          res.render('admin_lecturer' , {
              //van de handlebars bao mat
              lecturers: multipleMongooseToObject(lecturers)
          })
      })
      .catch(error => next(error)); 
    }

    // find lecture id
    lecturerFindId(req, res, next) {
      const lecturerId = req.params.id;
    
      lecturer.find({id:lecturerId})
        .then(lecturer => {
          if (!lecturer) {
            // Xử lý trường hợp không tìm thấy sinh viên với ID cụ thể
            res.render('not_found');
          } else {
            res.render('admin_lecturer_id', {
              lecturer: multipleMongooseToObject(lecturer)
            });
          }
        })
        .catch(error => next(error));  
  }

  enterprises(req, res, next ) {
    enterprise.find({})
    .then(enterprises => {
        res.render('admin_enterprise' , {
            //van de handlebars bao mat
            enterprises: multipleMongooseToObject(enterprises)
        })
    })
    .catch(error => next(error)); 
  }

  enterpriseFindId(req, res, next) {
    const enterpriseId = req.params.id;
  
    enterprise.find({id:enterpriseId})
      .then(enterprise => {
        if (!enterprise) {
          // Xử lý trường hợp không tìm thấy sinh viên với ID cụ thể
          res.render('not_found');
        } else {
          res.render('admin_enterprise_id', {
            enterprise: multipleMongooseToObject(enterprise)
          });
        }
      })
      .catch(error => next(error));  
}

    
    internships(req, res, next) {
      internship.find({})
      .then(internships => {
          // chuyen thanh object binh thuong
          res.render('admin_internship' , {
              //van de handlebars bao mat
              internships: multipleMongooseToObject(internships)
          })
      })
      .catch(error => next(error));  
  }



    internshipsFindId(req, res, next) {
      const internshipId = req.params.id;
    
      internship.find({id:internshipId})
        .then(internship => {
          if (!internship) {
            res.render('not_found');
          } else {
            res.render('admin_internship_id', {
              internship: multipleMongooseToObject(internship)
            });
          }
        })
        .catch(error => next(error));  
  }

   
    
    remindertimes(req , res, next) {
      remindertime.find({})
      .then(remindertimes => {
       res.render('admin_remindertime_id' , {
              //van de handlebars bao mat
              remindertimes: multipleMongooseToObject(remindertimes)
          })
      })
      .catch(error => next(error)); 
      
    }

    remindertimesFindId(req, res, next) {
      const remindertimeId = req.params.id;
    
      remindertime.find({id:remindertimeId})
        .then(remindertime => {
          if (!remindertime) {
            // Xử lý trường hợp không tìm thấy sinh viên với ID cụ thể
            res.render('not_found');
          } else {
            res.render('admin_remindertime_id', {
              remindertime: multipleMongooseToObject(remindertime)
            });
          }
        })
        .catch(error => next(error));  
  }


}





module.exports = new AdminController
