jQuery(window).on('madxartwork/frontend/init', function () {
    //alert(aepro.access_level);
    if (madxartworkFrontend.isEditMode()) {
        parent.document.addEventListener("mousedown", function (e) {
            var widgets = parent.document.querySelectorAll(".madxartwork-element--promotion");
            if (widgets.length > 0) {
                for (var i = 0; i < widgets.length; i++) {
                    if (widgets[i].contains(e.target)) {
                        var dialog = parent.document.querySelector("#madxartwork-element--promotion__dialog");
                        var icon = widgets[i].querySelector(".icon > i");
                        var widget_title = widgets[i].querySelector(".madxartwork-element-title-wrapper > .title");
                        if (icon.classList[0] == "ae-pro-icon") {
                            dialog.classList.add('ae-widget');
                            dialog.querySelector(".dialog-buttons-message").innerHTML = 'Use ' + widget_title.innerHTML + ' widget and Supercharge the dynamic content capabilities of madxartwork Page Builder';
                            dialog.querySelector(".ae-widget .dialog-buttons-action").style.display = "none";
                            if (dialog.querySelector(".ae-pro-dialog-buttons-action") === null) {
                                var button = document.createElement("a");
                                var buttonText = document.createTextNode("Upgrade to AnyWhere madxartwork Pro");

                                button.setAttribute("href", "https://www.madxartworkaddons.com/anywhere-madxartwork-pro/");
                                button.setAttribute("target", "_blank");
                                button.classList.add(
                                    "dialog-button",
                                    "dialog-action",
                                    "dialog-buttons-action",
                                    "madxartwork-button",
                                    "madxartwork-button-success",
                                    "ae-pro-dialog-buttons-action"
                                );
                                button.appendChild(buttonText);
                                dialog.querySelector(".dialog-buttons-action").insertAdjacentHTML("afterend", button.outerHTML);
                                dialog.querySelector(".ae-pro-dialog-buttons-action").style.display = "block";
                            } else {
                                dialog.querySelector(".ae-pro-dialog-buttons-action").style.display = "";
                            }
                        } else {
                            dialog.classList.remove('ae-widget');
                            dialog.querySelector(".dialog-buttons-action").style.display = "block";

                            if (dialog.querySelector(".ae-pro-dialog-buttons-action") !== null) {
                                dialog.querySelector(".ae-pro-dialog-buttons-action").style.display = "none";
                            }
                        }

                        // stop loop
                        break;
                    }
                }
            }
        });
    }
});