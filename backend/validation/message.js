const isEmpty = require('./isEmpty');
const Validator = require('validator');

module.exports = function validateRegisterInput(message) {
  let errors = {};
  if(!Validator.isLength(message.subject, {min:2, max: 150})){
    errors.subject = 'Subject should be at least 2 and maximum 150 charachters long';
  }

  if(!Validator.isLength(message.content, {min:2, max: 2000})){
    errors.content = 'Content should be at least 2 and maximum 2000 charachters long';
  }

  if(Validator.isEmpty(message.senderId)){
    errors.senderId = 'The sender ID cannot be left blank';
  }
  if(Validator.isEmpty(message.recieverId)){
    errors.conterecieverIdnt = 'The reciever ID cannot be left blank';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }

}
