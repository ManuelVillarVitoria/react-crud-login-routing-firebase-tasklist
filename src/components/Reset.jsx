import React, {useState, useCallback} from 'react';
import {withRouter} from 'react-router-dom'

import {auth} from '../firebase';

const Reset = (props) => {

    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)

    const procesarDatos = e => {
        e.preventDefault();

        if(!email.trim()){
            setError('Ingrese un e-mail')
            return
        }
        
        //Limpiar el mensaje de error
        setError(null)

        recuperar()
    }

//https://firebase.google.com/docs/auth/web/manage-users?authuser=0#send_a_password_reset_email
    const recuperar = useCallback(async () => {
        try{
            await auth.sendPasswordResetEmail(email)
            console.log('correo enviado')
            props.history.push('login')

        } catch(error) {
            console.log(error)
            setError(error.message)
        }

    }, [email, props.history])


    return (  
        <div className="mt-5">
            <h3 className="text-center">
                Reiniciar contraseña
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>

                    { error && (<div className="alert alert-danger">{error}</div>) } 

                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Ingrese un e-mail"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
            
                        <button 
                            className="btn btn-dark btn-lg btn-block"
                            type="submit"
                        >
                             Reiniciar contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default withRouter(Reset);