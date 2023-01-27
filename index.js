const express = require("express")
const cors = require("cors")
const port = process.env.PORT || 8081
const fileUpload = require('express-fileupload')
const path = require('path')

// CONNECT .ENV FILE///////////////////////
require ('dotenv'). config ();
const MONGO_URI = process.env.MONGO_URI;
////////////////////////////////



////////////////////////////////////////////////////
///////////////// DATABASE-CONNECTIONS/////////////

const UserData = require('./model/User');
const uri = MONGO_URI
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)
mongoose.connect(uri, (err) => {
    if (err) {
        // console.log(err)
        console.log("connection to MOngoDb is Failed")
    }
    else {
        console.log('Successfully connected to mongoDb data base')
    }
})

////////////////////////////////////////////////////////////////////



const app = express()
app.use(fileUpload())
app.use(express.json())
app.use(cors())
// app.use(express.static('public'))

// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);

// app.use(express.static(path.join(__dirname,'public')))
// app.use('/static',express.static('public'))

app.listen(port, () => {
    console.log(`server is up at ${port}`)
})
app.post("/api", (req, res) => {

    const { userName, address, discription } = req.body;
    const { image_file } = req.files

    // console.log(req.files)
    // console.log(req.body)
    // res.send('Data received')


    // move to Media folder
    image_file.mv('./mediaFolder/' + image_file.name, async (err) => {
        console.log(image_file.name)
        if (err) {
            res.json({ message: err })
        }
        else {
            // res.json({ message: "upload success" })

            try {
                const userObject = new UserData({
                    ...{ userName, address, discription },
                    mediaData: image_file.name
                })
                const response = await userObject.save()
                res.json({
                    status: 200,
                    response
                })

            } catch (e) {
                res.json({
                    status: "Failed",
                    message: e.message
                })
            }
        }
    })


})

app.get('/view', async (req, res) => {
    try {
        // console.log('Data Requested')
        const postData = await UserData.find();
        // console.log('Data Requested')
        res.json({
            status: 200,
            postData

        })
    } catch (e) {
        res.json({
            status: 'Failed',
            message: e.message
        })
    }

})

app.get('/view/:mediaData', async (req, res) => {
    try {
        // console.log('request-image')
        // const imgName = await req.params.mediaData
        // console.log(`./mediaFolder/${req.params.mediaData}`)
        res.sendFile(path.join(__dirname,`./mediaFolder/${req.params.mediaData}`))
        
        // res.json({
        //     status:200,
        //     imgName

        // })

    }catch(e){
        res.json({
            status:"Failed",
            message:e.message
        })
    }

})