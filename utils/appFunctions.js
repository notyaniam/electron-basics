// function to get system information
function getSysInfo() {
  return [
    {
      title: "Computer Name",
      value: process.env.COMPUTERNAME,
    },
    { title: "Computer Processor", value: process.env.PROCESSOR_IDENTIFIER },
    { title: "# of Processors", value: process.env.NUMBER_OF_PROCESSORS },
    { title: "Operating System", value: process.env.OS },
    { title: "Current User", value: process.env.USERNAME },
  ];
}

// multiply values and attempt closing window
function multiplyValues(event, value1, value2) {
  //   window.close();
  console.log(value1, value2);
  return {
    value1,
    value2,
    result: +value1 * +value2,
  };
}

module.exports = { getSysInfo, multiplyValues };
