function getHostName(url) {
  return new URL(url).hostname;
}
chrome.runtime.sendMessage({ command: "getNotes" }, (response) => {
  let websiteMap = new Map();
  for (index in response) {
    let url = response[index]["note"]["url"];
    let cleanUrl = getHostName(url);

    if (websiteMap.has(cleanUrl)) {
      websiteMap.set(cleanUrl, websiteMap.get(cleanUrl) + 1);
    } else {
      websiteMap.set(cleanUrl, 1);
    }
  }

  let keys = Array.from(websiteMap.keys());
  let values = Array.from(websiteMap.values());

  new Chart(document.getElementById("bar-chart-horizontal"), {
    type: "horizontalBar",
    data: {
      labels: keys,
      datasets: [
        {
          label: "Population (millions)",
          backgroundColor: [
            "#3e95cd",
            "#8e5ea2",
            "#3cba9f",
            "#e8c3b9",
            "#c45850",
            "#8B4513",
            "#BA55D3",
            "#ADD8E6",
            "#E0FFFF",
            "#FFDEAD",
            "#FF1493",
            "#808000",
          ],
          data: values,
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Notes left on site",
      },
    },
  });
});
