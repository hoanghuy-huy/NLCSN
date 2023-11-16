const mongoose = require('mongoose');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const student = require('../models/student')
const lecturer = require('../models/lecturer');
const enterprise = require('../models/enterprise')
const internship = require('../models/internship')
const uuid = require('uuid')

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

    showStudent(req, res, next) {
        // const studentId = req.params.id;
        
        // student.find({id:studentId})
        //   .populate('idInternshipObject')
        //   .then(student => {
        //     if (!student) {
        //       res.send('<script>alert("ID sinh vien ko tồn tại!"); window.history.back();</script>')
        //     } else {

        //       internship.find({id:student[0].idInternship})
        //         .populate('idLecturer')
        //         .populate('idEnterprises')
        //         .then(internship => {
        //             if(!internship) res.send('<script>alert("ID thuc tap ko tồn tại!"); window.history.back();</script>')
        //             else {
        //               res.render('admin/show_student', {
        //                 layout: 'admin',
        //                 student: multipleMongooseToObject(student),
        //                 internship: multipleMongooseToObject(internship),
        //               });
        //             }
        //         })
        //     }
        //   })
        //   .catch(next);
        } 


    //[GET] admin/student/create  
    createStudent(req, res, next) {
        res.render('admin/create_student',{ layout: 'admin' })
    }
  


    // saveStudent(req, res, next) {
    //   const formData = req.body;
    //   student.findOne({ id: formData.id })
    //     .then(existing => {
    //       if (existing) {
    //          res.send('<script>alert("ID sinh vien đã tồn tại!"); window.history.back();</script>');
    //       } else {             
    //         internship.findOne({ id: formData.idInternship })
    //           .then(foundInternship => {
    //             if (!foundInternship) {
    //               res.send('<script>alert("ID thực tập không tồn tại!"); window.history.back();</script>');
    //             } else {
    //               const id = new mongoose.Types.ObjectId(foundInternship._id)
    //               formData.idInternshipObject = id
    //               formData.email = formData.firstName + formData.id + '@student.ctu.edu.vn'
    //               formData.key = formData.yearOfStudy - 1974
    //               const newStudent = new student(formData)
    //               newStudent.save()
    //               .then(() => res.redirect('/admin/students'))
    //               .catch(error => next(error));
    //             }
    //           })
    //           .catch(error => next(error));
    //       }
    //     })
    //     .catch(error => next(error));
    // }
    async saveStudent(req, res, next) {
      try {
        const { id, lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, email, address} = req.body;
        const existingStudent = await student.findOne({ id: id });
    
        if (existingStudent) {
          return  res.send('<script>alert("ID already exists"); window.history.back();</script>');
        }
    
        const key = yearOfStudy - 1974;
        const newStudent = new student({ id, lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, email, address, key });
        await newStudent.save();
    
        return  res.redirect('/admin/students')
      } catch (error) {
        return res.send('<script>alert("Internal error server"); window.history.back();</script>');
      }
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

  
    async updateStudent(req, res, next) {
      try {
        const { idStudent } = req.params
        const { id,lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, address } = req.body;
        const key = yearOfStudy - 1974;
        if(idStudent != id ){
         const doc = await student.findOne({id:id})
         if(doc) return res.send('<script>alert("ID already exists"); window.history.back();</script>');
          const updateStudent = await student.findOneAndUpdate(
            { id: id },
            { lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, address, key },
          );
        
          return  res.redirect('/admin/students')
        }
        const updateStudent = await student.findOneAndUpdate(
          { id: id },
          { lastName, firstName, yearOfBirth, yearOfStudy, Class, gender, majors, address, key },
        );
      
        return  res.redirect('/admin/students')
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
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
      const formData = req.body;
      lecturer.findOne({ id: formData.id })
        .then(existing => {
            if(existing) res.send('<script>alert("ID giang viên đã tồn tại!"); window.history.back();</script>')
            else {
              formData.email = formData.firstName + '@ctu.edu.vn'
              const newLecturer = new lecturer(formData)
              newLecturer.save()
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
        const formData = req.body
        formData.id = formData.id.toLowerCase()
        lecturer.findOne({id:formData.id})
          .then(doc => {
            if(req.params.id===req.body.id) {
                formData.email = formData.firstName + '@ctu.edu.vn'
                lecturer.findOneAndUpdate({id:req.body.id},req.body)
                  .then(()=>res.redirect('/admin/lecturers'))
                  .catch(next)
            }
            else if(doc) res.send('<script>alert("ID giang viên đã tồn tại!"); window.history.back();</script>')
            else {
              formData.email = formData.firstName + '@ctu.edu.vn'
              lecturer.findOneAndUpdate({id:req.params.id},formData)
                .then(()=>res.redirect('/admin/lecturers'))
                .catch(next)
            }
          })
          .catch(next)
    }

    //[DELETE] /admin/lecturer/:id
    deleteLecturer(req, res, next) {
      lecturer.findOneAndDelete({id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }

     //[GET] admin/student/create  
     createEnterprise(req, res, next) {
      res.render('admin/create_enterprise',{ layout: 'admin' })
    }
    showEnterprises(req, res ,next){
      enterprise.find({})
        .then(enterprises => {
          res.render('admin/show_enterprises',
            {
              layout:'admin',
              enterprises: multipleMongooseToObject(enterprises)
            }
          )
        })
        .catch(next)
    }

    
    //[GET] admin/enterprises/:id
    showEnterprise(req, res,next) {
      enterprise.find({id:req.params.id})
        .then(enterprise => res.render('admin/show_enterprise',{
          layout:'admin',
          enterprise:multipleMongooseToObject(enterprise)
        }))
        .catch(next)
    }
    //[POST] admin/lecturers/store
    saveEnterprise(req, res, next) {
      const formData = req.body
      enterprise.findOne({ id: formData.id })
      .then(existing => {
        if (existing) {
          res.send('<script>alert(" ID Doanh NGhiep đã tồn tại!"); window.history.back();</script>');
        } else {
          const doc = new enterprise(formData);
          doc.save()
            .then(() => res.redirect('/admin/enterprises'))
            .catch(error => next(error));
        }
      })
      .catch(error => next(error));
    }

    editEnterprise(req, res, next) {
      const id = req.params.id;
        enterprise.find({id:id})
          .then(enterprise => res.render('admin/edit_enterprise' , {
            layout: 'admin',
            enterprise: multipleMongooseToObject(enterprise),
            
          }))
          .catch(error => next(error));  
    }
    //[PUT] admin/student/:id
    updateEnterprise(req, res, next) {
      enterprise.findOneAndUpdate({id: req.params.id} , req.body)
          .then(() => res.redirect('/admin/enterprises'))
          .catch((error) => {
            res.send('<script>alert("ID Doanh Nghiep đã tồn tại!"); window.history.back();</script>');
          });
    }
    //[DELETE] /admin/enterprise/:id
    deleteEnterprise(req, res, next) {
      enterprise.findOneAndDelete({id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }

    showInternships(req, res, next) {
      internship.find({})
        .then(internships => {
          res.render('admin/show_internships',
          {
            layout:'admin',
            internships:multipleMongooseToObject(internships)
          }
          )
        })
        .catch(next)
    }

    showInternship(req, res, next) {
      internship.find({id:req.params.id})
        .then(internship => {
          res.render('admin/show_internship',{
            layout:'admin',
            internship:multipleMongooseToObject(internship)
          })
          
        })
        .catch(next)
      
    }

    createInternship(req, res, next) {
      res.render('admin/create_internship',{layout:"admin"})
    }



   async saveInternship(req, res, next) {
        const { title, description, startDate , endDate, idStudent, idEnterprises, idLecturer} = req.body
        const id = uuid.v4()
        const docStudent = await student.findOne({id:idStudent})
        if(!docStudent) return res.send('<script>alert("Student not found"); window.history.back();</script>')
        const docLecturer = await lecturer.findOne({id:idLecturer})
        if(!docLecturer) return res.send('<script>alert("Lecturer not found"); window.history.back();</script>')
        const docEnterprises = await enterprise.findOne({id:idEnterprises})
        if(!docEnterprises) return res.send('<script>alert("Enterprises not found"); window.history.back();</script>')
        const s = await internship.findOne({idStudent:idStudent}) 
        if(s) return res.send('<script>alert("Student already exists"); window.history.back();</script>')
        const currentDate = new Date();
        const startDay = new Date(startDate);
        const endDay = new Date(endDate);

        if (startDay <= currentDate || endDay <= currentDate) {
          return res.send('<script>alert("Start date or end date must be after current date."); window.history.back();</script>');
        }
      
        if (startDay >= endDay) {
          return res.send('<script>alert("Start date must be before end date."); window.history.back();</script>');
        }
        
        const newInternship  = new internship({id, title, description, startDate , endDate, idStudent, idEnterprises, idLecturer}) 
        await newInternship.save()
        return res.redirect('/admin/internships')
    }

    editInternship(req, res, next) {
      const id = req.params.id;
        internship.find({id:id})
          .then(internship => res.render('admin/edit_internship' , {
            layout: 'admin',
            internship: multipleMongooseToObject(internship),
            
          }))
          .catch(error => next(error));  
    }

    async updateInternship(req, res, next) {
        const { id } = req.params
        const Internship = req.body
        const idLecturer = await lecturer.findOne({id:Internship.idLecturer})
        if(!idLecturer) return res.send('<script>alert("Lecturer not found."); window.history.back();</script>')
        const idEnterprises = await enterprise.findOne({id:Internship.idEnterprises})
        if(!idEnterprises) return res.send('<script>alert("Enterprises not found."); window.history.back();</script>')
        const update = await internship.findOneAndUpdate({id:id},req.body)
        return res.redirect('/admin/internships')

    }

    deleteInternship(req, res, next) {
      internship.findOneAndDelete({id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }

}

module.exports = new AdminController