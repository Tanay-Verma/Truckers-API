const Journeys = require('../models/Journeys')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')

const createJourney = async (req,res) => {
    req.body.createdBy = req.trucker.truckerID
    const journey = await Journeys.create(req.body)
    res.status(StatusCodes.CREATED).json(journey)
}

const getAllJourneys = async (req,res) => {
    const journeys = await Journeys.find({createdBy: req.trucker.truckerID}).sort('createdAt')
    res.status(StatusCodes.OK).json({journeys, count: journeys.length})
}

const getJourney = async (req,res) => {
    const {trucker:{truckerID}, params:{journeyid:journeyID}} = req

    const journey = await Journeys.findOne({_id: journeyID, createdBy: truckerID})

    if(!journey) throw new NotFoundError(`No journey with id ${journeyID}`)

    res.status(StatusCodes.OK).json(journey)
}

const updateJourney = async (req,res) => {
    const {trucker:{truckerID}, params:{journeyid:journeyID}} = req

    const journey = await Journeys.findOneAndUpdate({_id: journeyID, createdBy: truckerID}, 
        req.body, 
        {new:true,runValidators:true}
        )

    if(!journey) throw new NotFoundError(`No journey with id ${journeyID}`)

    res.status(StatusCodes.OK).json(journey)
}

const deleteJourney = async (req,res) => {
    const {trucker:{truckerID}, params:{journeyid:journeyID}} = req

    const journey = await Journeys.findOneAndRemove({
        _id:journeyID,
        createdBy: truckerID
    })

    if(!journey) throw new NotFoundError(`No journey with id ${journeyID}`)

    res.status(StatusCodes.OK).send(`Deleted journey with id ${journeyID}`)
}

module.exports = {
    createJourney,
    getAllJourneys,
    getJourney,
    updateJourney,
    deleteJourney
}