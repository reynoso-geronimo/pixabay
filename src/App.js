import Formulario from "./componens/Formulario";
import React, {useState,useEffect} from 'react';
import ListadoImagenes from "./componens/ListadoImagenes";

function App() {
  //state de la app
  const [busqueda,guardarBusqueda]=useState('')
  const [imagenes,guardarImagenes]=useState([])
  const [paginaActual, guardarPaginaActual]=useState(1)
  const [totalpaginas, guardarTotalPaginas]=useState(1)

  useEffect(()=>{
   const consultarAPI= async ()=>{
    if(busqueda==='')return;
    const imagenesPorPagina= 30
    const key='21102242-33450c9911d61d425af5697b2'
    const url= `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

    const respuesta= await fetch(url);
    const resultado= await respuesta.json()

    guardarImagenes(resultado.hits)

    //calcular total paginas
    const calcularTotalPaginas = Math.ceil(resultado.totalHits/imagenesPorPagina)
    guardarTotalPaginas(calcularTotalPaginas)

    //mover la pantalla hacia arriba

    const jumbotron = document.querySelector('.jumbotron')
    jumbotron.scrollIntoView({behavior:'smooth'})

   }
   consultarAPI()

  },[busqueda,paginaActual])

const paginaAnterior=()=>{
  const nuevaPaginaActual= paginaActual -1;
  if(nuevaPaginaActual===0)return;
  guardarPaginaActual(nuevaPaginaActual)
}
const paginaSiguiente=()=>{
  const nuevaPaginaActual= paginaActual+1
  if(nuevaPaginaActual>totalpaginas)return;
  guardarPaginaActual(nuevaPaginaActual)
}
  return (
   <div className="container">
     <div className="jumbotron">
       <p className="lead text-center">Buscador de Imagenes</p>
       <Formulario
       guardarBusqueda={guardarBusqueda}
       />
     </div>
     <div className='row justify-content-center'>
       <ListadoImagenes
        imagenes={imagenes}
       />
       {(paginaActual===1)?null:
       <button
       type='button'
       className='btn btn-info mr-1'
       onClick={paginaAnterior}
       >&laquo;Anterrior </button>

       }
        {(paginaActual===totalpaginas)?null:
        <button
        type='button'
        className='btn btn-info mr-1'
        onClick={paginaSiguiente}
        >Siguiente &raquo;
        </button>
        }
        
     </div>
   </div>
  );
}

export default App;
