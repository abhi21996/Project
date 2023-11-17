import express from 'express';
import mysql from 'mysql'
import cors from 'cors'

const app = express();
app.use(cors());
app.use(express.json())

//creating connection with database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'crud-project'
})

app.get('/', (req, res) => {
    const sql = "SELECT * FROM student_list";
    
    // Execute the SQL query
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Message: "Error in server" });
        }
        return res.json(data);
    });
});

app.post('/student', (req, res) => {
    const sql = "INSERT INTO student_list (`name`, `email`, `phone`, `gender`) VALUES (?)";
   console.log(req.body.values,"----->>>")
    const values = [
        req.body.name,
        req.body.email,
        req.body.phone,
        req.body.gender
    ];

    db.query(sql,[values], (err, result) => {
        if (err) return res.json(err);
        return res.json(result);
    });
});

app.get('/read/:id', (req, res) => {
    const sql = "SELECT * FROM student_list WHERE id = ?";
    const id = req.params.id;
    // Execute the SQL query
    db.query(sql,[id], (err, data) => {
        if (err) {
            return res.json({ Message: "Error in server" });
        }
        return res.json(data);
    });
});

app.put('/update/:id', (req,res)=> {
    const sql = 'UPDATE student_list SET `name`=?, `email`=?, `phone`=?, `gender`=? WHERE id=?';
    const id = req.params.id;
    db.query(sql,[req.body.name, req.body.email, req.body.phone, req.body.gender, id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error in server" });
        }
        return res.json(result);
    })
})

app.delete('/delete/:id', (req,res) => {
    const sql = "DELETE FROM student_list WHERE id = ?";
    //grab the id using req.params.id
    const id = req.params.id;
    db.query(sql,[id], (err, result) => {
        if (err) {
            return res.json({ Message: "Error in server" });
        }
        return res.json(result);
    })
})

app.listen(4008, ()=>{
    console.log("listening at port no 4008");
})