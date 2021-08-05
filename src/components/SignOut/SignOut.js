import React from 'react'
import { salir } from '../../utils/Api'
import { Button } from 'semantic-ui-react'
import './SignOut.scss'

export default function SignOut() {
  return (
    <div className="sign-out">
      <Button className="salir" onClick={() => salir()}>
        Salir
      </Button>
    </div>
  )
}
