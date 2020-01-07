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
exports.view = (msg, bot, model) => __awaiter(void 0, void 0, void 0, function* () {
    const eventos = yield model.find();
    bot.sendMessage(msg.from.id, 'os eventos são:');
    var x;
    for (x in eventos) {
        var evento_atual = eventos[x];
        bot.sendMessage(msg.from.id, 'Nome: ' + evento_atual.titulo + '\nDesc:' + evento_atual.desc);
    }
});
//# sourceMappingURL=view.js.map