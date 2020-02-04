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
exports.evento = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const texto = msg.text.split(' ');
    const chat_id = msg.from.id;
    const titulo = texto[1];
    texto.splice(0, 2);
    var desc = '';
    var x;
    for (x in texto) {
        desc += texto[x] + ' ';
    }
    var not_single = yield model.findOne({ titulo: titulo });
    if (!titulo) {
        bot.sendMessage(chat_id, 'você não digitou um evento válido');
    }
    else if (not_single) {
        bot.sendMessage(chat_id, 'esse nome já está sendo utilizado, tente outro nome!');
    }
    else {
        const evento = new model({
            titulo: titulo,
            desc: desc,
            participantes: [{
                    nome: msg.from.first_name + ' ' + msg.from.last_name,
                    id: chat_id,
                    date: Date(msg.date)
                }],
            criador: chat_id
        });
        evento.save().then(() => console.log('evento'));
        bot.sendMessage(chat_id, 'Evento adicionado com sucesso');
    }
});
//# sourceMappingURL=event.js.map