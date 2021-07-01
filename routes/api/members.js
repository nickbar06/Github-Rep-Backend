const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../Members');


//get members
router.get('/', (req, res) => {
    res.json(members);
})

//look up member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.status(200).send(members.filter((x) => x.id === parseInt(req.params.id)))
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
})

//create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return res.status(400).json({ msg: 'Please include a name and email' })
    }

    members.push(newMember);

    return res.json(members);
});

//update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updatedMember = req.body;
        members.forEach((x) => {
            if (x.id === parseInt(req.params.id)) {
                x.name = updatedMember.name ? updatedMember.name : x.name;
                x.email = updatedMember.email ? updatedMember.email : x.email;

                res.json({
                    msg: 'member updated',
                    member: x
                })
            }
        })

    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
})

//delete member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        res.status(200).json({ msg: 'Member deleted', members: members.filter((x) => x.id !== parseInt(req.params.id)) })
    }
    else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
})

module.exports = router;