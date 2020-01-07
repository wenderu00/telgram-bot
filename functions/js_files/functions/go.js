"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.go = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = msg.from.id;
    const texto = msg.text.split(' ');
    const titulo = texto[1];
    const inscrito = {
        nome: msg.from.first_name + ' ' + msg.from.last_name,
        id: chat_id,
        date: Date(msg.date)
    };
    const evento = yield model.findOne({ titulo: titulo });
    var event_id;
    if (evento) {
        event_id = evento._id;
    }
    if (!evento || !titulo) {
        bot.sendMessage(chat_id, 'Esse evento não existe');
    }
    else {
        evento.participantes.push(inscrito);
        yield model.findByIdAndUpdate(event_id, { participantes: evento.participantes });
        bot.sendMessage(chat_id, 'você se inscreveu com sucesso!');
        bot.sendMessage(evento.criador, inscrito.nome + ' se inscreveu no evento ' + evento.titulo);
    }
});
