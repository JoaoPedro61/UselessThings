function getByXPath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function SendWhatsAppMessager(message, offset, count) {
  this.element = getByXPath('/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[2]/div/div[2]');
  this.button = getByXPath('/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[3]/button');

  this.message = message;
  this.offset = offset;
  this.count = count;
  this.increaser = 0;

  this.should = false;

  this.execute = () => {
    new Promise((resolve) => {
      if (this.element) {
        const event = document.createEvent("TextEvent");
        event.initTextEvent('input', true, true, window, this.message, 0, "en-US");
        this.element.innerHTML = this.message;
        this.element.focus();
        this.element.dispatchEvent(event);
        this.button = getByXPath('/html/body/div[1]/div/div/div[4]/div/footer/div[1]/div[3]/button');
        console.log(this.element)
        if (this.button) {
          this.button.click();
        }
      }
      setTimeout(() => {
        resolve();
      }, this.offset);
    })
      .then(() => {
        if (this.should && this.button && this.element && (this.count > this.increaser)) {
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


let sendWhatsAppMessager = new SendWhatsAppMessager('ここに来て、食べることの意味をお話しします！', 1500, 5000).start();

