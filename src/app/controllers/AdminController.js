const mongoose = require('mongoose');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const student = require('../models/student')
const lecturer = require('../models/lecturer');
const enterprise = require('../models/enterprise')
const internship = require('../models/internship')


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
        const studentId = req.params.id;
        
        student.find({id:studentId})
          .populate('idInternshipObject')
          .then(student => {
            if (!student) {
              res.send('<script>alert("ID sinh vien ko tồn tại!"); window.history.back();</script>')
            } else {

              internship.find({id:student[0].idInternship})
                .populate('idLecturer')
                .populate('idEnterprise')
                .then(internship => {
                    if(!internship) res.send('<script>alert("ID thuc tap ko tồn tại!"); window.history.back();</script>')
                    else {
                      res.render('admin/show_student', {
                        layout: 'admin',
                        student: multipleMongooseToObject(student),
                        internship: multipleMongooseToObject(internship),
                      });
                    }
                })
            }
          })
          .catch(next);
  }


    //[GET] admin/student/create  
    createStudent(req, res, next) {
        res.render('admin/create_student',{ layout: 'admin' })
    }
  


    saveStudent(req, res, next) {
      const formData = req.body;
      student.findOne({ id: formData.id })
        .then(existing => {
          if (existing) {
             res.send('<script>alert("ID sinh vien đã tồn tại!"); window.history.back();</script>');
          } else {             
            internship.findOne({ id: formData.idInternship })
              .then(foundInternship => {
                if (!foundInternship) {
                  res.send('<script>alert("ID thực tập không tồn tại!"); window.history.back();</script>');
                } else {
                  const id = new mongoose.Types.ObjectId(foundInternship._id)
                  formData.idInternshipObject = id
                  formData.email = formData.firstName + formData.id + '@student.ctu.edu.vn'
                  formData.key = formData.yearOfStudy - 1974
                  const newStudent = new student(formData)
                  newStudent.save()
                  .then(() => res.redirect('/admin/students'))
                  .catch(error => next(error));
                }
              })
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

  
    updateStudent(req, res, next) {
        const formData = req.body
        student.findOne({id:req.body.id})
          .then(doc => {
            if(req.params.id === req.body.id){
              internship.findOne({id:req.body.idInternship})
                .then(existing=> {
                    if(!existing) res.send('<script>alert("ID thực tập ko tồn tại!"); window.history.back();</script>')
                    else {
                      const id = new mongoose.Types.ObjectId(existing._id)
                      formData.idInternshipObject = id
                      formData.email = formData.firstName + formData.id + '@student.ctu.edu.vn'
                      formData.key = formData.yearOfStudy - 1974
                      student.findOneAndUpdate({id: req.params.id} , req.body)
                        .then(() => res.redirect('/admin/students'))
                        .catch((error) => {
                          res.send('error update internship');
                        });
                    }
                })
            }
            else if(doc) res.send('<script>alert("ID sinh viên đã tồn tại!"); window.history.back();</script>')
            else {
              internship.findOne({id:req.body.idInternship})
                .then(existing=> {
                    if(!existing) res.send('<script>alert("ID thực tập ko tồn tại!"); window.history.back();</script>')
                    else {
                      const id = new mongoose.Types.ObjectId(existing._id)
                      formData.idInternshipObject = id
                      formData.email = formData.firstName + formData.id + '@student.ctu.edu.vn'
                      formData.key = formData.yearOfStudy - 1974
                      student.findOneAndUpdate({id: req.params.id} , req.body)
                        .then(() => res.redirect('/admin/students'))
                        .catch((error) => {
                          res.send('error update internship');
                        });
                    }
                })
            }
          })
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



    saveInternship(req, res, next) {
      const formData = req.body;
      internship.findOne({ id: formData.id })
        .then(existing => {
          if (existing) {
            res.send('<script>alert("ID thực tập đã tồn tại!"); window.history.back();</script>');
          } else {
            const idLecturer = formData.idLecturer
            const idEnterprise = formData.idEnterprise;
            lecturer.findOne({ id: idLecturer }) // Sử dụng phương thức lean() ở đây
              .then(foundLecturer => {
                if (foundLecturer) {
                  const lecturerData = {
                    _id: foundLecturer._id,
                    id:foundLecturer.id
                  }
                  enterprise.findOne({id:idEnterprise})
                    .then(enterprise => {
                      if(enterprise) {
                        const enterpriseData = {
                          _id: enterprise._id,
                        }
                        const newInternship = new internship({
                          id: formData.id,
                          idE:enterprise.id,
                          idL:foundLecturer.id,
                          topic: formData.topic,
                          description: formData.description,
                          idLecturer: lecturerData,
                          idEnterprise: enterpriseData,

                        });
                        newInternship.save()
                          .then(() => res.redirect('/admin/internships'))
                          .catch(error => next(error));

                        
                      }else {
                        res.send('<script>alert("ID doanh nghiep không tồn tại!"); window.history.back();</script>');
                      }
                      
                    })
                } else {
                  res.send('<script>alert("ID giảng viên không tồn tại!"); window.history.back();</script>');
                }
              })
              .catch(next);
          }
        })
        .catch(error => next(error));
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

    updateInternship(req, res, next) {
      const formData = req.body
      const idLecturer = req.body.idL
      const idEnterprise = req.body.idE
        internship.findOne({id:req.body.id})
          .then(doc =>{
              if(req.body.id===req.params.id){
                lecturer.findOne({id:idLecturer})
                  .then(foundLecturer => {
                    if(!foundLecturer) res.send('<script>alert("ID giảng viên không tồn tại!"); window.history.back();</script>');
                    else 
                    {
                        enterprise.findOne({id:idEnterprise})
                          .then(enterprise => {
                            if(!enterprise) res.send('<script>alert("ID doanh nghiep không tồn tại!"); window.history.back();</script>')
                            else {
                                formData.idEnterprise = enterprise._id
                                formData.idLecturer = foundLecturer._id
                                internship.findOneAndUpdate({id: req.params.id} , req.body)
                                .then(() => res.redirect('/admin/internships'))
                                .catch((error) => {
                                  res.send('error update internship');
                                });


                            }
                          })
                    }
                  })
              }else if(doc) {
                res.send('<script>alert("ID thực tập đã tồn tại!"); window.history.back();</script>')
              }else {
                lecturer.findOne({id:idLecturer})
                .then(lecturer => {
                  if(!lecturer) res.send('<script>alert("ID giảng viên không tồn tại!"); window.history.back();</script>');
                  else 
                  {
                      enterprise.findOne({id:idEnterprise})
                        .then(enterprise => {
                          if(!enterprise) res.send('<script>alert("ID doanh nghiep không tồn tại!"); window.history.back();</script>')
                          else {
                              internship.findOneAndUpdate({id: req.params.id} , req.body)
                              .then(() => res.redirect('/admin/internships'))
                              .catch((error) => {
                                res.send('error update internship');
                              });
                          }
                        })
                  }
                })
              }

          })
          .catch(next)
    }

    deleteInternship(req, res, next) {
      internship.findOneAndDelete({id:req.params.id})
        .then(()=> res.redirect('back'))
        .catch(next)
    }

}

module.exports = new AdminController