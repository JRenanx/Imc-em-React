import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, Vibration, Keyboard, Pressable, FlatList } from "react-native"
import ResultImc from "./Result/";
import styles from "./style";

export default function Form() {

  const [altura, setAltura] = useState(null)
  const [peso, setPeso] = useState(null)
  const [messageImc, setMessageImc] = useState("Prencha o peso e Altura")
  const [imc, setImc] = useState(null)
  const [textButton, setTextButton] = useState("Calcular")
  const [errorMessage, setErrorMessage] = useState(null)
  const [imcList, setImcList] = useState ([])

  function verificationImc() {
    if (imc == null) {
      setErrorMessage("*Campo Obrigatório")
      Vibration.vibrate();
    }
  }

  function imcCalculator() {
    let alturaFormat = altura.replace(",", ".")
    let totalImc = ((peso / (alturaFormat * alturaFormat)).toFixed(2))
    setImcList ((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}])
    setImc(totalImc)
  }

  function validationImc() {
    if (peso != null && altura != null) {
      imcCalculator()
      setAltura(null)
      setPeso(null)
      setMessageImc("Seu imc é igual:")
      setTextButton("Calcular Novamente")
      setErrorMessage(null)
    }
    else {
      verificationImc()
      setImc(null)
      setTextButton("Calcular")
      setMessageImc("Preencha o peso e a Altura")
    }
  }

  return (
    <View style={styles.formContext}>
      {imc == null ?
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}>Altura</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAltura}
            value={altura}
            placeholder="Ex: 1.75 cm"
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}>Peso</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPeso}
            value={peso}
            placeholder="Ex: 75.1 kg"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.ButtonCalc}
            onPress={() => validationImc()}
          >
          <Text style={styles.textButtonCalc}>{textButton}</Text>
          </TouchableOpacity>          
        </Pressable>
        : 
        <View style={styles.exhibitionResult}>
          <ResultImc messageResultImc={messageImc} resultImc={imc} />
          <TouchableOpacity
            style={styles.ButtonCalc}
            onPress={() => validationImc()}
          >
          <Text style={styles.textButtonCalc}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      }
      <FlatList
      showsVerticalScrollIndicator={false}
       style={styles.listImc}
      data={imcList.reverse()}
      renderItem={({item}) => {
        return (
          <Text style={styles.imcItem}>
          <Text style={styles.textImcItem}>Resultado do IMC = </Text>
          {item.imc}
          </Text>
        )
        }}
        keyExtractor={(item) =>{
        item.id
        }}
        />

    </View>
  );
}