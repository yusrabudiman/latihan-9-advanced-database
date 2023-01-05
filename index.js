const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'crud_db'
});

conn.connect((err) => {
    if (err) throw err;
    console.log('Mysql Connected');
});

//products
app.get('/api/products', (req, res) =>{
    let sql = "SELECT * FROM product";
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.get('/api/products/:id', (req, res) =>{
    let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

app.post('/api/products', (req, res) =>{
    let data = {product_name: req.body.product_name, product_price: req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql, data, (err, results) =>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": "Insert data success"}));
    });
});

app.put('/api/products/:id', (req, res) =>{
    let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"'WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.send(JSON.stringify(
        {
            "status": 200, 
            "error": null, 
            "response": "Update data success"
        }

        ));
    });
});

app.delete('/api/products/:id', (req, res) =>{
    let sql = "DELETE FROM product WHERE product_id="+req.params.id;
    let query = conn.query(sql, (err, results) =>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": "Delete data success"}));
    });
});


//comments
app.get('/api/comments', (req, res) => {
    let sql = 'SELECT * FROM comment';
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    })
})

app.get('/api/comments/:id', (req, res) => {
    let sql = 'SELECT * FROM comment WHERE comment_id=' + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if(err) throw err;
        res.json(results);
    })
})

app.get('/api/comments/customer/:id', (req, res) => {
    let sql = 'SELECT * FROM comment WHERE cust_id=' + req.params.id + ' ORDER BY comment_created DESC';
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results)
    })
})


app.post('/api/comments', (req, res) => {
    let data = {
        cust_id: req.body.customer_id,
        product_id: req.body.product_id,
        comment_text: req.body.comment_text
    }
    let sql = 'INSERT INTO comment SET ?';
    let query = conn.query(sql, data, (err, results) => {
        if(err) throw err;
        console.log(data);
        res.json({
            'status' : 'SUCCESS',
        })
    })
})

app.put('/api/comments/:id', (req, res) => {
    let sql = "UPDATE comment SET cust_id='" + req.body.customer_id + "', product_id='"+ req.body.product_id + "', comment_text='" + req.body.comment_text + "' WHERE comment_id=" + req.params.id;
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        console.log(sql);
        res.json({
            'status' : 'UPDATED'
        })
    })
})

app.delete('/api/comments/:id', (req, res) => {
    let sql = 'DELETE FROM comment WHERE comment_id=' + req.params.id
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.json({
            'status' : 'DELETED'
        })
    })
})

app.listen(3000, () => {
    console.log(`server running at http://127.0.0.1:3000`);
})
