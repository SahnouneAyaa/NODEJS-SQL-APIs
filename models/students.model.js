const mongoose= require('mongoose')
const joi = require('joi')
const mysql= require('mysql2')
const e = require('express')


let schemaValidation=joi.object({
    fullname:joi.string()
    .alphanum()
    .required(),
    email:joi.string()
    .email()
    .required(),
    age:joi.number()
    .required()
})


const connection =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'university'
})


exports.postStudent=(fullname,email,age)=>{
    return Promise(async(res,rej)=>{

            let validation=await schemaValidation.validateAsync({fullname:fullname, email:email, age:age})

            if(validation.error){
                rej(validation.error.details.message)
            }

            connection.query('insert into students (fullname,email,age) values (?,?,?)',[fullname,email,age],(err, result, fieds)=>{
                if(err){
                    rej(err)
                }
                if(result){
                    res('inserted !')
                }
            })

        })
}


exports.getStudent=()=>{

    return Promise((res,rej)=>{
        
        connection.query('select * from students',(err, result, fieds)=>{
            if(err){
                rej(err)
            }
            if(result){
                res('inserted !')
            }
        })

    })

}


exports.getStudentById=(id)=>{

    return Promise((res,rej)=>{
        connection.query('select * from students where id=?',[id],(err, result, fieds)=>{
            if(err){
                rej(err)
            }
            if(result){
                res('inserted !')
            }
        })
    })

}


exports.updateStudent=(id,fullname,email,age)=>{

    return Promise(async(res,rej)=>{


            let validation=await schemaValidation.validateAsync({fullname:fullname, email:email, age:age})

            if(validation.error){
                mongoose.disconnect()
                rej(validation.error.details.message)
            }
        
            connection.query('insert into students (fullname,email,age) values (?,?,?) where id=?',[fullname,email,age,id],(err, result, fieds)=>{
                if(err){
                    rej(err)
                }
                if(result){
                    res('inserted !')
                }
            })
    
})
}

exports.deleteStudent=(id)=>{

    return Promise((res,rej)=>{
        connection.query('delete from students where id=?',[id],(err, result, fieds)=>{
            if(err){
                rej(err)
            }
            if(result){
                res('inserted !')
            }
        })
    })
}