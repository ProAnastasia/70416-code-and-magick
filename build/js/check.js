function getMessage(a, b) {
    var type = (typeof a === 'boolean') ? 'boolean' :
               (typeof a === 'number') ? 'number' :
               (Array.isArray(a)) ? 'array' : false,
        result;

    switch(type) {
        case 'boolean':
            if (a) {
                result =  'Я попал в ' + b;
            } else {
                result = 'Я никуда не попал';
            }
            break;
        case 'number':
            result = 'Я прыгнул на ' + a * 100 + ' сантиметров';
            break;
        case 'array':
            if (Array.isArray(b)) {
                result = 'Я прошёл ' + getDistancePath(a, b) + ' метров';
            } else {
                result = 'Я прошёл ' + getSum(a) + ' шагов';
            }
            break;
        default:
            result = false;
    }

    function getDistancePath(one, two) {
        var temp = [];

        for (var i = 0; i < one.length; i++) {
            temp.push(one[i] * two[i]);
        }

        return getSum(temp);
    }

    function getSum(arr) {
        return arr.reduce( function(val, elem) {
            return val + elem;
        });
    }

    return result;
}