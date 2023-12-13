import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import css from '../components/App.module.css';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    document.title = 'HW-2 Phonebook';
  }, []);

  // Add contact
  const handleAddContact = contact => {
    const { name } = contact;

    // Verify contact
    if (contacts.find(contact => contact.name === name)) {
      Notify.failure(`${name} is already in contacts`);
      return;
    }

    setContacts(prevContacts => [...prevContacts, contact]);
  };

  // Delete contact
  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  // Add filter
  const handleFilter = value => {
    setFilter(value);
  };

  return (
    <div className={css.section}>
      <h2 className={css.title}>Phonebook</h2>
      <ContactForm onAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter onFilter={handleFilter} filter={filter} />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
