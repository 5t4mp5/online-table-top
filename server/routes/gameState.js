const router = require('express').Router();
const { setGameState, updateGameState, getGameState } = require('../../db');

router.get('/:id', (req, res, next) => {
    getGameState(req.params.id)
        .then(state => res.json(state))
        .catch(e => console.log(e));
});

router.post('/:id', (req, res, next) => {
    console.log("POST DATA", req.body);
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
