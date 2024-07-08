import React, { useState } from 'react';

export default function Player({ initialName, symbol, isActive, onChangeName }) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEdit, setEdit] = useState(false);

  function handleClick() {
    setEdit((edit) => !edit);
    if (isEdit) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  let playerNameDisplay = isEdit ? (
    <input type="text" required value={playerName} onChange={handleChange} />
  ) : (
    <span className="Player-name">{playerName}</span>
  );

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {playerNameDisplay}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEdit ? 'Save' : 'Edit'}</button>
    </li>
  );
}
