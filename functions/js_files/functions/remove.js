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
exports.remove = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = msg.from.id;
    const texto = msg.text.split(' ');
    const titulo = texto[1];
    const evento = yield model.findOne({ titulo: titulo });
    var criador;
    var evento_id;
    if (evento) {
        criador = evento.criador;
        evento_id = evento._id;
    }
    var temp_id;
    var x;
    if (!evento || !titulo) {
        bot.sendMessage(chat_id, 'Esse evento não existe');
    }
    else if (criador != chat_id) {
        bot.sendMessage(chat_id, 'Você não criou o evento. Portanto, não pode removê-lo.');
    }
    else {
        for (x in evento.participantes) {
            temp_id = evento.participantes[x].id;
            bot.sendMessage(temp_id, 'o evento ' + evento.nome + ' foi cancelado.');
        }
        yield model.findByIdAndDelete(evento_id);
        bot.sendMessage(chat_id, 'evento removido com sucesso!');
    }
});
