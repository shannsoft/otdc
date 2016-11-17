angular.module('validation', [])
    // .constant('MODULE_VERSION', '0.0.3')
    // .value('defaults', {
    //     foo: 'bar'
    // })
    // .directive('directiveName', function() {/* stuff here */})
    .factory('validationService', function($rootScope,Events) {
      var validationMessages = {
        'required' : {
          // this will take as errorType ,%fieldName% and type** to generate message
          'type1' : 'Field %fieldName% can not be blank',
          'type2' : 'Please enter value for %fieldName% '
        },
        'invalid' : {
          // this will take as errorType ,%fieldName% and type** and %hint% as optional to generate message
          'type1' : 'Invalid Entry for %fieldName%',
          'type2' : 'Please enter valid input for %fieldName% ',
          'type3' : 'Please enter valid input for %fieldName% with values %hint%',
        },
      }
      return{
        getValidationMessage : function(errorType,type,fieldName,hint) {
          if(!errorType || !fieldName || !type){
            $rootScope.$emit(Events.validationFieldMissing,{type:Events.eventType.warn});
            return;
          }
          else if (!validationMessages[errorType] || !validationMessages[errorType][type]) {
            $rootScope.$emit(Events.validationFieldInvalid,{type:Events.eventType.warn});
            return;
          }
          else if(validationMessages[errorType][type].indexOf('%hint%') != -1 && !hint){
                $rootScope.$emit(Events.validationHintMissing,{type:Events.eventType.warn});
                return;
          }
          // prepare the message
          var message = validationMessages[errorType][type] ;
          return message.replace("%fieldName%",fieldName).replace("%hint%",hint);
        }
      }
    })
;
