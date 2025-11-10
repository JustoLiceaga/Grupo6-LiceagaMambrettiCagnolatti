import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native-web'
import { auth, db } from "../fireBase/config";
import firebase from 'firebase';

export class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posteos: [],
      loading: true,
    }
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(
      docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });
        this.setState({
          posteos: posts,
          loading: false
        });
      },
      error => {
        console.error("Error al obtener posts de Firebase:", error);
        this.setState({ loading: false });
      }
    );
  }

  onSubmit(idPost, likes) {
    const userEmail = auth.currentUser.email;
    

    if (likes.includes(userEmail)) {
      db.collection('posts')
        .doc(idPost)
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(userEmail)
        })
        .then()
        .catch(error => console.log('Error al quitar like:', error));
    } 
    else {
      db.collection('posts')
        .doc(idPost)
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(userEmail)
        })
        .then()
        .catch(error => console.log('Error al agregar like:', error));
    }
  }

  render() {
    const { posteos, loading } = this.state;

    return (
      <View style={styles.container} >
        <Text style={styles.title} >Publicaciones de Usuarios</Text>

        {loading ? (<Text>Cargando posts...</Text>)
          : (<FlatList
            data={posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text >Publicado por: {item.data.owner}</Text>
                <Text style={styles.login} >{item.data.texto}</Text>
                <Pressable style={styles.login} onPress={() => this.props.navigation.navigate('Comentar', {id: item.id})}>
                  <Text style={styles.login}> Comentar </Text>
                </Pressable>
                <Text style={styles.likesCount}>
                    likes: {item.data.likes.length}
                  </Text>
                  <Pressable 
                    style={styles.button} 
                    onPress={() => this.onSubmit(item.id, item.data.likes)}>
                    <Text style={styles.buttonText}>
                      {item.data.likes.includes(auth.currentUser.email) ? "Quitar like" : "Dar like"}
                    </Text>
                  </Pressable>
              </View>
            )}
          />)}


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
    paddingBottom: 5,
    paddingTop: 5,
    fontSize: 20,
  },
  title: {
    fontSize: 30,
    paddingBottom: 50
  },

});

export default Home