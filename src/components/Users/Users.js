import React, { useState, useEffect } from 'react'
import './Users.scss'
import { toast } from 'react-toastify'
import { agregarUsuario, borrarUsuario } from '../../utils/Api'

const API = process.env.REACT_APP_BACKEND

export default function Users() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [edad, setEdad] = useState('')

  const [editing, setEditing] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [id, setId] = useState()

  const [users, setUsers] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(editing)
    //============== CREATE USER
    if (!editing) {
      await fetch(`${API}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          correo,
          edad,
        }),
      })
        .then((response) => response.json())
        .then((data) => agregarUsuario(data, nombre, correo, edad))
        .then(() => {
          setId('')
          getUsers()
          toast.success('Usuario creado correctamente')
        })
        .catch(() => {
          toast.error('Ups, al parecer hubo un error, intenta más tarde')
        })

      setNombre('')
      setEdad('')
      setCorreo('')
    } else {
      //========================= REAL UPDATE
      const resp = fetch(`${API}/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          correo,
          edad,
        }),
      })
      resp
        .then((res) => {
          res.json()
          agregarUsuario(id, nombre, correo, edad)
          setEditing(false)
          setId('')
          getUsers()
          toast('Usuario actualizado correctamente')
        })
        .catch(() => {
          toast.error('Ups, al parecer hubo un error, intenta más tarde')
        })
    }
  }

  //================== OK (get user)
  const getUsers = async () => {
    const resp = await fetch(`${API}/users`)
    const data = await resp.json()
    setUsers(data)
  }

  useEffect(() => {
    getUsers()
  }, [])

  //================== OK (Delete user)
  const deleteUser = async (id) => {
    console.log(id)

    const userResponse = window.confirm(
      '¿De verdad quieres eliminar esta entrada?',
    )
    if (userResponse) {
      await fetch(`${API}/users/${id}`, {
        method: 'DELETE',
      })
        .then(() => borrarUsuario(id))
        .catch(() => {
          toast.error('Ups, al parecer hubo un error, intenta más tarde')
        })

      //const data = await resp.json()
      //console.log(data)
      toast('Usuario eliminado')
      await getUsers()
    }
  }
  //================== OK (Set data before update)
  const editUser = async (id) => {
    const resp = await fetch(`${API}/user/${id}`, { method: 'GET' })
    const data = await resp.json()

    setEditing(true)
    setId(id)

    setNombre(data.nombre)
    setCorreo(data.correo)
    setEdad(data.edad)
  }

  return (
    <div className="row">
      <div className="col-md-6 container p-2">
        <table className="table table-borderless align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Edad</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.nombre}</td>
                <td>{user.correo}</td>
                <td>{user.edad}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm btn-block"
                    onClick={() => editUser(user._id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={() => deleteUser(user._id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setNombre(e.target.value)}
              value={nombre}
              className="form-control"
              placeholder="Nombre"
              autoFocus
            />
          </div>

          <div className="form-group">
            <input
              type="correo"
              onChange={(e) => setCorreo(e.target.value)}
              value={correo}
              className="form-control"
              placeholder="Email"
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setEdad(e.target.value)}
              value={edad}
              className="form-control"
              placeholder="Edad"
            />
          </div>
          <button className="btn btn-primary">
            {editing ? 'Actualizar usuario' : 'Crear usuario'}
          </button>
        </form>
      </div>
    </div>
  )
}
