import React, { useState } from 'react';
import styled from 'styled-components';
import ListItem from './ChatListItem';
import { useChatContext } from '../../context/ChatContext';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';

function ChatContactList() {
  const { contacts, handleChatSelect } = useChatContext();
  const [display, setDisplay] = useState({
    rooms: true,
    users: true
  });
  const [searchQuery, setSearchQuery] = useState('');

  const contactGroups = contacts.reduce(
    (prev, curr) => {
      curr?.chatType === 'room' ? prev.rooms.push(curr) : prev.users.push(curr);
      return prev;
    },
    {
      rooms: [],
      users: []
    }
  );

  console.log('Contacts: ', contacts);
  console.log('Groups: ', contactGroups);

  const handleToggleDisplay = (key) => {
    setDisplay((prev) => ({ ...prev, [key]: !display[key] }));
  };

  console.log('searchQuery', searchQuery);

  const renderedGroups = Object.entries(contactGroups).map(([key, values]) => {
    const renderedContacts = values.map((contact) => {
      const { _id, avatarImage, ...otherContact } = contact;

      if (contact.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return (
          <ListItem
            key={_id}
            contactId={_id}
            avatarImage={avatarImage ? `data:image/svg+xml;base64, ${avatarImage}` : '/user.png'}
            handleItemClick={(e) => {
              setSearchQuery('');
              handleChatSelect(contact);
            }}
            {...otherContact}
          />
        );
      } else {
        return [];
      }
    });

    const headingText = key === 'rooms' ? 'Groups' : 'People';

    return (
      <ListGroup key={key}>
        <GroupTitle onClick={() => handleToggleDisplay(key)}>
          {headingText}
          {display[key] ? <BiChevronDown /> : <BiChevronUp />}
        </GroupTitle>

        {key === 'users' ? (
          <SearchBar
            placeholder={`Search ${headingText}`}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
          ></SearchBar>
        ) : null}

        {display[key] ? renderedContacts : null}
      </ListGroup>
    );
  });

  return <List>{renderedGroups}</List>;
}

const List = styled.div`
  width: 100%;
  max-width: 480px;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    background-color: var(--bg-color-main);
    width: 6px;
    &-thumb {
      background-color: var(--bg-color-darken);
      border-radius: 8px;
    }
  }
`;

const ListGroup = styled.ul`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GroupTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: var(--main-color);
  align-self: flex-start;
  margin-bottom: 4px;
  text-transform: capitalize;
  cursor: pointer;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 480px;
  height: 100%;
  overflow-y: auto;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 6px 12px;
  border-radius: 5px;
  border: 1px solid black;
`;

export default ChatContactList;
