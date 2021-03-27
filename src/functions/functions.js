function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

// function decodeBase64(string) {
//     let sc = Buffer.from(string, 'base64').toString('utf-8');
//     return sc;
// }

function DataHora() {
    let Data = new Date();
    let monthsText = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    //Tratamento para DATA
    let dia = '0';
    if (Data.getDate() < 10) { dia = '0' + Data.getDate(); }
    else { dia = Data.getDate(); }
    let mes = months[Data.getMonth()];
    let ano = Data.getFullYear();
    //Tratamento para HORA
    let hora = '0';
    if (Data.getHours() < 10) { hora = '0' + Data.getHours(); }
    else { hora = Data.getHours(); }
    let mim = '0';
    if (Data.getMinutes() < 10) { mim = '0' + Data.getMinutes(); }
    else { mim = Data.getMinutes(); }
    let seg = '0';
    if (Data.getSeconds() < 10) { seg = '0' + Data.getSeconds(); }
    else { seg = Data.getSeconds(); }

    let DataFormatada = dia + '-' + mes + '-' + ano;
    let HoraFormatada = hora + ':' + mim + ':' + seg;
    let DataHora = DataFormatada + ' - ' + HoraFormatada;
    return DataHora;
}

module.exports = {
    DataHora,
    sleep
}