new Vue({
    el:"#app",
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning :false, //xác định có muốn chơi lại game hay không
        turns:[]
    },
    methods:{
        startGame :function(){
            this.gameIsRunning = true;
            this.monsterHealth =100;
            this.playerHealth = 100;
            this.turns = [];
        },
        attack:function(){
            //var damage = Math.max(Math.floor(Math.random()*max) +1,min); //floor:Trả về số nguyên lớn nhất nhỏ hơn hoặc bằng đối số số của nó.
                                                          //random : Trả về số giả ngẫu nhiên từ 0 đến 1.
            var damage = this.caculateDamage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: ' bạn đã đánh quái vật '+ damage
            });
            if(this.checkWin()){
                return;
            }
            //damage = this.caculateDamage(5,12);
            this.monsterAttack();
        },
        specialAttack: function(){
            var damage = this.caculateDamage(10,20);
            this.monsterHealth -= damage;
            if(this.checkWin()){
                return;
            }
            this.turns.unshift({
                isPlayer: true,
                text: ' bạn đã đánh quái vật đặt biệt '+ damage
            });
            this.monsterAttack();
        },
        health: function(){            
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }else{
                this.playerHealth = 100;
            }
            this.monsterAttack();
        },
        giveUp: function(){
            this.gameIsRunning = false;
            this.turns= [];
        },
        monsterAttack:function(){
            var damage = this.caculateDamage(5,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: ' quái vật đã đánh bạn '+ damage
            });
            this.checkWin();
        },
        caculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random()*max) +1,min);
        },
        checkWin: function(){
            if(this.monsterHealth <= 0){
                if(confirm('bạn thắng,bạn có muốn chơi lại')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm('bạn thua,bạn có muốn chơi lại')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});