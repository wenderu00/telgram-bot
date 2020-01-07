"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const TelegramBot = __importStar(require("node-telegram-bot-api"));
const TOKEN = `1000189466:AAHZ7ikeQ0A8xTpMzMGAPizaFosAYQtopbA`;
const bot = new TelegramBot(TOKEN, { polling: true });
const mongoose = __importStar(require("mongoose"));
mongoose.connect('mongodb+srv://mwmcj:Okko1234@cluster0-navix.mongodb.net/telegram_event_manager?retryWrites=true&w=majority', { useNewUrlParser: true });
const Evento = mongoose.model('Evento', {
    titulo: String,
    desc: String,
    criador: Number,
    participantes: Array
});
const event_1 = require("./functions/event");
const view_1 = require("./functions/view");
const edit_1 = require("./functions/edit");
const remove_1 = require("./functions/remove");
const go_1 = require("./functions/go");
const my_events_1 = require("./functions/my_events");
const my_subscribeds_1 = require("./functions/my_subscribeds");
const registrations_1 = require("./functions/registrations");
const cancel_1 = require("./functions/cancel");
const help_1 = require("./functions/help");
const comandos = {
    '/evento': event_1.evento,
    '/visualizar': view_1.view,
    '/editar': edit_1.edit,
    '/remover': remove_1.remove,
    '/meus_eventos': my_events_1.my_events,
    '/meus_inscritos': my_subscribeds_1.my_subscribeds,
    '/participar': go_1.go,
    '/minhas_inscricoes': registrations_1.registrations,
    '/cancelar': cancel_1.cancel,
    '/help': help_1.help,
    '/start': help_1.help
};
bot.on('message', (msg) => {
    const ordem = msg.text.split(' ')[0];
    if (ordem[0] != '/') {
        msg.message_id;
    }
    else if (ordem in comandos) {
        comandos[ordem](msg, bot, Evento);
    }
    else {
        bot.sendMessage(msg.from.id, 'comando inválido, digite /help para conferir a documentação.');
    }
});
