import pool from '../database/index.js';

export const getAllUsers = async (_req, res, _next) => {
    try {
        let sqlQuery = `SELECT * FROM users`;
        const [users] = await pool.query(sqlQuery);

        res.status(200).json({
            status: 'success',
            results: users.length,
            data: { users },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const getUserById = async (req, res, _next) => {
    try {
        const userId = req.params.id;
        let sqlQuery = `SELECT * FROM users WHERE user_id = ?`;
        const [user] = await pool.query(sqlQuery, [userId]);
        //Error handling to check if there is a record or not
        if (user.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'user not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: { user: user[0] }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const createUser = async (req, res, _next) => {
    try {
        const {username, email, password} = req.body;
        let sqlQuery = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
        const result = await pool.query(sqlQuery, [username, email, password]);

        res.status(201).json({
            status: 'success',
            data: {result}
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const updateUser = async (req, res, _next) => {
    try {
        const userId = req.params.id;
        const {username, email} = req.body;
        let sqlQuery = `UPDATE users SET username=?, email=?, WHERE id=?`;
        await pool.query(sqlQuery, [username, email, userId]);

        res.status(200).json({
            status: 'success',
            message: 'user Info updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};

export const deleteUser = async (req, res, _next) => {
    try {
        const userId = req.params.id;
        let sqlQuery = `DELETE FROM users WHERE user_id=?`;
        await pool.query(sqlQuery, [userId]);

        res.status(200).json({
            status: 'success',
            message: 'user deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Internal server error',
            error: error.message
        });
    }
};
