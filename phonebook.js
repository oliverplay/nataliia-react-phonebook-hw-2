import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  MainContainer,
  ContactsTable,
  AddContactBttn,
  ContactDetails,
  ContactsContainer,
  FindContact,
  RemoveBttn,
} from './phonebook.styled';

class PhoneBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      filter: '',
      name: '',
      number: '',
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number, contacts } = this.state;

    if (name.trim() === '' || number.trim() === '') {
      window.alert('Please enter both name and phone number.');
      return;
    }

    if (contacts.some(contact => contact.name === name)) {
      window.alert('Error: Contact already exists.');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleFilterChange = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  handleRemove = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { name, number, contacts, filter } = this.state;

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div>
        <MainContainer>
          <h1>Phonebook</h1>
          <ContactsTable>
            <ContactDetails>Name</ContactDetails>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={this.handleChange}
            />
            <ContactDetails>Phone Number</ContactDetails>
            <input
              type="tel"
              name="number"
              required
              value={number}
              onChange={this.handleChange}
            />
            <br />
            <AddContactBttn onClick={this.handleSubmit}>
              Add contact
            </AddContactBttn>
          </ContactsTable>
        </MainContainer>

        <ContactsContainer>
          <h2>Contacts</h2>
          <FindContact>Find contacts by name</FindContact>
          <input
            type="text"
            placeholder="Search by name"
            value={filter}
            onChange={this.handleFilterChange}
          />

          {filteredContacts.length === 0 ? (
            <h2>No contacts</h2>
          ) : (
            <ul>
              {filteredContacts.map(({ id, name, number }) => (
                <li key={id}>
                  {name}: {number}
                  <RemoveBttn onClick={() => this.handleRemove(id)}>
                    Delete Contact
                  </RemoveBttn>
                </li>
              ))}
            </ul>
          )}
        </ContactsContainer>
      </div>
    );
  }
}

export default PhoneBook;
