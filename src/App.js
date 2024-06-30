import React, { useState, useEffect } from 'react';
import BlockList from './BlockList';

const App = () => {
  const [blocklist, setBlocklist] = useState([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.sync.get(['blocklist', 'enabled'], function(result) {
      setBlocklist(result.blocklist || []);
      setEnabled(result.enabled !== false);
    });
  }, []);

  const saveBlocklist = (newBlocklist) => {
    setBlocklist(newBlocklist);
    chrome.storage.sync.set({ blocklist: newBlocklist });
  };

  const toggleEnabled = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    chrome.storage.sync.set({ enabled: newEnabled });
  };

  return (
    <div>
      <h1>Website Blocker</h1>
      <button onClick={toggleEnabled}>
        {enabled ? 'Disable' : 'Enable'}
      </button>
      <BlockList blocklist={blocklist} saveBlocklist={saveBlocklist} />
    </div>
  );
};

export default App;
