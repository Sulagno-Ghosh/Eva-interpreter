const Eva = require('../pena');
const Environment = require('../environment');


const tests = [
    require('./self-eval-test'),
    require('./math-test'),
    require('./variables-test'),
    require('./block-test'),
    require('./if-test'),
    require('./while-test'),

]

const eva = new Eva(new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1'

}));

tests.forEach(test => test(eva));

console.log('All tests passed!');