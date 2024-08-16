import pool from '../database/index.js';

// Function to get all tasks
export const getAllTasks = async (req, res) => {
    try {
        const messages = await pool.query('SELECT * FROM tasks');
        res.status(200).json({ status: 'success', data: messages[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

export const getTaskById = async (req, res, _next) => {
    try {
        const taskId = req.params.id;
        let sqlQuery = `SELECT * FROM tasks WHERE id = ?`;
        const [task] = await pool.query(sqlQuery, [taskId]);
        //Error handling to check if there is a record or not
        if (task.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Customer not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { task: task[0] }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

// Function to get the task by user ID
export const getTasksByUserId = async (req, res) => {

    const { id } = req.params;

    try {
        const tasks = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [id]);
        if (tasks[0].length === 0) {
            return res.status(404).json({ status: 'error', message: 'No tasks found for this user' });
        }
        res.status(200).json({ status: 'success', data: tasks[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};



export const createTask = async (req, res) => {
    try {
      const { user_id, title, description,} = req.body;
      
      const picture = req.file ? req.file.filename : null;

  
      const query = `INSERT INTO tasks ( user_id, title, description, picture) VALUES (?, ?, ?, ?)`;
      const values = [ user_id, title, description, picture];
      await pool.query(query, values);
  
      res.status(201).json({ status: 'success', message: 'task created successfully' }); // Ensure status is 'success'
    } catch (err) {
      console.error('Error creating task:', err);
      res.status(500).json({ status: 'error', error: 'Internal server error' }); // Include status 'error'
    }
  };
  

// Controller for updating Tasks
export const updateTask= async (req, res) => {
    const taskId = req.params.id;
    const { title, description } = req.body;

    const picture = req.file ? req.file.filename : null;

    try {
        await pool.query('UPDATE tasks SET title = ?, description = ?, picture = ? WHERE id = ?',
            [title, description, picture, taskId]);
        res.status(200).json({ status: 'success', message: 'Task updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

// Controller for updating Tasks
export const updateStatus= async (req, res) => {
    const taskId = req.params.id;
    const { status} = req.body;

    try {
        await pool.query('UPDATE tasks SET status = ? WHERE id = ?',
            [status, taskId]);
        res.status(200).json({ status: 'success', message: 'Status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};

export const deleteTask = async (req, res, _next) => {
    try {
        const taskId = req.params.id;
        let sqlQuery = `DELETE FROM tasks WHERE id=?`;
        await pool.query(sqlQuery, [taskId]);

        res.status(200).json({
            status: 'success',
            message: 'Message deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};
