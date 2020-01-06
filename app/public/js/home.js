menu = document.querySelectorAll(".down");
menu[0].onclick = function(){
    var obj = new XMLHttpRequest();
    obj.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.querySelector(".container").innerHTML = obj.responseText;
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