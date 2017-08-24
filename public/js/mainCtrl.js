var app = angular.module('app',[]);
var INTERVAL = 300;
var welcomeArray = ['B','e','m ','V','i','n','d','o'];
var arrayPos = 0;
//store members in array
var members = ['Dr. Arnaldo Gonçalves Bastos Jr.',
               'Dr. Neildon Alves Oliveira',
               'Dr. Ricardo da Silva Izola'];

app.controller('mainCtrl',['$scope','$http','$interval',function($scope,$http,$interval){
  $scope.page = "partials/index.html";
  $scope.reviews = [];
  $scope.welcomeMessage = "";
  $scope.currentMenu = "partials/team-menu.html";
  $scope.currentMember = "";
  $scope.profileImage = "";
  $scope.memberTitle = "";
  $scope.currentElement = null;

  $http.get('js/reviews.json').then(function(data){
    $scope.reviews = data;
  },function(err){
    $scope.reviews = "";
  });

//animating the Bem Vindo welcome message simulate typing
var interval = $interval(addLetter,INTERVAL);
  function addLetter(){
    $scope.welcomeMessage+=welcomeArray[arrayPos];
    arrayPos++;
    if(arrayPos>=welcomeArray.length) $interval.cancel(interval);
  }

$scope.goBackToTeam = function(){
  $scope.currentMember = "";
  $scope.profileImage = "";
  $scope.memberTitle = "";
  $scope.currentElement = null;
  var e = document.getElementsByClassName("team")[0];
  e.classList.remove("member-selected");
  $scope.currentMenu = "partials/team-menu.html";
}

  //change member listeners
  $scope.changeMember = function(e){
    var team = document.getElementsByClassName('team')[0];
    team.classList.add('member-selected');
    $scope.currentElement = e.target;
    //find the h1 element and grab the text content of it
    if(e.target.tagName==="DIV"){
      $scope.currentElement = e.target.childNodes[1];
    }
    $scope.currentMember = $scope.currentElement.textContent;
    if($scope.currentMember===members[0]){
      $scope.profileImage = "res/arnaldo.jpg";
    }else if($scope.currentMember===members[1]){
      $scope.profileImage = "res/neildon.jpg";
    }else if($scope.currentMember===members[2]){
      $scope.profileImage = "res/ricardo.jpg";
    }
      $scope.currentMenu = "partials/member.html";
  }

  $scope.getDescription = function(){
    if($scope.currentMember===members[0]){
      $scope.memberTitle = "Dermatologista";
      return "Membro titular da Sociedade Brasileira de Dermatologia. Médico desde 1986 pela Escola Baiana de Medicina e Saúde Pública, período de 01/03/1981 a 03/12/1986. "
      +"Médico Estagiário em Dermatologia Clínica e Cirúrgica  no Ambulatório do Hospital Santa Izabel em Salvador/Bahia no período de 08/05/1989 a 02/12/1989. "
      +"Pós Graduação: Dermatologia  pela Universidade Federal da Bahia, período de 03/03/1990 a 03/04/1992."
      +"Pós Graduação: Medicina do Trabalho  pela Fundação Baiana para Desenvolvimento da Medicina e Saúde Pública, período de 01/08/1990 a 08/12/1991."
      +" Estágio em Alergia e Dermatologia Clínica, no Serviço de Imunização de Pele e Alergia, em Salvador/Bahia, no período de 03/01/1990 a 31/05/1990.";
    }else if($scope.currentMember===members[1]){
      $scope.memberTitle = "Dermatologista";
      return "Formação Acadêmica.\n "
            +"EMSP 1989 - 1994 - Médico \n"
            +"Tenente Médico da Marinha - 1998 \n"
            +"Pós Graduação: Residência Clínica Médica no HUPES: 1996 - 1998 \n"
            +"Concurso unificado de residência médica: 7º lugar \n"
            +"Pós Graduação: Residência em dermatologia no HUPES: 1999 - 2001 \n"
            +"Concurso unificado de residência médica: 1º lugar \n"
            +"Título de especialista pela Sociedade Brasileira de Dermatologia - 2001";
    }else if($scope.currentMember===members[2]){
      $scope.memberTitle = "Cirurgião Plástico";
      return "Cirurgião plástico desde 2004."
             +"Membro da Sociedade Brasileira de Cirurgia Plástica."
             +"Titulo de especialista em cirurgia plástica pela Sociedade Brasileira de Cirurgia Plástica."
             +"Titulo de especialista em cirurgia plástica reconhecido pelo Ministério da Educação- MEC."
             +"Residência médica de cirurgia plástica iniciada no Hospital São Paulo da Universidade Federal de São Paulo( UNIFESP-EPM) e concluída no Hospital Brigadeiro em São Paulo."
             +"Pós graduação em cirurgia de Mama no Hospital da Mulher de São Paulo - Hospital Pérola Byington em 2005."
             +"Atualmente atua na sua clínica particular, no Hospital Aristides Maltez, na SESAB e em hospitais referenciados.";
    }
  }

}]);
