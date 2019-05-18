const router = require('express').Router();
const { setGameState, updateGameState, getGameState, setPlayer } = require('../../db');

router.get('/:id/players/:playerId', (req, res, next) => {
    setPlayer(req.params.id, req.params.playerId)
        .then(() => res.sendStatus(201))
        .catch(e => console.error(e));
});

router.get('/:id', (req, res, next) => {
    getGameState(req.params.id)
        .then(state => res.json(state))
        .catch(e => console.log(e));
});

router.post('/:id', (req, res, next) => {
    setGameState(req.body, req.params.id)
        .then(state => res.json(state))
        .catch(e => console.log(e));
});

router.put('/:id', (req, res, next) => {
    updateGameState(req.body, req.params.id)
        .then(state => res.json(state))
        .catch(e => console.log(e));
});

module.exports = router;
