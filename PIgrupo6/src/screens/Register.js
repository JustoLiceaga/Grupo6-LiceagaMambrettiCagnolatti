import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { db, auth } from "../fireBase/config";
import { TextInput } from 'react-native-web'
export class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            UserName: '',
            password: '',
            registered: false,
            error: ''
        }
    }
    onSubmit() {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(response => {
                this.setState({ registered: true })

                db.collection('users').add({
                    email: this.state.email,
                    UserName: this.state.UserName,
                    createdAt: Date.now(),
                })
            })
            .then(() => {
                this.props.navigation.navigate('Login')
            })
            .catch(error => {
                this.setState({ error: 'error en registro' })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}> Registro</Text>

                <Text style={styles.text}>Email</Text>             

                <TextInput style={styles.field}
                    keyboardType='email-address'
                    placeholder='Ingrese su email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />

                <Text style={styles.text}>Nombre de usuario</Text>


                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Ingrese su UserName'
                    onChangeText={text => this.setState({ UserName: text })}
                    value={this.state.UserName} />

                <Text style={styles.text}>Contraseña</Text>

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Ingrese su contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />

                <Pressable style={styles.registro} onPress={() => this.onSubmit()}>
                    <Text style={styles.text}> Registrarse </Text>
                </Pressable>
                <Pressable style={styles.registro} onPress={() => this.props.navigation.navigate('Login')}>
                    <Text style={styles.text}> Ya tengo cuenta </Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
     container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    field: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
    },
    text: {
        fontSize: 20,
    },
    title:{
        fontSize: 30,
        paddingBottom: 50
    },
    registro:{
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 25,


    },
});

export default Register;