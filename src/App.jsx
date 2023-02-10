import Header from "./components/Header"
import Button from "./components/Button";
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { formatearDinero, calcularTotal } from "./helpers";


function App() {
  const [cantidad, setCantidad] = useState(10000);
  const [meses, setMeses] = useState(12);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  useEffect(() => {
    setTotal(calcularTotal(cantidad, meses));
    //Pago mensual
    setPago(total / meses)
  }, [cantidad, meses, total])

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  function handleChange(e) {
    setCantidad(parseInt(e.target.value));
  }

  function handleClickDecremento() {
    const valor =  cantidad - STEP;

    if(valor < MIN) {
      Swal.fire('Cantidad no válida')
      return;
    };

    setCantidad(valor);
  }

  function handleClickIncremento() {
    const valor =  cantidad + STEP;

    if(valor > MAX) {
      Swal.fire('Cantidad no válida')
      return;
    };

    setCantidad(valor);
  }

  return (
    <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
      <Header />

      <div className="flex justify-between my-8 ">
        <Button
          operador = '-'
          fn={handleClickDecremento}
        />
        <Button
          operador = '+'
          fn={handleClickIncremento}
        />

      </div>

      <input
        type="range"
        className="w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
      />
      
      <p className=" text-center my-10 text-5xl font-extrabold text-indigo-600">
        {formatearDinero(cantidad)}
      </p>

      <h2 className="text-2xl font-extrabold text-gray-500 text-center">
          Elige un <span className="text-indigo-600 mt-5">Plazo</span> a pagar
      </h2>

      <select
        className="mt-5 w-full p-2 bg-white border border-gray-500 rounded-lg text-center text-xl font-bold
        text-gray-600"
        value={meses}
        onChange={ e => setMeses(parseInt(e.target.value))}
      >
       <option value="6"> 6 Meses </option>
       <option value="12"> 12 Meses </option>
       <option value="24"> 24 Meses </option>
      </select>

      <div className="my-5 bg-gray-50 p-5">
        <h2 className="text-2xl font-extrabold text-gray-500 text-center mb-5">
           Resúmen <span className="text-indigo-600"> de pagos</span> 
        </h2>

        <p className="text-xl text-gray-500 text-center font-bold"> <span className="text-indigo-600 font-extrabold">{meses}</span> Meses</p>
        <p className="text-xl text-gray-500 text-center font-bold"><span className="text-indigo-600 font-extrabold">{formatearDinero(total)}</span> Total a pagar</p>
        <p className="text-xl text-gray-500 text-center font-bold"><span className="text-indigo-600 font-extrabold">{formatearDinero(pago)}</span> Mensuales</p>


      </div>
    </div>
  )
}

export default App
