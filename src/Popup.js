import React, { useState, useEffect } from 'react';
import BlockList from './BlockList';

const Popup = () => {
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
    <div style={{ width: 300, padding: 20 }}>
      <h2>Website Blocker</h2>
      <button onClick={toggleEnabled}>
        {enabled ? 'Disable' : 'Enable'}
      </button>
      <BlockList blocklist={blocklist} saveBlocklist={saveBlocklist} />
    </div>
  );
};

export default Popup;
