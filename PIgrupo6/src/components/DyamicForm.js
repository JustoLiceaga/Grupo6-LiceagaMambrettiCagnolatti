import { Text, View, Pressable, StyleSheet, TextInput } from 'react-native';
import React, { Component } from 'react';

export class DyamicForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comentario: ''
        };
    }

    onSubmit() {
        console.log(this.state);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Comentarios</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Comentario"
                    onChangeText={(text) => this.setState({ comentario: text })}
                    value={this.state.comentario}
                />
                <Pressable onPress={() => this.onSubmit()}>
                    <Text> enviar </Text>
                </Pressable>
            </View>
        );
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

export default DyamicForm;