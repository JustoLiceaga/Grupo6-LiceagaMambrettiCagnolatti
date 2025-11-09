import { Text, View, Pressable, StyleSheet, FlatList } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from "../fireBase/config";
import { TextInput } from 'react-native-web'


export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true,
      UserName: '',
    };
  }

  componentDidMount() {
    const Email = auth.currentUser.email;


    db.collection('users')
      .where('email', '==', Email)
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const userData = snapshot.docs[0].data();
          this.setState({
            UserName: userData.UserName
          });
        }
      })
      .catch(error => {
        console.error("Error al obtener datos del usuario de Firestore:", error);
      });


    db.collection('posts')
      .where('owner', '==', Email)
      .onSnapshot(
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
          console.error(error);
          this.setState({ loading: false });
        }
      );
  }

  Logout = () => {
    auth.signOut()
      .then(() => {
        this.props.navigation.navigate('Login');
      })
      .catch(error => console.error(error));
  }



  render() {
    const { posteos, loading, UserName } = this.state;

    return (
      <View style={styles.container} >
        <Text style={styles.title}> Tu Perfil</Text>
        <Text style={styles.userName}>Nombre: {UserName}</Text>
        <Text style={styles.userEmail}>Email: {auth.currentUser.email}</Text>

        <Text style={styles.sectionTitle}>Tus posteos:</Text>
        {this.state.loading ? (
          <Text style={styles.loadingText}>Buscando tus posteos...</Text>
        ) : (
          <FlatList
            data={posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.postItem}>
                <Text style={styles.postText}>{item.data.texto}</Text>
              </View>
            )}
          />
        )}

        <Pressable style={styles.buttonLogout} onPress={this.Logout} >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </Pressable>
      </View>
    )
  }
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa', 
        paddingHorizontal: 20, 
        paddingTop: 40, 
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    userName: { 
        fontSize: 24,
        fontWeight: '600', 
        color: '#555',
        marginBottom: 5,
    },
    userEmail: { 
        fontSize: 18,
        color: '#777',
        marginBottom: 15,
    },
    sectionTitle: { 
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
        textAlign: 'left', 
        width: '100%', 
    },
    postItem: { 
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        marginBottom: 15, 
        width: '100%',
    },
    postText: { 
        fontSize: 16,
        color: '#444',
    },
    loadingText: {
        fontSize: 18,
        color: '#888',
        marginTop: 20,
        textAlign: 'center',
    },
    buttonLogout: { 
        backgroundColor: '#dc3545', 
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
        marginTop: 30,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    });

export default Profile