import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filtro = () => {
  return (
    <div className="flex justify-center items-center py-6 bg-sky-700">
      <div className="bg-white w-11/12 max-w-5xl p-6 rounded-xl shadow-lg flex items-center justify-between gap-8">
        <select className="w-48 h-10 border-2 border-blue-300 rounded-md px-2 text-gray-600 focus:outline-none focus:border-sky-700">
          <option disabled value="">
            Nota
          </option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>
        <div className="flex gap-2 items-center">
          <label htmlFor="precoDe" className="text-gray-600">De:</label>
          <input
            id="precoDe"
            className="w-28 h-10 rounded-lg p-2 border-2 border-blue-300 focus:border-sky-700 outline-none"
            type="text"
            placeholder="$ mínimo"
          />
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="precoAte" className="text-gray-600">Até:</label>
          <input
            id="precoAte"
            className="w-28 h-10 rounded-lg p-2 border-2 border-blue-300 focus:border-sky-700 outline-none"
            type="text"
            placeholder="$ máximo"
          />
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex flex-col mb-6">
            <label htmlFor="dataInicial" className="text-gray-600 mb-1">Data Inicial:</label>
            <DatePicker
              id="dataInicial"
              showTimeSelect
              dateFormat="Pp"
              locale="pt-BR"
              timeFormat="HH:mm"
              timeIntervals={30}
              className="w-40 h-10 border rounded-lg p-2 text-gray-600 focus:outline-none focus:border-sky-700"
              placeholderText="Escolha a data"
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="dataFinal" className="text-gray-600 mb-1">Data Final:</label>
            <DatePicker
              id="dataFinal"
              showTimeSelect
              dateFormat="Pp"
              locale="pt-BR"
              timeFormat="HH:mm"
              timeIntervals={30}
              selectsEnd
              className="w-40 h-10 border rounded-lg p-2 text-gray-600 focus:outline-none focus:border-sky-700"
              placeholderText="Escolha a data"
            />
          </div>
        </div>
        <button className="bg-sky-700 text-white px-6 py-2 rounded-md hover:bg-sky-800 transition-colors">
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default Filtro;
    