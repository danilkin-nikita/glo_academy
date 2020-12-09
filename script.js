'use strict';

function DomElement(selector, height, width, bg, fontSize, options) {

  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  options = options || {};
  this.positions = options.positions;
};

DomElement.prototype.createDomElement = function(elem) {
  
  if (this.selector.slice(0, 1) === '.') {
    elem = document.createElement('div');
    elem.classList.add(this.selector.substring(1));
  } else if (this.selector.slice(0, 1) === '#') {
    elem = document.createElement('p');
    elem.id = (this.selector.substring(1));
    elem.textContent = 'test';
  }
  document.body.append(elem);

  elem.style.height = this.height +'px';
  elem.style.width = this.width + 'px';
  elem.style.backgroundColor = this.bg;
  elem.style.fontSize = this.fontSize + 'px';
  elem.style.position = this.positions;
};

let square = new DomElement ('.square', 100, 100, 'red', 35, {positions: 'absolute'});

square.createDomElement();

