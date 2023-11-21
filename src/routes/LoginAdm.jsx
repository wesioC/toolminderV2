import React from 'react'
import "../styles/LoginAdm.css";
import { Flex, TextField, Button } from '@radix-ui/themes';
import Footer from '../components/footer/Footer';

const LoginAdm = () => {
    return (
        <>
            <Flex className='body__'>
                <div class="blurred-box">
                    <div class="user-login-box">
                        <span class="user-icon"></span>
                        <div class="user-name">User</div>
                        <label className='input_login'>
                            <TextField.Input
                                type="email"
                                placeholder="Email"

                            />
                        </label>
                        <label className='input_login'>
                            <TextField.Input
                                type="password"
                                placeholder="Senha"

                            />
                        </label>
                        <Button onClick='/home' className='button__' radius="full" >

                            <a href='/home'>Entrar</a>
                        </Button>

                    </div>

                </div>
            </Flex>
            <Footer />
        </>
    )
}

export default LoginAdm