const { Mongoose, Types, ObjectId } = require('mongoose');

const users = [
    {
        username: 'jmaldonado10',
        email: 'test@testmail.com',
        password: '#password123',
        projects: [
            Mongoose.Types.ObjectId("656f4e7626541c3e9e66993c")]
    },
    {
        username: 'aRaquel11',
        email: 'test@gmail.com',
        password: '#password123',
        projects: [	
            Mongoose.Types.ObjectId('656f4e7626541c3e9e66993a')
        ]
    },
    {
        username: 'Aguemarez12',
        email: 'test@hotmail.com',
        password: '#password123',
        projects: [
            Mongoose.Types.ObjectId("656f4e7626541c3e9e66993b")]
    },
    {
        username: 'ivonneCruz13',
        email: 'test@yahoomail.com',
        password: '#password123',
        projects: [
            new Mongoose.Types.ObjectId("656f4e7626541c3e9e66993d")]
    }
];

module.exports = { users };