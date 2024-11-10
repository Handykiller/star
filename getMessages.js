const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

module.exports = async (req, res) => {
    const { data, error } = await supabase
        .from('messages')
        .select('message, timestamp')
        .order('timestamp', { ascending: false });

    if (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    } else {
        res.status(200).json(data);
    }
};