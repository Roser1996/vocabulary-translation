const words = require("../global/words");
const XLSX = require("xlsx");
const translate_data = [["单词", "中文解释"]];

module.exports = {
  "launch webpage and check the words": function(browser) {
    words.forEach(word => {
      browser
        .useXpath()
        .url("https://www.youdao.com/")
        .waitForElementVisible("//input[@id='translateContent']")
        .setValue("//input[@id='translateContent']", word)
        .click("xpath", "//form[@id='form']//button")
        .getText("//div[@id='phrsListTab']//li[1]", result => {
          if (result.value) {
            translate_data.push([word, result.value]);
          } else {
            translate_data.push([word, ""]);
          }
        });
    });
  },

  "step two": function(browser) {
    // console.log(translate);
    console.log(translate_data);
    const ws = XLSX.utils.aoa_to_sheet(translate_data);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
    XLSX.writeFile(wb, "./output/translate_data.xlsx");
  }
};
