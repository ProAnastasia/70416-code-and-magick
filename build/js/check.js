function getMessage(a, b) {
    var type = (typeof a === 'boolean') ? 'boolean' :
               (typeof a === 'number') ? 'number' :
               (Array.isArray(a)) ? 'array' : false;

    switch(type) {
        case 'boolean':
            if (a) {
                return 'Я попал в ' + b;
            } else {
                return 'Я никуда не попал';
            }
            break;
        case 'number':
            return 'Я прыгнул на ' + a * 100 + ' сантиметров';
            break;
        case 'array':
            if (Array.isArray(b)) {
                return 'Я прошёл ' + getDistancePath(a, b) + ' метров';
            } else {
               return 'Я прошёл ' + getNumberOfSteps(a) + ' шагов';
            }
            break;
    }

    function getNumberOfSteps(arr) {
        return arr.reduce( function(val, elem) {
            return val + elem;
        }, 0);
    }

    function getDistancePath(one, two) {
        var temp = [];

        for (var i = 0; i < one.length; i++) {
            temp.push(one[i]*two[i]);
        }

        return temp.reduce( function(val, elem) {
            return val + elem;
        }, 0);
    }
}