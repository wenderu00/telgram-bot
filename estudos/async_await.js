a=require('./promises')
y=() =>{
    i=0
    while(i<(99)){
        i++
    }
    return a.a
}
x= async() => {
    z=await y()
    console.log(z)
}
x()