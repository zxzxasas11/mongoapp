module.exports=function(len){
    const arr = ["1","2","3","4","5","6","7","8","9","0","A","B","C","D","E","F","G","J","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    let code='';
    for(let i=0;i<len;i++){
        code +=arr[Math.floor(Math.random()*36)];
    }
    console.log(code);
    return code;
}
