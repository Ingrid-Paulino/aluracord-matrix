import React from "react";
import { useRouter } from "next/router"; //router/routiamento do next
import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";

// Component React
// function GlobalStyle() {  //O globalStyle é blobal, mas so da pagina inicial
//   return (
//     <style global jsx>{`
//       * {
//         margin: 0;
//         padding: 0;
//         box-sizing: border-box;
//         list-style: none;
//       }
//       body {
//         font-family: "Open Sans", sans-serif;
//       }
//       /* App fit Height */
//       html,
//       body,
//       #__next {
//         min-height: 100vh;
//         display: flex;
//         flex: 1;
//       }
//       #__next {
//         flex: 1;
//       }
//       #__next > * {
//         flex: 1;
//       }
//       /* ./App fit Height -- faz o app ficar no tamanho de 100% */
//     `}</style>
//   );
// }

function Titulo(props) {
  // console.log(props);
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      {/* css in js */}
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//       <Title tag="h2">Boa vindas de volta!</Title>
//       <h2>Discord - Alura Matrix</h2>

//     </div>
//   )
// }

// export default HomePage

export default function PaginaInicial() {
  // const username = 'Ingrid-Paulino';
  // const stateDoReact = React.useState('');
  // console.log(stateDoReact);
  const [username, setUsername] = React.useState("Ingrid-Paulino");
  const routeamento = useRouter();
  // console.log('route', routeamento);

  function condicao() {
    if (username.length > 2) {
      return `https://github.com/${username}.png`;
    }
  }

  return (
    <>
      {/* <GlobalStyle /> */}
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[500],
          backgroundImage:
            "url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infoDoEvento) {
              //preventDefault  para de ficar recarregando a pagina, e me da o controle de como ir pa a proxima pagina. Ele vai pra uma url que foi definido como destino se não definiu fica nela mesma.
              infoDoEvento.preventDefault();
              console.log("Alguem submeteu o form");

              // window.location.href = '/chat'; //muda de pagina quando eu clicar no botao -- isso ja daria certo mas o next passa pra gente o seu rotiamento -- dessa forma faz refrech na pagina toda

              routeamento.push("/chat"); // evita e o refrech da pagina e muda so o conteudo
            }} //evita o refresh inteiro da pagina quando o botão for clicado
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {/* {appConfig.name} */}
              <span
                class="jsx-112034374 sknui-span  sknui-text"
                for=""
                target=""
                name=""
                id=""
              >
                Aluracord - Matrix (Ingrid)
              </span>
            </Text>

            {/* <input
              type="text"
              value={username}
              //toda vez que o usuario digitar, essa função sera chamada
              onChange={ function handleChange(event) {
                // console.log('usuario digitou');
                // console.log(event);
                // console.log('usuario digitou', event.target.value);

                //Onde esta o valor?
                const valor = event.target.value;
                //trocar o valor da variavel
                setUsername(valor);

              }}
            /> */}

            {/* o input e o TextField estão fazendo a mesma coisa */}

            <TextField
              value={username}
              //toda vez que o usuario digitar, essa função sera chamada
              onChange={function handleChange(event) {
                // console.log('usuario digitou', event.target.value);
                //Onde esta o valor?
                const valor = event.target.value;
                //trocar o valor da variavel
                setUsername(valor);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              // src={`https://github.com/${username}.png`} //se eu pegar qualquer usuario github e colocar ao final .png, eu consigo pegar a imagem do nome do usuario
              src={condicao()}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
