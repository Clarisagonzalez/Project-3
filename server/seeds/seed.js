const db = require('../config/connection');
const { Project, User } = require('../models');
const { projects } = require('./projectSeeds');
const { users } = require('./userSeeds');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Project', 'projects');
    await Project.create(projects);

    await cleanDB('User', 'users');
    await User.create(users);

  
    console.log('all done!');
    process.exit(0);

  } catch (err) {
    throw err;
  }
});
