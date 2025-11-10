import { Text, View, Pressable, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from "../fireBase/config";
import { TextInput } from 'react-native-web'
import firebase from 'firebase';



export class Comentar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            texto: '',
            id: this.props.route.params.id,
            loading: true,
            post: null,
        }
    }

    componentDidMount() {
        const PostId = this.props.route.params.id;

        db.collection('posts').doc(PostId)
            .onSnapshot(
                doc => {
                    if (doc.exists) {
                        this.setState({
                            post: { id: doc.id, data: doc.data() },
                            loading: false,
                        });
                    } else {
                        console.log("No existe el post");
                        this.setState({ loading: false });
                    }
                },
                error => {
                    console.error(error);
                    this.setState({ loading: false });
                }
            );
    }

    onSubmit() {
        const { texto, id } = this.state;


        db.collection('posts').doc(id).update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                texto: texto,
                createdAt: Date.now(),
            })
        })
            .then(() => {
                console.log('Comentario publicado!');
                this.setState({ texto: '' });
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(error => console.log(error));
    }

    render() {
        const { post, loading, texto } = this.state;

        return (
            <View style={styles.container} >

                <Text style={styles.title} >Comenta</Text>


                {loading ? (<Text>Cargando el posteo...</Text>)
                    : (
                        <View>
                            <Text >Publicado por: {post.data.owner}</Text>
                            <Text style={styles.login} >{post.data.texto}</Text>
                            <Text style={styles.subtitle}>Comentarios:</Text>
                            {post.data.comments.length > 0 ? (
                                post.data.comments.map((comentario, index) => (
                                    <View key={index}>
                                        <Text>{comentario.owner}: {comentario.texto}</Text>
                                    </View>
                                ))
                            ) : (
                                <Text>No hay comentarios aún</Text>
                            )}
                            <TextInput style={styles.field}
                                keyboardType='default'
                                placeholder='Que piensas sobre el posteo'
                                onChangeText={text => this.setState({ texto: text })}
                                value={this.state.texto} />

                            <Pressable style={styles.login} onPress={() => this.onSubmit()}>
                                <Text style={styles.text}> Publicar </Text>
                            </Pressable>

                            <Pressable style={styles.login} onPress={() => this.props.navigation.navigate('HomeMenu')}>
                                <Text style={styles.text}> Volver a Home </Text>
                            </Pressable>
                        </View>
                    )}


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
        width: '100%',
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


export default Comentar