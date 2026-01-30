import { Component } from 'react';
import { nanoid } from 'nanoid';
import FormName from './FormName/FormName';
import Section from './Section/Section';
import Contacts from './Contacts/Contacts';

class App extends Component {
  state = {
    contacts: [],
    name: '',
    number: '',
    filter: '',
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { name, number, contacts } = this.state;

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const isDuplicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${name} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
      name: '',
      number: '',
    }));
  };

  handleDelete = contactId => {
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
      <>
        <Section title="Phonebook">
          <FormName
            name={name}
            number={number}
            onChange={this.handleChange}
            onSubmit={this.handleSubmit}
          ></FormName>
        </Section>

        <Section title="Contacts">
          <Contacts
            contacts={filteredContacts}
            filter={filter}
            onFilterChange={this.handleChange}
            onClick={this.handleDelete}
          ></Contacts>
        </Section>
      </>
    );
  }
}

export default App;
