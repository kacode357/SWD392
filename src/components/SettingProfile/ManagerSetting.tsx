import { useState } from 'react';
import { Tabs } from 'antd';           // Import Tabs from antd
import Setting from './Setting';       // Import the Setting component
import ChangePassword from './ChangePassword'; // Import the ChangePassword component

const { TabPane } = Tabs;              // Destructure TabPane from Tabs

const ManagerSetting = () => {
  // State to track the active tab
  const [activeTab, setActiveTab] = useState('setting');

  return (
    <div className="manager-setting">
      {/* Use Tabs from antd */}
      <Tabs 
        activeKey={activeTab} 
        onChange={(key) => setActiveTab(key)} 
        centered
        type="card"
      >
        {/* Tab navigation */}
        <TabPane tab="Setting" key="setting">
          <Setting />  {/* Render Setting component */}
        </TabPane>
        <TabPane tab="Change Password" key="changePassword">
          <ChangePassword /> {/* Render ChangePassword component */}
        </TabPane>
      </Tabs>
    </div>
  );
}

export default ManagerSetting;
