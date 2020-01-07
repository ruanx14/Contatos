botoesFuncoes();
menu = document.querySelectorAll(".down");
searchContato = document.querySelector(".search");
searchContato.onkeyup = function(){
    pesquisa = searchContato.value;
    obj = new XMLHttpRequest();
    obj.onreadystatechange = function(){
        if(this.readyState==4){
            document.querySelector(".container").innerHTML = obj.responseText;
        }
    }
    obj.open('GET','listarContatos?search='+pesquisa,true);
    obj.send();
}
menu[0].onclick = function(){
    var obj = new XMLHttpRequest();
    obj.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.querySelector(".container").innerHTML = obj.responseText;
          botoesFuncoes();
      }
    };
   obj.open("GET", "adicionarContato", true);
   obj.send();
}
menu[1].onclick = function(){
    var obj = new XMLHttpRequest();
    obj.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.querySelector(".container").innerHTML = obj.responseText;
      }
    };
   obj.open("GET", "listarContatos", true);
   obj.send();
}
menu[2].onclick = function(){
    window.location.href = "sair"; 
}
function getValoresLeft(){
    inputs = document.querySelectorAll('.side-1 input');
    valores = [];
    for(var i=0;i<inputs.length;i++){
        valores.push(inputs[i].value);
    }
    return valores;
}
function returnValuesLeft(valores){
    inputs = document.querySelectorAll('.side-1 input');
    for(var i=0;i<inputs.length;i++){
        if(valores[i]!=undefined){
            inputs[i].value = valores[i];
        }else{
            inputs[i].value = "";
        }
    }
}
function getValoresLeft(){
    inputs = document.querySelectorAll('.side-1 input');
    valores = [];
    for(var i=0;i<inputs.length;i++){
        valores.push(inputs[i].value);
    }
    return valores;
}
function returnValuesLeft(valores){
    inputs = document.querySelectorAll('.side-1 input');
    for(var i=0;i<inputs.length;i++){
        if(valores[i]!=undefined){
            inputs[i].value = valores[i];
        }else{
            inputs[i].value = "";
        }
    }
}
function getValoresRight(){
    inputs = document.querySelectorAll('.side-2 input');
    valores = [];
    for(var i=0;i<inputs.length;i++){
        valores.push(inputs[i].value);
    }
    return valores;
}
function returnValuesRight(valores){
    inputs = document.querySelectorAll('.side-2 input');
    for(var i=0;i<inputs.length;i++){
        if(valores[i]!=undefined){
            inputs[i].value = valores[i];
        }else{
            inputs[i].value = "";
        }
    }
}
function botoesFuncoes(){
    botoes = document.querySelectorAll("input[type=button]");
    botoes[0].onclick = function(){
        info = document.querySelector('.side-1');
        valores = getValoresLeft();
        obj = info.innerHTML + '<label>Redes: </label><input type=\"text\" name=\"redes\" placeholder=\"Link do Facebook, Instagram, Twitter...\">';
        info.innerHTML = obj; 
        returnValuesLeft(valores);
    }
    botoes[1].onclick = function(){
        info = document.querySelector('.side-2');
        valores = getValoresRight();
        obj = info.innerHTML + '<label>Numero: </label><input type=\"text\" name=\"numeros\" placeholder=\"Outro número\">';
        info.innerHTML = obj;
        returnValuesRight(valores);
        
    }
}

/* 


db.contato.find({   $or:[  {nome : /^a/},{email : /^a/},{sobrenome : /^a/}   ]    });

db.things.find( {
    $and : [
             { 
               $or : [ 
                       {"first_name" : "john"},
                       {"last_name" : "john"}
                     ]
             },
             { 
               "Phone":"12345678"
             }
           ]
  } ) 
  
  */