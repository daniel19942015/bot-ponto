const puppeteer = require("puppeteer")
const {
    DataHora,
    sleep
} = require("../functions/functions")


const init = async () => {

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ], headless: false, ignoreHTTPSErrors: true
    }); 
    
    return await screenshot(browser);
}

async function screenshot(browser) {
    try {

        const page = await browser.newPage();
        await page.setCacheEnabled(false);

        page.on('error', async msg => {
            await browser.close();
            throw msg;
        });

        console.info('[' + DataHora() + '] [NAV]: Efetuando redirecionamento para a url...');
        let navigation = await page.goto("https://webponto.norber.com.br/webPontoIndra/default.asp")

        if (navigation.ok) {

            await sleep(3000);

            await page.setViewport({
                width: 1900,
                height: 1080
            })

            console.info(`[${DataHora()}] [NAV]: Code!`);
            const code = await page.$x('//*[@id="CodEmpresa"]');
            await code[0].type("2");

            console.info(`[${DataHora()}] [NAV]: User!`);
            const user = await page.$x('//*[@id="requiredusuario"]');
            await user[0].type("681091");

            console.info(`[${DataHora()}] [NAV]: Key!`);
            const password = await page.$x('//*[@id="requiredsenha"]');
            await password[0].type("549216895");

            await page.keyboard.press(String.fromCharCode(13));

            await sleep(10000);

            let page_to = await page.goto("https://webponto.norber.com.br/webPontoIndra/just_user/IncluirMarcacaoOnLine.asp")

            if (page_to.ok) {

                await sleep(10000);

                await page.click('[name="Submit"]')

                let cache = await page.screenshot({
                    path: "image.png",
                    clip: {
                        x: 0,
                        y: 0,
                        width: 1900,
                        height: 1080
                    }
                });

                await sleep(10000);

                console.info(`[${DataHora()}] [NAV]: Finalizando navegacao!`);
                await page.close();
                await browser.close();
                return true;

            } else {
                console.info(`[${DataHora()}][ERRO]<thenCatch_page_to> Houve um erro`);
                page.close();
                browser.close();
                return false;
            }

        } else {
            console.info(`[${DataHora()}][ERRO]<thenCatch> Houve um erro`);
            await page.close();
            await browser.close();
            return false;
        }

    } catch (error) {
        console.info(`[${DataHora()}][ERRO]<tryCatch> Houve um erro ${error}`)
        browser.close();
        return false;
    }
}

module.exports = {
    init
}
