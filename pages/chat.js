// O next já gerencia as paginas pra mim, sem eu precisar ficar usando o router
// http://localhost:3000/chat
import { Box, Text, TextField, Image, Button } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { createClient } from "@supabase/supabase-js";
// 1- vou criar os campos que eu for precisar la no supabase na parte banco de dados.
// 2 - criar as variaveis SUPABASE_ANON_KEY e SUPABASE_URL
// 2- baixei, fiz o import aqui
// 3 - fazer a ligação

const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzI3NjY0MywiZXhwIjoxOTU4ODUyNjQzfQ.2hBJdFwGH8fBaj7g6Cvm5cBeig-EISHi3fOCHrKtNQM"; // peguei esse valor la do supabase
const SUPABASE_URL = "https://owrrkyhjlvqiahvpmfpv.supabase.co"; // peguei esse valor la do supabase

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//daria pra fazer isso usando o fetch, mas o supabase facilita pra gente

//com fetch
// fetch(`${SUPABASE_URL}/rest/v1/mensagens?select=*`, {
//   headers: {
//     'Content-Type': 'application/json',
//     'apikey': SUPABASE_ANON_KEY,
//     'Authorization': 'Bearer' + SUPABASE_ANON_KEY,
//   }
// })
//   .then((res) => {
//     return res.json(); //tranformei em json
//   })
//   .then((response) => {
//     console.log(response); //peguei a resposta
//   })

// OU

//com supabase - a blioteca facilita muito. n precisei usar o fetch
// toda vez que eu desparo uma ação ele dar o console, e isso não é interesante. Por esse motivo usaremos o useEffect
// const dadosDoSupabase = supabaseClient
//   .from('mensagens') //nome da tabela na no supabase
//   .select('*') // mostra todos os valores. OBS: sem varios metodos, na doc mostra todos
//   .then((dados) => {
//     console.log('Dados da consulta:', dados);
//   })
// console.log(dadosDoSupabase);

export default function ChatPage() {
  const [mensagem, setMensagem] = React.useState("");
  const [listaDeMensagens, setListaDeMensagens] = React.useState([]);

  /*
      // Usuário
      - Usário digita no campo textarea
      - Aperta enter para emviar
      - Tem que adicionar o texto na listagem

      // Dev
      - [x] Campo criado
      - [x]  Vamos usar o onChange usa o useState (ter if para caso deja entrar pra limpar a variavel)
      - [x] Lista de mensagens
     */

  //back-end
  //Se a mensagem mudar, ai o meu supabasee vai rodar, isso evita de toda vez que eu digitar algo, o supabase ser acionado
  React.useEffect(() => {
    supabaseClient
      .from("mensagens") //nome da tabela na no supabase
      .select("*") // mostra todos os valores. OBS: sem varios metodos, na doc mostra todos
      .order("id", { ascending: false })
      // .then((dados) => {
      //   console.log('Dados da consulta:', dados);
      //   setListaDeMensagens(dados.data)

      // })
      .then(({ data }) => {
        console.log("Dados da consulta:", data);
        setListaDeMensagens(data);
      });
  }, []);

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: listaDeMensagens.length + 1,
      de: "vanessametonini",
      texto: novaMensagem,
    };

    supabaseClient
      .from("mensagens")
      .insert([
        // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
        mensagem,
      ])
      .then(({ data }) => {
        console.log("Criando mensagem: ", data);
        setListaDeMensagens([
          data[0], //e junto com a nova menssagem
          ...listaDeMensagens, //pego/espalho tudo que ja tinha na lista de mensagem
        ]);
      });

    setMensagem("");
  }

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          {/* Ta mudando valor: {mensagem} */}
          {/* {listaDeMensagens.map((mensagemAtual) => {
                    // console.log(mensagemAtual);
                    return (
                      <li key={mensagemAtual.id}>
                        {mensagemAtual.de}: {mensagemAtual.texto}
                      </li>
                    )
                  })} */}

          {/* ou */}

          <MessageList mensagens={listaDeMensagens} />

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                const valor = event.target.value;
                // console.log(valor);
                setMensagem(valor);
              }}
              //logica de qual botao foi clicado, no caso eu capituro o enter
              onKeyPress={(event) => {
                // console.log(event); //me mostra oq eu apertei no techado, assim posso capiturar esse evento
                if (event.key === "Enter") {
                  event.preventDefault();
                  // console.log(event);
                  // setListaDeMensagens([
                  //   ...listaDeMensagens, //pego/espalho tudo que ja tinha na lista de mensagem
                  //   mensagem //e junto com a nova menssagem
                  // ])
                  // setMensagem(''); //ou
                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button variant="tertiary" colorVariant="neutral" label="Logout" href="/" />
      </Box>
    </>
  );
}

function MessageList(props) {
  // console.log("MessageList", props);

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "scroll",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.mensagens.map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: "5px",
              padding: "6px",
              marginBottom: "12px",
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
              }}
            >
              <Image
                styleSheet={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${mensagem.de}.png`}
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: "10px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        );
      })}
    </Box>
  );
}
