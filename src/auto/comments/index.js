 // .then(async () => {

                //     console.info('[' + DataHora() + '] [NAV]: Ajustando resolucao', resolucao);
                //     await page.setViewport(resolucao);

                //     await sleep(3000);

                //     console.info(`[${DataHora()}] [NAV]: Efetuando login!`);
                //     const login = await page.$x('');
                //     await login[0].type(user);
                //     const password = await page.$x('');
                //     await password[0].type(pass);
                //     await page.keyboard.press(String.fromCharCode(13));

                //     console.info('[' + DataHora() + '] [NAV]: Aguardando carregamento painel eixos');
                //     
                //     await sleep(15000);

                //     console.info('[' + DataHora() + '] [NAV]: Redirecionando para o painel / pagina de EIXOS');
                //     let gotoEixos = await page.goto(process.env.URLEIXO)
                //         .then(async () => {
                //             await sleep(15000);
                //             let cache = await page.screenshot({
                //                 path: arquivo,
                //                 clip: {
                //                     x: 0,
                //                     y: 0,
                //                     width: 345,
                //                     height: ((resolucao.height) - 20)
                //                 }
                //             });
                //             console.info('[' + DataHora() + '] [ROBO]: Navegacao concluida.');

                //             await page.close();
                //             await browser.close();
                //             return true;

                //         })
                //         .catch(e_gotoEixos => {
                //             page.close();
                //             browser.close();
                //             let mensagem = '[' + DataHora() + '] [ROBO] Nao consegui efetuar redirecionamento para os eixos!"';
                //             console.info(mensagem, e_gotoEixos);
                //             return false;
                //         });

                //     return gotoEixos;

                // })
                // .catch(e_gotoLogin => {
                //     page.close();
                //     let mensagem = '[' + DataHora() + '] [ROBO] Nao consegui efetuar redirecionamento para o portal ePERT!"';
                //     console.info(mensagem, e_gotoLogin);
                //     return false;
                // });