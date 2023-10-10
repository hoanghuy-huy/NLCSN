
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const student = require('../models/student')
const lecturer = require('../models/lecturer');

class AdminController {
    
    //[GET] /admin
    index(req, res) {
        res.render('admin/index',{ layout: 'admin'})
    }

    //[GET] /admin/student
    showStudents(req, res, next) {
        student.find({})
        .then(students => {
            // chuyen thanh object binh thuong
            res.render('admin/show_students' , {
                layout: 'admin',
                students: multipleMongooseToObject(students),
            })
        })
        .catch(error => next(error));  
    }

    //[GET] /admin/student/:slug
    showStudent(req, res, next) {
        const studentId = req.params.id;
        
        student.find({id:studentId})
          .then(student => {
            if (!student) {
                
            } else {
              res.render('admin/show_student', {
                layout: 'admin',
                student: multipleMongooseToObject(student)
              });
            }
          })
          .catch(error => next(error));

    }

    //[GET] admin/student/create  
    createStudent(req, res, next) {
        res.render('admin/create_student',{ layout: 'admin' })
    }
  
    // [POST] admin/student/store
    saveStudent(req, res, next) {
      const formData = req.body;
      formData.key = formData.yearOfStudy - 1974
      formData.email = formData.firstName + formData.id+'@student.ctu.edu.vn'
      const newStudent = new student(formData)
      newStudent.save()
          .then(() => res.redirect('/admin/students'),{layout: 'admin'})
          .catch(error => next(error)); 
    }
  
    //{GET} admin/student/:id/edit
    editStudent(req, res, next) {
      const studentId = req.params.id;
        student.find({id:studentId})
          .then(student => res.render('admin/edit_student' , {
            layout: 'admin',
            student: multipleMongooseToObject(student),
            
          }))
          .catch(error => next(error));
          
    }
    
    //[PUT] admin/student/:id
    updateStudent(req, res, next) {
      student.findOneAndUpdate({id: req.params.id} , req.body)
          .then(() => res.redirect('/admin/students'))
          .catch(next)
    }
  
    //[DELETE] admin/student/:id
    deleteStudent(req, res, next) {
      student.deleteOne({id: req.params.id})
            .then(()=> res.redirect('back'))
            .catch(next)
    }

    //[GET] admin/lecturers
    showLecturers(req, res,next) {
      lecturer.find({})
        .then(lecturers => res.render('admin/show_lecturers',{
          layout:"admin",
          lecturers:multipleMongooseToObject(lecturers),
        }))
        .catch(next)
    }

    //[GET] admin/lecturers/:id
    showLecturer(req, res,next) {
      lecturer.find({id:req.params.id})
        .then(lecturer => res.render('admin/show_lecturer',{
          layout:'admin',
          lecturer:multipleMongooseToObject(lecturer)
        }))
        .catch(next)
    }

    //[GET] admin/lecturers/create
    createLecturer(req, res, next) {
      res.render('admin/create_lecturer',{layout:"admin"})
    }

    //[POST] admin/lecturers/store
    saveLecturer(req, res, next) {
      const formData = req.body
      const newLecturer = new lecturer(formData)
      newLecturer.save()
        .then(() => res.redirect('/admin/lecturers'),{layout: 'admin'})
        .catch(error => next(error)); 
    }

    //[GET] admin/lecturers/:id/edit
    editLecturer(req, res, next) {
      const idLecturer = req.params.id
      lecturer.find({id:idLecturer})
        .then(lecturer => res.render('admin/edit_lecturer',{
          layout:'admin',
          lecturer: multipleMongooseToObject(lecturer),
        }))
        .catch(next)
    }

    //[PUT] /admin/lecturer/:id
    updateLecturer(req, res, next) {
      lecturer.findOneAndUpdate({id: req.params.id},req.body)
        .then(()=>res.redirect('/admin/lecturers'))
        .catch(next)
    }

    //[DELETE] /admin/lecturer/:id
    deleteLecturer(req, res, next) {
      lecturer.findOneAndDelete({id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }

    
    test(req, res, next){
      // const studentId = req.params.id;
      //   student.find({id:studentId})
      //   .populate('lecturer')
      //   .then(student => {
      //     if (!student) {
              
      //     } else {
      //       res.render('admin/show_test', {
      //         layout: 'admin',
      //         student: multipleMongooseToObject(student)
      //       });
      //     }
      //   })
      //   .catch(error => next(error));
    }

    
}
module.exports = new AdminController
