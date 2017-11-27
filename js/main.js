class Manager {
    constructor (carNumber){
        this.carNumber = carNumber;

    }

    init() {
        this.setPist();
        this.setCars();
        this.startRun();
    }

    setPist() {
       this.pist = new Pist(this.carNumber);
    }

    setCars() {
        this.cars = [];
        for(let i=0; i < this.carNumber; i++) {
            this.cars.push(new Car()); 
        }
        for(let i=0; i < this.cars.length; i++) {
           $(`#car_${i}`).append(this.cars[i].carShape())
        }

    }

    startRun() {
        const cars = this.cars;
        const pist = this.pist;
        let interval = setInterval(function(){
            for(let i=0; i < cars.length; i++) {
                cars[i].run(); 
                if(cars[i].getDistance() > ( pist.getLength() - 100)){
                    cars[i].getDom().css("border","2px solid red");
                    clearInterval(interval);
                }
            }
        },30);
        
    }
}

class Pist {
    constructor (number){
        this.carNumber = number;
        this.addPistToDom();
    }

    addPistToDom() {
        $(".pist").html('');
        for(let i=0; i < this.carNumber; i++) {
            let line = $(`<div id="car_${i}" class="line">`);
            $(".pist").append(line);
            console.log('car race', this.carNumber);
        }
    }

    getLength () {
        return $(".pist").width();
    }

    isFinished() {

    }
}

class Car {
    constructor () {
        
        this.left = 10;
    }

    getRandomNumber (limit) {
        return Math.floor(Math.random() * limit);
    }

    run(){
        this.carWeight = this.getRandomNumber(2000) + 1000;
        this.ps = this.getRandomNumber(200) + 200;
        this.speed = (this.ps / this.carWeight) * 10;
        this.dom.text(Math.floor(this.speed * 100) + " kmh");
        this.left += this.speed;
        this.dom.css("position","absolute").css("left",this.left);  
    }

    stopCar () {
        clearInterval (this.interval);
    }
    
    getColor(){
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    carShape(){
       this.dom = $('<div>')
       .css("height",100)
       .css("width",100)
       .css("color","black")
       .css("background-image", "url('./../img/running.png')")
       .css("background-size", "100px 120px")
       .css("border-bottom","10px solid " + this.getColor());
       return this.dom;
    }

    getDom () {
        return this.dom;
    }

    getDistance () {
        let a = this.dom.offset();
        return a.left;
    }

    
}

new Manager(6).init();