const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;
const HOLIDAYS_FILE = path.join(__dirname, 'holidays.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (HTML, CSS, JS)

// Helper function to read holidays from JSON file
async function readHolidays() {
    try {
        const data = await fs.readFile(HOLIDAYS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading holidays file:', error);
        return { holidays: [], lastUpdated: new Date().toISOString(), version: "1.0" };
    }
}

// Helper function to write holidays to JSON file
async function writeHolidays(data) {
    try {
        await fs.writeFile(HOLIDAYS_FILE, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing holidays file:', error);
        return false;
    }
}

// API Routes

// GET all holidays
app.get('/api/holidays', async (req, res) => {
    try {
        const data = await readHolidays();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch holidays' });
    }
});

// POST new holiday
app.post('/api/holidays', async (req, res) => {
    try {
        const data = await readHolidays();
        const newHoliday = {
            id: data.holidays.length > 0 ? Math.max(...data.holidays.map(h => h.id)) + 1 : 1,
            ...req.body,
            createdAt: new Date().toISOString()
        };
        
        data.holidays.push(newHoliday);
        data.lastUpdated = new Date().toISOString();
        
        const success = await writeHolidays(data);
        
        if (success) {
            res.status(201).json({ 
                message: 'Holiday added successfully', 
                holiday: newHoliday 
            });
        } else {
            res.status(500).json({ error: 'Failed to save holiday' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to add holiday' });
    }
});

// PUT update holiday
app.put('/api/holidays/:id', async (req, res) => {
    try {
        const data = await readHolidays();
        const holidayId = parseInt(req.params.id);
        const index = data.holidays.findIndex(h => h.id === holidayId);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Holiday not found' });
        }
        
        data.holidays[index] = {
            ...data.holidays[index],
            ...req.body,
            id: holidayId,
            updatedAt: new Date().toISOString()
        };
        
        data.lastUpdated = new Date().toISOString();
        
        const success = await writeHolidays(data);
        
        if (success) {
            res.json({ 
                message: 'Holiday updated successfully', 
                holiday: data.holidays[index] 
            });
        } else {
            res.status(500).json({ error: 'Failed to update holiday' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update holiday' });
    }
});

// DELETE holiday
app.delete('/api/holidays/:id', async (req, res) => {
    try {
        const data = await readHolidays();
        const holidayId = parseInt(req.params.id);
        const index = data.holidays.findIndex(h => h.id === holidayId);
        
        if (index === -1) {
            return res.status(404).json({ error: 'Holiday not found' });
        }
        
        data.holidays.splice(index, 1);
        data.lastUpdated = new Date().toISOString();
        
        const success = await writeHolidays(data);
        
        if (success) {
            res.json({ message: 'Holiday deleted successfully' });
        } else {
            res.status(500).json({ error: 'Failed to delete holiday' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete holiday' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚗 TOYOTA MOTOR EUROPE - Holiday Calendar Server       ║
║                                                            ║
║   Server running on: http://localhost:${PORT}                ║
║                                                            ║
║   📅 Open in browser: http://localhost:${PORT}              ║
║   📊 API endpoint: http://localhost:${PORT}/api/holidays    ║
║                                                            ║
║   Press Ctrl+C to stop the server                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\n👋 Shutting down Toyota Holiday Calendar server...');
    process.exit(0);
});

// Made with Bob
