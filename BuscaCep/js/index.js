$(document).ready(function() {
$("#cep").mask("99.999-999");
$("#nascimento").mask("99/99/9999");
$("#telefone").mask("(99) 9999-9999");
$("#celular").mask("(99) 9 9999-9999");
$("#salvarPessoa").prop("disabled",true);

});


/**
    Class Pessoa
*/

$("#buscaCEP").click(function(){
  if($("#cep").val()!="")
  {
    $("#salvarPessoa").prop("disabled",false);
  }
  else
  {
    alert("Informe seu CEP!");
  }

});


var Pessoa = function()
{
  var self = this;

  this.addRow = function() {
    nome = $("#nome").val();
    email = $("#email").val();
    telefone = $("#telefone").val();
    if(nome!=""&&email!=""&&telefone!=""){

    var row = "<tr><th scope='row'>" + nome + "</th>" +
      "<td>" + $("#endereco").val() + "</td>      <td>" + email  + "</td>      <td>" + $("#nascimento").val() + "</td>      <td>" + telefone + "</td> <td>" + $("#celular").val() + " </td> </tr>";
    $("#table-result").append(row);


    self.clearForm();
  }
  else
  {
    alert("campos obrigatorios: Nome, Telefone ou email vazios");
  }



  }

  this.clearForm = function() {
      // Limpa valores do formulário de Pessoa.
      $("#nome").val('');
      $("#endereco").val('');
      $("#celular").val('');
      $("#telefone").val('');
      $("#nascimento").val('');
      $("#email").val('');
      $("#senha").val('');
      $("#cep").val('');
      $("#endereco").val("");
      $("#bairro").val("");
      $("#cidade").val("");
      $("#uf").val("");
      $("#ibge").val("");

  }

}


var Cep = function(){

  var self = this;

  var elements = {};

  var cep = '';

  this.addRow = function() {
    var row = "<tr><th scope='row'>" + self.cep + "</th>" +
      "<td>" + self.elements.logradouro + "</td>      <td>" + self.elements.bairro  + "</td>      <td>" + self.elements.ibge + "</td>      <td>" + self.elements.localidade + "</td> <td>" + self.elements.uf + " </td> </tr>";
    $("#table-result").append(row);
    self.clearForm();
    var cep = '';
    elements = {};
    $("#cep").val('');

  }

  this.clearForm = function() {
      // Limpa valores do formulário de cep.
      $("#endereco").val("");
      $("#bairro").val("");
      $("#cidade").val("");
      $("#uf").val("");
      $("#ibge").val("");
      $("#cep").val('');
  }

  this.searchCep = function() {
     var elemCep = $("#cep");


     //Nova variável "cep" somente com dígitos.
     var cep = elemCep.val().replace(/\D/g, '');

     //Verifica se campo cep possui valor informado.
     if (cep != "") {
       self.cep = elemCep.val();

         //Expressão regular para validar o CEP.
         var validacep = /^[0-9]{8}$/;

         //Valida o formato do CEP.
         if(validacep.test(cep)) {

             //Preenche os campos com "..." enquanto consulta webservice.
             $("#endereco").val("...");
             $("#bairro").val("...");
             $("#cidade").val("...");
             $("#uf").val("...");
             $("#ibge").val("...");

             //Consulta o webservice viacep.com.br/
             $.getJSON("https://viacep.com.br/ws/"+ cep +"/json/?callback=?", function(dados) {

                 if (!("erro" in dados)) {
                     //Atualiza os campos com os valores da consulta.
                     $("#endereco").val(dados.logradouro);
                     $("#bairro").val(dados.bairro);
                     $("#cidade").val(dados.localidade);
                     $("#uf").val(dados.uf);
                     $("#ibge").val(dados.ibge);
                     self.elements = dados;
                 } //end if.
                 else {
                     //CEP pesquisado não foi encontrado.
                    self.clearForm();
                    alert("CEP não encontrado.");
                    $("#salvarPessoa").prop("disabled",true);
                 }
             });
         } //end if.
         else {
             //cep é inválido.
            self.clearForm();
             alert("Formato de CEP inválido.");

         }
     } //end if.
     else {
         //cep sem valor, limpa formulário.
         self.clearForm();

     }
  }
}
