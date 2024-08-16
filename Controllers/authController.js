import pool from '../database/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'pass-code2001';

// Function to handle user registration
export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (userExists[0].length > 0) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user data into the database
        await pool.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]);

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//Function to log customer in the system
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user[0].length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user[0][0].password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Create and assign a token
        const token = jwt.sign({ id: user[0][0].id }, JWT_SECRET);

        // Return token and customer_id in the response
        res.header('auth-token', token).json({ token, id: user[0][0].id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Function to update user information
export const updateUserInfo = async (req, res) => {
    const { username, email } = req.body;
    const userId = req.params.id; // Extract id from request params

    try {
        // Update the user's information in the database
        await pool.query('UPDATE users SET username = ?,  email = ? WHERE id = ?', 
            [username, email, userId]);

        res.status(200).json({ message: 'User information updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};