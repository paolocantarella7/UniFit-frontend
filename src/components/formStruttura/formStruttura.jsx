import React, { useEffect, useState } from 'react';
// REACT BOOTSTRAP COMPONENTS
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import DatePicker from "react-multi-date-picker"
import moment from 'moment';

const FormStruttura = (props) => {

  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {

    var arrayEmpty = []
    setField('giorniChiusura', arrayEmpty);
  }, [])

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[field]) setErrors({
      ...errors,
      [field]: null
    })
  }

  const convertDates = () => {
    var datesToConvert = []

    values.map((date) => {

      const dateConverted = new Date(date.year, date.monthIndex, date.day);
      console.log('data nel map', dateConverted)

      var d = moment(dateConverted).format('YYYY-MM-DD')

      datesToConvert.push(d)
      return null;
    })

    setField('giorniChiusura', datesToConvert);
  }

  const [values, setValues] = useState([])

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
    }
  }

  const findFormErrors = () => {
    const { nome, prezzoPerFascia, durataFascia, dataInizio, capacitaPerFascia, oraIM, oraFM, oraIP, oraFP } = form

    // date today
    var today = new Date()
    var date = today.getFullYear() + '-' + (String(today.getMonth() + 1).padStart(2, '0')) + '-' + (String(today.getDate()).padStart(2, '0'))

    const newErrors = {}
    // name errors
    if (!nome || nome === '') newErrors.nome = 'Nome vuoto!'
    else if (nome.length > 35) newErrors.nome = 'Nome troppo lungo'
    // price  errors
    if (!prezzoPerFascia || prezzoPerFascia === '') newErrors.prezzoPerFascia = 'Prezzo vuoto!'
    else if (prezzoPerFascia <= 0) newErrors.prezzoPerFascia = 'Prezzo non valido!'
    // duration slot errors
    if (!durataFascia || durataFascia === '') newErrors.durataFascia = 'Durata vuota!'
    // start date errors
    if (!dataInizio || dataInizio === '') newErrors.dataInizio = 'Data vuota!'
    else if (dataInizio < date) newErrors.dataInizio = 'Data non valida (Passato)!'
    // capacity errors
    if (!capacitaPerFascia || capacitaPerFascia === '') newErrors.capacitaPerFascia = 'Capacit?? vuota!'
    else if (capacitaPerFascia <= 0) newErrors.prezzoPerFascia = 'Capacit?? non valida'
    // start morning errors
    if (!oraIM || oraIM === '') newErrors.oraIM = 'Ora vuota!'
    // end morning errors
    if (!oraFM || oraFM === '') newErrors.oraFM = 'Ora vuota!'
    // start evening errors
    if (!oraIP || oraIP === '') newErrors.oraIP = 'Ora vuota!'
    // end evening errors
    if (!oraFP || oraFP === '') newErrors.oraFP = 'Ora vuota!'

    return newErrors
  }

  return (
    <>
      <Form>
        <Row className="mb-1">
          <Form.Group as={Col} md="6" className="mx-auto" >
            <Form.Label className='font-weight-bold'>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci nome"
              onChange={e => setField('nome', e.target.value)}
              isInvalid={!!errors.nome}
            />
            <Form.Control.Feedback type='invalid'> {errors.nome} </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-2 my-4">
          <Form.Group as={Col} md="5" className="mx-auto" >
            <Form.Label className='font-weight-bold'>Prezzo per fascia</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci prezzo"
              onChange={e => setField('prezzoPerFascia', e.target.value)}
              isInvalid={!!errors.prezzoPerFascia}
            />
            <Form.Control.Feedback type='invalid'> {errors.prezzoPerFascia} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" className="mx-auto">
            <Form.Label className='font-weight-bold'>Durata Fascia</Form.Label>
            <Form.Control
              as='select'
              onChange={e => setField('durataFascia', e.target.value)}
              isInvalid={!!errors.durataFascia}
            >
              <option value='disabled' >Seleziona una durata</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{errors.durataFascia}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-2 my-4">
          <Form.Group as={Col} md="5" className="mx-auto" >
            <Form.Label className='font-weight-bold'>Data inizio</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data inizio disponibilit??"
              onChange={e => setField('dataInizio', e.target.value)}
              isInvalid={!!errors.dataInizio}
            />
            <Form.Control.Feedback type='invalid'> {errors.dataInizio} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" className="mx-auto" >
            <Form.Label className='font-weight-bold'>Capacit?? per fascia</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci capacit?? per fascia"
              onChange={e => setField('capacitaPerFascia', e.target.value)}
              isInvalid={!!errors.capacitaPerFascia}
            />
            <Form.Control.Feedback type='invalid'> {errors.capacitaPerFascia} </Form.Control.Feedback>
          </Form.Group>
        </Row>



        <h4 className='mt-4'>Orario mattina</h4>
        <Row className="mb-2">
          <Form.Group as={Col} md="5" className="mx-auto" >
            <Form.Label>Dalle</Form.Label>
            <Form.Control
              type="time"
              placeholder=""
              onChange={e => setField('oraIM', e.target.value)}
              isInvalid={!!errors.oraIM}
            />
            <Form.Control.Feedback type='invalid'> {errors.oraIM} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" className="mx-auto" >
            <Form.Label>Alle</Form.Label>
            <Form.Control
              type="time"
              placeholder=""
              onChange={e => setField('oraFM', e.target.value)}
              isInvalid={!!errors.oraFM}
            />
            <Form.Control.Feedback type='invalid'> {errors.oraFM} </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <h4 className='mt-4'>Orario pomeriggio</h4>
        <Row className="mb-2">
          <Form.Group as={Col} md="5" className="mx-auto" >
            <Form.Label>Dalle</Form.Label>
            <Form.Control
              type="time"
              placeholder=""
              onChange={e => setField('oraIP', e.target.value)}
              isInvalid={!!errors.oraIP}
            />
            <Form.Control.Feedback type='invalid'> {errors.oraIP} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" className="mx-auto" >
            <Form.Label>Alle</Form.Label>
            <Form.Control
              type="time"
              placeholder=""
              onChange={e => setField('oraFP', e.target.value)}
              isInvalid={!!errors.oraFP}
            />
            < Form.Control.Feedback type='invalid'> {errors.oraFP} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" className="mx-auto my-4 " >
            <Button className="btn btn-outline-primary" data-toggle="modal" data-target="#modalDatePicker">Seleziona giorni di chiusura</Button>
          </Form.Group>
        </Row>

        <Button type='submit' className="bg-cyan border col-6" onClick={handleSubmit}>Aggiungi</Button>
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
}

export default FormStruttura;