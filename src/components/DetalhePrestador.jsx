import React from 'react'
import NavBar from './NavBar'

const DetalhePrestador = () => {
  return (
    <div className='h-screen min-w-sreen bg-sky-700'>
        <NavBar/>
        <div className='flex flex-row mt-10 ml-36 h-full p-10 gap-28'>
            <div className='flex justify-center ml-16 '>
                <img className='w-[700px] h-[500px] ' src="https://www.ideianoar.com.br/wp-content/uploads/2021/05/prestadores-de-servico.jpg" alt="" />
            </div>
            <div className='flex flex-col w-72'>
                <h1 className='font-bold text-3xl text-white border-b-2 mb-4 w-72'>Nome do prestador</h1>
                <p className='break-words max-w-80 text-white'>asdasdasdasdasd </p>
                <h3 className='text-white font-mono'>Preco da diaria $100,00</h3>      
            </div>
        </div>
    </div>
  )
}
 
export default DetalhePrestador