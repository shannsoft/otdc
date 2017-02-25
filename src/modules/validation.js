angular.module('validation', [])
    .factory('validationService', function($rootScope,Events) {
      // var validationMessages = {
      //   'required' : {
      //     // this will take as errorType ,%fieldName% and type** to generate message
      //     'type1' : 'Field %fieldName% can not be blank',
      //     'type2' : 'Please enter value for %fieldName% '
      //   },
      //   'invalid' : {
      //     // this will take as errorType ,%fieldName% and type** and %hint% as optional to generate message
      //     'type1' : 'Invalid Entry for %fieldName%',
      //     'type2' : 'Please enter valid input for %fieldName% ',
      //     'type3' : 'Please enter valid input for %fieldName% with values %hint%',
      //   },
      // }
      var validations = {
        'numbersOnly':{
          'regex':/[0-9]$/,
          'errorMessage':"Please Enter numeric values only",
          'errorClass':"invalid",
          'successClass':"valid",
        },
        'alphaNumeric':{
          'regex':/^[a-zA-Z0-9_]*$/,
          'errorMessage':"Please Enter alpha numeric values only",
          'errorClass':'has-error',
          'successClass':"valid",
        },
      }
      return{
        getValidation : function(validation){
          return validations[validation];
        }
        // getValidationMessage : function(errorType,type,fieldName,hint) {
        //   if(!errorType || !fieldName || !type){
        //     $rootScope.$emit(Events.validationFieldMissing,{type:Events.eventType.warn});
        //     return;
        //   }
        //   else if (!validationMessages[errorType] || !validationMessages[errorType]['type'+type]) {
        //     $rootScope.$emit(Events.validationFieldInvalid,{type:Events.eventType.warn});
        //     return;
        //   }
        //   else if(validationMessages[errorType]['type'+type].indexOf('%hint%') != -1 && !hint){
        //         $rootScope.$emit(Events.validationHintMissing,{type:Events.eventType.warn});
        //         return;
        //   }
        //   // prepare the message
        //   var message = validationMessages[errorType]['type'+type] ;
        //   return message.replace("%fieldName%",fieldName).replace("%hint%",hint);
        // }
      }
    })
;
