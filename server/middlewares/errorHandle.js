const fs = require('fs');
const tracer = require('tracer');

const logger = tracer.colorConsole({
    format: [
        "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})", //default format
        {
            error: "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}" // error format
        }
    ],
    dateformat: "HH:MM:ss.L",
    preprocess: function (data) {
        data.title = data.title.toUpperCase();
    },
    transport: function (data) {
        console.log(data.output);
        fs.appendFile('./error.log', data.output + '\n', (err) => {
            if (err) throw err;
        });
    }
});

module.exports = async (ctx, next) => {
    try{
        await next();
    }catch(err){
        logger.error(err.stack);
        throw(err);
    }
};