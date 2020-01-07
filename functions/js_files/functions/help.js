"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = (msg, bot, model) => {
    const manual = ('Os comandos válidos são:\n'
        + '/evento nomeEvento descrição(opcional)(todo o texto digitado após o nome do evento será considerado descrição)\n'
        + 'Cria um novo evento.\n'
        + '/visualizar\n'
        + 'Lista todos os eventos disponíveis para inscrição.\n'
        + '/editar nomeEvento novoNome novaDescrição(opcional)(todo o texto digitado após o nome do evento será considerado descrição)\n'
        + 'Edita o conteúdo de um evento que já existe. \n'
        + '/remover nomeEvento\n'
        + 'Remove um evento existente.\n'
        + '/meus_eventos\n'
        + 'Lista os eventos criados por você.\n'
        + `/meus_inscritos nomeEvento\n`
        + `Lista todos os inscritos, no evento que você solicitar\n`
        + '/participar nomeEvento\n'
        + 'Inscreve você em um dado evento.\n'
        + '/cancelar nomeEvento\n'
        + 'Cancela a inscrição em um evento que você já está inscrito.\n'
        + '/minhas_inscricoes\n'
        + 'lista todos os eventos que você está inscrito.');
    bot.sendMessage(msg.from.id, manual);
};
