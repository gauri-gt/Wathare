const Data = require('../models/dataModel');

exports.filterData = async (req, res) => {
    try {
        const { startTime } = req.query;

        // Validate startTime and endTime (assuming they are timestamps)
        if (!startTime) {
            return res.status(400).json({ message: 'Start time and end time are required' });
        }
        console.log('Filtered data:', new Date(startTime));
        // Query the database to retrieve data within the specified time range
        const data = await Data.find({
            ts: {
                $regex: new RegExp(`^(${startTime})`)
            }
        });
        //console.log('Filtered data:', data);
        return res.json(data);

    } catch (error) {
        console.error('Error filtering data:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};