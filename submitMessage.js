const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { message } = req.body;

        const { data, error } = await supabase
            .from('messages')
            .insert([{ message }]);

        if (error) {
            res.status(500).json({ error: 'Failed to submit message' });
        } else {
            res.status(200).json({ message: 'Message submitted successfully!' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};