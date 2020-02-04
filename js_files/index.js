"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const TOKEN = `1000189466:AAHZ7ikeQ0A8xTpMzMGAPizaFosAYQtopbA`;
const bot = new node_telegram_bot_api_1.default(TOKEN, { polling: true });
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://mwmcj:Okko1234@cluster0-navix.mongodb.net/telegram_event_manager?retryWrites=true&w=majority', { useNewUrlParser: true });
const Evento = mongoose_1.default.model('Evento', {
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
const sugestao_1 = require("./functions/sugestao");
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
    '/start': help_1.help,
    '/conselho': sugestao_1.conselho
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
//# sourceMappingURL=index.js.map