import React, { useEffect, useState } from 'react'
import FormInput from './FormInput'
import FormSelect from './FormSelect'
import './Formulario.css'
export default function Formulario(props) {

    const [nome, setNome] = useState('');
    const [pais, setPais] = useState('');
    const [estados, setEstados] = useState([]);
    const [estado, setEstado] = useState('');
    const [cidades, setCidades] = useState([]);
    const [cidade, setCidade] = useState('');

    const carregaCidades = () => {
        const valInicial = { value: '', text: 'Selecione uma cidade' }

        if (estado == '') {
            const url = 'http://localhost:80/webserver/cidades.php';
            fetch(url)
                .then(response => response.json())
                .then(json => json.map(cidade => (
                    { value: cidade.sigla, text: cidade.nome })))
                .then(jsonModif => setCidades([valInicial, ...jsonModif]))
                .catch((e) => console.log(e))
        } else {
            setCidades([valInicial])
        }
    }
    useEffect(carregaCidades, [estados])


    const carregaEstados = () => {
        const valInicial = { value: '', text: 'Selecione um estado' }

        if (pais == 'Brasil') {
            const url = 'http://localhost:80/webserver/estados.php';
            fetch(url)
                .then(response => response.json())
                .then(json => json.map(estado => (
                    { value: estado.sigla, text: estado.nome })))
                .then(jsonModif => setEstados([valInicial, ...jsonModif]))
                .catch((e) => console.log(e))
        } else {
            setEstados([valInicial])
        }
    }
    useEffect(carregaEstados, [pais])




    const paises = [
        { value: '', text: 'Selecione um pais' },
        { value: 'Argentina', text: 'Argentina' },
        { value: 'Brasil', text: 'Brasil' },
        { value: 'Paraguai', text: 'Paraguai' },
        { value: 'Uruguai', text: 'Uruguai' },
    ]

    return (
        <form className="form" action={props.action} method={props.method}>
            <h1>Preencha suas informações pessoais</h1>

            <FormInput label='nome' 
                idInput='nome' 
                textoInput={nome} 
                onChangeInput={setNome}
            />

            <FormSelect label='pais' 
                idSelect='pais' 
                opcoesSelect={paises} 
                onChangeSelect={setPais} 
                opcaoSelecionada={pais} />

            {
                pais == 'Brasil' && <FormSelect label='estado' 
                                        idSelect='estado' 
                                        opcoesSelect={estados} 
                                        onChangeSelect={setEstado} 
                                        opcaoSelecionada={estado} />
            }
            <FormSelect label='estado' 
                idSelect='estado' 
                opcoesSelect={estados} 
                onChangeSelect={setEstados} 
                opcaoSelecionada={estado} />

            {
                pais == 'Brasil' && <FormSelect label='cidade' 
                                        idSelect='cidade' 
                                        opcoesSelect={cidades} 
                                        onChangeSelect={setCidade} 
                                        opcaoSelecionada={cidade} />
            }

            <button>Enviar</button>
        </form>
    )
}