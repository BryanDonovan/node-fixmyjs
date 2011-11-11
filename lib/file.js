var fs = require('fs');
var fixmyjs = require('../packages/fixmyjs/fixmyjs');

var File = function (fileName) {
  this.fileName = fileName;
};

File.prototype.read = function () {
  this.contents = fs.readFileSync(this.fileName, 'utf8');
};

File.prototype.write = function () {
  if (this.modified) {
    fs.writeFileSync(this.fileName, this.contents, 'utf8');
  }
};

File.prototype.fix = function (data) {
  if (!this.contents) {
    this.read();
  }
  this.modified = fixmyjs(data, this.contents);
};

File.prototype.diff = function () {
  if (this.contents && this.modified) {
    var diff = require('./jsdiff').diffString(this.contents, this.modified);
    process.stdout.write("@ " + this.fileName + "\n");
    process.stdout.write(diff + "\n");
  }
};

module.exports = File;
