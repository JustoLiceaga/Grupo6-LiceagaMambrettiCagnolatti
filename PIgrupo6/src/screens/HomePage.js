import { Text, View, Pressable } from 'react-native'
import React, { Component } from 'react'
import DyamicForm from '../components/DyamicForm'

export class Home extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
      <View>
        <Text>Esto es Home</Text>
        <Pressable onPress={() => this.props.navigation.navigate('Login') }>
            <Text>Ir a Login</Text>
        </Pressable>
        <DyamicForm />
      </View>
    )
  }
}

export default Home