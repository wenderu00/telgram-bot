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
exports.cancel = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = msg.from.id;
    const nome = msg.from.first_name + ' ' + msg.from.last_name;
    const texto = msg.text.split(' ');
    const titulo = texto[1];
    const evento = yield model.findOne({ titulo: titulo });
    var len;
    var i;
    var continua;
    if (!evento) {
        bot.sendMessage(chat_id, 'esse evento não existe');
    }
    else {
        len = evento.participantes.length;
        i = 0;
        continua = true;
        while (i < len && continua) {
            if (evento.participantes[i].id == chat_id) {
                evento.participantes.splice(i, 1);
                bot.sendMessage(chat_id, 'você cancelou sua inscrição com sucesso');
                bot.sendMessage(evento.criador, nome + ' cancelou a participação no seu evento');
                yield model.findByIdAndUpdate(evento._id, { participantes: evento.participantes });
                continua = false;
            }
            i++;
        }
    }
});
//# sourceMappingURL=cancel.js.map