// import multer from 'multer'
// import path from 'path'
// import fs from 'fs'
const multer= require('multer')
const path= require('path')
const fs= require('fs')

const uploadPath=path.join(__dirname,"../public/uploads")

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath,{recursive:true})
}

const Storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>{
        //const ext=path.extname(file.originalName)
        const uniqueName=`${Date.now()}-${file.originalname}`
        cb(null,uniqueName)
    }
})

const upload=multer({storage:Storage})
// export default upload
module.exports=upload