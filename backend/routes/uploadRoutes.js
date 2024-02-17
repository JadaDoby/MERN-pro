import path from 'path'
import express from 'express'
import multer from 'multer'
const router=express.Router();


const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'upload/');
    },

    filename(req,file,cb){
        cb(null, `${file.filename}-
        ${Date.now()}${path.extname(file.orginalname)}`);
    }
})

function checkFileType(file,cb){
    const filetypes= /jpg|jpeg|png/;
    const extname=filetypes.test(path.extname(file.orginalname).
    toLowerCase());

    const minetype=filetypes.test(file.minetype);
    if(extname && minetype){
        return cb(null,true);
    }else{
        cb('Images only!');
    }
    }

const upload=multer({
    storage,
});

router.post('/',upload.single ('image'),(req,res)=> {
res.send({
    message:'Image Uploaded',
    image:`/${req.file.path}`,
});

});








export default router;
