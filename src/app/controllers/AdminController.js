
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const student = require('../models/student')
const lecturer = require('../models/lecturer');
const enterprise = require('../models/enterprise')
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
    // showStudent(req, res, next) {
    //     const studentId = req.params.id;
        
    //     student.find({id:studentId})
    //       .then(student => {
    //         if (!student) {
                
    //         } else {
    //           res.render('admin/show_student', {
    //             layout: 'admin',
    //             student: multipleMongooseToObject(student)
    //           });
    //         }
    //       })
    //       .catch(error => next(error));
    // }

    showStudent(req, res, next) {
        const studentId = req.params.id;
        
        const doc = student.find({id:studentId})
         .populate('lecturerId')
         .populate('enterpriseId')
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
      formData.key = formData.yearOfStudy - 1974;
      formData.email = formData.firstName + formData.id + '@student.ctu.edu.vn';
      // Kiểm tra xem sinh viên với ID đã tồn tại hay chưa
      student.findOne({ id: formData.id })
        .then(existingStudent => {
          if (existingStudent) {
            res.send('<script>alert(" ID sinh viên đã tồn tại!"); window.history.back();</script>');
          } else {
            // Sinh viên chưa tồn tại với ID tương ứng, tạo đối tượng sinh viên mới và lưu vào cơ sở dữ liệu
            const newStudent = new student(formData);
            newStudent.save()
              .then(() => res.redirect('/admin/students'))
              .catch(error => next(error));
          }
        })
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
          .catch((error) => {
            res.send('<script>alert("ID sinh viên đã tồn tại!"); window.history.back();</script>');
          });
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
      lecturer.findOne({ id: formData.id })
      .then(existing => {
        if (existing) {
          res.send('<script>alert(" ID giang vien đã tồn tại!"); window.history.back();</script>');
        } else {
          // Sinh viên chưa tồn tại với ID tương ứng, tạo đối tượng sinh viên mới và lưu vào cơ sở dữ liệu
          const doc = new lecturer(formData);
          doc.save()
            .then(() => res.redirect('/admin/lecturers'))
            .catch(error => next(error));
        }
      })
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
        .catch((error) => {
          res.send('<script>alert("ID giảng viên đã tồn tại!"); window.history.back();</script>');
        });
    }

    //[DELETE] /admin/lecturer/:id
    deleteLecturer(req, res, next) {
      lecturer.findOneAndDelete({id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }


    
}
module.exports = new AdminController
