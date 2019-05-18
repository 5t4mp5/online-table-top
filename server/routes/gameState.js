const router = require('express').Router();
const { setGameState, updateGameState, getGameState, setPlayer } = require('../../db');

router.put('/:id/players/:playerMax', (req, res, next) => {
    setPlayer(req.params.id, req.session.userId,req.params.playerMax)
        .then(() => res.json({ player: req.session.userId }))
        .catch(e => console.error(e));
});

router.get('/:id', (req, res, next) => {
    getGameState(req.params.id)
        .then(state => {
            state.myId = req.session.userId,
            res.json(state);
        })
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
