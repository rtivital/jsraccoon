function template(str, obj) {
  return str.replace(/\{(\w+)\}/g, (_, x) => {
    const value = obj[x];
    return Array.isArray(value) ? value.join(', ') : value;
  });
}

function template(str, literals){
    var l = 0, len = str.length, subs = "", insideBrackets = false;
    var ret = "";
    var c, literal;

    for(l = 0; l < len; l++){

        c = str[l];

        if(c === "{"){
            insideBrackets = true;
        } else if(c === "}"){
            insideBrackets = false;

            literal = literals[subs];

            ret += Array.isArray(literal) ? literal.join(", ") : literal;

            subs = "";
        } else {
            if(insideBrackets){
                subs += c;
            } else {
                ret += c;
            }
        }
    }

    return ret;
