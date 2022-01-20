import React, { useEffect, useState } from 'react';
// REACT BOOTSTRAP COMPONENTS
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import DatePicker from "react-multi-date-picker"
import moment from 'moment';

const FormModifica = (props) => {

    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(true)
    const [values, setValues] = useState([])

    useEffect(() => {
        setFormState()
    }, [])

    const setFormState = () => {

        setForm(props.struttura) 
        setDateChiusura()

        setLoading(false)
    }

    const setDateChiusura = () =>{
        var tempDate = []
        props.struttura.giorniChiusura.map(obj => {
            tempDate.push(moment(obj.datachiusura).format('YYYY-MM-GG'))
        }) 
        setValues(tempDate)
    }

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })
        if (!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    const convertDates = () => {
        var datesToConvert = []

        values.map((date) => {

            const dateConverted = new Date(date.year, date.month, date.day);

            var d = moment(dateConverted).format('YYYY-MM-GG')

            datesToConvert.push(d)
        })

        setField('giorniChiusura', datesToConvert);
    }


    const handleSubmit = e => {
        e.preventDefault()
        // get our new errors
        const newErrors = findFormErrors()
        // Conditional logic:
        if (Object.keys(newErrors).length > 0) {
            // We got errors!
            setErrors(newErrors)
        } else {
            props.onSubmit(form)
            alert('Struttura salvata')
        }
    }

    const findFormErrors = () => {
        const { nome, prezzoPerFascia, durataPerFascia, dataInizioDisponibilita, capacitaPerFascia, oraInizioMattina, oraFineMattina, oraInizioPomeriggio, oraFinePomeriggio } = form


        const newErrors = {}
        // name errors
        if (!nome || nome === '') newErrors.nome = 'nome struttura non può essere vuoto!'
        else if (nome.length > 35) newErrors.nome = 'nome struttura troppo lungo'
        // price  errors
        if (!prezzoPerFascia || prezzoPerFascia === '') newErrors.prezzoPerFascia = 'prezzo vuoto!'
        else if (prezzoPerFascia <= 0 || prezzoPerFascia > 1000) newErrors.prezzoPerFascia = 'prezzo non valido'
        // duration slot errors
        if (!durataPerFascia || durataPerFascia === '') newErrors.durataPerFascia = 'durata fascia vuota!'
        // start date errors
        if (!dataInizioDisponibilita || dataInizioDisponibilita === '') newErrors.dataInizioDisponibilita = 'data vuota!'
        // capacity errors
        if (!capacitaPerFascia || capacitaPerFascia === '') newErrors.capacitaPerFascia = 'capacità vuota!'
        else if (capacitaPerFascia <= 0 || capacitaPerFascia > 100) newErrors.prezzoPerFascia = 'capaci`ta non valida'
        // start morning errors
        if (!oraInizioMattina || oraInizioMattina === '') newErrors.oraInizioMattina = 'ora inizio mattina vuota!'
        // end morning errors
        if (!oraFineMattina || oraFineMattina === '') newErrors.oraFineMattina = 'ora fine mattina vuota!'
        else if (oraFineMattina >= oraInizioPomeriggio) newErrors.oraFineMattina = 'ora non valida'
        // start evening errors
        if (!oraInizioPomeriggio || oraInizioPomeriggio === '') newErrors.oraInizioPomeriggio = 'ora inizio pomeriggio vuota!'
        else if (oraInizioPomeriggio >= oraFinePomeriggio) newErrors.oraInizioPomeriggio = 'ora non valida'
        // end evening errors
        if (!oraFinePomeriggio || oraFinePomeriggio === '') newErrors.oraFinePomeriggio = 'ora fine pomeriggio vuota!'

        return newErrors
    }


    if (!loading) {
        console.log(values)
        console.log("componet", form)
        return (
            <>
                <Form>
                    <Row className="mb-1">
                        <Form.Group as={Col} md="6" className="mx-auto" >
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Inserisci nome"
                                value={form.nome}
                                onChange={e => setField('nome', e.target.value)}
                                isInvalid={!!errors.nome}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.nome} </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-2 my-3">
                        <Form.Group as={Col} md="5" className="mx-auto" >
                            <Form.Label>Prezzo per fascia</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Inserisci prezzo"
                                value={form.prezzoPerFascia}
                                onChange={e => setField('prezzoPerFascia', e.target.value)}
                                isInvalid={!!errors.prezzoPerFascia}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.prezzoPerFascia} </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="5" className="mx-auto">
                            <Form.Label>Durata Fascia</Form.Label>
                            <Form.Control
                                as='select'
                                value={form.durataPerFascia}
                                onChange={e => setField('durataPerFascia', e.target.value)}
                                isInvalid={!!errors.durataPerFFascia}
                            >
                                <option value='disabled' >Seleziona una durata</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                            </Form.Control>
                            <Form.Control.Feedback type='invalid'>{errors.durataPerFascia}</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-1 my-3">
                        <Form.Group as={Col} md="6" className="mx-auto" >
                            <Form.Label>Data inizio</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Data inizio disponibilità"
                                value={form.dataInizioDisponibilita}
                                onChange={e => setField('dataInizioDisponibilita', e.target.value)}
                                isInvalid={!!errors.dataInizioDisponibilita}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.dataInizioDisponibilita} </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-1 my-3">
                        <Form.Group as={Col} md="6" className="mx-auto" >
                            <Form.Label>Capacità per fascia</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Inserisci capacità per fascia"
                                value={form.capacitaPerFascia}
                                onChange={e => setField('capacitaPerFascia', e.target.value)}
                                isInvalid={!!errors.capacitaPerFascia}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.capacitaPerFascia} </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <h4 className='mt-3'>Orario mattina</h4>
                    <Row className="mb-2">
                        <Form.Group as={Col} md="5" className="mx-auto" >
                            <Form.Label>Dalle</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder=""
                                value={form.oraInizioMattina}
                                onChange={e => setField('oraInizioMattina', e.target.value)}
                                isInvalid={!!errors.oraInizioMattina}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.oraInizioMattina} </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="5" className="mx-auto" >
                            <Form.Label>Alle</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder=""
                                value={form.oraFineMattina}
                                onChange={e => setField('oraFineMattina', e.target.value)}
                                isInvalid={!!errors.oraFineMattina}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.oraFineMattina} </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <h4 className='mt-3'>Orario pomeriggio</h4>
                    <Row className="mb-2">
                        <Form.Group as={Col} md="5" className="mx-auto" >
                            <Form.Label>Dalle</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder=""
                                value={form.oraInizioPomeriggio}
                                onChange={e => setField('oraInizioPomeriggio', e.target.value)}
                                isInvalid={!!errors.oraInizioPomeriggio}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.oraInizioPomeriggio} </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="5" className="mx-auto" >
                            <Form.Label>Alle</Form.Label>
                            <Form.Control
                                type="time"
                                placeholder=""
                                value={form.oraFinePomeriggio}
                                onChange={e => setField('oraFinePomeriggio', e.target.value)}
                                isInvalid={!!errors.oraFinePomeriggio}
                            />
                            <Form.Control.Feedback type='invalid'> {errors.oraFinePomeriggio} </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group as={Col} md="5" className="mx-auto my-4 " >
                            <Button className="btn btn-outline-primary" data-toggle="modal" data-target="#modalDatePicker">Seleziona giorni di chiusura</Button>
                        </Form.Group>
                    </Row>

                    <Button type='submit' onClick={handleSubmit}>Modifica</Button>
                </Form>


                <div className="modal" id="modalDatePicker" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <h5 className="modal-title my-2" id="exampleModalLabel">
                                giorni di chiusura
                            </h5>
                            <div className="modal-body mx-auto">
                                <DatePicker
                                    multiple
                                    value={values}
                                    onChange={setValues}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => convertDates()} >Salva</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Annulla</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1>loading</h1>
            </>
        )
    }
}

export default FormModifica;