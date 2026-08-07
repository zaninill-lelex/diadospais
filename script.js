/*
=====================================================
 GeraQuiz
 script.js
 Parte 1 - Estrutura principal do jogo
=====================================================
*/


// ====================================================
// CONFIGURAÇÕES GLOBAIS
// ====================================================

const CONFIG = {

    maxPlayers: 6,

    defaultTime: 15,

    xpPerCorrect: 50,

    pointsPerCorrect: 100

};


// ====================================================
// ESTADO DO JOGO
// ====================================================

const gameState = {


    players: [],

    currentPlayer:0,

    currentQuestion:null,

    score:0,

    round:1,

    settings:{},

    history:[]


};


// ====================================================
// CLASSE PLAYER
// ====================================================


class Player{


    constructor(name, avatar="😀"){


        this.name=name;

        this.avatar=avatar;

        this.score=0;

        this.xp=0;

        this.level=1;

        this.correct=0;

        this.wrong=0;

        this.combo=0;

        this.maxCombo=0;

        this.achievements=[];

        this.titles=[];


    }



    addPoints(points){


        this.score+=points;


    }



    addXP(value){


        this.xp+=value;


        this.checkLevel();


    }



    checkLevel(){


        const required=this.level*500;


        if(this.xp>=required){


            this.level++;


            this.xp=0;


            showLevelUp(this);



        }


    }



    correctAnswer(){


        this.correct++;

        this.combo++;


        if(this.combo>this.maxCombo){

            this.maxCombo=this.combo;

        }


    }



    wrongAnswer(){


        this.wrong++;

        this.combo=0;


    }



}


// ====================================================
// CLASSE GAME
// ====================================================


class Game{


    constructor(){


        this.players=[];

        this.current=0;

        this.questions=[];

        this.round=1;


    }



    addPlayer(player){


        this.players.push(player);


    }



    getCurrentPlayer(){


        return this.players[this.current];


    }



    nextPlayer(){


        this.current++;


        if(this.current>=this.players.length){

            this.current=0;

            this.round++;

        }


    }



    reset(){


        this.players=[];

        this.current=0;

        this.round=1;


    }



}


// Instância principal

const game=new Game();



// ====================================================
// SISTEMA DE TELAS
// ====================================================


const screens=[

    "home",
    "setup",
    "game",
    "results",
    "tutorial",
    "settings"

];



function showScreen(id){


    screens.forEach(screen=>{


        const element=document.getElementById(screen);


        if(element){


            element.classList.add("hidden");


        }


    });



    document.getElementById(id)
        .classList.remove("hidden");


}



// ====================================================
// BOTÕES MENU
// ====================================================


document
.getElementById("btnStart")
.onclick=function(){


    showScreen("setup");


};



document
.getElementById("btnTutorial")
.onclick=function(){


    showScreen("tutorial");


};



document
.getElementById("btnSettings")
.onclick=function(){


    showScreen("settings");


};



document
.getElementById("closeTutorial")
.onclick=function(){


    showScreen("home");


};



// ====================================================
// CRIAÇÃO DE JOGADORES
// ====================================================


const playerCount=
document.getElementById("playerCount");



playerCount
.addEventListener(
"change",
createPlayerInputs
);



function createPlayerInputs(){


    const area=
    document.getElementById("playersArea");


    area.innerHTML="";


    for(
        let i=1;
        i<=playerCount.value;
        i++
    ){


        area.innerHTML+=`

        <div class="playerCard">


            <div class="avatar">
                ${i}
            </div>


            <input 
            class="playerName"
            placeholder="Nome do jogador ${i}">


        </div>

        `;


    }


}



createPlayerInputs();



// ====================================================
// INICIAR PARTIDA
// ====================================================


document
.getElementById("btnCreateGame")
.onclick=function(){


    game.reset();


    const names=
    document.querySelectorAll(".playerName");



    names.forEach((input,index)=>{


        let name=input.value.trim();


        if(name===""){

            name=`Jogador ${index+1}`;

        }


        game.addPlayer(

            new Player(
                name,
                "😀"
            )

        );


    });



    saveGame();


    startGame();


};



// ====================================================
// INICIAR JOGO
// ====================================================


function startGame(){


    showScreen("game");


    updatePlayerUI();


}



// ====================================================
// ATUALIZA INTERFACE
// ====================================================


function updatePlayerUI(){


    const player=
    game.getCurrentPlayer();



    document
    .getElementById("playerName")
    .innerHTML=
    player.avatar+" "+player.name;



    document
    .getElementById("playerLevel")
    .innerHTML=
    "Nível "+player.level;



    document
    .getElementById("score")
    .innerHTML=
    player.score;



}



// ====================================================
// LOCAL STORAGE
// ====================================================


function saveGame(){


    localStorage.setItem(

        "geraquiz_save",

        JSON.stringify(game.players)

    );


}



function loadGame(){


    const data=
    localStorage.getItem(
        "geraquiz_save"
    );



    if(data){


        return JSON.parse(data);


    }


    return [];

}


// ====================================================
// LEVEL UP
// ====================================================


function showLevelUp(player){


    const popup=
    document.getElementById(
        "levelPopup"
    );


    popup.innerHTML=
    `
    ⭐ Level Up!

    <br>

    ${player.name}

    chegou ao nível ${player.level}

    `;



    popup.classList.remove("hidden");



    setTimeout(()=>{


        popup.classList.add("hidden");


    },3000);



}
