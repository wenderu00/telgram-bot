promises= new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve(console.log('promise resolved'))
    , 2000})
})

const isDone = new Promise((resolve, reject) => {
    if(reject){
        console.log('deu merda')
    }
    else{
        console.log('uhuuuu')
    }
})
//...

const checkIfDone = () => {
  isDone
    .then(ok => {
      console.log(ok)
    })
    .catch(err => {
      console.error(error)
    })
}
module.exports.i=isDone