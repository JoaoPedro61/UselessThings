function SendMessage(element, message, offset, count) {
this.element = element;
this.message = message;
this.offset = offset;
this.count = count;
this.increaser = 0;

this.should = false;

this.execute = () => {
new Promise((resolve) => {
if (element) {
element.innerHTML = message;
const options = {
key: 'Enter',
code: 'Enter',
keyCode: 13,
};
element.dispatchEvent(new KeyboardEvent('keypress', options));
element.dispatchEvent(new KeyboardEvent('keyup', options));
element.dispatchEvent(new KeyboardEvent('keydown', options));
}
setTimeout(() => {
resolve();
}, this.offset);
})
.then(() => {
if (this.should && element && (this.count > this.increaser)) {
this.execute();
this.increaser++;
}
});
};

this.start = () => {
this.should = true;
this.execute();
return this;
};

this.stop = () => {
this.should = false;
return this;
};

}

const messager = new SendMessage($0, 'Ei ta ocupado?!', 1000, 5000).start();

