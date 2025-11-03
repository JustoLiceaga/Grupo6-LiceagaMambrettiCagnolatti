import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'


export class Profile extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
      <View>
        <Text> Esto es Profile</Text>
        <Pressable onPress={() => this.props.navigation.navigate('Login') }>
            <Text>deslogearse</Text>

        </Pressable>
      </View>
    )
  }
}

export default Profile