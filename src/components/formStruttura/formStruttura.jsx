import React, { useState } from 'react';
// REACT BOOTSTRAP COMPONENTS
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Row , Col} from "react-bootstrap";
// BOOTSTRAP LIBRARY
import 'bootstrap/dist/css/bootstrap.min.css';

const FormStruttura = () => {

  const [ form, setForm ] = useState({})
  const [ errors, setErrors ] = useState({})

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[field] ) setErrors({
      ...errors,
      [field]: null
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    // get our new errors
    const newErrors = findFormErrors()
    // Conditional logic:
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      alert('Struttura salvata')
      console.log(form)
    }
  }

  const findFormErrors = () => {
    const { nome, prezzoPerFascia } = form
    const newErrors = {}
    // name errors
    if ( !nome || nome === '' ) newErrors.nome = 'nome struttura non può essere vuoto!'
    else if ( nome.length > 30 ) newErrors.nome = 'nome struttura troppo lungo'
    // price  errors
    if ( !prezzoPerFascia || prezzoPerFascia === '' ) newErrors.prezzoPerFascia = 'prezzo vuoto!'

    return newErrors
  }

  return (
        <Form>
                
                <Row className="mb-1">
                  <Form.Group as={Col} md="6" className="mx-auto" >
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Inserisci nome"
                      onChange={ e => setField('nome', e.target.value)}
                      isInvalid={ !!errors.nome }
                    />
                    <Form.Control.Feedback type='invalid'> { errors.nome } </Form.Control.Feedback>
                  </Form.Group>
                </Row>

                <Row className="mb-2">
                  <Form.Group as={Col} md="5" className="mx-auto" >
                    <Form.Label>Prezzo per fascia</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Inserisci prezzo"
                      onChange={ e => setField('prezzoPerFascia', e.target.value)}
                      isInvalid={ !!errors.prezzoPerFascia }
                    />
                    <Form.Control.Feedback type='invalid'> { errors.prezzoPerFascia } </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} md="5" className="mx-auto" >
                    <Form.Label>Durata fascia</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      onChange={ e => setField('durataFascia', e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-1">
                  <Form.Group as={Col} md="6" className="mx-auto" >
                    <Form.Label>Data inizio</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Data inizio disponibilità"
                      onChange={ e => setField('dataInizio', e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-1">
                  <Form.Group as={Col} md="6" className="mx-auto" >
                    <Form.Label>Capacità per fascia</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Inserisci capacità per fascia"
                      onChange={ e => setField('capacitaPerFascia', e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <h4>Orario mattina</h4>
                <Row className="mb-2">
                  <Form.Group as={Col} md="5"  className="mx-auto" >
                    <Form.Label>Dalle</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      onChange={ e => setField('oraIM', e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="5"  className="mx-auto" >
                    <Form.Label>Alle</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      onChange={ e => setField('oraFM', e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <h4>Orario pomeriggio</h4>
                <Row className="mb-2">
                  <Form.Group as={Col} md="5"  className="mx-auto" >
                    <Form.Label>Dalle</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      onChange={ e => setField('oraIP', e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} md="5" className="mx-auto" >
                    <Form.Label>Alle</Form.Label>
                    <Form.Control
                      type="time"
                      placeholder=""
                      onChange={ e => setField('oraFP', e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Button type='submit' onClick={ handleSubmit }>Aggiungi</Button>

        </Form>
  )
}

export default FormStruttura;