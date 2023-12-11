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
    for(let i = 0; i < projects.length; i++){
      users[i].projects.push(projects[3-i]._id);
      donations[i].donorId = users[i]._id;
      donations[i].projectId = projects[i]._id;
      users[i].donations.push(donations[i]);
      users[i].comments.push(comments[i]);
      projects[i].donations.push(donations[i]);
      projects[i].comments.push(comments[i]);
    }
  
    console.log('all done!');
    process.exit(0);

  } catch (err) {
    throw err;
  }
});
