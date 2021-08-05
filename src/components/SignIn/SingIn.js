import React, { useState } from 'react'
import firebase from 'firebase'
import { auth } from '../../utils/Api'
import { Button } from 'semantic-ui-react'
import '../SignIn/SignIn.scss'

export default function SingIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <div className="sign-in">
      <Button className="boton-google" onClick={signInWithGoogle}>
        Iniciar sesión con google
      </Button>
      <h2>Hola, Bienvenido a mi pureba para BT!</h2>
      <h4>Desarrollado en React, usando firebase, MongoDB, y bootstrap</h4>
      <h6>Backend: Flask ( python )</h6>
    </div>
  )
}
