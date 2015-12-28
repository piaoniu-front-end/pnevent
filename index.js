function on() {
    var args = arguments;
    if (typeof args[0] == "object") {
        var obj = args[0];
        for (var key in obj) {
            this.on(key, obj[key]);
        }
    } else {
        var name = args[0];
        var func = args[1];
        var events = this.events = this.events || {};
        var thisEvent = events[name] = events[name] || [];
        thisEvent.push(func);
    }
    return this;
}

var emitted = {};

function once(name, cb){
  this.on(name, function(data){
    if(!emitted[name]){
      cb(data);
      emitted[name] = true;
    }
  });
}

function off(name) {
    if (!name) {
        delete this.events;
    }

    if (this.events && this.events[name]) {
        delete this.events[name];
    }
    return this;
}

function emit(name, eventArgs) {
    var self = this;
    var events = (this.events && this.events[name]) || [];
    events.forEach(function(func) {
        func.call(self, eventArgs);
    });
}



function mixin(target) {
    if (typeof target == "function") {
        target.prototype.on = on;
        target.prototype.off = off;
        target.prototype.emit = emit;
    } else {
        target.on = on;
        target.once = once;
        target.off = off;
        target.emit = emit;
    }
}

module.exports = {
    emit: emit,
    mixin: mixin,
    once: once,
    on: on,
    off: off
};
