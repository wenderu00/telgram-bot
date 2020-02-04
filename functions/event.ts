export const evento=async(
    msg: {
        text: string;
        from: { id: number }
    },
    bot: { 
        sendMessage: (arg0: number, arg1: string) => void
    },
    model: { 
        new(
            arg0: {
                titulo: string;
                desc: string; 
                participantes: any[]; 
                criador: number 
            }): any;
            findOne: (arg0: { titulo: string}) => any 
    }) => {
    const texto=msg.text.split(' ')
    const chat_id=msg.from.id
    
    const titulo=texto[1]
    texto.splice(0,2)
    var desc=''
    var x: string | number
    for(x in texto){
        desc+=texto[x]+' '
    }
    var not_single=await model.findOne({titulo:titulo})
    if(!titulo){
        bot.sendMessage(chat_id,'você não digitou um evento válido')
    }
    else if(not_single){
        bot.sendMessage(chat_id, 'esse nome já está sendo utilizado, tente outro nome!')
    }
    else{
        const evento= new model({
            titulo: titulo,
            desc: desc,
            participantes: [{
                nome: msg.from.first_name+' '+msg.from.last_name,
                id: chat_id,
                date:Date(msg.date)
            }],
            criador: chat_id
        })
        
        evento.save().then(() => console.log('evento'))
        
        bot.sendMessage(chat_id,'Evento adicionado com sucesso')    
    }
}