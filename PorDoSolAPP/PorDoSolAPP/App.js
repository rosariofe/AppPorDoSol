import React, {useState} from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Keyboard, Text } from 'react-native';
import CidadeItem from './Components/CidadeItem';

export default function App() {

  const endPoint = "https://api.openweathermap.org/data/2.5/weather?lang=pt&units=metric&q=";
  const apiKey = 'd1e6fe98456f3898b3436b22dd0e67a1';

  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);
  const [error, setError] = useState(false)

  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obtemPrevisoes = () => {
    setPrevisoes([]);

  const target = endPoint + cidade + "&appid=" + apiKey;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {
      if(dados.cod && dados.cod == 200 ){
        setError(false);
      } else  {
        setError(true);
      }
      setPrevisoes([dados])
      Keyboard.dismiss()
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
      <TextInput
      style={styles.nomeCidade}
      placeholder="Digite o nome de uma cidade"
      value={cidade}
      onChangeText={capturarCidade}
      />
      <Button title="Ok" onPress={obtemPrevisoes}/>
      </View>
      {error?
        <Text style={styles.errorMessage}>Cidade não EXISTE!! </Text>
        :
        <FlatList
          data={previsoes}
          renderItem={
            previsao => (
            <CidadeItem previsao={previsao} />
          )
          }
        />

      }
    </View>
    );
    
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff'
  },
  nomeCidade: {
    padding: 10,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  errorMessage: {
    color: '#FF0000'
  }
});
