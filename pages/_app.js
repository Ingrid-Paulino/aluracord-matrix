// O globalStyle é blobal, mas so da pagina inicial, por esse motivo criamos esse arquivo que o next manda. Ele emcapsula todas as paginas que serão carregadas.

// tudo que eu colocar aqui, carrega-ra em todas as paginas
function GlobalStyle() {  //O globalStyle é blobal, mas so da pagina inicial
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: "Open Sans", sans-serif;
      }
      /* App fit Height */
      html,
      body,
      #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height -- faz o app ficar no tamanho de 100% */
    `}</style>
  );
}

export default function MyApp({ Component, pageProps }) {
  console.log('Roda em todas as páginas!');
  return (
    <>
    <GlobalStyle />
    <Component {...pageProps} />
    </>
  ) 
}
