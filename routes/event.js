const { Router } = require('express');
const { check } = require('express-validator');
const { createEvent, getEvents, updateEvent, getEventById, deleteEvent } = require('../controllers/event');
const { isDate } = require('../middlewares/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.use( validarJWT );

router.post(
    '/',
    [
        check('title', 'The title is required.').not().isEmpty(),
        check('start', 'The start is required.').custom( isDate ),
        check('end', 'The end is required.').custom(isDate),
        validarCampos
    ],
    createEvent
);

router.get(
    '/',
    getEvents
);

router.get(
    '/:id',
    getEventById
);

router.put(
    '/:id',
    [
        check('start', 'The start is required.').custom( isDate ),
        check('end', 'The end is required.').custom(isDate),
        validarCampos
    ],
    updateEvent
);

router.delete(
    '/:id',
    deleteEvent
)

module.exports = router;