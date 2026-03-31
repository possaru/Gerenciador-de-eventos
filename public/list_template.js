function fetch_mysql() {
    let url = `${window.location.href}=rows`

    fetch(url)
        .then(function (response) {
            return response.json();
        }
        )
        .then(function (json) {
            var columnButtons = document.getElementsByClassName("list-column-button");
            var rowOutput = "";

            for (i in json) {
                rowOutput = rowOutput.concat("" +
                    "<div id=" + json[i]['ID'] + " class=\"list-item\">" +
                    "\n\t<button class=\"edit-button\">Edit</button>\n")
                for (j in columnButtons) {
                    if (columnButtons[j].tagName != "BUTTON") { break; }

                    let divTemplate = `\t<div class="list-cols">${json[i][columnButtons[j].id]}</div>\n`;

                    rowOutput = rowOutput.concat(divTemplate)
                }
                rowOutput = rowOutput.concat("</div>")

                document.getElementById('list-rows').insertAdjacentHTML('beforeend', rowOutput)

                rowOutput = ""

            }

        })
}
fetch_mysql();