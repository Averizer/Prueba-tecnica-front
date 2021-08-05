import firebaseApp from './firebase'
import 'firebase/firestore'

export const db = firebaseApp.firestore(firebaseApp)

export const auth = firebaseApp.auth()

export function salir() {
  auth.signOut()
}

export async function agregarUsuario(id, nombre, correo, edad) {
  const res = await db.collection('usuarios').doc(id).set({
    nombre: nombre,
    correo: correo,
    edad: edad,
  })
  return res
}

export async function borrarUsuario(id) {
  await db
    .collection('usuarios')
    .doc(id)
    .delete()
    .then(() => console.log('Usuario borrado en firebase'))
}

