const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// POST endpoint for creating an organization
app.post('/organizations', async (req, res) => {
    const { name } = req.body;
  
    try {
      const newOrganization = await prisma.organization.create({
        data: {
          name,
        },
      });
  
      res.status(201).json(newOrganization);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create organization' });
    }
});
  
// POST endpoint for creating an event
app.post('/events', async (req, res) => {
    const { name, date, location, description, organizationId } = req.body;
    try {
        const newEvent = await prisma.event.create({
            data: {
                name,
                date,
                location,
                description,
                organizationId,
            },
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create event' });
    }
});

// POST endpoint for creating a user
app.post('/user', async (req, res) => {
    const { id } = req.body;

    // try {
        // Check if the email (id) already exists in the database
        const existingUser = await prisma.user.findUnique({
            where: { id },
        });

        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists.' });
        }

        const newUser = await prisma.user.create({
            data: {
                id
            },
        });
        res.status(201).json(newUser);
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: 'An error occurred while creating the user.' });
    // }
});

// GET endpoint for retrieving all events for a specific organization
app.get('/organizations/:organizationId/events', async (req, res) => {
    const { organizationId } = req.params;
    try {
        const events = await prisma.event.findMany({
            where: {
                organizationId: parseInt(organizationId),
            },
        });
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch events' });
    }
});

app.listen(port, () => {
    console.log('starting');
})