import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from "../fireBase/config";
import { TextInput } from 'react-native-web'


export class NuevoPosteo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            texto: '',
        }
    }

    onSubmit() {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            texto: this.state.texto,
            createdAt: Date.now(),
            likes: [],
            comments: []
        })
            .then(() => {
                console.log('Posteo publicado!');
                this.setState({ texto: '' });
                this.props.navigation.navigate('Home');
            })
            .catch(error => console.log(error))

    }

    render() {
        return (
            <View style={styles.container} >

                <Text style={styles.title} >Crea un posteo</Text>

                <Text style={styles.text}>Ingresa el texto</Text>

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder='En que estas pensando?'
                    onChangeText={text => this.setState({ texto: text })}
                    value={this.state.texto} />

                <Pressable style={styles.login} onPress={() => this.onSubmit()}>
                    <Text style={styles.text}> Publicar </Text>
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

});


export default NuevoPosteo