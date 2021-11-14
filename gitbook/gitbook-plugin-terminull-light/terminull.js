function copyCommandTerminull(command) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value=command;
    dummy.select()
    document.execCommand('copy');
    document.body.removeChild(dummy);
}