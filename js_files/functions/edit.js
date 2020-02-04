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
exports.edit = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = msg.from.id;
    const texto = msg.text.split(' ');
    const titulo = texto[1];
    const new_titulo = texto[2];
    const evento = yield model.findOne({ titulo: titulo });
    var criador;
    var evento_id;
    var not_single;
    if (evento) {
        criador = evento.criador;
        evento_id = evento._id;
        not_single = yield model.findOne({ titulo: new_titulo });
    }
    texto.splice(0, 3);
    var desc = '';
    var x;
    for (x in texto) {
        desc += texto[x] + ' ';
    }
    var temp_id;
    if (!evento) {
        bot.sendMessage(chat_id, 'Esse evento não existe');
    }
    else if (!(titulo && new_titulo)) {
        bot.sendMessage(chat_id, 'É necessário que você digite o antigo nome do evento e o novo nome do evento. Além disso, pode, se quiser, escrever a descrição.');
    }
    else if (criador != chat_id) {
        bot.sendMessage(chat_id, 'Você não criou o evento. Portanto, não pode modificá-lo.');
    }
    else if (not_single) {
        bot.sendMessage(chat_id, 'o nome que você deseja usar já está sendo utilizado, tente outro nome!');
    }
    else {
        for (x in evento.participantes) {
            temp_id = evento.participantes[x].id;
            bot.sendMessage(temp_id, 'o evento ' + evento.nome + ' foi alterado para ' + new_titulo);
        }
        yield model.findByIdAndUpdate(evento_id, { titulo: new_titulo, desc: desc });
    }
});
//# sourceMappingURL=edit.js.map