import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth } from "../fireBase/config";
import { TextInput } from 'react-native-web'


export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            loggedIn: false
        }
    }

    onSubmit() {
        if (!this.state.email.includes('@')) {
            this.setState({ error: 'Email mal formateado' });
            return;
        } else if (this.state.password.length < 6) {
            this.setState({ error: 'La password debe tener una longitud mínima de 6 caracteres' });
            return;
        }

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                this.setState({ loggedIn: true, error: '' });
            })
            .then(() => {
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(error => {
                if (this.state.email !== auth.currentUser.email || this.state.password !== auth.currentUser.password) {
                    this.setState({ error: 'Credenciales incorrectas' });
                    return;
                }
                console.log(error);
            })
    }

    render() {
        return (
            <View>
                <Text>Formulario de Login</Text>
                <Pressable onPress={() => this.props.navigation.navigate('Register')}>
                    <Text>Ir al Registro</Text>

                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate('HomeMenu')}>
                    <Text>Entrar a la App</Text>
                </Pressable>

                <TextInput style={styles.field}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />

                {this.state.error !== '' && (
                    <Text style={styles.error}>{this.state.error}</Text>
                )}

                <Pressable onPress={() => this.onSubmit()}>
                    <Text> Logearse </Text>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate('Register')}>
                    <Text> No tengo cuenta </Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
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
});


export default Login