import express from 'express';
import { Donation } from '../models/documentModel.js';

const router = express.Router();

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

export default router;