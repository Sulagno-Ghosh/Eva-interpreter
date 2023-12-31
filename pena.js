const assert = require('assert');
const exp = require('constants');
const Environment = require('./environment');

/**
 * The interpreter
 */



class Eva{

    /**
     * Creates an Eva instance with the global environment.
     */

    constructor(global = new Environment()){
        this.global = global
    }
    /**
     * Evaluates an expression in the given env
     */
    eval(exp,env = this.global){
        if (isNumber(exp)){
            return exp;
        }

        if (isString(exp)){
            return exp.slice(1,-1);
        }
        //Math operations

        if (exp[0] === '+'){
            return this.eval(exp[1],env) + this.eval(exp[2], env);
        }
        if (exp[0] === '-'){
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }
        if (exp[0] === '/'){
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }
        if (exp[0] === '*'){
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }

        if (exp[0] === '>'){
            return this.eval(exp[1], env) > this.eval(exp[2], env);
        }
        if (exp[0] === '<'){
            return this.eval(exp[1], env) < this.eval(exp[2], env);
        }
        if (exp [0] === '>='){
            return this.eval(exp[1], env) >= this.eval(exp[2], env);
        }
        if (exp[0] === '<='){
            return this.eval(exp[1], env) <= this.eval(exp[2], env);
        }

        if (exp[0] === '='){
            return this.eval(exp[1], env) === this.eval(exp[2], env);
        }

        //----------------------------------
        //Block: sequence of expressions
        if(exp[0] === 'begin'){
            const blockEnv = new Environment({},env);
            return this._evalBlock(exp,blockEnv);
        }
        
        //Variable declaration:
        if (exp[0] === 'var'){
            const [_, name, value] = exp;
            return env.define(name,this.eval(value,env));
        }

        if (exp[0] === 'set'){
            const [_, name, value] = exp;
            return env.assign(name,this.eval(value,env));
        }



        if (isVariableName(exp)){
            return env.lookup(exp);
        }

        if(exp[0] === 'if'){
            const [_,condition,consequent,alternate] = exp;
            if(this.eval(condition,env)){
                return this.eval(consequent,env);
            }else{
                return this.eval(alternate,env);
            }   
        }

        if(exp[0] === 'while'){
            const[_tag,condition,body] = exp;
            let result;
            while(this.eval(condition,env)){
                result = this.eval(body,env);
            }
            return result;
        }

        
        throw `Unimplemented: ${JSON.stringify(exp)}`;
    }

    _evalBlock(block, env){

        let result;

        const [_tag, ...expression] = block;

        expression.forEach(exp =>  {
            result = this.eval(exp,env);
        });

        return result;


    }
    
}

function isNumber(exp){
    return typeof exp === 'number';
}

function isString(exp){
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp){
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}




module.exports = Eva;



