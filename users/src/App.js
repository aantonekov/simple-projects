import React from 'react';
import './index.scss';
import axios from 'axios';
import { Success } from './components/Success';
import { Users } from './components/Users';
import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    axios
      .get('https://reqres.in/api/users')

      .then((res) => {
        setUsers(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении пользователя');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const changeSearchValue = (ev) => {
    setSearchValue(ev.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSendInvites = () => {
    setSuccess(true);
  };

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          changeSearchValue={changeSearchValue}
          searchValue={searchValue}
          items={users}
          isLoading={isLoading}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
