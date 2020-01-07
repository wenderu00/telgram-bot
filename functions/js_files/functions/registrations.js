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
exports.registrations = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const chat_id = msg.from.id;
    const eventos = yield model.find();
    var existe = false;
    var evento_atual;
    var inscrito;
    var x;
    var len;
    var i;
    for (x in eventos) {
        evento_atual = eventos[x];
        inscrito = false;
        len = evento_atual.participantes.length;
        i = 0;
        while (i < len && !inscrito) {
            if (evento_atual.participantes[i].id == chat_id) {
                inscrito = true;
            }
            i++;
        }
        if (inscrito && !existe) {
            existe = true;
            bot.sendMessage(chat_id, 'Os eventos que você está inscrito, são:');
            bot.sendMessage(chat_id, evento_atual.titulo);
        }
        else if (inscrito) {
            bot.sendMessage(chat_id, evento_atual.titulo);
        }
    }
    if (!existe) {
        bot.sendMessage(chat_id, 'você não está inscrito em nenhum evento.');
    }
});
