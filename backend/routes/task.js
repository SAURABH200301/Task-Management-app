/* eslint-disable no-undef */
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');


//ROUTE 1: to store task

router.post('/tasks', [
  body('title', 'Enter the title').isLength({ min: 5 }),
  body('description', 'Enter valid description').isLength({ min: 10 }),
  body('dueDate').custom((value) => {
    if (!value || new Date(value) <= Date.now()) {
      throw new Error('Enter a valid due date in the future');
    }
    return true;
  })
], authMiddleware, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let success = false;
    let task;

    if (req.body.taskId) {
      // Updating an existing task
      const taskId = req.body.taskId;
      const updates = req.body;
      const userId = req.body.createdBy; // Assuming you have authentication middleware that sets the user ID in the request object

      // Check if the task exists and is associated with the user
      task = await Task.findOne({ _id: taskId, createdBy: userId });
      console.log(taskId, userId);
      if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }

      // Update the task
      const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
      res.json({ success: true, task: updatedTask });
    } else {
      // Creating a new task
      task = await Task.findOne({ title: req.body.title });
      if (task) {
        return res.status(400).json({ success: false, error: 'Task already exists' });
      }

      task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
        createdBy: req.body.createdBy
      });

      success = true;
      res.json({ success, task });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: 'Internal Server error Occurred' });
  }
});

// router.post('/createtask',
//     [
//         body('title', 'Enter the title').isLength({ min: 5 }),
//         body('description', 'Enter valid description').isLength({ min: 10 }),
//         body('dueDate').custom((value) => {
//             if (!value || new Date(value) <= Date.now()) {
//                 throw new Error('Enter a valid due date in the future');
//             }
//             return true;
//         })
//     ],
//     async (req, res) => {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         try{
//             let success=false;
//             let task= await Task.findOne({title:req.body.title});
//             if(task){
//                 return res.status(400).json({success:false, error:"Task already exists"});
//             }
//             task=await Task.create({
//                 title:req.body.title,
//                 description:req.body.description,
//                 status: req.body.status,
//                 dueDate: req.body.dueDate,
//                 createdBy: req.body.createdBy
//             })
//             const data={
//                 task:{
//                     id:task.id
//                 }
//             }
//             success=true;
//             res.json({success,data})
//         }catch(err){
//             console.log(err);
//             res.status(500).send("Internal Server error Occured");
//         }
//     }
// )

//ROUTE 2: TO FETCH THE TASKS

router.get('/fetchtasks',authMiddleware, async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you have authentication middleware that sets the user ID in the request object
      const tasks = await Task.find({ createdBy: userId });
      res.json({ success: true, tasks });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to fetch tasks' });
    }
  });

//ROUTE 3: TO UPDATE THE TASK

// router.put('/tasks/:taskId',authMiddleware, async (req, res) => {
//     try {
//       const taskId = req.params.taskId;
//       const updates = req.body;
//       const userId = req.body.createdBy; // Assuming you have authentication middleware that sets the user ID in the request object
  
//       // Check if the task exists and is associated with the user
//       const task = await Task.findOne({ _id: taskId, createdBy: userId });
//       console.log(taskId,userId)
//       if (!task) {
//         return res.status(404).json({ success: false, error: 'Task not found' });
//       }
  
//       // Update the task
//       const updatedTask = await Task.findByIdAndUpdate(taskId, updates, { new: true });
//       res.json({ success: true, task: updatedTask });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ success: false, error: 'Failed to update task' });
//     }
// });
//ROUTE 4: TO DELETE THE TASK
router.delete('/tasks/:taskId',authMiddleware, async (req, res) => {
    try {
      const taskId = req.params.taskId;
      const userId = req.user.id; 
  
      // Check if the task exists and is associated with the user
      const task = await Task.findOne({ _id: taskId, createdBy: userId });
      if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
      }
  
      // Delete the task
      await Task.findByIdAndDelete(taskId);
      res.json({ success: true, message: 'Task deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Failed to delete task' });
    }
  });

module.exports = router;
