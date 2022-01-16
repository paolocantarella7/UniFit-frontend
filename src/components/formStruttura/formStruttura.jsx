import React, { useEffect, useState } from 'react';
// REACT BOOTSTRAP COMPONENTS
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from "react-bootstrap";
import DatePicker from "react-multi-date-picker"



const FormStruttura = (props) => {

  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    console.log(props)
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
    
    values.map((date) =>{

      const dateConverted = new Date(date.year, date.month, date.day);

      var d = dateConverted.getFullYear() + "-" + (dateConverted.getMonth() + 1) + "-" + dateConverted.getDay()

   

      datesToConvert.push(d)


    })

    setField('dateChiusura',datesToConvert);
 
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

      alert('Struttura salvata')
    }
  }

  const findFormErrors = () => {
    const { nome, prezzoPerFascia, durataFascia, dataInizio, capacitaPerFascia, oraIM, oraFM, oraIP, oraFP } = form

    // date today
    var today = new Date()
    var date = today.getFullYear() + '-' + (String(today.getMonth() + 1).padStart(2, '0')) + '-' + (String(today.getDate()).padStart(2, '0'))

    const newErrors = {}
    // name errors
    if (!nome || nome === '') newErrors.nome = 'nome struttura non può essere vuoto!'
    else if (nome.length > 35) newErrors.nome = 'nome struttura troppo lungo'
    // price  errors
    if (!prezzoPerFascia || prezzoPerFascia === '') newErrors.prezzoPerFascia = 'prezzo vuoto!'
    else if (prezzoPerFascia <= 0 || prezzoPerFascia > 1000) newErrors.prezzoPerFascia = 'prezzo non valido'
    // duration slot errors
    if (!durataFascia || durataFascia === '') newErrors.durataFascia = 'durata fascia vuota!'
    // start date errors
    if (!dataInizio || dataInizio === '') newErrors.dataInizio = 'data vuota!'
    else if (dataInizio < date) newErrors.dataInizio = 'data passata non valida'
    // capacity errors
    if (!capacitaPerFascia || capacitaPerFascia === '') newErrors.capacitaPerFascia = 'capacità vuota!'
    else if (capacitaPerFascia <= 0 || capacitaPerFascia > 100) newErrors.prezzoPerFascia = 'capaci`ta non valida'
    // start morning errors
    if (!oraIM || oraIM === '') newErrors.oraIM = 'ora inizio mattina vuota!'
    else if (oraIM < '07:00' || oraIM >= oraFM) newErrors.oraIM = 'ora non valida (apertura 07:00)'
    // end morning errors
    if (!oraFM || oraFM === '') newErrors.oraFM = 'ora fine mattina vuota!'
    else if (oraFM >= oraIP) newErrors.oraFM = 'ora non valida'
    // start evening errors
    if (!oraIP || oraIP === '') newErrors.oraIP = 'ora inizio pomeriggio vuota!'
    else if (oraIP >= oraFP) newErrors.oraIP = 'ora non valida'
    // end evening errors
    if (!oraFP || oraFP === '') newErrors.oraFP = 'ora fine pomeriggio vuota!'
    else if (oraFP > '21:00') newErrors.oraFP = 'ora non valida (chiusura 21:00)'

    return newErrors
  }

  return (
    <>
      <Form>
        <Row className="mb-1">
          <Form.Group as={Col} md="6" className="mx-auto" >
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci nome"
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
              onChange={e => setField('prezzoPerFascia', e.target.value)}
              isInvalid={!!errors.prezzoPerFascia}
            />
            <Form.Control.Feedback type='invalid'> {errors.prezzoPerFascia} </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="5" className="mx-auto">
            <Form.Label>Durata Fascia</Form.Label>
            <Form.Control
              as='select'
              onChange={e => setField('durataFascia', e.target.value)}
              isInvalid={!!errors.durataFascia}
            >
              <option selected disabled >Seleziona una durata</option>
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>{errors.durataFascia}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-1 my-3">
          <Form.Group as={Col} md="6" className="mx-auto" >
            <Form.Label>Data inizio</Form.Label>
            <Form.Control
              type="date"
              placeholder="Data inizio disponibilità"
              onChange={e => setField('dataInizio', e.target.value)}
              isInvalid={!!errors.dataInizio}
            />
            <Form.Control.Feedback type='invalid'> {errors.dataInizio} </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-1 my-3">
          <Form.Group as={Col} md="6" className="mx-auto" >
            <Form.Label>Capacità per fascia</Form.Label>
            <Form.Control
              type="number"
              placeholder="Inserisci capacità per fascia"
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

        <h4 className='mt-3'>Orario pomeriggio</h4>
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
          </Form.Group>
          <Form.Control.Feedback type='invalid'> {errors.oraFP} </Form.Control.Feedback>

          <Form.Group as={Col} md="5" className="mx-auto my-4 " >
            <Button className="btn btn-outline-primary" data-toggle="modal" data-target="#modalDatePicker">Seleziona giorni di chiusura</Button>
          </Form.Group>
        </Row>

        

        <Button type='submit' onClick={handleSubmit}>Aggiungi</Button>
      </Form>


      <div className="modal" id="modalDatePicker" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
          <h5 class="modal-title my-2" id="exampleModalLabel">
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