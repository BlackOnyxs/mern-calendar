const Event = require('../models/Event');

const createEvent = async ( req, res ) => {
    const event  = new Event( req.body );

    try {
        event.user =  req.uid;

        const saveEvent = await event.save();

        res.json({
            ok: true,
            event: saveEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        });
    }
}

const getEvents = async(req, res) => {

    try {

        const events = await Event.find()
                                    .populate('user', 'name');
        res.json({
            ok: true, 
            events
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        });
    }
}

const getEventById = async( req, res ) =>{
    const eventId = req.params.id;

    try {
        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id.'
            });
        } 

        res.json({
            ok: true,
            event
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        });
    }
} 

const updateEvent = async (req, resp) => {
    const eventId = req.params.id;

    try {
        
        const event = await Event.findById(eventId);

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id.'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento.'
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

        res.json({
            ok: true,
            event: updatedEvent
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        });
    }
}

const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    
    try {

        const event = await Event.findById(eventId);
        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un evento con ese id.'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento.'
            });
        }

        await Event.findByIdAndDelete(eventId);

        res.json({
            ok: true
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        });
    }


}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent
}