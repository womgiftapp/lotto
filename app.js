const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 3000;

let lotteryMembers = [];

// const members = [
//     {
//         name: 'Wesam',
//         emai: 'wesam@netix.co.il'
//     },
//     {
//         name: 'Margarita',
//         emai: 'margarita@netix.co.il'
//     }
// ]

// Load Member Model
require('./models/Member');
const Member = mongoose.model('members');

// Connect to mongoose
mongoose.connect('mongodb://localhost/lottery')
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Main route
app.get('/', (req, res) => {
    //res.send(members);
    Member.find({})
        .sort({ date: 'desc' })
        .then(members => {
            lotteryMembers = members;
            res.send({
                members: members
            });
        });
})

// Add member route
app.post('/add', (req, res) => {
    const newMember = {
        name: req.body.name,
        email: req.body.email
    };
    new Member(newMember)
        .save()
        .then(member => {
            res.send({
                message: 'Added new member',
                member: member
            });
            console.log(member);
        });
})

// Delete member route
app.delete('/:id', (req, res) => {
    Member.remove({ _id: req.params.id })
        .then(() => {
            res.send({ message: 'Member deleted' });
        });

})

// Lottery route
app.get('/lottery', (req, res) => {
    var winner = lotteryMembers[Math.floor(Math.random() * lotteryMembers.length)];
    res.send(winner.name);

})

app.listen(port, () => {
    console.log(`Server listen the port ${port}`);
});
