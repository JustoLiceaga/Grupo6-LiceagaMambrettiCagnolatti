import { Text, View, Pressable, StyleSheet, ImageBackground } from 'react-native'
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
            loggedIn: false,
            recordarme: false,
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            user ? this.props.navigation.navigate('HomeMenu') : null
        });
        
        
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
                this.props.navigation.navigate('HomeMenu');
            })
            .catch(error =>
                console.log(error)
            )
    }

    render() {
        return (
            <View style={styles.container} >

                <Text style={styles.title} >Formulario de Login</Text>

                <Text style={styles.text}>Email</Text>

                <TextInput style={styles.field}
                    keyboardType='email-address'
                    placeholder='Ingrese su Email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />

                <Text style={styles.text}>Contraseña</Text>

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='Ingrese su contraseña'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />

                {this.state.error !== '' && (
                    <Text style={styles.error}>{this.state.error}</Text>
                )}
                <Pressable
                    onPress={() => this.setState({ recordarme: !this.state.recordarme })}
                    style={styles.rememberContainer}
                >
                    <Text style={styles.text}>
                        {this.state.recordarme ? "✅ Recordarme" : "⬜ Recordarme"}
                    </Text>
                </Pressable>
                <Pressable style={styles.login} onPress={() => this.onSubmit()}>
                    <Text style={styles.text}> Logearse </Text>
                </Pressable>
                <Pressable style={styles.login} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={styles.text}> No tengo cuenta </Text>
                </Pressable>

            </View>
        )
    }
}

export const styles = StyleSheet.create({
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
    fondo: {
        flex: 1,
        width: '100%',
        height: '100%',

    },
    login: {
        paddingBottom: 10,
        paddingTop: 10,
        fontSize: 25,
    },
    title: {
        fontSize: 30,
        paddingBottom: 50
    },
    rememberContainer: {
        marginVertical: 10,
    },

});


export default Login