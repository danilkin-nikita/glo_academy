class Validator {
  constructor({selector, pattern = {}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [...this.form.elements].filter(item => { 
      return item.tagName.toLowerCase() !== 'button' &&
      item.type !== 'button';
    });
    this.error = new Set();
  }

  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.checkIt.bind(this)));
    this.form.addEventListener('submit', event => {
      event.preventDefault();
      this.elementsForm.forEach(elem => this.checkIt({target: elem}));
      if (this.error.size) {
        event.preventDefault();
      }
    });
  }

  isValid(elem) {
    const validatorMethod = {
      notEmpty(elem) {
        if (elem.value.trim === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    };

    if (this.method) {
      const method = this.method[elem.id];

      if (method) {
        return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
      }
    } else {
      console.warn('Необходимо передать id полей ввода и методы проверки этих полей');
    }

    return true;
  }

  checkIt(event) {
    const target = event.target;

    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    } else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('success');
    elem.classList.add('error');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);
  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('success');
    if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
      input.success {
        border: 2px solid green !important
      }
      input.error {
        border: 2px solid red !important
      }
      .validator-error {
        font-size: 12px;
        font-family: sans-sefif;
        color: red
      }
    `;
    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone) {
      this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
    }

    if (!this.pattern.email) {
      this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
  }
}

const validForm1 = new Validator({
    selector: '#form1',
    pattern: {
      text: /^[а-я]+$/msi
    },
     method: {
      'form1-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form1-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form1-name': [
        ['notEmpty'],
        ['pattern', 'text']
      ]
    }
  });

 const validForm2 = new Validator({
    selector: '#form2',
    pattern: {
      text: /^[а-я]+$/msi
    },
     method: {
      'form2-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form2-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form2-name': [
        ['notEmpty'],
        ['pattern', 'text']
      ],
      'form2-message': [
        ['notEmpty'],
        ['pattern', 'text']
      ]
    }
  });

  const validForm3 = new Validator({
    selector: '#form3',
    pattern: {
      text: /^[а-я]+$/msi
    },
     method: {
      'form3-phone': [
        ['notEmpty'],
        ['pattern', 'phone']
      ],
      'form3-email': [
        ['notEmpty'],
        ['pattern', 'email']
      ],
      'form3-name': [
        ['notEmpty'],
        ['pattern', 'text']
      ]
    }
  });

  validForm1.init();
  validForm2.init();
  validForm3.init();