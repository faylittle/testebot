const { Schema, model } = require("mongoose");

const TicketModelSave = new Schema({
    ticketId: { type: String },
    ticket: {
        description: { type: String },
        message: { type: String }
    }
});

module.exports = model('ticketreino', TicketModelSave);