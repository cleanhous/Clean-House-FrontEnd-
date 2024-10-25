import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Filtro = ({
  filtroNota,
  setFiltroNota,
  precoDe,
  setPrecoDe,
  precoAte,
  setPrecoAte,
  dataInicial,
  setDataInicial,
  dataFinal,
  setDataFinal,
  onFiltrar,
}) => {
  return (
    <div className="flex justify-center items-center py-6 bg-sky-700">
      <div className="bg-white w-11/12 max-w-5xl p-6 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Select de Nota */}
        <select
          value={filtroNota}
          onChange={(e) => setFiltroNota(e.target.value)}
          className="w-full md:w-48 h-10 border-2 border-blue-300 rounded-md px-2 text-gray-600 focus:outline-none focus:border-sky-700"
        >
          <option value="">Nota</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        {/* Preço De */}
        <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
          <label htmlFor="precoDe" className="text-gray-600">
            De:
          </label>
          <input
            id="precoDe"
            type="number"
            value={precoDe}
            onChange={(e) => setPrecoDe(e.target.value)}
            className="w-full md:w-28 h-10 rounded-lg p-2 border-2 border-blue-300 focus:border-sky-700 outline-none"
            placeholder="Mínimo"
          />
        </div>

        {/* Preço Até */}
        <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
          <label htmlFor="precoAte" className="text-gray-600">
            Até:
          </label>
          <input
            id="precoAte"
            type="number"
            value={precoAte}
            onChange={(e) => setPrecoAte(e.target.value)}
            className="w-full md:w-28 h-10 rounded-lg p-2 border-2 border-blue-300 focus:border-sky-700 outline-none"
            placeholder="Máximo"
          />
        </div>

        {/* Data Inicial e Final */}
        <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
          <div className="flex flex-col mb-4 md:mb-0">
            <label htmlFor="dataInicial" className="text-gray-600 mb-1">
              Data Inicial:
            </label>
            <DatePicker
              id="dataInicial"
              selected={dataInicial}
              onChange={(date) => setDataInicial(date)}
              showTimeSelect
              dateFormat="Pp"
              locale="pt-BR"
              timeFormat="HH:mm"
              timeIntervals={30}
              className="w-full md:w-40 h-10 border rounded-lg p-2 text-gray-600 focus:outline-none focus:border-sky-700"
              placeholderText="Escolha a data"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dataFinal" className="text-gray-600 mb-1">
              Data Final:
            </label>
            <DatePicker
              id="dataFinal"
              selected={dataFinal}
              onChange={(date) => setDataFinal(date)}
              showTimeSelect
              dateFormat="Pp"
              locale="pt-BR"
              timeFormat="HH:mm"
              timeIntervals={30}
              selectsEnd
              startDate={dataInicial}
              endDate={dataFinal}
              minDate={dataInicial}
              className="w-full md:w-40 h-10 border rounded-lg p-2 text-gray-600 focus:outline-none focus:border-sky-700"
              placeholderText="Escolha a data"
            />
          </div>
        </div>

        {/* Botão Filtrar */}
        <button
          className="bg-sky-700 text-white px-6 py-2 rounded-md hover:bg-sky-800 transition-colors w-full md:w-auto"
          onClick={onFiltrar}
        >
          Filtrar
        </button>
      </div>
    </div>
  );
};

export default Filtro;
