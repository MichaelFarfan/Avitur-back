'use strict'

const mongoose = require('mongoose');
const Hotel = require('../models/Hotel');

async function create(req, res) {
    try {
        const { id, name, stars, price, image, amenities } = req.body;
        let hotel = new Hotel({ id, name, stars, price, image, amenities });
        hotel.save((err) => {
            if (err) res.status(500).send({ message: `Error when creating the hotel: ${err}` });

            return res.status(201).send({ message: 'Hotel successfully registered' });
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' })
    }
}

async function create_many(req, res) {
    try {
        const { hotels } = req.body;
        for (let i = 0; i < hotels.length; i++) {
            const element = hotels[i];

            const { id, name, stars, price, image, amenities } = element;
            let hotel = new Hotel({ id, name, stars, price, image, amenities });
            hotel.save((err) => {
                if (err) res.status(500).send({ message: `Error when creating the hotel: ${err}` });
            })
        }
        res.status(201).send({
            message: 'Taks complete'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' })
    }
}

async function read(req, res) {
    try {
        let hotels = await Hotel.find((err) => {
            if (err) res.status(500).send({ message: `Error when search hotels: ${err}` });
        })
        res.status(200).send({
            message: 'Search complete',
            results: hotels
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' })
    }
}

async function filters(req, res) {
    try {
        let query;
        let name = req.body.name || '';
        if (req.body.stars) query = { stars: { $in: req.body.stars }, name: new RegExp(name, 'i') }
        else query = { name: new RegExp(name, 'i') }

        Hotel.find(query, (err, hotels) => {
            if (err) res.status(500).send({ message: 'Internal server error' });

            res.status(200).send({ message: 'Applied filters', results: hotels })
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' })
    }
}

async function remove(req, res) {
    try {
        const id = req.params.id
        Hotel.findOneAndRemove({ id: id }, (err) => {
            if (err) res.status(500).send({ message: 'Internal server error' });

            res.status(201).send({ message: 'Correctly eliminated' })
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' })
    }
}

async function update(req, res) {
    try {
        Hotel.findOneAndUpdate({ id: req.params.id }, req.body, (err) => {
            if (err) res.status(500).send({ message: 'Internal server error' });

            res.status(200).send({ message: 'Correctly updated' })
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Internal server error' })
    }
}

module.exports = { create, read, create_many, filters, remove, update }