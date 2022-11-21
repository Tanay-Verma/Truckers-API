const express = require('express')
const router = express.Router()

const {createJourney,getAllJourneys, getJourney, updateJourney, deleteJourney} = require('../controllers/Journeys')

router.route('/').post(createJourney).get(getAllJourneys)
router.route('/:journeyid').get(getJourney).patch(updateJourney).delete(deleteJourney)

module.exports = router