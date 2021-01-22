import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

export const Users = () =>{

    const [ name, setName] = useState('') //definimos un estado con una clabe llamada name y leasignamos un capo basio
    const [ email, setEmail] = useState('') //definimos un estado con una clabe llamada name y leasignamos un capo basio
    const [ password, setPassword] = useState('') //definimos un estado con una clabe llamada name y leasignamos un capo basixo
    const [ editing, setEditing] = useState(false) 
    const [ id, setId] = useState('') 
    const [ users, setUsers] = useState([]) 
    
    

    const getUsers = async() =>{
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        setUsers(data)
    }

    useEffect ( () => {
        getUsers();
    }, []) // nos permite renderizar otravez el estado del componente.

    const editUser = async (id) =>{
        const res = await fetch(`${API}/user/${id}`)
        const data = await res.json();
        console.log(data);

        setEditing(true);// el dato pasa a estar en true
        setId(id);
        console.log(id);// le pasamos el id que consultamos

        setName(data.name)
        setEmail(data.email)
        setPassword(data.password)
    }

    const deleteUser = async (id) =>{
        const userResponse = window.confirm('ARE YOU SURE YOU WANT TO DELETE IT?')
        if (userResponse) {
            const res = await fetch(`${API}/users/${id}`,{
                method: 'DELETE'
            });
            const data = await res.json();
            console.log(data);
            await getUsers();
         }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();// esto cancela el evento por defecto que no se recargue la pagina
        // fetch('')
        if (!editing){
            const res = await fetch(`${API}/users`,{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            })
            const data = await res.json()
            console.log(data);
        }else{
            const res = await fetch(`${API}/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            })// este id se obtiene desde el estado de la aplicacion
            const data = await res.json();
            console.log(data)
            setEditing(false);
            setId('');
        }
        //mando allamar a los ususarios 
        await getUsers();
        // limpio los campos
        setName('');
        setEmail('');
        setPassword('');
    }
    
    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div  className="form-group">
                        <input type="text" 
                            onChange={e => setName(e.target.value)} 
                            value={name} 
                            className="form-control"
                            placeholder="name"
                            autoFocus 
                        /> {/*lo que el usuario tipee por ejemplo una "a nostros le pasamos una A"*/}
                    </div>
                    <div  className="form-group">
                        <input type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email} 
                            className="form-control"
                            placeholder="Email"
                            
                        /> {/*lo que el usuario tipee por ejemplo una "a nostros le pasamos una A"*/}
                    </div>
                    <div  className="form-group">
                        <input type="password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password} 
                            className="form-control"
                            placeholder="Password"
                            
                        /> {/*lo que el usuario tipee por ejemplo una "a nostros le pasamos una A"*/}
                    </div>
                    <button className="btn btn-primary btn-block">
                        {editing ? 'UPDATE':'CREATE'} {/* esto nos dice si el campo editing es verdadero cambiara a update pero si es falso se mostrara crate */}
                    </button>
                </form>

            </div>
            <div className="col-md-6">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.password}</td>
                                
                                <td>
                                    <button 
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={() => editUser(user._id)}
                                        >
                                        EDITAR
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={() => deleteUser(user._id)}
                                        >
                                        ELIMINAR
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    )
}