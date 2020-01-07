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
exports.my_subscribeds = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = msg.from.id;
    const texto = msg.text.split(' ');
    const titulo = texto[1];
    const evento = yield model.findOne({ titulo: titulo });
    var criador;
    var inscritos;
    if (evento) {
        criador = evento.criador;
        inscritos = evento.participantes;
    }
    var x;
    if (!evento) {
        bot.sendMessage(chat_id, 'O evento não existe.');
    }
    else if (criador != chat_id) {
        bot.sendMessage(chat_id, 'Você não tem acesso aos inscritos desse evento, pois não foi você quem o criou.');
    }
    else if (inscritos.length === 0) {
        bot.sendMessage(chat_id, 'Não há inscritos nesse evento.');
    }
    else {
        for (x in inscritos) {
            bot.sendMessage(chat_id, inscritos[x].nome);
        }
    }
});
//# sourceMappingURL=my_subscribeds.js.map