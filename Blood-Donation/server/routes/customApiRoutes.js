import express from 'express';
import { Donation } from '../models/documentModel.js';

const router = express.Router();

// C - Create post method
// R - Read all get method
// U - Update put method
// D - Delete delete method

router.post('/',async(req,res) => {
    try {
        if(
            !req.body.month ||
            !req.body.location ||
            !req.body.notes
        ){
            return res.status(400).send({
                message: "All details needed to be filed"
            });
        }

        const newDonation = {
            month: req.body.month,
            location: req.body.location,
            notes: req.body.notes,
        }

        const donation = await Donation.create(newDonation);
        return res.status(201).send(donation);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message: error.message
        })
        
    }
})

//Read all docs
router.get('/', async (req, res) => {
    try {
        const donations = await Donation.find({});
        return res.status(200).json({
            count: donations.length,
            data: donations
        })
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({
            message: error.message
        })
        
    }
})

router.get('/:id', async (req,res) => {
    try {
        const {id} = req.params;
        const donation = await Donation.findById(id);
        return res.status(200).json(donation);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message)
    }
})

export default router;