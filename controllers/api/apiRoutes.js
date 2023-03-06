const router = require('express').Router();
const { User, Tasks } = require('../../models')

//find tasks from any user
router.get('/tasks', async (req, res) => {
  try {
    const allTasks = await Tasks.findAll({
      include: [{model: User}]
    })
    res.status(200).json(allTasks)
  } catch (err) {
    res.status(500).json(err)
  }
})

//returns all tasks from a single user
router.get('/tasks/:id', async (req, res) => {
  try {
    const allUsersTasks = await Tasks.findAll({
      where: {
        user_id: req.params.id
      }
    })
    res.status(200).json(allUsersTasks)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get all completed tasks from a single user
router.get('/tasks/complete/:id', async (req, res) => {
  try {
    const allUsersTasks = await Tasks.findAll({
      where: {
        user_id: req.params.id,
        complete: true
      }
    })
    res.status(200).json(allUsersTasks)
  } catch (err) {
    res.status(500).json(err)
  }
})

//get all unfinished tasks from a single user
router.get('/tasks/unfinished/:id', async (req, res) => {
  try {
    const allUsersTasks = await Tasks.findAll({
      where: {
        user_id: req.params.id,
        complete: false
      }
    })
    res.status(200).json(allUsersTasks)
  } catch (err) {
    res.status(500).json(err)
  }
})



//create a new task
router.post('/tasks', async (req, res) => {
  try {
    const newTask = await Tasks.create({
      task: req.body.task,
      user_id: req.body.user_id
  })
    res.status(200).json(newTask)
  } catch (err) {
    console.log(err)
    console.log(req.body)
    console.log(req.body.task)
    res.status(500).json({err, msg: "what happened?"})
  }
})

//edit a task
router.put('/tasks/:id', async (req, res) => {
  try {
    const updateTask = await Tasks.update({
      task: req.body.task
    }, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateTask)
  } catch (err) {
    res.status(500).json(err)
  }
})

//completes task in "id" url parameter
router.put('/tasks/complete/:id', async (req, res) => {
  try {
    const updateTask = await Tasks.update({
      complete: true
    }, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(updateTask)
  } catch (err) {
    res.status(500).json(err)
  }
})



//delete a task
router.delete('/tasks/:id', async (req, res) => {
  try {
    await Tasks.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({message: "Deleted the task!"})
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router;
