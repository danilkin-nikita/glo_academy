'use strict';

class First {
  hello() {
    console.log('Привет, я метод родителя!');
  }
  
}

const first = new First();

first.hello();

class Second extends First {
  hello() {
    super.hello();
    console.log('А я наследуемый метод!');
  }
}

const second = new Second();

second.hello();