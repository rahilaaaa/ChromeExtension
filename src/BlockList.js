import React, { useState } from 'react';

const BlockList = ({ blocklist, saveBlocklist }) => {
  const [newSite, setNewSite] = useState('');

  const addSite = () => {
    if (newSite && !blocklist.includes(newSite)) {
      const newBlocklist = [...blocklist, newSite];
      saveBlocklist(newBlocklist);
      setNewSite('');
    }
  };

  const removeSite = (site) => {
    const newBlocklist = blocklist.filter(item => item !== site);
    saveBlocklist(newBlocklist);
  };

  return (
    <div>
      <h2>Blocklist</h2>
      <ul>
        {blocklist.map(site => (
          <li key={site}>
            {site}
            <button onClick={() => removeSite(site)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newSite}
        onChange={(e) => setNewSite(e.target.value)}
      />
      <button onClick={addSite}>Add</button>
    </div>
  );
};

export default BlockList;
