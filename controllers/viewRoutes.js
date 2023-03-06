const router = require('express').Router();
const { User, Tasks } = require('../models')

//renders homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', { user: req.user
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//renders todo
router.get('/todo', async (req, res) => {
 try {
  let userId = req.user.id

  let userHasTasks;

  //check if user has any tasks
  const userCheckTasks = await Tasks.findAll({
    where: {
      user_id: userId
    }
  })

  if(userCheckTasks[0] === undefined) {
    userHasTasks = false
  } else {
    userHasTasks = true;
  }

  //gets all user's completed tasks
  const usersCompleteTasks = await Tasks.findAll({
    where: {
      user_id: userId,
      complete: true
    }
 })

  //gets all user's unfinished tasks
  const usersUnfinishedTasks = await Tasks.findAll({
   where: {
    user_id: userId,
    complete: false
  }
  })

  res.render('todo', { user: req.user, userId: userId, complete:  usersCompleteTasks, unfinished: usersUnfinishedTasks, hasTasks: userHasTasks
  })
 } catch (err) {
  res.status(500).json(err)
 }
})

router.get('/edit/:id', async (req, res) => {
  try {

    const taskToEdit = await Tasks.findAll({
      where: {
        id: req.params.id
      }
    })

    res.render('edit', { user: req.user, task: taskToEdit[0].dataValues
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
