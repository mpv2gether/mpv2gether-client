function setModalText(title, subtitle) {
    $(".modal .title").text(title);
    $(".modal .subtitle").text(subtitle);
}

function setModalEnabled() {
    $("html").addClass("is-clipped");
    $(".modal").addClass("is-active");
}

function setModalContent(html) {
    $(".modal .content").remove();
    if (html) {
        $(".modal .media-content").append("<div class=\"content\"></div>")
        $.get("assets/" + html, function(a) {
            $(".modal .content").html(a)
        });
    }
}

function joinButton() {
    msg.joinSession(currentNick, $("input.sessionid").val());
}

var currentNick = "";

$(document).ready(function() {
    $(".main-ui").hide();
    $(".start-ui").hide();

    $(".start-ui button").click(function(e) {
        // TODO: checks if shit is valid
        var type = "";

        switch($(this).text()) {
            case "Connect":
            type = "connect";
            break;
            case "Create":
            type = "create";
            break;
        }

        if (type == "connect") {
            setModalText("Connect", "please enter the session id you want to connect to");
            setModalContent("modal-connect.tpl");
            setModalEnabled(true);

            // TODO: checks whether session exists
        }
        else if (type == "create") {
            msg.createSession(currentNick);
        }
        // TODO: check if nickname is in use on connection

        $(".start-ui").fadeOut(500);
        $(".hero").fadeOut(500);
    });

    $(".intro-ui .ready-button").click(function() {
        currentNick = $(".intro-ui input.nickname").val();

        if (currentNick == "") {
            // TODO: if nick is empty checks
            setModalText("No nickname!", "please specify a nickname");
            setModalContent("");
            setModalEnabled();
            return;
        }
        else if (currentNick.length > 20) {
            // TODO: nick too long
            setModalText("Too long!", "your chosen nickname is over 20 letters long");
            setModalContent("");
            setModalEnabled();
            return;
        }

        $(".intro-ui").fadeOut(500, function() {
            $(".start-ui").fadeIn(300);
        });
    });

    $(".modal-background, .modal-close").click(function() {
        $("html").removeClass("is-clipped");
        $(this).parent().removeClass("is-active");
    });
});

const Messaging = require("./websockets.js");
const msg = new Messaging();
msg.connect();
