const puppeteer = require("puppeteer")
const {
    DataHora,
    sleep
} = require("../functions/functions")

async function screenshot() {
    try {
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox'
            ], headless: false, ignoreHTTPSErrors: true
        });
        const page = await browser.newPage();
        await page.setCacheEnabled(false);

        page.on('error', msg => {
            browser.close();
            throw msg;
        });

        console.info('[' + DataHora() + '] [NAV]: Efetuando redirecionamento para a url...');
        let navigation = await page.goto("https://webponto.norber.com.br/webPontoIndra/")
            .then(async (success) => {

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
                    .then(async result => {

                        // await page.click('[name="Submit2"]')

                        // await page.waitForNavigation()

                        let cache = await page.screenshot({
                            path: "image.png",
                            fullPage: true,
                        });

                        await sleep(5000);

                        console.info(`[${DataHora()}] [NAV]: Finalizando navegacao!`);
                        await page.close();
                        await browser.close();

                    }).catch(async error => {

                        console.info(`[${DataHora()}][ERRO]<thenCatch_page_to> Houve um erro ${error.message}`);
                        await page.close();
                        await browser.close();
                        return false;

                    })

                return page_to;

            }).catch(async (error) => {

                console.info(`[${DataHora()}][ERRO]<thenCatch> Houve um erro ${error.message}`);
                await page.close();
                await browser.close();
                return false;
            })

        return true;

    } catch (error) {
        console.info(`[${DataHora()}][ERRO]<tryCatch> Houve um erro ${error.message}`);
        return false;
    }
}



module.exports = {
    screenshot
}
