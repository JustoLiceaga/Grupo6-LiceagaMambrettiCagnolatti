import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { db } from '../fireBase/config';

export class Usuarios extends Component {
    constructor(props) {
        super(props)
        this.state = {
        users: []
        }
    }
    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let allUsers = []
                docs.forEach(doc => {
                    allUsers.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })
                this.setState({
                    users: allUsers
                })
            }
        )
    }
    render() {
    return (
      <View>
        <Text>Usuarios registrados:</Text>
        {
            this.state.users.map(user => 
                <View key={user.id}>
                    <Text>Usuario: {user.data.UserName}</Text>
                </View>
            )
        }
      </View>
    )
  }
}

export default Usuarios