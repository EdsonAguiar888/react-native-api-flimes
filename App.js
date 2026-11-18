import { useEffect, useState } from 'react';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ActivityIndicator,
  Card,
  MD3DarkTheme,
  PaperProvider,
  Text,
} from 'react-native-paper';

const API = 'https://ghibliapi.dev/films';

export default function App() {
  const [filmes, setFilmes] = useState([]);
  const [mensagem, setMensagem] = useState('Carregando filmes...');

  useEffect(() => {
    fetch(API)
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error('Falha ao consultar a API');
        }

        return resposta.json();
      })
      .then((dados) => {
        setFilmes(dados);
        setMensagem(dados.length === 0 ? 'Nenhum filme encontrado.' : '');
      })
      .catch(() => {
        setMensagem('Não foi possível carregar os filmes.');
      });
  }, []);

  function renderizarFilme({ item }) {
    return (
      <Card mode="outlined" style={styles.cartao}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.tituloFilme}>
            {item.title}
          </Text>

          <Image
            source={{ uri: item.image }}
            style={styles.poster}
            resizeMode="contain"
            accessibilityLabel={`Pôster de ${item.title}`}
          />
        </Card.Content>
      </Card>
    );
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={MD3DarkTheme}>
        <SafeAreaView style={styles.tela}>
          <StatusBar style="light" />

          <Text variant="displaySmall" style={styles.tituloApp}>
            Cine Filmes
          </Text>

          <FlatList
            data={filmes}
            keyExtractor={(filme) => filme.id}
            renderItem={renderizarFilme}
            contentContainerStyle={styles.lista}
            ListEmptyComponent={
              mensagem === 'Carregando filmes...' ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.tituloFilme}>{mensagem}</Text>
              )
            }
          />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: MD3DarkTheme.colors.background,
  },
  tituloApp: {
    textAlign: 'center',
    marginVertical: 16,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  cartao: {
    marginBottom: 16,
  },
  tituloFilme: {
    textAlign: 'center',
  },
  poster: {
    width: '100%',
    height: 300,
    marginTop: 12,
  },
});

registerRootComponent(App);




// import { StatusBar } from 'expo-status-bar';
// import { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   const [filmes, setFilmes] = useState([]);

//   useEffect(() => {
//     fetch('https://ghibliapi.dev/films/')
//       .then((resposta) => resposta.json())
//       .then((dados) => setFilmes(dados))
//       .catch((erro) => console.error(erro));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Filmes</Text>

//       <FlatList
//         data={filmes}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View>
//             <Text>{item.title}</Text>
//           </View>
//         )}
//       />

//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingTop: 50,
//   },
// });

























// import { useEffect, useState } from 'react';
// import { FlatList, StyleSheet, Text, View } from 'react-native';


// export default function App() {

//   const[filmes, setFilmes] = useState([]);

//   useEffect(() => {
//     fetch("https://ghibliapi.dev/films/")
//     .then(resposta => resposta.json()
//     .then(dados => setFilmes(dados))  
//     .catch(console.error(erro);
//     )

//     )
//   },[]) 



//   return (
//     <View style={styles.container}>
//         <Text>Filmes</Text>

//       <FlatList
//         data={filmes}
//         keyExtractor={(item) => item.id}
//         renderItem={({item}) => (
//           <View>
            
//             <Text>{item.title}</Text>  
//           <View/>
//         )}
//       />  

//       <StatusBar style="auto" />
//     </View>
//   )
// }


// });
