var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');

router.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  next();
});

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var fs = require('fs');
var tasks;

router.get('/api/todos', (req, res) => {
  fetchTasks(req, res);
});

function getTasksCallBack(req, res, tasks) {
  res.status(200).send({
    success: 'true',
    message: 'todos retrieved successfully',
    todos: tasks
  })
}

router.post('/api/add-todo', (req, res) => {
  fs.readFile(__dirname + '/tasks.json', 'utf8', function readTasks(err, data) {
    if (err) {
      console.log(err);
    } else {
      tasks = JSON.parse(data); //now it an object
      AddTaskAPiCallBack(req, res, tasks);
    }
  });
});

function fetchTasks (req, res) {
  fs.readFile(__dirname + '/tasks.json', 'utf8', function readTasks(err, data) {
    if (err) {
      console.log(err);
    } else {
      tasks = JSON.parse(data); //now it an object
      getTasksCallBack(req, res, tasks);
    }
  });
}


function AddTaskAPiCallBack(req, res, tasks) {
  var newTask = req.body;
  tasks = [...tasks, newTask];
  writeToFile(req, res, JSON.stringify(tasks));
}

function writeToFile(req, res, payload) {
  fs.writeFile(__dirname + '/tasks.json', payload, 'utf8', function writeTasks(err, data) {
    if (err) {
      console.log(err);
    } else {
      fetchTasks(req, res);
      console.log('Data Updated', data);
    }
  });
}

module.exports = router;
