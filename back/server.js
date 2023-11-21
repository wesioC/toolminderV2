const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000; // Porta do servidor
const upload = multer();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'pma',
  password: '2023',
  database: 'toolminder'
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão ao banco de dados bem-sucedida');
});


app.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar produtos no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.get('/getavailabletools', (req, res) => {
  const sql = 'SELECT * FROM tools WHERE toolQuantity > 0';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar produtos no banco de dados');
      return;
    }

    res.json(results);
  });
});

app.get('/getloans', (req, res) => {
  const sql = 'SELECT * FROM loan WHERE dateReturn IS NULL ORDER BY dateHand ASC';

  db.query(sql, (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      res.status(500).send('Erro ao buscar empréstimos no banco de dados');
      return;
    }

    res.json(results);
  });
});


app.post('/login', (req, res) => {
  const matricula = req.query.matricula;
  const senha = req.body.senha;

  if (!matricula || !senha) {
    return res.status(400).send('Matrícula e senha são obrigatórias');
  }

  const sql = 'SELECT * FROM usuarios WHERE matricula = ? AND senha = ?';
  db.query(sql, [matricula, senha], (error, results) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).send('Erro ao autenticar o usuário');
    }

    if (results.length > 0) {
      // Usuário autenticado com sucesso
      return res.send('Login bem-sucedido');
    } else {
      // Credenciais inválidas
      return res.status(401).send('Credenciais inválidas');
    }
  });
});
  
app.post('/addtools', async (req, res) => {
  const toolCode = req.body.toolCode;
  const toolName = req.body.toolName;
  const toolQuantity = req.body.toolQuantity;
  // console.log(toolCode, toolName, toolQuantity)

  if (!toolCode || !toolName || !toolQuantity) {
    return res.status(400).json({ error: 'Código, nome e quantidade são obrigatórios' });
  }

  const sql = 'INSERT INTO tools (toolCode, toolName, toolQuantity) VALUES (?, ?, ?)';
  db.query(sql, [toolCode, toolName, toolQuantity], (error, result) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).json({ error: 'Erro ao adicionar a ferramenta no banco de dados' });
    }

    res.status(201).json({ message: 'Ferramenta adicionada com sucesso' });
  });
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});

app.post('/removetools', async (req, res) => {
  const toolCode = req.body.toolCode;
  // console.log(toolCode)

  if (!toolCode) {
    return res.status(400).json({ error: 'Código é obrigatório' });
  }

  const sql = 'DELETE FROM tools WHERE toolCode = ?';
  db.query(sql, [toolCode], (error, result) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).json({ error: 'Erro ao remover a ferramenta no banco de dados' });
    }

    res.status(201).json({ message: 'Ferramenta removida com sucesso' });
  });
});

app.post('/edittools', async (req, res) => {
  const toolCode = req.body.toolCode;
  const toolName = req.body.toolName;
  const toolQuantity = req.body.toolQuantity;
  // console.log(toolCode, toolName, toolQuantity)

  if (!toolCode || !toolName || !toolQuantity) {
    return res.status(400).json({ error: 'Código, nome e quantidade são obrigatórios' });
  }

  const sql = 'UPDATE tools SET toolName = ?, toolQuantity = ? WHERE toolCode = ?';
  db.query(sql, [toolName, toolQuantity, toolCode], (error, result) => {
    if (error) {
      console.error('Erro na consulta SQL: ' + error.message);
      return res.status(500).json({ error: 'Erro ao editar a ferramenta no banco de dados' });
    }

    res.status(201).json({ message: 'Ferramenta editada com sucesso' });
  });
});

app.post('/addloan', async (req, res) => {
  const toolCode = req.body.toolCode;
  const toolQuantity = req.body.toolQuantity;
  const toolName = req.body.toolName;

  const currentDate = new Date();
  const dateLoan = currentDate.toISOString().split('T')[0];

  const dateHand = req.body.dateHand;
  const receiver = req.body.receiver;
  const sender = req.body.sender;
  const receiverEmail = req.body.receiverEmail;

  if (!toolCode || !toolQuantity || !dateLoan || !dateHand || !receiver || !sender || !receiverEmail || !toolName) {
    return res.status(400).json({ error: 'Código, quantidade, data de empréstimo, data de devolução, receptor e remetente são obrigatórios' });
  }

  const sqlInsertLoan = 'INSERT INTO loan (toolCode, toolName, toolQuantity, dateLoan, dateHand, receiver, receiverEmail, sender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const sqlUpdateTool = 'UPDATE tools SET toolQuantity = toolQuantity - ? WHERE toolCode = ?';

  db.beginTransaction(function (err) {
    if (err) { 
      return res.status(500).json({ error: 'Erro ao iniciar transação no banco de dados' });
    }

    db.query(sqlInsertLoan, [toolCode, toolName,toolQuantity, dateLoan, dateHand, receiver, receiverEmail, sender], function (error, result) {
      if (error) {
        console.error('Erro na consulta SQL de inserção de empréstimo: ' + error.message);
        return db.rollback(() => {
          res.status(500).json({ error: 'Erro ao adicionar o empréstimo no banco de dados' });
        });
      }

      db.query(sqlUpdateTool, [toolQuantity, toolCode], function (updateError, updateResult) {
        if (updateError) {
          console.error('Erro na consulta SQL de atualização de ferramentas: ' + updateError.message);
          return db.rollback(() => {
            res.status(500).json({ error: 'Erro ao atualizar quantidade de ferramentas no banco de dados' });
          });
        }

        db.commit(function (commitError) {
          if (commitError) {
            console.error('Erro ao cometer transação no banco de dados: ' + commitError.message);
            return db.rollback(() => {
              res.status(500).json({ error: 'Erro ao confirmar transação no banco de dados' });
            });
          }
          res.status(201).json({ message: 'Empréstimo adicionado com sucesso' });
        });
      });
    });
  });
});

app.post('/updateloan', async (req, res) => {
  const loanCode = req.body.loanCode;
  const toolQuantity = req.body.toolQuantity;
  const currentDate = new Date();
  const dateReturn = currentDate.toISOString().split('T')[0];
  
  if (!loanCode) {
    return res.status(400).json({ error: 'Código do empréstimo é obrigatório' });
  }

  const sqlUpdateLoan = 'UPDATE loan SET dateReturn = ? WHERE loanCode = ?';
  const sqlFindToolCode = 'SELECT toolCode FROM loan WHERE loanCode = ?';
  const sqlUpdateToolQuantity = 'UPDATE tools SET toolQuantity = toolQuantity + ? WHERE toolCode = ?';

  db.beginTransaction(function (err) {
    if (err) { 
      return res.status(500).json({ error: 'Erro ao iniciar transação no banco de dados' });
    }

    db.query(sqlUpdateLoan, [dateReturn, loanCode], function (error, result) {
      if (error) {
        console.error('Erro na consulta SQL de atualização de empréstimo: ' + error.message);
        return db.rollback(() => {
          res.status(500).json({ error: 'Erro ao atualizar empréstimo no banco de dados' });
        });
      }

      db.query(sqlFindToolCode, [loanCode], function (findError, toolResult) {
        if (findError || toolResult.length === 0) {
          console.error('Erro ao encontrar o código da ferramenta: ' + (findError ? findError.message : 'Código do empréstimo não encontrado'));
          return db.rollback(() => {
            res.status(500).json({ error: 'Erro ao encontrar o código da ferramenta' });
          });
        }

        const toolCode = toolResult[0].toolCode;

        db.query(sqlUpdateToolQuantity, [toolQuantity, toolCode], function (updateError, updateResult) {
          if (updateError) {
            console.error('Erro na consulta SQL de atualização de quantidade de ferramentas: ' + updateError.message);
            return db.rollback(() => {
              res.status(500).json({ error: 'Erro ao atualizar quantidade de ferramentas no banco de dados' });
            });
          }

          db.commit(function (commitError) {
            if (commitError) {
              console.error('Erro ao cometer transação no banco de dados: ' + commitError.message);
              return db.rollback(() => {
                res.status(500).json({ error: 'Erro ao confirmar transação no banco de dados' });
              });
            }
            res.status(200).json({ message: 'Empréstimo atualizado com sucesso' });
          });
        });
      });
    });
  });
});