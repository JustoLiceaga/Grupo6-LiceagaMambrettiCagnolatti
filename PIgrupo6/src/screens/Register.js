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
                <Text> Esto es el registro</Text>
                <Pressable onPress={() => this.props.navigation.navigate('Login')}>
                    <Text>Ir a Login</Text>
                </Pressable>

                <TextInput style={styles.field}
                    keyboardType='email-address'
                    placeholder='email'
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='UserName'
                    onChangeText={text => this.setState({ UserName: text })}
                    value={this.state.UserName} />

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />

                <Pressable onPress={() => this.onSubmit()}>
                    <Text> Registrarse </Text>
                </Pressable>
                <Pressable onPress={() => this.props.navigation.navigate('Login')}>
                    <Text> Ya tengo cuenta </Text>
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

export default Register;