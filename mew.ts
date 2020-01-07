
import TelegramBot from 'node-telegram-bot-api';

const TOKEN = `1000189466:AAHZ7ikeQ0A8xTpMzMGAPizaFosAYQtopbA`

const bot = new TelegramBot(TOKEN, {polling: true})

import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://mwmcj:Okko1234@cluster0-navix.mongodb.net/telegram_event_manager?retryWrites=true&w=majority', {useNewUrlParser: true});

const Evento = mongoose.model('Evento',{
    titulo: String,
    desc: String,
    criador: Number,
    participantes: Array
})
import {evento} from './functions/event'
import {view} from './functions/view'
import {edit} from './functions/edit'
import {remove} from './functions/remove'
import {go} from './functions/go'
import {my_events} from './functions/my_events'
import {my_subscribeds} from './functions/my_subscribeds'
import {registrations} from './functions/registrations'
import {cancel} from './functions/cancel'
import {help} from './functions/help'

const comandos={
    '/evento': evento,
    '/visualizar': view,
    '/editar': edit,
    '/remover':remove,
    '/meus_eventos':my_events,
    '/meus_inscritos': my_subscribeds,
    '/participar':go,
    '/minhas_inscricoes':registrations,
    '/cancelar': cancel,
    '/help': help,
    '/start': help
}

bot.on('message',(msg) => {
    const ordem=msg.text.split(' ')[0]
    if(ordem[0]!='/'){
        msg.message_id
    }
    else if(ordem in comandos){
        comandos[ordem](msg,bot,Evento)
    }
    else{
        bot.sendMessage(msg.from.id,'comando inválido, digite /help para conferir a documentação.')
    }
})