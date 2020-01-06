botoes = document.querySelectorAll("input[type=button]");
botoes[0].onclick = function(){
    info = document.querySelector('.side-1');
    obj = info.innerHTML + '<label>Redes: </label><input type=\"text\" name=\"redes\" placeholder=\"Link do Facebook, Instagram, Twitter...\">';
    info.innerHTML = obj;
}
botoes[1].onclick = function(){
    info = document.querySelector('.side-2');
    obj = info.innerHTML + '<label>Numero: </label><input type=\"text\" name=\"numeros\" placeholder=\"Outro número\">';
    info.innerHTML = obj;
}