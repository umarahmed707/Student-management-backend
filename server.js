import express from "express"
import cors from "cors"
import {db } from './db.js';


const app = express();
const PORT = 5000

app.use(express.json());
app.use(cors());


const logger =(req,res, next)=>{
console.log(new Date().toISOString(),
req.method,
req.url
)

next()
}

app.use(logger)

app.get("/" ,(req,res)=>{
    // db.query(`CREATE TABLE Student(
    //     Firstname VARCHAR(255),
    //     Lastname VARCHAR(255),
    //     course VARCHAR(255),
    //     batch VARCHAR(255),
    //     Rollnumber VARCHAR(255),
    //     age int,
        
    //     )`)
    res.send("Hello World")
})

app.post("/student" , async(req,res)=>{
    const reqbody = req.body;
    
    if(!reqbody.Firstname || !reqbody.Lastname || !reqbody.course || !reqbody.batch ||!reqbody.Rollnumber ||!reqbody.age){
        res.status(400).send({Status :"Success", meassage :"Required Paramete missing"})
        return;
    }

    try {
        const dbres = await db.query(
            `INSERT INTO Student (Firstname, Lastname, course,batch ,Rollnumber , age)
VALUES($1,$2,$3,$4,$5,$6)
RETURNING*`,
[ reqbody.Firstname, reqbody.Lastname,reqbody.course , reqbody.batch , reqbody.Rollnumber , reqbody.age])

  res.status(201).send({Status :"Success" , message : dbres.rows[0]})
    } catch (error) {
        console.log("error" ,error)
  res.status(500).send({Status :"error" , message :"internal server error"})

    }
})

app.get('/student' ,async (req,res)=>{
    try {
          const students = await db.query(`SELECT * from Student`);
    res.status(200).send({status :"Success" ,message :students.rows})
    } catch (error) {
        console.log(error)
    res.status(500).send({status :"Success" ,message : "internet server error"})
        
    }
  
})
app.get('/student/:id' , async(req ,res)=>{
    const studentid = req.params.id

    try {
        const dbres = await db.query(
            `SELECT * FROM Student WHERE id = $1`,
            [studentid]

        );
        if(dbres.rows.length === 0){
            return res.status(404).send({Status:"Error", Message :"Student Not Found"})
        }

        res.status(200).send({status :"Success",Message :dbres.rows[0]})
    } catch (error) {
        console.log(error)
        res.status(500).send({Status:"Error" , Message :"Internal Server Error"})
        
    }
});

app.put('/student/:id' , async(req,res)=>{
 
    const studentid = req.params.id
    const reqbody = req.body;

    if(!reqbody.Firstname || !reqbody.Lastname || !reqbody.course || !reqbody.batch || !reqbody.Rollnumber || !reqbody.age){
        res.status(400).send({Status:"Error" , Message:"Required Parameter Missing"})
    }
try {
    const dbres = await db.query(
        `UPDATE Student SET
        Firstname = $1,
        Lastname = $2,
        course = $3,
        batch = $4,
        Rollnumber = $5,
        age = $6
        WHERE id = $7
        RETURNING *`,[
reqbody.Firstname,
reqbody.Lastname,
reqbody.course,
reqbody.batch,
reqbody.Rollnumber,
reqbody.age,
studentid
        ]
    )

    if(dbres.rows.length === 0){
        return res.status(404).send({Status:"Error" , Message :"Student Not Found"})
    }

    res.status(201).send({Status:"Success" , Message : dbres.rows})
} catch (error) {
    console.log("error" ,error)
    res.status(500).send({Status :"Error" , Message :"internal Server Error"})
    
}

})

app.delete('/student/:id' , async(req,res)=>{
    const studentid = req.params.id

    try {
        const dbres = await db.query(
            `DELETE FROM Student
            WHERE id =$1
            RETURNING *`,
            [studentid]
        )
        if(dbres.rows.length === 0){
            return res.status(404).send({Status :"Error" , Message :"Student Not Found"})
        }
res.status(201).send({Status :"Success" , Message :"Student Delete Successfully" , students :dbres.rows[0]})

    } catch (error) {
res.status(500).send({Status :"Success" , Message :"Internal Server Error"})

        
    }
})
app.listen(PORT ,()=>{
    console.log(`app is running is ${PORT}`)
})
